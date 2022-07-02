"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const nft_schema_1 = require("./schemas/nft.schema");
const ipfs_service_1 = require("../helper/ipfs.service");
const ownership_service_1 = require("./ownership.service");
const nftType_enum_1 = require("./interfaces/nftType.enum");
const sale_service_1 = require("./sale.service");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
const event_service_1 = require("../event/event.service");
const collection_service_1 = require("../collection/collection.service");
const contract_service_1 = require("./contracts/contract.service");
const zeroAddress = '0x0000000000000000000000000000000000000000';
let NftService = class NftService {
    constructor(model, ownerShipService, userService, saleService, ipfsService, configService, eventService, collectionService, contractServcie) {
        this.model = model;
        this.ownerShipService = ownerShipService;
        this.userService = userService;
        this.saleService = saleService;
        this.ipfsService = ipfsService;
        this.configService = configService;
        this.eventService = eventService;
        this.collectionService = collectionService;
        this.contractServcie = contractServcie;
        this.logger = new common_1.Logger('NFT service');
        this.follow = async (id, userId) => {
            const nft = await this.model.findById(id);
            if (!nft) {
                throw new common_1.HttpException('Not found nft have _id = ' + id, common_1.HttpStatus.BAD_REQUEST);
            }
            const followers = (nft === null || nft === void 0 ? void 0 : nft.followers) ? nft === null || nft === void 0 ? void 0 : nft.followers : [];
            if (followers.includes(userId)) {
                return this.model.findByIdAndUpdate(id, { followers: followers.filter((item) => item !== userId) }, { new: true });
            }
            if (!followers.includes(userId)) {
                return this.model.findByIdAndUpdate(id, { followers: [...followers, userId] }, { new: true });
            }
        };
    }
    async findAll(query) {
        const findQuery = this.model.find();
        if (query.search) {
            findQuery.or([
                { name: { $regex: '.*' + query.search + '.*', $options: 'i' } },
            ]);
        }
        if ('activated' in query) {
            findQuery.where({ activated: query.activated });
        }
        if ('fileType' in query && query.fileType !== 'all') {
            findQuery.where({ fileType: query.fileType });
        }
        if ('creator' in query) {
            findQuery.where({ creator: query.creator });
        }
        const count = await this.model.find().merge(findQuery).countDocuments();
        findQuery
            .sort({ [query.sortBy]: query.sortType })
            .skip(query.page * query.size)
            .limit(query.size);
        const result = await findQuery
            .populate('creator')
            .populate({
            path: 'collectionId',
        })
            .exec();
        return {
            items: result,
            paginate: {
                page: query.page,
                size: query.size,
                count,
            },
        };
    }
    async findOne(id) {
        const nft = await this.model.findById(id).populate('creator').exec();
        const sales = await this.saleService.getInSaleNft(nft.id);
        return {
            nft,
            sales,
        };
    }
    async findByToken(tokenAddress, tokenId, chainId = 0) {
        return await this.model
            .findOne({
            tokenAddress: { $in: [tokenAddress, tokenAddress.toLowerCase()] },
            tokenId,
            chainId,
        })
            .exec();
    }
    async findByUser(userId, type) {
        switch (type) {
            case nftType_enum_1.NftTypeEnum.OWNED:
                return this.ownerShipService.getOwnedByUser(userId);
            case nftType_enum_1.NftTypeEnum.CREATED:
                return this.model.find({ creator: userId });
            case nftType_enum_1.NftTypeEnum.INSALE:
                return this.saleService.getInSaleByUser(userId);
            default:
                return [];
        }
    }
    async findOrCreate(id, tokenAddress, chainId, payload, standard) {
        const contract = this.contractServcie.getCollectionContract(chainId, tokenAddress, standard);
        const nft = await this.model.findOne({
            tokenId: id,
            tokenAddress: tokenAddress,
            chainId: chainId,
        });
        if (nft) {
            return nft;
        }
        const uri = await contract.uri(id);
        const metadata = await this.ipfsService.fetchUri(uri);
        const collection = await this.collectionService.findOrCreateByAddress(contract.address, chainId, standard);
        return this.model.create(Object.assign(Object.assign(Object.assign(Object.assign({ tokenId: id, tokenAddress: tokenAddress, chainId: chainId, royalty: 250 }, metadata), { uri: uri }), payload), { collectionId: collection === null || collection === void 0 ? void 0 : collection._id }));
    }
    async onTransferSingle(eventArgs, chainId, contract, standard, isLazy = false, signature = '') {
        const [operator, from, to, id, value] = eventArgs;
        this.logger.verbose('Is lazy: ' + isLazy);
        this.logger.verbose(`Transfer ${id} from ${from} to ${to}, ${value}`);
        const receiver = await this.userService.findOrCreateByAddress(to);
        if (+from != 0) {
            const sender = await this.userService.findOrCreateByAddress(from);
            const nft = await this.model.findOne({
                tokenId: id,
                tokenAddress: contract.address.toLowerCase(),
                chainId: chainId,
            });
            await this.ownerShipService.transfer(sender._id.toString(), receiver._id.toString(), nft._id, +value);
            return;
        }
        const payload = { supply: +value, creator: receiver._id };
        let nft;
        if (isLazy) {
            nft = await this.mintLazy(+id, contract.address.toLowerCase(), chainId, signature);
        }
        else {
            nft = await this.findOrCreate(+id, contract.address.toLowerCase(), chainId, payload, standard);
        }
        if (!isLazy) {
            await this.ownerShipService.transfer(from, receiver._id.toString(), nft._id, +value);
        }
        this.logger.log('Saved NFT', id, 'isLazy:', isLazy);
    }
    async mintLazy(tokenId, tokenAddress, chainId, signature) {
        const lazyNft = await this.model.findOne({
            tokenAddress: tokenAddress,
            chainId: chainId,
            isLazy: true,
            signature: signature,
        });
        if (!lazyNft) {
            throw new Error('Lazy NFT not found');
        }
        lazyNft.isLazy = false;
        lazyNft.tokenId = tokenId;
        return await lazyNft.save();
    }
    async createLazyNFT(tokenAddress, chainId, signature, params, standard) {
        let nft = await this.model.findOne({
            tokenAddress: tokenAddress,
            chainId: chainId,
            signature: signature,
        });
        if (nft) {
            throw new Error('Lazy NFT already exists');
        }
        const metadata = await this.ipfsService.fetchUri(params.uri);
        const collection = await this.collectionService.findOrCreateByAddress(tokenAddress, chainId, standard);
        const creator = await this.userService.findOrCreateByAddress(params.creatorAddress);
        nft = await this.model.create(Object.assign(Object.assign({ tokenAddress: tokenAddress, chainId: chainId, isLazy: true, signature: signature }, metadata), { uri: params.uri, supply: params.supply, creator: creator._id, collectionId: collection === null || collection === void 0 ? void 0 : collection._id, royalty: params.royalty }));
        await this.ownerShipService.transfer('0x0', creator._id.toString(), nft._id, +params.supply);
        return nft;
    }
    async importNft(ownerAddress, address, id, chainId, standard) {
        const nft = await this.model.findOne({
            tokenId: +id,
            tokenAddress: address.toLowerCase(),
            chainId: chainId,
        });
        if (nft) {
            return nft;
        }
        console.log(id, address, chainId);
        const contract = this.contractServcie.getCollectionContract(chainId, address, standard);
        const balance = await contract.balanceOf(ownerAddress, id);
        const uri = await contract.uri(id);
        const metadata = await this.ipfsService.fetchUri(uri);
        if (balance <= 0) {
            throw new Error(`NFT ${id} is not owned by ${ownerAddress}`);
        }
        let collection = await this.collectionService.findByAddress(address, chainId);
        if (!collection) {
            collection = await this.collectionService.createByAddress(address, chainId, standard);
        }
        const owner = await this.userService.findOrCreateByAddress(ownerAddress);
        const newNft = await this.model.create(Object.assign(Object.assign({ tokenId: id, tokenAddress: contract.address.toLowerCase(), chainId, supply: +balance, royalty: 250 }, metadata), { uri: uri, creator: owner === null || owner === void 0 ? void 0 : owner._id, collectionId: collection === null || collection === void 0 ? void 0 : collection._id }));
        await this.ownerShipService.transfer('0x0', owner._id.toString(), newNft._id, +balance);
        return newNft;
    }
    async refreshUri(id) {
        const nft = await this.model.findById(id).exec();
        if (!nft) {
            throw new common_1.HttpException('NFT not found', common_1.HttpStatus.NOT_FOUND);
        }
        const metadata = await this.ipfsService.fetchUri(nft.uri);
        return this.model.findByIdAndUpdate(id, Object.assign({}, metadata));
    }
    async findByCollection(id) {
        const nft = await this.model.find({ collecitonId: id }).exec();
        return nft;
    }
    async deleteNft(id) {
        await this.model.findByIdAndDelete(id);
    }
};
NftService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(nft_schema_1.NFT)),
    __metadata("design:paramtypes", [Object, ownership_service_1.OwnershipService,
        user_service_1.UserService,
        sale_service_1.SaleService,
        ipfs_service_1.IpfsService,
        config_1.ConfigService,
        event_service_1.EventService,
        collection_service_1.CollectionService,
        contract_service_1.ContractService])
], NftService);
exports.NftService = NftService;
//# sourceMappingURL=nft.service.js.map