/// <reference types="mongoose" />
import { RegisterUserDto } from 'src/user/dtos/register-user.dto';
import { LoginDto } from 'src/user/dtos/login-user.dto';
import { ResetRequestDto } from 'src/user/dtos/reset-request.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from './interface/jwtPayload.interface';
import { ResetPasswordDto } from '../user/dtos/reset-password.dto';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';
import { LoginWalletDto } from 'src/user/dtos/login-wallet.dto';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    register(registerUser: RegisterUserDto): Promise<import("../user/schemas/user.schema").User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    loginByWallet(loginDto: LoginWalletDto): Promise<{
        access_token: string;
    }>;
    me(auth: JwtPayload): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("../user/schemas/user.schema").User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    updateProfile(auth: JwtPayload, profile: UpdateUserDto): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("../user/schemas/user.schema").User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    requestReset(payload: ResetRequestDto): Promise<string>;
    resetPassword(payload: ResetPasswordDto): Promise<string>;
}
