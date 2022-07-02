import { QueryDto } from '../../global/dtos/query.dto';
import { TransactionFilterInterface } from '../interfaces/transactionFilter.interface';
export declare class QueryWalletDto extends QueryDto implements TransactionFilterInterface {
    search: string;
}
