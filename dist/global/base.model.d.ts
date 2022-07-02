import { Schema } from 'mongoose';
export declare abstract class BaseModel {
    createdAt: Date;
    updatedAt: Date;
    id: Schema.Types.ObjectId;
}
