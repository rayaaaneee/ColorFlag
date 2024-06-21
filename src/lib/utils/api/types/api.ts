import JSONAPI from "./json-api-interface";
import QueryBuilder from "./query-builder";

abstract class API<T extends { id: string }> implements JSONAPI<T> {

    public abstract readonly data: Iterable<T>;

    public abstract init(entity: T): T;

    public get(ids: string[], init = false): QueryBuilder<T> {
        const entities: T[] = (Array.from(this.data).filter((entity: T) => ids.includes(entity.id)) satisfies T[] as T[]);
        if (init) {
            entities.forEach((country: T) => country = this.init(country));
        }
        return new QueryBuilder(entities);
    }

    public find(filter: (data: T) => boolean = (_ => true), init = false): T | undefined {
        const entity: T | undefined = Array.from(this.data).find((entity) => filter(entity)) satisfies T | undefined;
        let result: T | undefined = entity;
        if (entity && init) result = this.init(entity);
        return result;
    }

    public findAll(filter: (data: T) => boolean = (_ => true), init = false): QueryBuilder<T> {
        const entities: T[] = Array.from(this.data).filter((entity) => filter(entity)) satisfies T[];

        let result: T[] = entities;
        if (init) result = entities.map((entity: T) => this.init(entity));
        return new QueryBuilder(result);
    }

    public getAll(init = false): QueryBuilder<T> {
        return new QueryBuilder(this.findAll().select((entity: T) => (init ? this.init(entity) : entity)).asList());
    }

    public getRandomEntity(init: boolean | undefined = false): T {
        const data: T[] = Array.from(this.data);
        const index: number = Math.floor(Math.random() * data.length);
        const randomEntity: T = data[index];
        if (init) this.init(randomEntity);
        return randomEntity;
    }

    public getRandomEntities(quantity: number = 1, filter: ((data: T) => boolean) | undefined = _ => true, init: boolean | undefined = false): T[] {

        const entities: T[] = [];
        const data: T[] = Array.from(this.data);

        if (quantity > data.length) quantity = data.length;

        while (entities.length < quantity) {
            const entity: T = this.getRandomEntity(init);

            if (!entities.includes(entity) && (filter(entity))) {
                entities.push(entity);
            }
        }

        return entities;
    }
}

export default API;