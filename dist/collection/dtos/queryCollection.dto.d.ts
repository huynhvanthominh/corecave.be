import { QueryDto } from '../../global/dtos/query.dto';
import { CollectionFilter } from '../interfaces/collectionFilter.interface';
export declare class QueryCollectionDto extends QueryDto implements CollectionFilter {
    activated: boolean;
    search: string;
    status: string;
}
