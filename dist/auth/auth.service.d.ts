/// <reference types="mongoose" />
import { ID } from '../global/interfaces/id.interface';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/user/dtos/register-user.dto';
import { JwtPayload } from './interface/jwtPayload.interface';
import { User } from '../user/schemas/user.schema';
import { ResetToken } from './schemas/resetToken.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { ResetPasswordDto } from '../user/dtos/reset-password.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    private readonly tokenModel;
    constructor(usersService: UserService, jwtService: JwtService, configService: ConfigService, tokenModel: ReturnModelType<typeof ResetToken>);
    credentialByPassword(username: string, password: string): Promise<User>;
    genTokenFromUsername(username: string): Promise<{
        access_token: string;
    }>;
    genTokenFromSign(address: string, sign: string): Promise<{
        access_token: string;
    }>;
    register(registerUser: RegisterUserDto): Promise<User>;
    getUserFromJwtPayload({ id }: JwtPayload): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    resetRequest(email: string): Promise<void>;
    resetPassword(payload: ResetPasswordDto): Promise<boolean>;
    updateProfile(id: ID, payload: UpdateUserDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
}
