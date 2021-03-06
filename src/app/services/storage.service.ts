import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Difficulty } from '../models/diffuculty';
import { GroceryListItem } from '../models/grocery-list-item';
import { Meal } from '../models/meal';
import { TimeUnit } from '../models/time-unit';
import { Unit } from '../models/unit';
import { SystemSetting } from 'src/app/models/system-setting';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private systemSetting: SystemSetting;

  constructor(private storage: Storage) { }

  public getMeal(name: string): any {
    return this.storage.get(Meal.ID_MEALS).then(data => {
      let result = null;
      data.forEach(meal => {
        if(meal.name == name) {
          result = meal;
        }
      });
      return result;
    })
  }

  public getMeals(): any {
    return this.storage.get(Meal.ID_MEALS).then(data => {
      return data;
    });
  }

  public getCurrency() {
    this.storage.get(SystemSetting.ID_SYSTEM_SETTING).then(setting => {
      this.systemSetting = setting;
      return this.systemSetting.currency;
    });
  }

  public setMeal(meal: Meal): void {
    this.storage.get(Meal.ID_MEALS).then(data => {
      const index = data.findIndex(x => meal.gid == x.gid);
      data[index] = meal;
      this.storage.set(Meal.ID_MEALS, data);
    });
  }

  public setMeals(meals: Array<Meal>): void {
    this.storage.set(Meal.ID_MEALS, meals);
  }

  public getGroceryListItems() : any {
    return this.storage.get(GroceryListItem.ID_GROCERY_LIST_ITEMS).then(grocerylistitems => {
      return grocerylistitems;
    });
  }

  public addGraceryListItems(newItems: Array<GroceryListItem>): void {    
    this.storage.get(GroceryListItem.ID_GROCERY_LIST_ITEMS).then(data => {
      let groceryListItems = new Array<GroceryListItem>();
      groceryListItems = data;

      groceryListItems.forEach(item => {
        newItems.forEach(newItem => {
          if(!groceryListItems.includes(newItem, 0)){
            groceryListItems.push(newItem);
          }
          if(item.name == newItem.name) {
            item.amount += newItem.amount;
          }
        });
      })
      this.storage.set(GroceryListItem.ID_GROCERY_LIST_ITEMS, groceryListItems);
    });
  }

  public addGroceryListItem(newItem: GroceryListItem): void {
    this.storage.get(GroceryListItem.ID_GROCERY_LIST_ITEMS).then(data => {
      let groceryListItems = new Array<GroceryListItem>();
      groceryListItems = data;
      if(!groceryListItems.includes(newItem)){
        groceryListItems.push(newItem);
      }
      else {
        groceryListItems.forEach(item => {
          if(item.name == newItem.name) {
            item.amount += newItem.amount;
          }
        })
      }

      this.storage.set(GroceryListItem.ID_GROCERY_LIST_ITEMS, groceryListItems);
    });
  }

  public saveGroceryListItems(items : Array<GroceryListItem>) {
    this.storage.set(GroceryListItem.ID_GROCERY_LIST_ITEMS, items);
  }

  public getUnits(): Array<string> {
    let result = new Array<string>();
    result.push(Unit.GRAM);
    result.push(Unit.MILI_LITRE);
    result.push(Unit.PIECE);
    result.push(Unit.PINCH);
    result.push(Unit.TABLE_SPOON);
    result.push(Unit.TEA_SPOON);
    result.push(Unit.CUP_SOLID);
    result.push(Unit.CUP_VOLUME);
    result.push(Unit.FLUID_OZ);
    
    return result;
  }

  public getDifficulties(): Array<string> {
    let result = new Array<string>();
    result.push(Difficulty.EASY);
    result.push(Difficulty.MIDDLE);
    result.push(Difficulty.HARD);

    return result;
  }
}
