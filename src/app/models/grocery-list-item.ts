import { Ingredient } from "./ingredient";

export class GroceryListItem extends Ingredient {
    public static ID_GROCERY_LIST_ITEMS = "GROCERY_LIST_ITEMS";
    public static ID_GROCERY_LIST_ITEM = "GROCERY_LIST_ITEM";
    public name;
    public checked: boolean;

    public constructor(name: string){
        super(name);
        this.checked = false;
    }
}