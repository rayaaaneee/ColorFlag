import JSONAPI from "./json-api-interface";

abstract class API<T> implements JSONAPI<T> {

    public abstract readonly data: Array<T>;

    public abstract init(entity: T): T;
    public abstract getAll(init?: boolean): T[];
    public abstract get(codes: string[], init?: boolean): T[];

    public abstract find(code: string, where?: (data: T) => boolean, init?: boolean): T | undefined;
    public abstract exists(code: string, where?: (country: T) => boolean): boolean;

    public getRandomEntities(quantity: number = 1, where: ((data: T) => boolean) | undefined = _ => true, init: boolean | undefined = false): T[] {

        const countries: T[] = [];

        if (quantity > this.data.length) quantity = this.data.length;

        while (countries.length < quantity) {
            const country: T = this.getRandomEntity(init);

            if (!countries.includes(country) && (where(country))) {
                countries.push(country);
            }
        }

        return countries;
    }

    public getRandomEntity(init?: boolean | undefined): T {
        const index: number = Math.floor(Math.random() * this.data.length);
        const randomEntity: T = this.data[index];
        if (init) this.init(randomEntity);
        return randomEntity;
    }

}

export default API;