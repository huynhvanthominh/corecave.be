import { UserRoleEnum } from '../interfaces/userRole.enum';
import { UserStatusEnum } from '../interfaces/userStatus.enum';
export declare class RegisterUserDto {
    username: string;
    password: string;
    title: string;
    status: UserStatusEnum;
    avatar: string;
    cover: string;
    address: string;
    bio: string;
    links: unknown;
    role: UserRoleEnum;
    isCreator: boolean;
    feature: boolean;
}
