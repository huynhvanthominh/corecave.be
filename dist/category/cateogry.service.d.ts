/// <reference types="mongoose" />
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { NFT } from './schemas/category.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { QueryCategoryDto } from './dtos/queryCategory.dto';
import { PaginateResponse } from '../global/interfaces/paginate.interface';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';
import { ID } from '../global/interfaces/id.interface';
export declare class CateogryService {
    private readonly model;
    constructor(model: ReturnModelType<typeof NFT>);
    findAll(query: QueryCategoryDto): Promise<PaginateResponse<NFT>>;
    findOne(id: ID): Promise<NFT>;
    create(category: CreateCategoryDto): Promise<NFT>;
    remove(id: ID): Promise<NFT>;
    update(id: ID, payload: UpdateCategoryDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
}
