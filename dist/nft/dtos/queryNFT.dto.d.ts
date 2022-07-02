import { QueryDto } from '../../global/dtos/query.dto';
import { NftStatusEnum } from '../interfaces/nftStatus.enum';
import { NftFilterInterface } from '../interfaces/nftFilter.interface';
export declare class QueryNFTDto extends QueryDto implements NftFilterInterface {
    activated: boolean;
    search: string;
    creator: string;
    fileType: string;
    status: NftStatusEnum;
}
