import QueryBuilder from "./query-builder";

interface QueryBuilderInterface<T> { 
    select: <Y>(selector: (data: T) => Y) => QueryBuilder<Y>;
    sort: (compareFn: (a: T, b: T) => number) => QueryBuilder<T>;

    asList: () => T[];
    asSet: () => Set<T>;
    asMap: <K, V>(keySelector: (data: T) => K, valueSelector: (data: T) => V) => Map<K, V>;
}

export default QueryBuilderInterface;