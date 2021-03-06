import { Guid } from "guid-typescript";
import { Category } from "./category";
import { Difficulty } from "./diffuculty";
import { Ingredient } from "./ingredient";

export class Meal {
    public static ID_MEAL = "MEAL";
    public static ID_MEALS = "MEALS";

    public gid: string;
    public name: string;
    public ingredients: Array<Ingredient>;
    public categories: Array<Category>;
    public difficulty: string;
    public timeValueH: number;
    public timeValueM: number;
    public servings: number;
    public recipe: string;

    public constructor(name: string) {
        this.gid = Guid.create().toString();
        this.name = name;
        this.ingredients = new Array<Ingredient>();
        this.categories = new Array<Category>();
        this.difficulty = Difficulty.EASY;
        this.servings = 2;
        this.timeValueH = 0;
        this.timeValueM = 0;
    }

    public addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
    }

    public removeIngredient(ingredient: Ingredient): void {
        const index = this.ingredients.indexOf(ingredient, 0);
        if(index > -1) {
            this.ingredients.splice(index, 1);
        }
    }

    public addCategory(category: Category): void {
        this.categories.push(category);
    }

    public removeCategory(category: Category): void {
        const index = this.categories.indexOf(category, 0);
        if(index > -1){
            this.categories.splice(index, 1);
        }
    }
}