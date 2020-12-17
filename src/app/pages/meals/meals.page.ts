import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Meal } from 'src/app/models/meal';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage {
  meals: Array<Meal>;
  
  constructor(private translate: TranslateService, private storage: Storage) { }

  ionViewWillEnter(){
    this.storage.get(Meal.ID_MEALS).then(meals => {
      this.meals = meals;
    });
  }

  onClickMeal(meal: Meal): void {
    console.log(meal);
  }
}
