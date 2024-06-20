interface JSONAPI <T> {
    readonly data: Iterable<T>;

    init: (entity: T) => T;
    getAll: (init?: boolean) => Iterable<T>;
    get:(codes: string[], init?: boolean) => Iterable<T>;
    find: (filter?: (data: T) => boolean, init?: boolean) => T | undefined;
    findAll: (filter?: (data: T) => boolean, init?: boolean) => Iterable<T>;
    some: (filter?: (data: T) => boolean) => boolean;
    getRandomEntity: (init?: boolean) => T;
    getRandomEntities: (quantity: number, filter?: (data: T) => boolean, init?: boolean) => T[];
}

export default JSONAPI;