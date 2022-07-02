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
exports.ContractService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const config_1 = require("@nestjs/config");
const ERC1155Collection_json_1 = require("./ERC1155Collection.json");
const ERC1155Marketplace_json_1 = require("./ERC1155Marketplace.json");
const ERC721Collection_json_1 = require("./ERC721Collection.json");
const ERC721Marketplace_json_1 = require("./ERC721Marketplace.json");
const nftStandard_enum_1 = require("../interfaces/nftStandard.enum");
let ContractService = class ContractService {
    constructor(configService) {
        this.configService = configService;
        this.chainIds = [];
        this.prcUrls = [];
        this.marketAddresses = [];
    }
    init(nftStandard) {
        this.nftStandard = nftStandard;
        const chainIds = this.configService.get('CHAIN_IDS');
        this.chainIds = chainIds.split(',').map((id) => parseInt(id, 10));
        this.chainIds.forEach((id, index) => {
            this.prcUrls.push(this.configService.get(`PRC_URL_${index}`));
            this.marketAddresses.push(this.configService.get(`MARKET_ADDRESS_${index}`));
        });
        return this;
    }
    getCollectionContract(chainId, address, standard) {
        const rpcProvider = this.chainToProvider(chainId);
        switch (standard) {
            case nftStandard_enum_1.NftStandardEnum.ERC721:
                return new ethers_1.ethers.Contract(address, ERC721Collection_json_1.abi, rpcProvider);
            case nftStandard_enum_1.NftStandardEnum.ERC1155:
                return new ethers_1.ethers.Contract(address, ERC1155Collection_json_1.abi, rpcProvider);
        }
    }
    getMarketContract(chainId) {
        const rpcProvider = this.chainToProvider(chainId);
        const marketAddress = this.chainIdToMarketAddress(chainId);
        return new ethers_1.ethers.Contract(marketAddress, ERC1155Marketplace_json_1.abi, rpcProvider);
    }
    chainIdToPRC(chainId) {
        return this.prcUrls[this.chainIds.indexOf(chainId)];
    }
    chainIdToMarketAddress(chainId) {
        return this.marketAddresses[this.chainIds.indexOf(chainId)];
    }
    chainToProvider(chainId) {
        const prc = this.chainIdToPRC(chainId);
        console.log(`Connecting to ${prc}`);
        return new ethers_1.ethers.providers.JsonRpcProvider(prc);
    }
    async getTransactionReceipt(chainId, txHash) {
        const rpcProvider = this.chainToProvider(chainId);
        let tx = await rpcProvider.getTransaction(txHash);
        const retryTime = 10;
        let retryCount = 0;
        while (retryCount < retryTime) {
            tx = await rpcProvider.getTransaction(txHash);
            if (tx) {
                return tx.wait();
            }
            else {
                retryCount++;
                console.log('retry get TX: ', retryCount);
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }
        throw new common_1.HttpException('Transaction not found', common_1.HttpStatus.NOT_FOUND);
    }
    async getTransactionInfo(chainId, txHash, standard) {
        try {
            const rpcProvider = this.chainToProvider(chainId);
            const tx = await rpcProvider.getTransaction(txHash);
            const data = tx.data;
            let iface;
            switch (standard) {
                case nftStandard_enum_1.NftStandardEnum.ERC1155:
                    iface = new ethers_1.ethers.utils.Interface(ERC1155Marketplace_json_1.abi);
                    break;
                case nftStandard_enum_1.NftStandardEnum.ERC721:
                    iface = new ethers_1.ethers.utils.Interface(ERC721Collection_json_1.abi);
            }
            return iface.parseTransaction({ data });
        }
        catch (e) {
            return { args: { _signature: '' }, name: '' };
        }
    }
    async getCollectionEvents(chainId, address, txHash) {
        const txReceipt = await this.getTransactionReceipt(chainId, txHash);
        const iface = new ethers_1.ethers.utils.Interface(this.nftStandard == nftStandard_enum_1.NftStandardEnum.ERC721
            ? ERC721Collection_json_1.abi
            : ERC1155Collection_json_1.abi);
        const logs = txReceipt.logs.filter((log) => log.address.toLowerCase() === address.toLowerCase());
        return logs
            .map((log) => iface.parseLog(log))
            .map((log, index) => (Object.assign(Object.assign({}, log), { address,
            index })));
    }
    async getMarketEvents(chainId, txHash) {
        const address = this.chainIdToMarketAddress(chainId);
        const txReceipt = await this.getTransactionReceipt(chainId, txHash);
        const iface = new ethers_1.ethers.utils.Interface(this.nftStandard == nftStandard_enum_1.NftStandardEnum.ERC721
            ? ERC721Marketplace_json_1.abi
            : ERC1155Marketplace_json_1.abi);
        const logs = txReceipt.logs.filter((log) => log.address.toLowerCase() === address.toLowerCase());
        return logs
            .map((log) => iface.parseLog(log))
            .map((log, index) => (Object.assign(Object.assign({}, log), { address,
            index })));
    }
    async getAllEvents(chainId, collectionAddress, txHash) {
        const collectionEvents = await this.getCollectionEvents(chainId, collectionAddress, txHash);
        const marketEvents = await this.getMarketEvents(chainId, txHash);
        return [...collectionEvents, ...marketEvents];
    }
    async getBlockNumber(chainId, txHash) {
        const rpcProvider = this.chainToProvider(chainId);
        const tx = await rpcProvider.getTransaction(txHash);
        await tx.wait();
        return tx.blockNumber;
    }
};
ContractService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ContractService);
exports.ContractService = ContractService;
//# sourceMappingURL=contract.service.js.map