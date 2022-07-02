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
exports.NftController = void 0;
const common_1 = require("@nestjs/common");
const parseId_pipe_1 = require("../global/pipes/parseId.pipe");
const nft_service_1 = require("./nft.service");
const queryNFT_dto_1 = require("./dtos/queryNFT.dto");
const swagger_1 = require("@nestjs/swagger");
const sale_service_1 = require("./sale.service");
const getRandomMeta_dto_1 = require("./dtos/getRandomMeta.dto");
const metadata_service_1 = require("./metadata.service");
const bid_service_1 = require("./bid.service");
const createByTransaction_dto_1 = require("./dtos/createByTransaction.dto");
const importNFT_dto_1 = require("./dtos/importNFT.dto");
const crawl_service_1 = require("./crawl.service");
const createLazyNFT_dto_1 = require("./dtos/createLazyNFT.dto");
let NftController = class NftController {
    constructor(service, saleService, metaService, bidService, crawlService) {
        this.service = service;
        this.saleService = saleService;
        this.metaService = metaService;
        this.bidService = bidService;
        this.crawlService = crawlService;
    }
    async randomMeta(body) {
        return await this.metaService.getRandomMetadata(body.total);
    }
    async crawlTransaction(body) {
        return await this.crawlService.crawlTransaction(+body.chainId, body.transactionHash, body.address, body.standard);
    }
    async getSaleSearch(page = 1, limit = 10, query) {
        return await this.saleService.searchSale(page, limit, query);
    }
    async updateSaleNFT(id, saleNFT) {
        return await this.saleService.update(id, saleNFT);
    }
    async increaseView(body) {
        return this.saleService.increaseView(body);
    }
    async findSalesById(id) {
        return this.saleService.findOne(id);
    }
    async getSales(page = 1, limit = 10, query) {
        return await this.saleService.findAll(page, limit, query);
    }
    async follow(id, userId) {
        return this.service.follow(id, userId);
    }
    async index(query) {
        return await this.service.findAll(query);
    }
    async getTopSeller() {
        return await this.saleService.getTopSeller();
    }
    async getFeature() {
        return await this.saleService.getFeature();
    }
    async findCollectionNftSale(id) {
        return await this.saleService.findByCollection(id);
    }
    async findCollection(id) {
        return await this.service.findByCollection(id);
    }
    async getBidsOfSale(id) {
        return this.bidService.findBySale(id);
    }
    async refreshUri(id) {
        return this.service.refreshUri(id);
    }
    async find(id) {
        return await this.service.findOne(id);
    }
    async importNft(body) {
        return this.service.importNft(body.ownerAddress, body.tokenAddress, body.tokenId, body.chainId, body.standard);
    }
    async putOnSaleLazy(body) {
        return this.saleService.putOnSaleLazy(body);
    }
    async takeDownLazy(id) {
        return this.saleService.takeDownLazy(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get random metadata to mint' }),
    (0, common_1.Post)('metadata'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getRandomMeta_dto_1.GetRandomMetaDTO]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "randomMeta", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crawl transaction' }),
    (0, common_1.Post)('crawl'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createByTransaction_dto_1.CreateByTransactionDto]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "crawlTransaction", null);
__decorate([
    (0, common_1.Get)('sales/search'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "getSaleSearch", null);
__decorate([
    (0, common_1.Patch)('sales/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "updateSaleNFT", null);
__decorate([
    (0, common_1.Post)('/sales/increase-view/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "increaseView", null);
__decorate([
    (0, common_1.Get)('sales/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "findSalesById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get NFTs on sale' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, common_1.Get)('sales'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "getSales", null);
__decorate([
    (0, common_1.Get)('followers/:id/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "follow", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [queryNFT_dto_1.QueryNFTDto]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "index", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Top seller' }),
    (0, common_1.Get)('topseller'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NftController.prototype, "getTopSeller", null);
__decorate([
    (0, common_1.Get)('feature'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NftController.prototype, "getFeature", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get NFT Sale by Collection' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Get)('collection/sale/:id'),
    __param(0, (0, common_1.Param)('id', parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "findCollectionNftSale", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get NFT by Collection' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Get)('collection/:id'),
    __param(0, (0, common_1.Param)('id', parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "findCollection", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get bids of sale' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Get)('sales/:id/bids'),
    __param(0, (0, common_1.Param)('id', new parseId_pipe_1.ParseIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "getBidsOfSale", null);
__decorate([
    (0, common_1.Get)(':id/refresh'),
    __param(0, (0, common_1.Param)('id', parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "refreshUri", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get NFT' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "find", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Import NFT' }),
    (0, common_1.Post)('import'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [importNFT_dto_1.ImportNFTDto]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "importNft", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Put on sale Lazy' }),
    (0, common_1.Post)('lazy'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createLazyNFT_dto_1.CreateLazyNFTDto]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "putOnSaleLazy", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Take down Lazy' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Delete)('lazy/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "takeDownLazy", null);
NftController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('NFT'),
    (0, common_1.Controller)('nfts'),
    __metadata("design:paramtypes", [nft_service_1.NftService,
        sale_service_1.SaleService,
        metadata_service_1.MetadataService,
        bid_service_1.BidService,
        crawl_service_1.CrawlService])
], NftController);
exports.NftController = NftController;
//# sourceMappingURL=nft.controller.js.map