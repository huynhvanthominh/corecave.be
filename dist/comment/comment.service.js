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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const comment_schema_1 = require("./schema/comment.schema");
let CommentService = class CommentService {
    constructor(model) {
        this.model = model;
        this.getByNft = async (nftId, query) => {
            const size = query.size ? query.size * 1 : 10;
            const page = query.page ? query.page * 1 : 1;
            const sortBy = query.sortBy ? query.sortBy : "createAt";
            let sortType = -1;
            if (query.sortType && (query.sortType === "asc" || parseInt(query.sortType) == 1)) {
                sortType = 1;
            }
            const findQuery = this.model.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user'
                    }
                }, {
                    $unwind: "$user"
                },
                {
                    $lookup: {
                        from: 'nfts',
                        localField: 'nft',
                        pipeline: [
                            {
                                $addFields: {
                                    id: { $toString: "$_id" }
                                }
                            },
                            {
                                $match: {
                                    id: nftId
                                }
                            }
                        ],
                        foreignField: '_id',
                        as: 'nft'
                    }
                },
                {
                    $unwind: "$nft"
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                }
            ]);
            const all = (await findQuery.exec());
            const count = all.length;
            const result = await findQuery.skip((page - 1) * size).limit(size).exec();
            return {
                items: result,
                paginate: {
                    page,
                    size,
                    count,
                    all
                }
            };
        };
        this.create = async (comment) => await this.model.create(comment);
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(comment_schema_1.Comment)),
    __metadata("design:paramtypes", [Object])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map