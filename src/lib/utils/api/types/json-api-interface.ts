import QueryBuilder from "./query-builder";

export interface star<T> { 
    [key: string]: T;
}

interface JSONAPI<T> {
    readonly data: Iterable<T>;

    init: (entity: T) => T;
    getAll: (init?: boolean) => QueryBuilder<T>;
    get: (codes: string[], init?: boolean) => QueryBuilder<T>;
    find: (filter?: (data: T) => boolean, init?: boolean) => T | undefined;
    findAll: (filter?: (data: T) => boolean, init?: boolean) => QueryBuilder<T>;
    getRandomEntity: (init?: boolean) => T;
    getRandomEntities: (quantity: number, filter?: (data: T) => boolean, init?: boolean) => T[];
}

export default JSONAPI;