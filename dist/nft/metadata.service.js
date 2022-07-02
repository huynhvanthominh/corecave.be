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
exports.MetadataService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const ipfs_service_1 = require("../helper/ipfs.service");
const meta_schema_1 = require("./schemas/meta.schema");
const metaStatus_enum_1 = require("./interfaces/metaStatus.enum");
const schedule_1 = require("@nestjs/schedule");
const config_1 = require("@nestjs/config");
let MetadataService = class MetadataService {
    constructor(metadataModel, ipfsService, configService) {
        this.metadataModel = metadataModel;
        this.ipfsService = ipfsService;
        this.configService = configService;
        this.logger = new common_1.Logger('MetadataService');
    }
    async getRandomMetadata(limit) {
        const metas = await this.metadataModel
            .find({ status: metaStatus_enum_1.MetaStatusEnum.READY })
            .limit(limit)
            .exec();
        const uris = await Promise.all(metas.map(async (metadata) => {
            const uri = await this.uploadToIpfs(metadata);
            metadata.uri = uri;
            metadata.status = metaStatus_enum_1.MetaStatusEnum.PENDING;
            await metadata.save();
            return uri;
        }));
        return {
            uris,
            hashs: metas.map((metadata) => metadata.hash),
        };
    }
    async makeMinted(uri) {
        const meta = await this.metadataModel.findOne({ uri }).exec();
        if (meta) {
            meta.status = metaStatus_enum_1.MetaStatusEnum.MINTED;
            meta.save();
        }
    }
    async makeExpiredReady() {
        const fiveMinutesAgo = Date.now() - 10 * 60 * 1000;
        const expiredMetas = await this.metadataModel
            .find({
            status: metaStatus_enum_1.MetaStatusEnum.PENDING,
            timestampUpdate: { $lt: fiveMinutesAgo },
        })
            .exec();
        expiredMetas.forEach((meta) => {
            meta.status = metaStatus_enum_1.MetaStatusEnum.READY;
            meta.save();
            this.logger.verbose('Revert: ' + meta.hash);
        });
    }
    uploadToIpfs(metadata) {
        const metaObject = {
            name: 'Corgi ',
            description: 'Corgi is a dog',
            image: this.getImageUrl(metadata),
            attributes: metadata.attributes,
        };
        return this.ipfsService.jsonToUri(metaObject);
    }
    getImageUrl(metadata) {
        const IPFS_IMAGE_FOLDER = this.configService.get('IPFS_IMAGE_FOLDER');
        const GATE_WAY = this.configService.get('IPFS_GATE_WAY') || 'https://ipfs.io/ipfs/';
        const hashFolder = metadata.ipfsFolderHash || IPFS_IMAGE_FOLDER;
        return `${GATE_WAY}/${hashFolder}/${metadata.hash}.png`;
    }
};
__decorate([
    (0, schedule_1.Interval)(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetadataService.prototype, "makeExpiredReady", null);
MetadataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(meta_schema_1.Metadata)),
    __metadata("design:paramtypes", [Object, ipfs_service_1.IpfsService,
        config_1.ConfigService])
], MetadataService);
exports.MetadataService = MetadataService;
//# sourceMappingURL=metadata.service.js.map