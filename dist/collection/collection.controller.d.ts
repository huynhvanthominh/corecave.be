import { CollectionService } from './collection.service';
import { QueryCollectionDto } from './dtos/queryCollection.dto';
import { UpdateCollectionDto } from './dtos/updateCollection.dto';
import { ID } from '../global/interfaces/id.interface';
import { CreateCollectionDto } from './dtos/createCollection.dto';
export declare class CollectionController {
    private readonly service;
    constructor(service: CollectionService);
    index(query: QueryCollectionDto): Promise<import("../global/interfaces/paginate.interface").PaginateResponse<import("./schemas/collection.schema").Collection>>;
    conlectionBySales(): Promise<any[]>;
    find(id: ID): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/collection.schema").Collection & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    findByCreator(id: ID, chainId: number): Promise<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/collection.schema").Collection & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[]>;
    remove(id: ID): Promise<import("./schemas/collection.schema").Collection>;
    create(payload: CreateCollectionDto, user: any): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/collection.schema").Collection & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    update(id: ID, payload: UpdateCollectionDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/collection.schema").Collection & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
}
