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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const event_schema_1 = require("./schemas/event.schema");
const ethers_1 = require("ethers");
let EventService = class EventService {
    constructor(model) {
        this.model = model;
    }
    async findAll(query) {
        const findQuery = this.model.find();
        if (query.search) {
            findQuery.or([
                { description: { $regex: '.*' + query.search + '.*', $options: 'i' } },
                { title: { $regex: '.*' + query.search + '.*', $options: 'i' } },
            ]);
        }
        const count = await this.model.find().merge(findQuery).countDocuments();
        findQuery
            .sort({ [query.sortBy]: query.sortType })
            .skip(query.page * query.size)
            .limit(query.size);
        return {
            items: await findQuery.exec(),
            paginate: {
                page: query.page,
                size: query.size,
                count,
            },
        };
    }
    async findOne(id) {
        return await this.model.findById(id).populate('nft').exec();
    }
    async findByTransactionHash(transactionHash, eventName, chainId, index) {
        return await this.model
            .findOne({ transactionHash, name: eventName, index, chainId })
            .exec();
    }
    decodeArgs(arg) {
        const argObject = Object.assign({}, arg);
        Object.keys(argObject).forEach((key) => {
            if (argObject[key] instanceof ethers_1.BigNumber) {
                argObject[key] = argObject[key].toString();
            }
        });
        return argObject;
    }
    async create(event, chainId, txHash) {
        return this.model.create(Object.assign(Object.assign({ address: event.address }, event), { args: this.decodeArgs(event.args), transactionHash: txHash, confirmed: false, chainId }));
    }
    async findOrCreate(log, txHash, chainId) {
        const event = await this.findByTransactionHash(txHash, log.name, chainId, log.index);
        if (event) {
            return event;
        }
        return this.create(log, chainId, txHash);
    }
    async confirm(transactionHash, name, chainId, index) {
        return this.model.findOneAndUpdate({ transactionHash, name, chainId, index }, { confirmed: true }, { new: true });
    }
    async remove(id) {
        return this.model.findByIdAndRemove(id);
    }
    async activity(page, limit, query) {
        const typeFilter = query.typeFilter;
        let matchTypeFilter;
        switch (typeFilter) {
            case "Bids":
                matchTypeFilter = {
                    name: "Bidded"
                };
                break;
            case "":
                break;
            case "":
                break;
            case "":
                break;
            case "":
                break;
        }
        console.log(matchTypeFilter);
        let tmp = [
            {
                $match: {
                    name: { $ne: 'TransferSingle' }
                }
            },
            {
                $lookup: {
                    from: 'nfts',
                    let: { address: { $toLower: "$args._address" }, chainId: "$chainId", tokenId: { $toInt: "$args._id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$tokenAddress", "$$address"] },
                                        { $eq: ["$chainId", "$$chainId"] },
                                        { $eq: ["$tokenId", "$$tokenId"] }
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'nft'
                }
            },
            {
                $unwind: "$nft"
            },
            {
                $lookup: {
                    from: "users",
                    let: { seller: { $toLower: "$args._seller" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: [{ $toLower: "$address" }, "$$seller"] },
                                    ]
                                }
                            }
                        },
                    ],
                    as: "seller"
                }
            },
            {
                $lookup: {
                    from: "sales",
                    localField: 'nft._id',
                    foreignField: 'nft',
                    as: "sale"
                }
            },
            {
                $unwind: "$sale"
            },
            {
                $lookup: {
                    from: 'collections',
                    localField: 'nft.collectionId',
                    foreignField: '_id',
                    as: 'collection'
                }
            },
            {
                $unwind: "$collection"
            },
            {
                $sort: { createdAt: -1 }
            }
        ];
        const findQuery = this.model.aggregate(tmp);
        const count = (await findQuery.exec()).length;
        const all = await findQuery.exec();
        const result = all.slice(0, page * limit);
        return {
            items: result,
            paginate: {
                page: page,
                size: limit,
                count,
                all
            },
        };
    }
    async rankingByUser(query) {
        const page = query.page ? query.page * 1 : 1;
        const limit = query.limit ? query.limit * 1 : 10;
        const time = query.time ? query.time * 1 : 7;
        const date = new Date();
        if (time === 0) {
            date.setDate(date.getDate() - 100000);
        }
        else {
            date.setDate(date.getDate() - time);
        }
        const findQuery = this.model.aggregate([
            {
                $match: { name: { $eq: 'Bought' }, createdAt: { $gte: date } }
            },
            {
                $lookup: {
                    from: 'nfts',
                    let: { address: { $toLower: "$args._address" }, chainId: "$chainId", tokenId: { $toInt: "$args._id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$tokenAddress", "$$address"] },
                                        { $eq: ["$chainId", "$$chainId"] },
                                        { $eq: ["$tokenId", "$$tokenId"] }
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'nft'
                }
            },
            {
                $unwind: "$nft"
            },
            {
                $lookup: {
                    from: 'users',
                    let: { buyer: { $toUpper: "$args._buyer" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$address", "$$buyer"] },
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'user'
                }
            },
            {
                $unwind: "$user"
            },
            {
                $group: {
                    _id: { user: '$user' },
                    sold: { $sum: { $toInt: "$args._amount" } },
                    total: { $sum: { $toDouble: "$args._price" } }
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);
        const all = await findQuery.exec();
        const count = all.length;
        const result = await findQuery.skip((page - 1) * limit).limit(limit).exec();
        return {
            items: result,
            paginate: {
                page: page,
                size: limit,
                count,
                all
            },
        };
    }
    async rankings(page, limit, time) {
        console.log('time', time);
        const date = new Date();
        if (time.time === 0) {
            date.setDate(date.getDate() - 100000);
        }
        else {
            date.setDate(date.getDate() - time.time);
        }
        const query = this.model.aggregate([
            {
                $match: { name: { $eq: 'Bought' }, createdAt: { $gte: date } }
            },
            {
                $lookup: {
                    from: 'nfts',
                    let: { address: { $toLower: "$args._address" }, chainId: "$chainId", tokenId: { $toInt: "$args._id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$tokenAddress", "$$address"] },
                                        { $eq: ["$chainId", "$$chainId"] },
                                        { $eq: ["$tokenId", "$$tokenId"] }
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'nft'
                }
            },
            {
                $unwind: "$nft"
            },
            {
                $lookup: {
                    from: 'collections',
                    localField: 'nft.collectionId',
                    foreignField: '_id',
                    as: 'collection'
                }
            },
            {
                $unwind: "$collection"
            },
            {
                $group: {
                    _id: { collection: '$collection' },
                    sold: { $sum: { $toInt: "$args._amount" } },
                    total: { $sum: { $toDouble: "$args._price" } }
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);
        return {
            items: await query,
            paginate: {
                page: page,
                size: limit
            },
        };
    }
};
EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(event_schema_1.Event)),
    __metadata("design:paramtypes", [Object])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map