import { NftStandardEnum } from '../interfaces/nftStandard.enum';
export declare class CreateByTransactionDto {
    chainId: number;
    address: string;
    transactionHash: string;
    standard: NftStandardEnum;
}
