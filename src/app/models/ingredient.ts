import { Category } from "./category";

export class Ingredient {
    public name: string;
    public amount: number;
    public calculatedAmount: number;
    public unit: string;
    public price: number;
    public category: Category;
    public servings: number;
    public description: string;

    public constructor(name: string) {
        this.name = name;
        this.amount = 0;
        this.unit = '';
        this.servings = 2;
    }

    public calculateNewAmount(servings: number): void {
        if(servings == 1) {
            this.calculatedAmount = this.amount;
        }
        else {
            this.calculatedAmount = (this.amount / this.servings) * servings;
        }
    }
}