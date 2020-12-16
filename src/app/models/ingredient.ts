import { Category } from "./category";

export class Ingredient {
    public name: string;
    public amount: number;
    public unit: string;
    public price: number;
    public category: Category;
    public description: string;

    public constructor(name: string) {
        this.name = name;
    }
}