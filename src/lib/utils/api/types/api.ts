import JSONAPI from "./json-api-interface";

abstract class API<T extends { code: string }> implements JSONAPI<T> {

    public abstract readonly data: Iterable<T>;

    public abstract init(entity: T): T;

    public get(codes: string[], init = false): Iterable<T> {
        const countries: T[] = (Array.from(this.data).filter((entity: T) => codes.includes(entity.code)) satisfies T[] as T[]);
        if (init) {
            countries.forEach((country: T) => country = this.init(country));
        }
        return countries;
    }

    public find(filter: (data: T) => boolean = (_ => true), init = false): T | undefined {
        const entity: T | undefined = Array.from(this.data).find((entity) => filter(entity)) satisfies T | undefined;

        if (init && entity) return this.init(entity);
        return entity;
    }

    public findAll(filter: (data: T) => boolean = (_ => true), init = false): Iterable<T> {
        const entities: T[] = Array.from(this.data).filter((entity) => filter(entity)) satisfies T[];

        if (init) return entities.map((entity: T) => this.init(entity));
        return entities;
    }

    public some(filter: (entity: T) => boolean = _ => false): boolean {
        return Array.from(this.data).some(filter);
    }

    public getAll(init = false): T[] {
        return Array.from(this.data).map((entity: T) => (init ? this.init(entity) : entity));
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