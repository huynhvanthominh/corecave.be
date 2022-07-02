/// <reference types="mongoose" />
import { CateogryService } from './cateogry.service';
import { QueryCategoryDto } from './dtos/queryCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';
import { ID } from '../global/interfaces/id.interface';
import { CreateCategoryDto } from './dtos/createCategory.dto';
export declare class CategoryController {
    private readonly service;
    constructor(service: CateogryService);
    index(query: QueryCategoryDto): Promise<import("../global/interfaces/paginate.interface").PaginateResponse<import("./schemas/category.schema").NFT>>;
    find(id: ID): Promise<import("./schemas/category.schema").NFT>;
    remove(id: ID): Promise<import("./schemas/category.schema").NFT>;
    create(payload: CreateCategoryDto): Promise<import("./schemas/category.schema").NFT>;
    update(id: ID, payload: UpdateCategoryDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/category.schema").NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
}
