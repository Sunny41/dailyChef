import { Category } from "./category";

export class Ingredient {
    public name: string;
    public amount: any;
    public calculatedAmount: number;
    public unit: string;
    public price: number;
    public category: Category;
    public servings: number;
    public description: string;

    public constructor(name: string) {
        this.name = name;
        this.amount = '';
        this.unit = '';
        this.servings = 2;
    }
}