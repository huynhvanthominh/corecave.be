/// <reference types="mongoose" />
import { CreateActivityDto } from './dtos/createActivity.dto';
import { Activity } from './schemas/activity.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { QueryActivityDto } from './dtos/queryActivity.dto';
import { PaginateResponse } from '../global/interfaces/paginate.interface';
import { UpdateActivityDto } from './dtos/updateActivity.dto';
import { ID } from '../global/interfaces/id.interface';
import { UserService } from 'src/user/user.service';
export declare class ActivityService {
    private readonly model;
    private readonly userService;
    constructor(model: ReturnModelType<typeof Activity>, userService: UserService);
    findAll(query: QueryActivityDto): Promise<PaginateResponse<Activity>>;
    rank(query: QueryActivityDto): Promise<any[]>;
    findOne(id: ID): Promise<Activity>;
    create(activity: CreateActivityDto): Promise<Activity>;
    remove(id: ID): Promise<Activity>;
    update(id: ID, payload: UpdateActivityDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Activity & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
}
