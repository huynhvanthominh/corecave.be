import { ID } from '../global/interfaces/id.interface';
import { EventService } from './event.service';
import { QueryWalletDto } from './dtos/queryEvent.dto';
export declare class EventController {
    private readonly service;
    constructor(service: EventService);
    index(query: QueryWalletDto): Promise<import("../global/interfaces/paginate.interface").PaginateResponse<import("./schemas/event.schema").Event>>;
    activity(page: number, limit: number, query: any): Promise<{
        items: any[];
        paginate: {
            page: number;
            size: number;
            count: number;
            all: any[];
        };
    }>;
    rankingByUser(query: any): Promise<{
        items: any[];
        paginate: {
            page: number;
            size: number;
            count: number;
            all: any[];
        };
    }>;
    ranking(page: number, limit: number, query: any): Promise<{
        items: any[];
        paginate: {
            page: any;
            size: any;
        };
    }>;
    find(id: ID): Promise<import("./schemas/event.schema").Event>;
}
