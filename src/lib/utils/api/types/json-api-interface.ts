interface JSONAPI <T> {
    readonly data: Iterable<T>;

    getAll: (init?: boolean) => Iterable<T>;
    find: (code: string, where?: (data: T) => boolean, init?: boolean) => T | undefined;
    get:(codes: string[], init?: boolean) => Iterable<T>;
    exists: (code: string, where?: (data: T) => boolean) => boolean;
    getRandomEntity: (init?: boolean) => T;
    getRandomEntities: (quantity: number, where?: (data: T) => boolean, init?: boolean) => T[];
    init: (entity: T) => T;
}

export default JSONAPI;