/// <reference types="mongoose" />
import { CommentService } from './comment.service';
export declare class CommentController {
    private readonly service;
    constructor(service: CommentService);
    getByNft(nftId: any, query: any): Promise<{
        items: any[];
        paginate: {
            page: number;
            size: number;
            count: number;
            all: any[];
        };
    }>;
    create(comment: any): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schema/comment.schema").Comment & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
}
