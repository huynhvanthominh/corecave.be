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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcrypt");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const crypto = require("crypto");
const ethers_1 = require("ethers");
const userStatus_enum_1 = require("./interfaces/userStatus.enum");
const uuid_1 = require("uuid");
const userRole_enum_1 = require("./interfaces/userRole.enum");
const saleType_enum_1 = require("../nft/interfaces/saleType.enum");
let UserService = class UserService {
    constructor(model) {
        this.model = model;
    }
    async findAll(query) {
        const page = query.page ? query.page * 1 : 1;
        const size = query.size ? query.size * 1 : 10;
        const sortBy = query.sortBy;
        const sortType = query.sortType === "desc" ? -1 : 1;
        console.log("Query", query);
        let tmp = [];
        tmp = await [...tmp,
            {
                $match: {
                    password: null
                }
            },
            {
                $lookup: {
                    from: "sales",
                    localField: '_id',
                    foreignField: 'seller',
                    as: "sale"
                }
            },
            {
                $lookup: {
                    from: "sales",
                    localField: '_id',
                    pipeline: [
                        {
                            $match: {
                                saleType: saleType_enum_1.SaleType.AUCTION
                            }
                        }
                    ],
                    foreignField: 'seller',
                    as: "auction"
                }
            },
            {
                $lookup: {
                    from: "nfts",
                    localField: '_id',
                    foreignField: 'creator',
                    as: "nft"
                }
            },
            {
                $lookup: {
                    from: "collections",
                    localField: '_id',
                    foreignField: 'creator',
                    as: "collection"
                }
            },
            {
                $lookup: {
                    from: 'events',
                    let: { address: "$address" },
                    pipeline: [
                        {
                            $addFields: {
                                buyer: { $toUpper: "$args._buyer" }
                            }
                        },
                        {
                            $match: {
                                name: "Bought",
                                $expr: {
                                    $and: [
                                        { $eq: ["$buyer", "$$address"] },
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'event'
                }
            },
            {
                $addFields: {
                    lengthEvent: { $cond: { if: { $isArray: "$event" }, then: { $size: "$event" }, else: 0 } },
                    lengthSale: { $cond: { if: { $isArray: "$sale" }, then: { $size: "$sale" }, else: 0 } },
                    lengthNft: { $cond: { if: { $isArray: "$nft" }, then: { $size: "$nft" }, else: 0 } },
                    lengthAuction: { $cond: { if: { $isArray: "$auction" }, then: { $size: "$auction" }, else: 0 } },
                    lengthCollection: { $cond: { if: { $isArray: "$collection" }, then: { $size: "$collection" }, else: 0 } },
                    feature: { $ifNull: ['$feature', false] }
                }
            }
        ];
        if (query.feature) {
            tmp = await [...tmp, {
                    $match: {
                        feature: true
                    }
                }];
        }
        if (query.search) {
            tmp = await [...tmp, {
                    $match: {
                        username: { $regex: '.*' + (query.search || "") + '.*', $options: 'i' }
                    }
                }];
        }
        if (query.status) {
            tmp = await [...tmp, {
                    $match: {
                        status: query.status
                    }
                }];
        }
        tmp = await [...tmp, {
                $sort: {
                    lengthEvent: -1,
                    lengthSale: -1,
                    lengthAuction: -1,
                    lengthNft: -1
                }
            }];
        const findQuery = this.model.aggregate(tmp);
        const count = (await findQuery.exec()).length;
        const result = await findQuery.skip((page - 1) * size).limit(size).exec();
        return {
            items: result,
            paginate: {
                page,
                size,
                count,
            },
        };
    }
    async findOne(id) {
        return await this.model.findById(id, { password: 0 }).exec();
    }
    async findOneById(id) {
        return await this.model.findById(id, { password: 0 }).exec();
    }
    async findOwner(id) {
        return await this.model.findById(id, { password: 0 }).exec();
    }
    async findOneByEmail(email) {
        return await this.model.findOne({ email: email }, { password: 0 }).exec();
    }
    async findOneByUsername(username) {
        return await this.model.findOne({ username }).exec();
    }
    async create(registerUser) {
        const user = await this.model.findOne({ username: registerUser.username });
        if (user)
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        const newUser = new this.model(registerUser);
        newUser.password = await bcrypt.hash(registerUser.password, 10);
        const created = await newUser.save();
        return this.findOne(created.id);
    }
    async remove(id) {
        return this.model.findByIdAndRemove(id);
    }
    async update(id, payload) {
        if (payload.password) {
            payload.password = await bcrypt.hash(payload.password, 10);
        }
        if (payload.address) {
            payload.address = payload.address.toUpperCase();
        }
        await this.model.findByIdAndUpdate(id, payload, { new: true });
        return this.findOne(id);
    }
    async createOrUpdate(payload) {
        if (!payload.address)
            throw new common_1.HttpException('address is undefined', common_1.HttpStatus.BAD_REQUEST);
        payload.address = payload.address.toUpperCase();
        const user = await this.model.findOne({
            address: payload === null || payload === void 0 ? void 0 : payload.address,
        });
        if (user) {
            console.log('in update', user._id, payload);
            return this.update(user._id, payload);
        }
        const newUser = new this.model(payload);
        const created = await newUser.save();
        return this.findOne(created.id);
    }
    async findOrCreateByAddress(address) {
        let sender = await this.findByAddress(address);
        if (!sender) {
            sender = await this.createByAddress(address);
        }
        return sender;
    }
    async findByAddress(address) {
        return this.model.findOne({
            address: address.toUpperCase(),
        });
    }
    async createByAddress(address) {
        return this.model.create({
            address: address.toUpperCase(),
            username: address,
            password: Date.now().toString(),
            email: '',
            title: 'admin',
            status: userStatus_enum_1.UserStatusEnum.ACTIVE,
            avatar: '',
            cover: '',
            role: userRole_enum_1.UserRoleEnum.USER,
            isCreator: false,
        });
    }
    async follow(subjectId, objectId) {
        const subject = await this.findOne(subjectId);
        const object = await this.findOne(objectId);
        if (!subject.followeds.includes(object._id)) {
            subject.followeds.push(object);
            await subject.save();
        }
        if (!object.followers.includes(subject._id)) {
            object.followers.push(subject);
            await object.save();
        }
        return subject;
    }
    async unFollow(subjectId, objectId) {
        const subject = await this.findOne(subjectId);
        const object = await this.findOne(objectId);
        if (subject.followeds.includes(object._id)) {
            subject.followeds = subject.followeds.filter((item) => !object._id.equals(item));
            console.log(subject.followeds, object._id);
            await subject.save();
        }
        if (object.followers.includes(subject._id)) {
            object.followers = object.followers.filter((item) => !subject._id.equals(item));
            await object.save();
        }
        return subject;
    }
    async generateOnceFromAddress(address) {
        const user = await this.findByAddress(address);
        if (user) {
            let nonce = crypto.randomBytes(16).toString('base64');
            nonce = ethers_1.ethers.utils.formatBytes32String(nonce);
            user.nonce = nonce;
            await user.save();
            return nonce;
        }
        let nonce = crypto.randomBytes(16).toString('base64');
        nonce = ethers_1.ethers.utils.formatBytes32String(nonce);
        const newUser = new this.model({
            address: address.toUpperCase(),
            username: (0, uuid_1.v4)(),
            title: 'Unnamed',
            status: userStatus_enum_1.UserStatusEnum.ACTIVE,
            nonce,
        });
        await newUser.save();
        return nonce;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_schema_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map