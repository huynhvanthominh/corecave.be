import { ReturnModelType } from '@typegoose/typegoose';
import { PaginateResponse } from '../global/interfaces/paginate.interface';
import { ID } from '../global/interfaces/id.interface';
import { QueryWalletDto } from './dtos/queryEvent.dto';
import { Event } from './schemas/event.schema';
import { ethers } from "ethers";
import { EventLogInterface } from '../nft/interfaces/EventLog.interface';
export declare class EventService {
    private readonly model;
    constructor(model: ReturnModelType<typeof Event>);
    findAll(query: QueryWalletDto): Promise<PaginateResponse<Event>>;
    findOne(id: ID): Promise<Event>;
    findByTransactionHash(transactionHash: string, eventName: string, chainId: number, index: number): Promise<Event>;
    decodeArgs(arg: ethers.utils.Result): {
        [x: string]: any;
        [x: number]: any;
        length: number;
        toString(): string;
        toLocaleString(): string;
        concat(...items: ConcatArray<any>[]): any[];
        concat(...items: any[]): any[];
        join(separator?: string): string;
        slice(start?: number, end?: number): any[];
        indexOf(searchElement: any, fromIndex?: number): number;
        lastIndexOf(searchElement: any, fromIndex?: number): number;
        every<S extends any>(predicate: (value: any, index: number, array: readonly any[]) => value is S, thisArg?: any): this is readonly S[];
        every(predicate: (value: any, index: number, array: readonly any[]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: any, index: number, array: readonly any[]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: any, index: number, array: readonly any[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: any, index: number, array: readonly any[]) => U, thisArg?: any): U[];
        filter<S_1 extends any>(predicate: (value: any, index: number, array: readonly any[]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: any, index: number, array: readonly any[]) => unknown, thisArg?: any): any[];
        reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: readonly any[]) => any): any;
        reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: readonly any[]) => any, initialValue: any): any;
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: any, currentIndex: number, array: readonly any[]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: readonly any[]) => any): any;
        reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: readonly any[]) => any, initialValue: any): any;
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: any, currentIndex: number, array: readonly any[]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends any>(predicate: (this: void, value: any, index: number, obj: readonly any[]) => value is S_2, thisArg?: any): S_2;
        find(predicate: (value: any, index: number, obj: readonly any[]) => unknown, thisArg?: any): any;
        findIndex(predicate: (value: any, index: number, obj: readonly any[]) => unknown, thisArg?: any): number;
        entries(): IterableIterator<[number, any]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<any>;
        includes(searchElement: any, fromIndex?: number): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: any, index: number, array: any[]) => U_3 | readonly U_3[], thisArg?: This): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
        [Symbol.iterator](): IterableIterator<any>;
    };
    create(event: EventLogInterface, chainId: any, txHash: string): Promise<Event>;
    findOrCreate(log: EventLogInterface, txHash: string, chainId: number): Promise<Event>;
    confirm(transactionHash: string, name: string, chainId: number, index: number): Promise<Event>;
    remove(id: ID): Promise<Event>;
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
    rankings(page: any, limit: any, time: any): Promise<{
        items: any[];
        paginate: {
            page: any;
            size: any;
        };
    }>;
}
