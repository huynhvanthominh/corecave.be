/// <reference types="mongoose" />
import { ReturnModelType } from '@typegoose/typegoose';
import { Sale } from './schemas/sale.schema';
import { ID } from 'src/global/interfaces/id.interface';
import { OwnershipService } from './ownership.service';
import { SaleNFTDto } from './dtos/saleNFT.dto';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { NftService } from './nft.service';
import { UserService } from '../user/user.service';
import { EventService } from '../event/event.service';
import { PaginateResponse } from '../global/interfaces/paginate.interface';
import { CollectionService } from 'src/collection/collection.service';
import { CreateLazyNFTDto } from './dtos/createLazyNFT.dto';
export declare class SaleService {
    private readonly model;
    private readonly ownershipService;
    private readonly configService;
    private readonly userService;
    private readonly eventService;
    private nftService;
    private readonly collectionService;
    private contractMatic;
    private readonly logger;
    constructor(model: ReturnModelType<typeof Sale>, ownershipService: OwnershipService, configService: ConfigService, userService: UserService, eventService: EventService, nftService: NftService, collectionService: CollectionService);
    findOne: (id: ID) => Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    update: (id: ID, saleNFT: any) => Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    increaseView: (body: any) => Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    findAll(page: any, limit: any, query: any): Promise<PaginateResponse<Sale>>;
    searchSale(page: any, limit: any, query: any): Promise<{
        items: any[];
        paginate: {
            page: any;
            size: any;
            count: number;
        };
    }>;
    findBySellerAndNft(sellerId: any, nftId: any): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    findByAuctionId(auctionId: number): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    putOnSale(payload: SaleNFTDto, sellerId: ID): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    takeDown(tokenAddress: any, tokenId: any, seller: any, chainId: any): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    buy(saleId: ID, buyerId: ID, quantity: number): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    getInSaleByUser(userId: any): import("mongoose").QueryWithHelpers<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[], import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }, import("@typegoose/typegoose/lib/types").BeAnObject, import("@typegoose/typegoose").DocumentType<Sale, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    getInSaleNft(nftId: any): import("mongoose").QueryWithHelpers<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[], import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }, import("@typegoose/typegoose/lib/types").BeAnObject, import("@typegoose/typegoose").DocumentType<Sale, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    onAuctionEnded(eventArgs: ethers.utils.Result, chainId: number): Promise<void | (import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })>;
    onItemUpdated(eventArgs: ethers.utils.Result, chainId: number): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    onBought(eventArgs: ethers.utils.Result, chainId: number): Promise<void>;
    getTopSeller(): Promise<any[]>;
    getFeature(): Promise<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[]>;
    findByCollection(id: ID): Promise<any[]>;
    putOnSaleLazy(payload: CreateLazyNFTDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    takeDownLazy(id: any): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    onLazyAucitonEnded(eventArgs: ethers.utils.Result, chainId: number): Promise<void>;
}
