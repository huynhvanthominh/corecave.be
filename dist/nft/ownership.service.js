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
exports.OwnershipService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const ownership_schema_1 = require("./schemas/ownership.schema");
let OwnershipService = class OwnershipService {
    constructor(model) {
        this.model = model;
    }
    async takeAway(from, nftId, quantity) {
        const fromOwnership = await this.findByOwnerAndNft(from, nftId);
        if (!fromOwnership) {
            throw new common_1.HttpException('From Ownership not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (fromOwnership.amount < quantity) {
            throw new common_1.HttpException('Quantity is greater than the quantity of the ownership', common_1.HttpStatus.BAD_REQUEST);
        }
        fromOwnership.amount -= quantity;
        await fromOwnership.save();
    }
    async findByOwnerAndNft(owner, nft) {
        return this.model.findOne({
            owner,
            nft,
        });
    }
    async transfer(from, to, nftId, quantity) {
        if (+from !== 0) {
            await this.takeAway(from, nftId, quantity);
        }
        const toOwnership = await this.findByOwnerAndNft(to, nftId);
        if (!toOwnership) {
            return this.model.create({
                owner: to,
                nft: nftId,
                amount: quantity,
            });
        }
        toOwnership.amount += quantity;
        return await toOwnership.save();
    }
    async getOwnedByUser(userId) {
        return this.model
            .find({ owner: userId, amount: { $gt: 0 } })
            .populate({
            path: 'nft',
            populate: {
                path: 'collectionId',
            }
        });
    }
    async deleteOwnership(id) {
        return this.model.findByIdAndDelete(id);
    }
};
OwnershipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(ownership_schema_1.Ownership)),
    __metadata("design:paramtypes", [Object])
], OwnershipService);
exports.OwnershipService = OwnershipService;
//# sourceMappingURL=ownership.service.js.map