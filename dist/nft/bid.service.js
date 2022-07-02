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
exports.BidService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const id_interface_1 = require("../global/interfaces/id.interface");
const ownership_service_1 = require("./ownership.service");
const config_1 = require("@nestjs/config");
const nft_service_1 = require("./nft.service");
const user_service_1 = require("../user/user.service");
const event_service_1 = require("../event/event.service");
const bid_schema_1 = require("./schemas/bid.schema");
const sale_service_1 = require("./sale.service");
let BidService = class BidService {
    constructor(model, ownershipService, configService, userService, eventService, saleService, nftService) {
        this.model = model;
        this.ownershipService = ownershipService;
        this.configService = configService;
        this.userService = userService;
        this.eventService = eventService;
        this.saleService = saleService;
        this.nftService = nftService;
        this.logger = new common_1.Logger('Bid service');
    }
    async findBySale(saleId) {
        return this.model.find({ sale: saleId }).populate('bidder');
    }
    async create(saleId, nftId, bidderId, value) {
        const bid = await this.model.findOne({
            sale: saleId,
            bidder: bidderId,
            nft: nftId,
        });
        if (bid && value > bid.value) {
            bid.value = value;
            return await bid.save();
        }
        return this.model.create({
            sale: saleId,
            bidder: bidderId,
            nft: nftId,
            value,
        });
    }
    async onBidAdded(eventArgs, chainId) {
        const [_address, _id, _seller, _bidder, _value] = eventArgs;
        this.logger.verbose(`Bid added: ${_address} ${_id} ${_seller} ${_bidder} ${_value}`);
        const nft = await this.nftService.findByToken(_address, _id, chainId);
        if (!nft) {
            this.logger.error(`NFT ${_address} ${_id}, ${chainId} not found in database`);
            return;
        }
        const sellerUser = await this.userService.findOrCreateByAddress(_seller);
        const bidderUser = await this.userService.findOrCreateByAddress(_bidder);
        const sale = await this.saleService.findBySellerAndNft(sellerUser.id, nft.id);
        if (!sale) {
            this.logger.error(`Sale ${sellerUser.id} ${nft.id} not found in database`);
            return;
        }
        await this.create(sale.id, nft.id, bidderUser.id, +_value / 1e18);
    }
    async onLazyBidAdded(eventArgs, chainId) {
        const [_address, _auctionId, _seller, _bidder, _value] = eventArgs;
        this.logger.verbose(`Lazy Bid added: ${_address} ${_auctionId} ${_seller} ${_bidder} ${_value}`);
        const bidderUser = await this.userService.findOrCreateByAddress(_bidder);
        const sale = await this.saleService.findByAuctionId(+_auctionId);
        if (!sale) {
            this.logger.error(`Sale lazy ${_auctionId} not found in database`);
            return;
        }
        await this.create(sale.id, sale.nft, bidderUser.id, +_value / 1e18);
    }
};
BidService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(bid_schema_1.Bid)),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => nft_service_1.NftService))),
    __metadata("design:paramtypes", [Object, ownership_service_1.OwnershipService,
        config_1.ConfigService,
        user_service_1.UserService,
        event_service_1.EventService,
        sale_service_1.SaleService,
        nft_service_1.NftService])
], BidService);
exports.BidService = BidService;
//# sourceMappingURL=bid.service.js.map