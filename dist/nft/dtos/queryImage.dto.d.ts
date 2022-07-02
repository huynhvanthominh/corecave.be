import { QueryDto } from '../../global/dtos/query.dto';
import { TraitFilterInterface } from '../interfaces/traitFilter.interface';
export declare class QueryImageDto extends QueryDto implements TraitFilterInterface {
    search: string;
}
