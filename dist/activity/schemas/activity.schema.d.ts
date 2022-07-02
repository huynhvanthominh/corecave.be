import { BaseModel } from '../../global/base.model';
export declare class Activity extends BaseModel {
    nft_name: string;
    nft_image: string;
    collection_name: string;
    collection_id: string;
    collection_image: string;
    time: number;
    owner: string;
    buyer: string;
    price: number;
    type: number;
}
