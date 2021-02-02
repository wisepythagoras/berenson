export abstract class Recipe {
    abstract result: string;

    constructor() {}

    abstract roll(): Promise<any> | void;
    abstract unroll(): Promise<any> | void;
}
