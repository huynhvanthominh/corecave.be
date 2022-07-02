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
exports.CollectionService = void 0;
const common_1 = require("@nestjs/common");
const collection_schema_1 = require("./schemas/collection.schema");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const paginate_interface_1 = require("../global/interfaces/paginate.interface");
const config_1 = require("@nestjs/config");
const contract_service_1 = require("../nft/contracts/contract.service");
const queryNFT_dto_1 = require("../nft/dtos/queryNFT.dto");
let CollectionService = class CollectionService {
    constructor(model, configService, contractService) {
        this.model = model;
        this.configService = configService;
        this.contractService = contractService;
    }
    async findAll(query) {
        const findQuery = this.model.find();
        if (query.search) {
            findQuery.or([
                { name: { $regex: '.*' + query.search + '.*', $options: 'i' } },
            ]);
        }
        if ('status' in query) {
            findQuery.where({ [query.status]: true });
        }
        if ('activated' in query) {
            findQuery.where({ activated: query.activated });
        }
        const count = await this.model.find().merge(findQuery).countDocuments();
        findQuery
            .sort({ [query.sortBy]: query.sortType })
            .skip((query.page - 1) * query.size)
            .limit(query.size);
        const result = await findQuery.populate('creator').exec();
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
        return await this.model.findById(id).exec();
    }
    async findOrCreateByAddress(address, chainId, standard) {
        let collection = await this.findByAddress(address, chainId);
        if (!collection) {
            collection = await this.createByAddress(address, chainId, standard);
        }
        return collection;
    }
    async findByAddress(address, chainId) {
        return this.model.findOne({
            address: address.toLowerCase(),
            chainId,
        });
    }
    async create(collection, userId) {
        return this.model.create(Object.assign(Object.assign({}, collection), { address: collection.address.toLowerCase(), creator: userId }));
    }
    async createByAddress(address, chainId, standard) {
        const contract = this.contractService.getCollectionContract(chainId, address, standard);
        let [name, symbol, owner] = ['', '', ''];
        try {
            name = await contract.name();
            symbol = await contract.symbol();
            owner = await contract.owner();
        }
        catch (e) {
            console.log('Error', e);
        }
        return this.model.create({
            owner,
            name,
            symbol,
            address: address.toLowerCase(),
            chainId: chainId,
            standard,
        });
    }
    async remove(id) {
        return this.model.findByIdAndRemove(id);
    }
    async update(id, payload) {
        return this.model.findByIdAndUpdate(id, payload, { new: true });
    }
    async findByCreator(creatorId, chainId) {
        return this.model.find({
            $or: [{ creator: creatorId }, { public: true }],
            chainId,
        });
    }
    async findCollectionSales() {
        const findQuery = await this.model.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'creator',
                    foreignField: '_id',
                    as: 'creator',
                },
            },
            {
                $unwind: '$creator'
            },
            {
                $lookup: {
                    from: "sales",
                    localField: "creator._id",
                    foreignField: "seller",
                    as: "sales",
                }
            },
            {
                $lookup: {
                    from: "nfts",
                    localField: "address",
                    foreignField: "tokenAddress",
                    as: "nfts",
                }
            },
            {
                $addFields: {
                    "lengthNfts": { $size: "$nfts" }
                }
            },
            {
                $match: {
                    "lengthNfts": {
                        $gt: 3
                    }
                }
            }
        ]);
        return findQuery;
    }
};
CollectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(collection_schema_1.Collection)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService,
        contract_service_1.ContractService])
], CollectionService);
exports.CollectionService = CollectionService;
//# sourceMappingURL=collection.service.js.map