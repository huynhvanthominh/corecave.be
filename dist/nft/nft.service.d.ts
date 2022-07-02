import { ReturnModelType } from '@typegoose/typegoose';
import { PaginateResponse } from '../global/interfaces/paginate.interface';
import { ID } from '../global/interfaces/id.interface';
import { QueryNFTDto } from './dtos/queryNFT.dto';
import { NFT } from './schemas/nft.schema';
import { IpfsService } from 'src/helper/ipfs.service';
import { OwnershipService } from './ownership.service';
import { NftTypeEnum } from './interfaces/nftType.enum';
import { SaleService } from './sale.service';
import { ConfigService } from '@nestjs/config';
import { Contract, ethers } from 'ethers';
import { UserService } from 'src/user/user.service';
import { EventService } from '../event/event.service';
import { Sale } from './schemas/sale.schema';
import { CollectionService } from 'src/collection/collection.service';
import { ContractService } from './contracts/contract.service';
import { CreateLazyNFTDto } from './dtos/createLazyNFT.dto';
import { NftStandardEnum } from './interfaces/nftStandard.enum';
export declare class NftService {
    private readonly model;
    private readonly ownerShipService;
    private readonly userService;
    private readonly saleService;
    private readonly ipfsService;
    private readonly configService;
    private readonly eventService;
    private readonly collectionService;
    private readonly contractServcie;
    private readonly logger;
    constructor(model: ReturnModelType<typeof NFT>, ownerShipService: OwnershipService, userService: UserService, saleService: SaleService, ipfsService: IpfsService, configService: ConfigService, eventService: EventService, collectionService: CollectionService, contractServcie: ContractService);
    follow: (id: ID, userId: any) => Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    findAll(query: QueryNFTDto): Promise<PaginateResponse<NFT>>;
    findOne(id: ID): Promise<{
        nft: NFT;
        sales: Sale[];
    }>;
    findByToken(tokenAddress: string, tokenId: number, chainId?: number): Promise<NFT>;
    findByUser(userId: any, type: NftTypeEnum): Promise<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[] | (import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[] | (import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/ownership.schema").Ownership & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[]>;
    findOrCreate(id: number, tokenAddress: string, chainId: number, payload: any, standard: NftStandardEnum): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    onTransferSingle(eventArgs: ethers.utils.Result, chainId: number, contract: Contract, standard: NftStandardEnum, isLazy?: boolean, signature?: string): Promise<void>;
    mintLazy(tokenId: number, tokenAddress: string, chainId: number, signature: string): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    createLazyNFT(tokenAddress: string, chainId: number, signature: string, params: CreateLazyNFTDto, standard: NftStandardEnum): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    importNft(ownerAddress: string, address: string, id: number, chainId: number, standard: NftStandardEnum): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    refreshUri(id: ID): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    findByCollection(id: ID): Promise<NFT[]>;
    deleteNft(id: ID): Promise<void>;
}
