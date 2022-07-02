import { Ref } from '@typegoose/typegoose';
import { Collection } from 'src/collection/schemas/collection.schema';
import { User } from 'src/user/schemas/user.schema';
import { BaseModel } from '../../global/base.model';
import { NftStandardEnum } from '../interfaces/nftStandard.enum';
export declare class NFT extends BaseModel {
    tokenId: number;
    tokenAddress: string;
    chainId: number;
    supply: number;
    name: string;
    description: string;
    activated: boolean;
    image: string;
    royalty: number;
    creator?: Ref<User>;
    collectionId?: Ref<Collection>;
    uri: string;
    mintedAt: Date;
    media: string;
    fileType: string;
    originType: string;
    isLazy: boolean;
    signature: string;
    followers: Ref<User>[];
    standard: NftStandardEnum;
}
