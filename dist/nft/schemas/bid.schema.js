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
exports.Bid = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_schema_1 = require("../../user/schemas/user.schema");
const base_model_1 = require("../../global/base.model");
const nft_schema_1 = require("./nft.schema");
const sale_schema_1 = require("./sale.schema");
class Bid extends base_model_1.BaseModel {
}
__decorate([
    (0, typegoose_1.prop)({ ref: () => sale_schema_1.Sale, required: true }),
    __metadata("design:type", Object)
], Bid.prototype, "sale", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => nft_schema_1.NFT, required: true }),
    __metadata("design:type", Object)
], Bid.prototype, "nft", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_schema_1.User, required: true }),
    __metadata("design:type", Object)
], Bid.prototype, "bidder", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Bid.prototype, "value", void 0);
exports.Bid = Bid;
//# sourceMappingURL=bid.schema.js.map