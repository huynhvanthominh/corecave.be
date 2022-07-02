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
exports.ResetToken = void 0;
const base_model_1 = require("../../global/base.model");
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = require("mongoose");
class ResetToken extends base_model_1.BaseModel {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], ResetToken.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ResetToken.prototype, "token", void 0);
exports.ResetToken = ResetToken;
//# sourceMappingURL=resetToken.schema.js.map