import { ConfigService } from '@nestjs/config';
export declare class IpfsService {
    private config;
    private axiosPinata;
    constructor(config: ConfigService);
    fetchUri(uri: string): Promise<{
        name: any;
        description: any;
        image: any;
        fileType: any;
        originType: any;
        media: any;
    } | {
        name?: undefined;
        description?: undefined;
        image?: undefined;
        fileType?: undefined;
        originType?: undefined;
        media?: undefined;
    }>;
    jsonToUri(data: any): Promise<string>;
}
