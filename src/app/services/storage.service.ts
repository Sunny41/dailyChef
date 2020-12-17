import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Meal } from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

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

  public setMeal(meal: Meal): void {
    this.storage.get(Meal.ID_MEALS).then(data => {
      const index = data.findIndex(x => x.gid.value == meal.gid.value);
      data[index] = meal;
      this.storage.set(Meal.ID_MEALS, data);
    });
  }

  public setMeals(meals: Array<Meal>): void {
    this.storage.set(Meal.ID_MEALS, meals);
  }
}
