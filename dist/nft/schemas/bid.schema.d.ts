import { Ref } from '@typegoose/typegoose';
import { User } from 'src/user/schemas/user.schema';
import { BaseModel } from '../../global/base.model';
import { NFT } from './nft.schema';
import { Sale } from './sale.schema';
export declare class Bid extends BaseModel {
    sale?: Ref<Sale>;
    nft?: Ref<NFT>;
    bidder?: Ref<User>;
    value: number;
}
