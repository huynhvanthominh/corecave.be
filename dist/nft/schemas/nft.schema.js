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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFT = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
const collection_schema_1 = require("../../collection/schemas/collection.schema");
const user_schema_1 = require("../../user/schemas/user.schema");
const base_model_1 = require("../../global/base.model");
const nftStandard_enum_1 = require("../interfaces/nftStandard.enum");
class NFT extends base_model_1.BaseModel {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], NFT.prototype, "tokenId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], NFT.prototype, "tokenAddress", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], NFT.prototype, "chainId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], NFT.prototype, "supply", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, class_validator_1.Length)(0, 50),
    __metadata("design:type", String)
], NFT.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, class_validator_1.Length)(0, 1000),
    __metadata("design:type", String)
], NFT.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: true }),
    __metadata("design:type", Boolean)
], NFT.prototype, "activated", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], NFT.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], NFT.prototype, "royalty", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_schema_1.User, required: true }),
    __metadata("design:type", Object)
], NFT.prototype, "creator", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => collection_schema_1.Collection, required: true }),
    __metadata("design:type", Object)
], NFT.prototype, "collectionId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], NFT.prototype, "uri", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], NFT.prototype, "mintedAt", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], NFT.prototype, "media", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'image' }),
    __metadata("design:type", String)
], NFT.prototype, "fileType", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], NFT.prototype, "originType", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], NFT.prototype, "isLazy", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], NFT.prototype, "signature", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], NFT.prototype, "followers", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: nftStandard_enum_1.NftStandardEnum.ERC1155 }),
    __metadata("design:type", String)
], NFT.prototype, "standard", void 0);
exports.NFT = NFT;
//# sourceMappingURL=nft.schema.js.map