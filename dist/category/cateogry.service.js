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
exports.CateogryService = void 0;
const common_1 = require("@nestjs/common");
const category_schema_1 = require("./schemas/category.schema");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let CateogryService = class CateogryService {
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
    async findOne(id) {
        return await this.model.findById(id).exec();
    }
    async create(category) {
        return this.model.create(category);
    }
    async remove(id) {
        return this.model.findByIdAndRemove(id);
    }
    async update(id, payload) {
        return this.model.findByIdAndUpdate(id, payload, { new: true });
    }
};
CateogryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(category_schema_1.NFT)),
    __metadata("design:paramtypes", [Object])
], CateogryService);
exports.CateogryService = CateogryService;
//# sourceMappingURL=cateogry.service.js.map