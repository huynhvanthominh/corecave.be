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
exports.Collection = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const base_model_1 = require("../../global/base.model");
const user_schema_1 = require("../../user/schemas/user.schema");
const nftStandard_enum_1 = require("../../nft/interfaces/nftStandard.enum");
class Collection extends base_model_1.BaseModel {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Collection.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Collection.prototype, "symbol", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Collection.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Collection.prototype, "owner", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Collection.prototype, "uri", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Collection.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Collection.prototype, "cover", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_schema_1.User }),
    __metadata("design:type", Object)
], Collection.prototype, "creator", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "activated", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Collection.prototype, "public", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Collection.prototype, "chainId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Collection.prototype, "isTop", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Collection.prototype, "isHot", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: nftStandard_enum_1.NftStandardEnum.ERC1155 }),
    __metadata("design:type", String)
], Collection.prototype, "standard", void 0);
exports.Collection = Collection;
//# sourceMappingURL=collection.schema.js.map