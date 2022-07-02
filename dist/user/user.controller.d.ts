import { UserService } from './user.service';
import { QueryUserDto } from './dtos/query-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ID } from '../global/interfaces/id.interface';
import { ListNftDto } from './dtos/listNft.dto';
import { NftService } from 'src/nft/nft.service';
export declare class UserController {
    private readonly service;
    private readonly nftService;
    constructor(service: UserService, nftService: NftService);
    index(query: QueryUserDto): Promise<import("../global/interfaces/paginate.interface").PaginateResponse<import("./schemas/user.schema").User>>;
    getNfts(id: ID, query: ListNftDto): Promise<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("../nft/schemas/sale.schema").Sale & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[] | (import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("../nft/schemas/nft.schema").NFT & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[] | (import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("../nft/schemas/ownership.schema").Ownership & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[]>;
    find(id: ID): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/user.schema").User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    remove(id: ID): Promise<import("./schemas/user.schema").User>;
    follow(a: ID, b: ID): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/user.schema").User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    unFollow(a: ID, b: ID): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/user.schema").User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    update(id: ID, payload: UpdateUserDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/user.schema").User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    createOrUpdate(payload: UpdateUserDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/user.schema").User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    findByAddress(address: string): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/user.schema").User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    getNonce(payload: {
        address: string;
    }): Promise<string>;
}
