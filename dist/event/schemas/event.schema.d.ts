import { BaseModel } from '../../global/base.model';
export declare class Event extends BaseModel {
    address: string;
    transactionHash: string;
    chainId: number;
    topic: string;
    args: any;
    confirmed: boolean;
    name: string;
    index: number;
}
