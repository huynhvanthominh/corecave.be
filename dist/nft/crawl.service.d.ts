import { ethers } from 'ethers';
import { NftService } from './nft.service';
import { EventService } from '../event/event.service';
import { ContractService } from './contracts/contract.service';
import { SaleService } from './sale.service';
import { BidService } from './bid.service';
import { NftStandardEnum } from './interfaces/nftStandard.enum';
export declare class CrawlService {
    private readonly eventService;
    private nftService;
    private saleService;
    private bidService;
    private readonly logger;
    private readonly nft721Service;
    private readonly nft1155Service;
    constructor(eventService: EventService, nftService: NftService, saleService: SaleService, bidService: BidService, contract721Service: ContractService, contract1155Service: ContractService);
    crawlTransaction(chainId: number, txHash: string, collectionAddress: any, standard: NftStandardEnum): Promise<number>;
    crawlTransaction1155(chainId: number, txHash: string, collectionAddress: any): Promise<number>;
    crawlTransaction721(chainId: number, txHash: string, collectionAddress: any): Promise<number>;
    handleEvent1155(eventLog: ethers.utils.LogDescription, chainId: number, contractAddress: string, txHash: string): Promise<void>;
    handleEvent721(eventLog: ethers.utils.LogDescription, chainId: number, contractAddress: string, txHash: string): Promise<void>;
}
