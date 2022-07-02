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
exports.IpfsService = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const URL = `https://api.pinata.cloud`;
let IpfsService = class IpfsService {
    constructor(config) {
        this.config = config;
        const headers = {
            pinata_api_key: this.config.get('PINATA_API_KEY'),
            pinata_secret_api_key: this.config.get('PINATA_SECRET_KEY'),
        };
        this.axiosPinata = axios_1.default.create({
            baseURL: URL,
            headers: headers,
        });
    }
    async fetchUri(uri) {
        try {
            const hash = uri.split('/').pop();
            const GATE_WAY = this.config.get('IPFS_GATE_WAY') || 'https://ipfs.io/ipfs/';
            const { data } = await axios_1.default.get(`${GATE_WAY}/${hash}`);
            return {
                name: (data === null || data === void 0 ? void 0 : data.name) || (data === null || data === void 0 ? void 0 : data.title),
                description: data === null || data === void 0 ? void 0 : data.description,
                image: data === null || data === void 0 ? void 0 : data.image,
                fileType: (data === null || data === void 0 ? void 0 : data.type) || 'image',
                originType: data === null || data === void 0 ? void 0 : data.originType,
                media: data === null || data === void 0 ? void 0 : data.media,
            };
        }
        catch (error) {
            return {};
        }
    }
    async jsonToUri(data) {
        const url = `/pinning/pinJSONToIPFS`;
        const GATE_WAY = this.config.get('IPFS_GATE_WAY') || 'https://ipfs.io/ipfs/';
        const res = await this.axiosPinata.post(url, data);
        return `${GATE_WAY}/${res.data.IpfsHash}`;
    }
};
IpfsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], IpfsService);
exports.IpfsService = IpfsService;
//# sourceMappingURL=ipfs.service.js.map