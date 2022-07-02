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
exports.CollectionController = void 0;
const common_1 = require("@nestjs/common");
const collection_service_1 = require("./collection.service");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const queryCollection_dto_1 = require("./dtos/queryCollection.dto");
const updateCollection_dto_1 = require("./dtos/updateCollection.dto");
const parseId_pipe_1 = require("../global/pipes/parseId.pipe");
const createCollection_dto_1 = require("./dtos/createCollection.dto");
const swagger_1 = require("@nestjs/swagger");
const queryNFT_dto_1 = require("../nft/dtos/queryNFT.dto");
let CollectionController = class CollectionController {
    constructor(service) {
        this.service = service;
    }
    async index(query) {
        return await this.service.findAll(query);
    }
    async conlectionBySales() {
        return await this.service.findCollectionSales();
    }
    async find(id) {
        return await this.service.findOne(id);
    }
    async findByCreator(id, chainId) {
        return await this.service.findByCreator(id, chainId);
    }
    async remove(id) {
        return await this.service.remove(id);
    }
    async create(payload, user) {
        return await this.service.create(payload, user.id);
    }
    async update(id, payload) {
        return await this.service.update(id, payload);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [queryCollection_dto_1.QueryCollectionDto]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('sales'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "conlectionBySales", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "find", null);
__decorate([
    (0, common_1.Get)('creator/:id/:chainId'),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    __param(0, (0, common_1.Param)('id', parseId_pipe_1.ParseIdPipe)),
    __param(1, (0, common_1.Param)('chainId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "findByCreator", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_decorator_1.Auth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCollection_dto_1.CreateCollectionDto, Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update collection' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    __param(0, (0, common_1.Param)('id', parseId_pipe_1.ParseIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateCollection_dto_1.UpdateCollectionDto]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "update", null);
CollectionController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Collection'),
    (0, common_1.Controller)('collections'),
    __metadata("design:paramtypes", [collection_service_1.CollectionService])
], CollectionController);
exports.CollectionController = CollectionController;
//# sourceMappingURL=collection.controller.js.map