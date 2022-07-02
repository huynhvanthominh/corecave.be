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
exports.Sale = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_schema_1 = require("../../user/schemas/user.schema");
const base_model_1 = require("../../global/base.model");
const saleType_enum_1 = require("../interfaces/saleType.enum");
const nft_schema_1 = require("./nft.schema");
const ownership_schema_1 = require("./ownership.schema");
class Sale extends base_model_1.BaseModel {
}
__decorate([
    (0, typegoose_1.prop)({ ref: () => ownership_schema_1.Ownership, required: true }),
    __metadata("design:type", Object)
], Sale.prototype, "ownership", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_schema_1.User, required: true }),
    __metadata("design:type", Object)
], Sale.prototype, "seller", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => nft_schema_1.NFT, required: true }),
    __metadata("design:type", Object)
], Sale.prototype, "nft", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Sale.prototype, "quantity", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Sale.prototype, "unitPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: saleType_enum_1.SaleType.FIXED }),
    __metadata("design:type", Number)
], Sale.prototype, "saleType", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Sale.prototype, "endTime", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Sale.prototype, "minBid", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Sale.prototype, "auctionId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Sale.prototype, "feature", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Sale.prototype, "isHot", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Sale.prototype, "isDenied", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "views", void 0);
exports.Sale = Sale;
//# sourceMappingURL=sale.schema.js.map