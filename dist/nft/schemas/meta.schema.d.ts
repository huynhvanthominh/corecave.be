import { BaseModel } from '../../global/base.model';
import { AttributeInterface } from '../interfaces/attribute.interface';
import { MetaStatusEnum } from '../interfaces/metaStatus.enum';
export declare class Metadata extends BaseModel {
    status: MetaStatusEnum;
    hash: string;
    attributes: AttributeInterface[];
    ipfsFolderHash?: string;
    timestampUpdate?: number;
    uri?: string;
}
