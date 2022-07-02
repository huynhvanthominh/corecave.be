import { CreateCollectionDto } from './dtos/createCollection.dto';
import { Collection } from './schemas/collection.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { QueryCollectionDto } from './dtos/queryCollection.dto';
import { PaginateResponse } from 'src/global/interfaces/paginate.interface';
import { UpdateCollectionDto } from './dtos/updateCollection.dto';
import { ID } from '../global/interfaces/id.interface';
import { ConfigService } from '@nestjs/config';
import { ContractService } from 'src/nft/contracts/contract.service';
import { NftStandardEnum } from '../nft/interfaces/nftStandard.enum';
export declare class CollectionService {
    private readonly model;
    private readonly configService;
    private readonly contractService;
    constructor(model: ReturnModelType<typeof Collection>, configService: ConfigService, contractService: ContractService);
    findAll(query: QueryCollectionDto): Promise<PaginateResponse<Collection>>;
    findOne(id: ID): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Collection & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    findOrCreateByAddress(address: string, chainId: number, standard: NftStandardEnum): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Collection & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    findByAddress(address: string, chainId: number): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Collection & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    create(collection: CreateCollectionDto, userId: string): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Collection & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    createByAddress(address: string, chainId: number, standard: NftStandardEnum): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Collection & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    remove(id: ID): Promise<Collection>;
    update(id: ID, payload: UpdateCollectionDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Collection & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    findByCreator(creatorId: any, chainId: any): Promise<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Collection & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[]>;
    findCollectionSales(): Promise<any[]>;
}
