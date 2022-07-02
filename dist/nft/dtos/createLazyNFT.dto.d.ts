import { SaleType } from '../interfaces/saleType.enum';
import { NftStandardEnum } from "../interfaces/nftStandard.enum";
export declare class CreateLazyNFTDto {
    uri: string;
    tokenAddress: string;
    chainId: number;
    supply: number;
    creatorAddress: string;
    price: number;
    endTime: number;
    saleType: SaleType;
    royalty: number;
    signature: string;
    auctionId: number;
    standard: NftStandardEnum;
}
