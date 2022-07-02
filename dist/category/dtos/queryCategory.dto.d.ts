import { QueryDto } from '../../global/dtos/query.dto';
import { CategoryFilter } from '../interfaces/categoryFilter.interface';
export declare class QueryCategoryDto extends QueryDto implements CategoryFilter {
    activated: boolean;
    search: string;
}
