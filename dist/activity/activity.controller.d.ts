/// <reference types="mongoose" />
import { ActivityService } from './activity.service';
import { QueryActivityDto } from './dtos/queryActivity.dto';
import { UpdateActivityDto } from './dtos/updateActivity.dto';
import { ID } from '../global/interfaces/id.interface';
import { CreateActivityDto } from './dtos/createActivity.dto';
export declare class ActivityController {
    private readonly service;
    constructor(service: ActivityService);
    index(query: QueryActivityDto): Promise<import("../global/interfaces/paginate.interface").PaginateResponse<import("./schemas/activity.schema").Activity>>;
    ranking(query: QueryActivityDto): Promise<any[]>;
    find(id: ID): Promise<import("./schemas/activity.schema").Activity>;
    remove(id: ID): Promise<import("./schemas/activity.schema").Activity>;
    create(payload: CreateActivityDto): Promise<import("./schemas/activity.schema").Activity>;
    update(id: ID, payload: UpdateActivityDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./schemas/activity.schema").Activity & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
}
