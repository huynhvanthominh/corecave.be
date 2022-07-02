"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const nft_service_1 = require("./nft.service");
const nft_controller_1 = require("./nft.controller");
const nft_schema_1 = require("./schemas/nft.schema");
const helper_module_1 = require("../helper/helper.module");
const ownership_service_1 = require("./ownership.service");
const ownership_schema_1 = require("./schemas/ownership.schema");
const sale_schema_1 = require("./schemas/sale.schema");
const sale_service_1 = require("./sale.service");
const meta_schema_1 = require("./schemas/meta.schema");
const metadata_service_1 = require("./metadata.service");
const event_module_1 = require("../event/event.module");
const bid_schema_1 = require("./schemas/bid.schema");
const bid_service_1 = require("./bid.service");
const collection_module_1 = require("../collection/collection.module");
const user_module_1 = require("../user/user.module");
const contract_service_1 = require("./contracts/contract.service");
const crawl_service_1 = require("./crawl.service");
const collection_schema_1 = require("../collection/schemas/collection.schema");
const collection_service_1 = require("../collection/collection.service");
let NftModule = class NftModule {
};
NftModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                nft_schema_1.NFT,
                ownership_schema_1.Ownership,
                sale_schema_1.Sale,
                meta_schema_1.Metadata,
                bid_schema_1.Bid,
                collection_schema_1.Collection,
            ]),
            helper_module_1.HelperModule,
            event_module_1.EventModule,
            collection_module_1.CollectionModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        controllers: [nft_controller_1.NftController],
        providers: [
            nft_service_1.NftService,
            ownership_service_1.OwnershipService,
            sale_service_1.SaleService,
            metadata_service_1.MetadataService,
            bid_service_1.BidService,
            contract_service_1.ContractService,
            crawl_service_1.CrawlService,
            collection_service_1.CollectionService,
        ],
        exports: [nft_service_1.NftService, ownership_service_1.OwnershipService, contract_service_1.ContractService],
    })
], NftModule);
exports.NftModule = NftModule;
//# sourceMappingURL=nft.module.js.map