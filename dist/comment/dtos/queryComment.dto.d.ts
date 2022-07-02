import { QueryDto } from '../../global/dtos/query.dto';
import { TransactionFilterInterface } from 'src/event/interfaces/transactionFilter.interface';
export declare class QueryComment extends QueryDto implements TransactionFilterInterface {
    search: string;
}
