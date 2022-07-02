import { ID } from '../global/interfaces/id.interface';
import { NftService } from './nft.service';
import { QueryNFTDto } from './dtos/queryNFT.dto';
import { SaleService } from './sale.service';
import { GetRandomMetaDTO } from './dtos/getRandomMeta.dto';
import { MetadataService } from './metadata.service';
import { BidService } from './bid.service';
import { CreateByTransactionDto } from './dtos/createByTransaction.dto';
import { ImportNFTDto } from './dtos/importNFT.dto';
import { CrawlService } from './crawl.service';
import { CreateLazyNFTDto } from './dtos/createLazyNFT.dto';
export declare class NftController {
    private readonly service;
    private readonly saleService;
    private readonly metaService;
    private readonly bidService;
    private readonly crawlService;
    constructor(service: NftService, saleService: SaleService, metaService: MetadataService, bidService: BidService, crawlService: CrawlService);
    randomMeta(body: GetRandomMetaDTO): Promise<{
        uris: string[];
        hashs: string[];
    }>;
    crawlTransaction(body: CreateByTransactionDto): Promise<number>;
    getSaleSearch(page: number, limit: number, query: any): Promise<{
        items: any[];
        paginate: {
            page: any;
            size: any;
            count: number;
        };
    }>;
    updateSaleNFT(id: ID, saleNFT: any): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/sale.schema").Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    increaseView(body: any): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/sale.schema").Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    findSalesById(id: ID): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/sale.schema").Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    getSales(page: number, limit: number, query: any): Promise<import("../global/interfaces/paginate.interface").PaginateResponse<import("./schemas/sale.schema").Sale>>;
    follow(id: ID, userId: ID): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/nft.schema").NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    index(query: QueryNFTDto): Promise<import("../global/interfaces/paginate.interface").PaginateResponse<import("./schemas/nft.schema").NFT>>;
    getTopSeller(): Promise<any[]>;
    getFeature(): Promise<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/sale.schema").Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[]>;
    findCollectionNftSale(id: ID): Promise<any[]>;
    findCollection(id: ID): Promise<import("./schemas/nft.schema").NFT[]>;
    getBidsOfSale(id: ID): Promise<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/bid.schema").Bid & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[]>;
    refreshUri(id: ID): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/nft.schema").NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    find(id: ID): Promise<{
        nft: import("./schemas/nft.schema").NFT;
        sales: import("./schemas/sale.schema").Sale[];
    }>;
    importNft(body: ImportNFTDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/nft.schema").NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    putOnSaleLazy(body: CreateLazyNFTDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/sale.schema").Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    takeDownLazy(id: any): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/sale.schema").Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
}
