import { QueryDto } from '../../global/dtos/query.dto';
import { TraitFilterInterface } from '../interfaces/traitFilter.interface';
import { TraitType } from '../interfaces/traitType.enum';
export declare class QueryTraitDto extends QueryDto implements TraitFilterInterface {
    search: string;
    type: TraitType;
    group: string;
}
