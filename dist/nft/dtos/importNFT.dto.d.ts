import { NftStandardEnum } from "../interfaces/nftStandard.enum";
export declare class ImportNFTDto {
    tokenId: number;
    tokenAddress: string;
    chainId: number;
    ownerAddress: string;
    standard: NftStandardEnum;
}
