import { Ref } from '@typegoose/typegoose';
import { BaseModel } from '../../global/base.model';
import { User } from 'src/user/schemas/user.schema';
import { NftStandardEnum } from '../../nft/interfaces/nftStandard.enum';
export declare class Collection extends BaseModel {
    name: string;
    symbol: string;
    address: string;
    owner: string;
    uri: string;
    image: string;
    cover: string;
    creator?: Ref<User>;
    activated: boolean;
    public: boolean;
    chainId: number;
    isTop: boolean;
    isHot: boolean;
    standard: NftStandardEnum;
}
