import { QueryDto } from '../../global/dtos/query.dto';
import { ActivityFilter } from '../interfaces/activityFilter.interface';
export declare class QueryActivityDto extends QueryDto implements ActivityFilter {
    activated: boolean;
    search: string;
    time: number;
}
