import { SaleType } from "../interfaces/saleType.enum";
export declare class SaleNFTDto {
    nftId?: string;
    quantity?: number;
    chainId?: number;
    unitPrice?: number;
    minBid?: number;
    endTime?: number;
    saleType?: SaleType;
    feature?: boolean;
}
