import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { NftStandardEnum } from '../interfaces/nftStandard.enum';
export declare class ContractService {
    private readonly configService;
    chainIds: number[];
    prcUrls: string[];
    marketAddresses: string[];
    nftStandard: NftStandardEnum;
    constructor(configService: ConfigService);
    init(nftStandard: NftStandardEnum): ContractService;
    getCollectionContract(chainId: number, address: string, standard: NftStandardEnum): ethers.Contract;
    getMarketContract(chainId: number): ethers.Contract;
    chainIdToPRC(chainId: number): string;
    chainIdToMarketAddress(chainId: number): string;
    chainToProvider(chainId: number): ethers.providers.JsonRpcProvider;
    getTransactionReceipt(chainId: number, txHash: string): Promise<ethers.providers.TransactionReceipt>;
    getTransactionInfo(chainId: number, txHash: string, standard: NftStandardEnum): Promise<any>;
    getCollectionEvents(chainId: number, address: string, txHash: string): Promise<{
        address: string;
        index: number;
        eventFragment: ethers.utils.EventFragment;
        name: string;
        signature: string;
        topic: string;
        args: ethers.utils.Result;
    }[]>;
    getMarketEvents(chainId: number, txHash: string): Promise<{
        address: string;
        index: number;
        eventFragment: ethers.utils.EventFragment;
        name: string;
        signature: string;
        topic: string;
        args: ethers.utils.Result;
    }[]>;
    getAllEvents(chainId: number, collectionAddress: string, txHash: string): Promise<{
        address: string;
        index: number;
        eventFragment: ethers.utils.EventFragment;
        name: string;
        signature: string;
        topic: string;
        args: ethers.utils.Result;
    }[]>;
    getBlockNumber(chainId: number, txHash: string): Promise<number>;
}
