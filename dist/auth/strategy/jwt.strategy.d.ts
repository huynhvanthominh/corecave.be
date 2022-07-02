/// <reference types="mongoose" />
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../interface/jwtPayload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        id: import("mongoose").Schema.Types.ObjectId;
        username: string;
    }>;
}
export {};
