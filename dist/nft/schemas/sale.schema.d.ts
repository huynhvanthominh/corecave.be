import { Ref } from '@typegoose/typegoose';
import { User } from 'src/user/schemas/user.schema';
import { BaseModel } from '../../global/base.model';
import { SaleType } from '../interfaces/saleType.enum';
import { NFT } from './nft.schema';
import { Ownership } from './ownership.schema';
export declare class Sale extends BaseModel {
    ownership?: Ref<Ownership>;
    seller?: Ref<User>;
    nft?: Ref<NFT>;
    quantity: number;
    unitPrice: number;
    saleType: SaleType;
    endTime: number;
    minBid: number;
    auctionId: number;
    feature: boolean;
    isHot: boolean;
    isDenied: boolean;
    views: number;
}
