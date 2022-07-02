/// <reference types="mongoose" />
import { QueryComment } from './dtos/queryComment.dto';
import { ReturnModelType } from '@typegoose/typegoose';
import { Comment } from './schema/comment.schema';
export declare class CommentService {
    private readonly model;
    constructor(model: ReturnModelType<typeof Comment>);
    getByNft: (nftId: any, query: QueryComment) => Promise<{
        items: any[];
        paginate: {
            page: number;
            size: number;
            count: number;
            all: any[];
        };
    }>;
    create: (comment: any) => Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Comment & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
}
