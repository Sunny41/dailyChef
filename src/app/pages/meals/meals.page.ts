import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Meal } from 'src/app/models/meal';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage {
  meals: Array<Meal>;
  
  constructor(private translate: TranslateService, private storage: StorageService, private router: Router) { }

  ionViewWillEnter(){
    this.storage.getMeals().then(meals => {
      this.meals = meals;
    });
  }

  onClickMeal(meal: Meal): void {
    let navigationExtras: NavigationExtras = {
      state: {
        meal: meal
      }
    };
    this.router.navigate(['/meals/meal'], navigationExtras);
  }
}
