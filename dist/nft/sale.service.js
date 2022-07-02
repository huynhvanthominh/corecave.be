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
exports.SaleService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const sale_schema_1 = require("./schemas/sale.schema");
const id_interface_1 = require("../global/interfaces/id.interface");
const ownership_service_1 = require("./ownership.service");
const config_1 = require("@nestjs/config");
const nft_service_1 = require("./nft.service");
const user_service_1 = require("../user/user.service");
const event_service_1 = require("../event/event.service");
const collection_service_1 = require("../collection/collection.service");
const utils_1 = require("../utils");
let SaleService = class SaleService {
    constructor(model, ownershipService, configService, userService, eventService, nftService, collectionService) {
        this.model = model;
        this.ownershipService = ownershipService;
        this.configService = configService;
        this.userService = userService;
        this.eventService = eventService;
        this.nftService = nftService;
        this.collectionService = collectionService;
        this.logger = new common_1.Logger('Sale service');
        this.findOne = async (id) => await this.model.findById(id).populate('nft').populate('seller').exec();
        this.update = async (id, saleNFT) => {
            return await this.model.findByIdAndUpdate(id, saleNFT, { new: true });
        };
        this.increaseView = async (body) => {
            const id = body.id;
            const sale = await this.model.findById(id).exec();
            if (!sale) {
                throw new Error('Not found sale by id = ' + id);
            }
            const views = (sale === null || sale === void 0 ? void 0 : sale.views) + 1;
            return await this.model.findByIdAndUpdate(id, { views }, { new: true });
        };
    }
    async findAll(page, limit, query) {
        const findQuery = this.model.find({ quantity: { $gt: 0 } });
        if (query.search) {
            findQuery.populate({
                path: 'nft',
                match: {
                    name: { $regex: '.*' + query.search + '.*', $options: 'i' },
                },
            });
        }
        if (query.saleType) {
            const currentDate = new Date().getTime() / 1000;
            findQuery.find({
                saleType: parseInt(query.saleType),
                endTime: { $gt: currentDate },
            });
        }
        findQuery.sort({ updatedAt: -1 });
        if (!query.search) {
            findQuery.populate('nft');
        }
        let result = await findQuery.populate('seller').exec();
        result = result.filter((item) => item.nft !== null);
        const count = result.length;
        result = result.slice((page - 1) * limit, page * limit);
        return {
            items: result,
            paginate: {
                page: page,
                size: limit,
                count,
            },
        };
    }
    async searchSale(page, limit, query) {
        console.log('searchSale', query);
        const name = (query === null || query === void 0 ? void 0 : query.name) || '';
        const fileType = (query === null || query === void 0 ? void 0 : query.fileType) || '';
        const saleType = query === null || query === void 0 ? void 0 : query.saleType;
        const mathSaleType = saleType === 'ALL' || (0, utils_1.isEmpty)(saleType)
            ? { saleType: { $gte: 0 } }
            : { saleType: +saleType };
        const findQuery = this.model.aggregate([
            {
                $match: { quantity: { $gt: 0 } },
            },
            {
                $lookup: {
                    from: 'nfts',
                    localField: 'nft',
                    foreignField: '_id',
                    as: 'nft',
                },
            },
            {
                $unwind: '$nft',
            },
            {
                $project: {
                    id: '$nft._id',
                    name: '$nft.name',
                    supply: '$nft.supply',
                    image: '$nft.image',
                    tokenId: '$nft.tokenId',
                    collectionId: '$nft.collectionId',
                    quantity: '$quantity',
                    endTime: '$endTime',
                    unitPrice: '$unitPrice',
                    saleType: '$saleType',
                    seller: '$seller',
                    type: '$nft.fileType',
                    typeOrigin: '$nft.originType',
                    auctionId: '$auctionId',
                    nft: {
                        _id: '$nft._id',
                        name: '$nft.name',
                        supply: '$nft.supply',
                        image: '$nft.image',
                        tokenId: '$nft.tokenId',
                        collectionId: '$nft.collectionId',
                        creator: '$nft.creator',
                        fileType: '$nft.fileType',
                        originType: '$nft.originType',
                        media: '$nft.media',
                    },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'nft.creator',
                    foreignField: '_id',
                    as: 'creator',
                },
            },
            {
                $unwind: '$creator',
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'seller',
                    foreignField: '_id',
                    as: 'seller',
                },
            },
            {
                $unwind: '$seller',
            },
            {
                $match: {
                    $and: [
                        { name: { $regex: '.*' + name + '.*', $options: 'i' } },
                        { type: { $regex: '.*' + fileType + '.*', $options: 'i' } },
                        mathSaleType,
                    ],
                },
            },
        ]);
        const result = await findQuery.exec();
        return {
            items: result,
            paginate: {
                page: page,
                size: limit,
                count: result.length,
            },
        };
    }
    async findBySellerAndNft(sellerId, nftId) {
        return this.model.findOne({ seller: sellerId, nft: nftId });
    }
    async findByAuctionId(auctionId) {
        return this.model.findOne({ auctionId });
    }
    async putOnSale(payload, sellerId) {
        const ownership = await this.ownershipService.findByOwnerAndNft(sellerId, payload.nftId);
        if (!ownership || ownership.amount < payload.quantity) {
            throw new common_1.HttpException('Seller not have enough ownership of this NFT', common_1.HttpStatus.BAD_REQUEST);
        }
        const sale = await this.findBySellerAndNft(sellerId, payload.nftId);
        if (sale) {
            sale.quantity = payload.quantity;
            sale.unitPrice = payload.unitPrice;
            return sale.save();
        }
        return this.model.create({
            seller: sellerId,
            ownership,
            nft: payload.nftId,
            quantity: payload.quantity,
            unitPrice: payload.unitPrice,
            minBid: payload.minBid,
            endTime: payload.endTime,
            saleType: payload.saleType,
            chainId: payload.chainId,
        });
    }
    async takeDown(tokenAddress, tokenId, seller, chainId) {
        const nft = await this.nftService.findByToken(tokenAddress, tokenId, chainId);
        if (!nft) {
            this.logger.error(`NFT ${tokenAddress} ${tokenId} not found in database`);
            return;
        }
        const userSeller = await this.userService.findOrCreateByAddress(seller);
        const sale = await this.findBySellerAndNft(userSeller.id, nft.id);
        sale.quantity = 0;
        return sale.save();
    }
    async buy(saleId, buyerId, quantity) {
        const sale = await this.model.findById(saleId);
        if (!sale) {
            throw new common_1.HttpException('Sale not found', common_1.HttpStatus.NOT_FOUND);
        }
        console.log(quantity, 'quantity');
        if (sale.quantity < quantity) {
            throw new common_1.HttpException('Sale not have enough quantity', common_1.HttpStatus.BAD_REQUEST);
        }
        sale.quantity -= quantity;
        await sale.save();
        return sale;
    }
    getInSaleByUser(userId) {
        return this.model
            .find({ seller: userId, quantity: { $gt: 0 } })
            .populate('nft');
    }
    getInSaleNft(nftId) {
        return this.model
            .find({ nft: nftId, quantity: { $gt: 0 } })
            .populate('seller');
    }
    async onAuctionEnded(eventArgs, chainId) {
        const [_address, _id, _seller, _maxBidder, _maxBid, _amount, _success] = eventArgs;
        if (_success) {
            return this.onBought([_address, _id, _seller, _amount, _maxBid, _maxBidder], chainId);
        }
        else {
            return this.takeDown(_address, _id, _seller, chainId);
        }
    }
    async onItemUpdated(eventArgs, chainId) {
        const [_address, _id, _seller, _amount, _price, _type, _endTime] = eventArgs;
        this.logger.verbose(`Item updated: ${_address} ${_id} ${_seller} ${_amount} ${_price} ${_type} ${_endTime}`);
        const nft = await this.nftService.findByToken(_address, _id, chainId);
        if (!nft) {
            this.logger.error(`NFT ${_address} ${_id}, chain ${chainId} not found in database`);
            return;
        }
        const saleDto = {
            nftId: nft.id.toString(),
            quantity: +_amount,
            unitPrice: +_price / 1e18,
            minBid: +_price / 1e18,
            endTime: +_endTime,
            saleType: +_type,
            chainId: chainId,
        };
        const user = await this.userService.findOrCreateByAddress(_seller);
        return this.putOnSale(saleDto, user.id);
    }
    async onBought(eventArgs, chainId) {
        const [_address, _id, _seller, _amount, _price, _buyer] = eventArgs;
        this.logger.verbose(`Item bought: ${_address} ${_id} ${_seller} ${_amount} ${_price} ${_buyer}`);
        const nft = await this.nftService.findByToken(_address, _id, chainId);
        if (!nft) {
            this.logger.error(`NFT ${_address} ${_id}, ${chainId} not found in database`);
            return;
        }
        const userSeller = await this.userService.findOrCreateByAddress(_seller);
        const userBuyer = await this.userService.findOrCreateByAddress(_buyer);
        const sale = await this.findBySellerAndNft(userSeller.id, nft.id);
        await this.buy(sale.id, userBuyer.id, +_amount);
    }
    async getTopSeller() {
        const findQuery = this.model.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'seller',
                    pipeline: [
                        {
                            $match: {
                                verified: true,
                            },
                        },
                    ],
                    foreignField: '_id',
                    as: 'seller',
                },
            },
            {
                $unwind: '$seller',
            },
            {
                $group: {
                    _id: {
                        seller: '$seller',
                    },
                    total: { $count: {} },
                },
            },
            { $sort: { total: -1 } },
            { $limit: 15 },
        ]);
        const result = await findQuery.exec();
        console.log('rs', result);
        return result;
    }
    async getFeature() {
        return this.model.find({ feature: true }).populate('nft');
    }
    async findByCollection(id) {
        const coll = await this.collectionService.findOne(id);
        const findQuery = this.model.aggregate([
            {
                $match: {
                    quantity: { $gt: 0 },
                },
            },
            {
                $lookup: {
                    from: 'nfts',
                    localField: 'nft',
                    foreignField: '_id',
                    as: 'nft',
                },
            },
            {
                $unwind: '$nft',
            },
            {
                $match: {
                    'nft.collectionId': coll._id,
                },
            },
        ]);
        return await findQuery.exec();
    }
    async putOnSaleLazy(payload) {
        const nft = await this.nftService.createLazyNFT(payload.tokenAddress, payload.chainId, payload.signature, payload, payload.standard);
        const ownership = await this.ownershipService.findByOwnerAndNft(nft.creator, nft._id);
        const sale = await this.findBySellerAndNft(nft.creator, nft._id);
        if (sale) {
            sale.quantity = payload.supply;
            sale.unitPrice = payload.price;
            return sale.save();
        }
        return this.model.create({
            seller: nft.creator,
            ownership,
            nft: nft._id,
            quantity: payload.supply,
            unitPrice: payload.price,
            minBid: payload.price,
            endTime: payload.endTime,
            saleType: payload.saleType,
            chainId: payload.chainId,
            auctionId: payload.auctionId,
        });
    }
    async takeDownLazy(id) {
        const sale = await this.model.findById(id).populate('nft');
        if (!sale) {
            throw new common_1.HttpException(`Sale ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        const nft = sale.nft;
        if (!nft || !nft.isLazy) {
            throw new common_1.HttpException(`NFT ${nft.id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        const ownership = await this.ownershipService.findByOwnerAndNft(nft.creator, nft.id);
        await this.model.deleteOne({ _id: id });
        await this.nftService.deleteNft(nft.id);
        await this.ownershipService.deleteOwnership(ownership.id);
        return sale;
    }
    async onLazyAucitonEnded(eventArgs, chainId) {
        const [_address, _auctionId, _seller, _maxBidder, _maxBid, _amount, _success, _tokenId,] = eventArgs;
        const sale = await this.findByAuctionId(_auctionId);
        const bidder = await this.userService.findOrCreateByAddress(_maxBidder);
        if (_success) {
            await this.buy(sale.id, bidder.id, +_amount);
        }
        else {
            await this.takeDownLazy(sale.id);
        }
    }
};
SaleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(sale_schema_1.Sale)),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => nft_service_1.NftService))),
    __metadata("design:paramtypes", [Object, ownership_service_1.OwnershipService,
        config_1.ConfigService,
        user_service_1.UserService,
        event_service_1.EventService,
        nft_service_1.NftService,
        collection_service_1.CollectionService])
], SaleService);
exports.SaleService = SaleService;
//# sourceMappingURL=sale.service.js.map