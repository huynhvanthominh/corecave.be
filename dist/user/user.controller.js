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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const query_user_dto_1 = require("./dtos/query-user.dto");
const update_user_dto_1 = require("./dtos/update-user.dto");
const parseId_pipe_1 = require("../global/pipes/parseId.pipe");
const listNft_dto_1 = require("./dtos/listNft.dto");
const swagger_1 = require("@nestjs/swagger");
const nft_service_1 = require("../nft/nft.service");
let UserController = class UserController {
    constructor(service, nftService) {
        this.service = service;
        this.nftService = nftService;
    }
    async index(query) {
        return await this.service.findAll(query);
    }
    async getNfts(id, query) {
        return await this.nftService.findByUser(id, query.type);
    }
    async find(id) {
        return await this.service.findOne(id);
    }
    async remove(id) {
        return await this.service.remove(id);
    }
    async follow(a, b) {
        return await this.service.follow(a, b);
    }
    async unFollow(a, b) {
        return await this.service.unFollow(a, b);
    }
    async update(id, payload) {
        return await this.service.update(id, payload);
    }
    async createOrUpdate(payload) {
        return await this.service.createOrUpdate(payload);
    }
    async findByAddress(address) {
        return await this.service.findByAddress(address);
    }
    async getNonce(payload) {
        return await this.service.generateOnceFromAddress(payload.address);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_user_dto_1.QueryUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/:id/nfts'),
    (0, swagger_1.ApiOperation)({ summary: 'list nft' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
    }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    __param(0, (0, common_1.Param)('id', parseId_pipe_1.ParseIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, listNft_dto_1.ListNftDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getNfts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'get profile by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
    }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    __param(0, (0, common_1.Param)('id', parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "find", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':a/follow/:b'),
    __param(0, (0, common_1.Param)('a', parseId_pipe_1.ParseIdPipe)),
    __param(1, (0, common_1.Param)('b', parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "follow", null);
__decorate([
    (0, common_1.Patch)(':a/unfollow/:b'),
    __param(0, (0, common_1.Param)('a', parseId_pipe_1.ParseIdPipe)),
    __param(1, (0, common_1.Param)('b', parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unFollow", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', parseId_pipe_1.ParseIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createOrUpdate", null);
__decorate([
    (0, common_1.Get)('/address/:address'),
    __param(0, (0, common_1.Param)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByAddress", null);
__decorate([
    (0, common_1.Post)('/nonce'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getNonce", null);
UserController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('USER'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        nft_service_1.NftService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map