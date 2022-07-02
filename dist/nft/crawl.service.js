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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlService = void 0;
const common_1 = require("@nestjs/common");
const nft_service_1 = require("./nft.service");
const event_service_1 = require("../event/event.service");
const contract_service_1 = require("./contracts/contract.service");
const sale_service_1 = require("./sale.service");
const bid_service_1 = require("./bid.service");
const nftStandard_enum_1 = require("./interfaces/nftStandard.enum");
let CrawlService = class CrawlService {
    constructor(eventService, nftService, saleService, bidService, contract721Service, contract1155Service) {
        this.eventService = eventService;
        this.nftService = nftService;
        this.saleService = saleService;
        this.bidService = bidService;
        this.logger = new common_1.Logger('CrawlService');
        this.nft721Service = contract721Service.init(nftStandard_enum_1.NftStandardEnum.ERC721);
        this.nft1155Service = contract1155Service.init(nftStandard_enum_1.NftStandardEnum.ERC1155);
    }
    async crawlTransaction(chainId, txHash, collectionAddress, standard) {
        switch (standard) {
            case nftStandard_enum_1.NftStandardEnum.ERC721:
                return this.crawlTransaction721(chainId, txHash, collectionAddress);
                break;
            case nftStandard_enum_1.NftStandardEnum.ERC1155:
                return await this.crawlTransaction1155(chainId, txHash, collectionAddress);
        }
    }
    async crawlTransaction1155(chainId, txHash, collectionAddress) {
        var e_1, _a;
        const logs = await this.nft1155Service.getAllEvents(chainId, collectionAddress, txHash);
        let eventsConfirmed = 0;
        try {
            for (var logs_1 = __asyncValues(logs), logs_1_1; logs_1_1 = await logs_1.next(), !logs_1_1.done;) {
                const log = logs_1_1.value;
                const event = await this.eventService.findOrCreate(log, txHash, chainId);
                if (!event.confirmed) {
                    await this.handleEvent1155(log, chainId, collectionAddress, txHash);
                    await this.eventService.confirm(txHash, log.name, chainId, log.index);
                    eventsConfirmed++;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (logs_1_1 && !logs_1_1.done && (_a = logs_1.return)) await _a.call(logs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return eventsConfirmed;
    }
    async crawlTransaction721(chainId, txHash, collectionAddress) {
        var e_2, _a;
        const logs = await this.nft721Service.getAllEvents(chainId, collectionAddress, txHash);
        let eventsConfirmed = 0;
        try {
            for (var logs_2 = __asyncValues(logs), logs_2_1; logs_2_1 = await logs_2.next(), !logs_2_1.done;) {
                const log = logs_2_1.value;
                const event = await this.eventService.findOrCreate(log, txHash, chainId);
                if (!event.confirmed) {
                    await this.handleEvent1155(log, chainId, collectionAddress, txHash);
                    await this.eventService.confirm(txHash, log.name, chainId, log.index);
                    eventsConfirmed++;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (logs_2_1 && !logs_2_1.done && (_a = logs_2.return)) await _a.call(logs_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return eventsConfirmed;
    }
    async handleEvent1155(eventLog, chainId, contractAddress, txHash) {
        switch (eventLog.name) {
            case 'TransferSingle':
                const collectionContract = this.nft1155Service.getCollectionContract(chainId, contractAddress, nftStandard_enum_1.NftStandardEnum.ERC1155);
                const transactionInfo = await this.nft1155Service.getTransactionInfo(chainId, txHash, nftStandard_enum_1.NftStandardEnum.ERC1155);
                if (transactionInfo.name &&
                    ['buyLazy', 'endAuctionLazy'].includes(transactionInfo.name)) {
                    await this.nftService.onTransferSingle(eventLog.args, chainId, collectionContract, nftStandard_enum_1.NftStandardEnum.ERC1155, true, transactionInfo.args._signature);
                }
                else {
                    await this.nftService.onTransferSingle(eventLog.args, chainId, collectionContract, nftStandard_enum_1.NftStandardEnum.ERC1155);
                }
                break;
            case 'ItemUpdated':
                await this.saleService.onItemUpdated(eventLog.args, chainId);
                break;
            case 'Bought':
                await this.saleService.onBought(eventLog.args, chainId);
                break;
            case 'BidAdded':
                await this.bidService.onBidAdded(eventLog.args, chainId);
                break;
            case 'AuctionEnded':
                await this.saleService.onAuctionEnded(eventLog.args, chainId);
                break;
            case 'LazyBidAdded':
                await this.bidService.onLazyBidAdded(eventLog.args, chainId);
                break;
            case 'LazyAuctionEnded':
                await this.saleService.onLazyAucitonEnded(eventLog.args, chainId);
                break;
        }
    }
    async handleEvent721(eventLog, chainId, contractAddress, txHash) {
        const args = eventLog.args;
        switch (eventLog.name) {
            case 'Transfer':
                const collectionContract = this.nft721Service.getCollectionContract(chainId, contractAddress, nftStandard_enum_1.NftStandardEnum.ERC721);
                const transactionInfo = await this.nft1155Service.getTransactionInfo(chainId, txHash, nftStandard_enum_1.NftStandardEnum.ERC721);
                const transferArgs = ['', args.from, args.to, args.id, 1];
                if (transactionInfo.name &&
                    ['buyLazy', 'endAuctionLazy'].includes(transactionInfo.name)) {
                    await this.nftService.onTransferSingle(transferArgs, chainId, collectionContract, nftStandard_enum_1.NftStandardEnum.ERC721, true, transactionInfo.args._signature);
                }
                else {
                    await this.nftService.onTransferSingle(transferArgs, chainId, collectionContract, nftStandard_enum_1.NftStandardEnum.ERC721);
                }
                break;
            case 'ItemUpdated':
                const updateArgs = [
                    args._address,
                    args._id,
                    args._seller,
                    1,
                    args._price,
                    args._type,
                    args._endTime,
                ];
                await this.saleService.onItemUpdated(updateArgs, chainId);
                break;
            case 'ItemBought':
                const boughtArgs = [
                    args._address,
                    args._id,
                    args._seller,
                    1,
                    args._price,
                    args._buyer,
                ];
                await this.saleService.onBought(boughtArgs, chainId);
                break;
            case 'BidAdded':
                const bidArgs = [
                    args._address,
                    args._id,
                    args._seller,
                    args._bidder,
                    args._value,
                ];
                await this.bidService.onBidAdded(bidArgs, chainId);
                break;
            case 'AuctionEnded':
                const auctionArgs = [
                    args._address,
                    args._id,
                    args._seller,
                    args._maxBidder,
                    args._maxBid,
                    1,
                    args._success,
                ];
                await this.saleService.onAuctionEnded(auctionArgs, chainId);
                break;
            case 'LazyBidAdded':
                await this.bidService.onLazyBidAdded(eventLog.args, chainId);
                break;
            case 'LazyAuctionEnded':
                await this.saleService.onLazyAucitonEnded(eventLog.args, chainId);
                break;
        }
    }
};
CrawlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_service_1.EventService,
        nft_service_1.NftService,
        sale_service_1.SaleService,
        bid_service_1.BidService,
        contract_service_1.ContractService,
        contract_service_1.ContractService])
], CrawlService);
exports.CrawlService = CrawlService;
//# sourceMappingURL=crawl.service.js.map