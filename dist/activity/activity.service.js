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
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const activity_schema_1 = require("./schemas/activity.schema");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_service_1 = require("../user/user.service");
let ActivityService = class ActivityService {
    constructor(model, userService) {
        this.model = model;
        this.userService = userService;
    }
    async findAll(query) {
        const findQuery = this.model.find();
        if (query.search) {
            findQuery.or([
                { description: { $regex: '.*' + query.search + '.*', $options: 'i' } },
                { title: { $regex: '.*' + query.search + '.*', $options: 'i' } },
            ]);
        }
        if ('activated' in query) {
            findQuery.where({ activated: query.activated });
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
    async rank(query) {
        const timeRange = query.time * 24 * 60 * 60;
        const currentTime = Math.floor((new Date().getTime()) / 1000);
        const findQuery = this.model.aggregate([
            { $match: {
                    time: { $gte: currentTime - timeRange },
                    type: 2
                } },
            { $group: {
                    _id: { id: '$collection_id', name: "$collection_name", image: "collection_image" },
                    total: { $sum: '$price' }
                } },
            {
                $sort: {
                    total: -1
                }
            }
        ]);
        return await findQuery.exec();
    }
    async findOne(id) {
        return await this.model.findById(id).exec();
    }
    async create(activity) {
        const date = Math.floor((new Date().getTime()) / 1000);
        return this.model.create(Object.assign(Object.assign({}, activity), { time: date }));
    }
    async remove(id) {
        return this.model.findByIdAndRemove(id);
    }
    async update(id, payload) {
        return this.model.findByIdAndUpdate(id, payload, { new: true });
    }
};
ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(activity_schema_1.Activity)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService])
], ActivityService);
exports.ActivityService = ActivityService;
//# sourceMappingURL=activity.service.js.map