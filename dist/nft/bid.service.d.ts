import { ReturnModelType } from '@typegoose/typegoose';
import { OwnershipService } from './ownership.service';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { NftService } from './nft.service';
import { UserService } from '../user/user.service';
import { EventService } from '../event/event.service';
import { Bid } from './schemas/bid.schema';
import { SaleService } from './sale.service';
export declare class BidService {
    private readonly model;
    private readonly ownershipService;
    private readonly configService;
    private readonly userService;
    private readonly eventService;
    private readonly saleService;
    private nftService;
    private readonly logger;
    constructor(model: ReturnModelType<typeof Bid>, ownershipService: OwnershipService, configService: ConfigService, userService: UserService, eventService: EventService, saleService: SaleService, nftService: NftService);
    findBySale(saleId: any): Promise<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Bid & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[]>;
    create(saleId: any, nftId: any, bidderId: any, value: number): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Bid & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    onBidAdded(eventArgs: ethers.utils.Result, chainId: number): Promise<void>;
    onLazyBidAdded(eventArgs: ethers.utils.Result, chainId: number): Promise<void>;
}
