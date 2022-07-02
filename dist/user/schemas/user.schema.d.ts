import { Ref } from '@typegoose/typegoose';
import { BaseModel } from '../../global/base.model';
import { UserRoleEnum } from '../interfaces/userRole.enum';
import { UserStatusEnum } from '../interfaces/userStatus.enum';
export declare class User extends BaseModel {
    username: string;
    password: string;
    email: string;
    title: string;
    status: UserStatusEnum;
    address: string;
    avatar: string;
    cover: string;
    bio: string;
    links: unknown;
    role: UserRoleEnum;
    isCreator: boolean;
    followeds: Ref<User>[];
    followers: Ref<User>[];
    nonce: string;
    verified: false;
    feature: boolean;
}
