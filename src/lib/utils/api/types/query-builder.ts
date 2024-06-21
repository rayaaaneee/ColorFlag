import QueryBuilderInterface from "./query-builder-interface";

class QueryBuilder<T> implements QueryBuilderInterface<T> {
    constructor(
        private data: Iterable<T>
    ) { }
    
    public select<Y>(selector: (data: T, i: number, arr: T[]) => Y): QueryBuilder<Y> {
        const data: Y[] = Array.from(this.data).map(selector);
        return new QueryBuilder(data);
    }

    public sort(compareFn: (a: T, b: T) => number): QueryBuilder<T> {
        const sortedData: T[] = Array.from(this.data).sort(compareFn);
        return new QueryBuilder(sortedData);
    }

    public asList(): T[] {
        return Array.from(this.data);
    }

    public asSet(): Set<T> {
        return new Set(this.data);
    }

    public asMap<K, V>(keySelector: (data: T) => K, valueSelector: (data: T) => V): Map<K, V> {
        return new Map(Array.from(this.data).map((data) => [keySelector(data), valueSelector(data)]));
    }

};

export default QueryBuilder;

