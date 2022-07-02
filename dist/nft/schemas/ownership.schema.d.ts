import { Ref } from '@typegoose/typegoose';
import { User } from 'src/user/schemas/user.schema';
import { BaseModel } from '../../global/base.model';
import { NFT } from './nft.schema';
export declare class Ownership extends BaseModel {
    owner?: Ref<User>;
    nft?: Ref<NFT>;
    amount: number;
}
