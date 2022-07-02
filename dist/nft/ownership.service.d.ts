/// <reference types="mongoose" />
import { ReturnModelType } from '@typegoose/typegoose';
import { Ownership } from './schemas/ownership.schema';
export declare class OwnershipService {
    readonly model: ReturnModelType<typeof Ownership>;
    constructor(model: ReturnModelType<typeof Ownership>);
    private takeAway;
    findByOwnerAndNft(owner: any, nft: any): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Ownership & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    transfer(from: any, to: any, nftId: any, quantity: number): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Ownership & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    getOwnedByUser(userId: any): Promise<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Ownership & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[]>;
    deleteOwnership(id: any): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Ownership & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
}
