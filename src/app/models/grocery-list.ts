import { GroceryListItem } from "./grocery-list-item";

export class GroceryList {
    public groceryListItems: Array<GroceryListItem>;

    public constructor(){
        this.groceryListItems = new Array<GroceryListItem>();
    }

    public addGroceryItem(groceryListItem: GroceryListItem): void {
        this.groceryListItems.push(groceryListItem);
    }

    public removeGroceryListItem(groceryListItem: GroceryListItem): void {
        const index = this.groceryListItems.indexOf(groceryListItem, 0);
        if(index > -1){
            this.groceryListItems.splice(index, 1);
        }
    }
}