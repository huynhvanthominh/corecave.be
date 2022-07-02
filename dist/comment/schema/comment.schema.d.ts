import { Ref } from '@typegoose/typegoose';
import { BaseModel } from '../../global/base.model';
import { User } from 'src/user/schemas/user.schema';
import { NFT } from 'src/nft/schemas/nft.schema';
export declare class Comment extends BaseModel {
    content: string;
    user: Ref<User>;
    nft: Ref<NFT>;
}
