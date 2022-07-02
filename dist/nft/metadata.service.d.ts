import { ReturnModelType } from '@typegoose/typegoose';
import { IpfsService } from 'src/helper/ipfs.service';
import { Metadata } from './schemas/meta.schema';
import { ConfigService } from '@nestjs/config';
export declare class MetadataService {
    private readonly metadataModel;
    private readonly ipfsService;
    private configService;
    private readonly logger;
    constructor(metadataModel: ReturnModelType<typeof Metadata>, ipfsService: IpfsService, configService: ConfigService);
    getRandomMetadata(limit: number): Promise<{
        uris: string[];
        hashs: string[];
    }>;
    makeMinted(uri: string): Promise<void>;
    makeExpiredReady(): Promise<void>;
    private uploadToIpfs;
    private getImageUrl;
}
