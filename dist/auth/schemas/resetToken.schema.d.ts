import { BaseModel } from '../../global/base.model';
import { Schema } from 'mongoose';
export declare class ResetToken extends BaseModel {
    userId: Schema.Types.ObjectId;
    token: string;
}
