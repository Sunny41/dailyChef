import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Meal } from 'src/app/models/meal';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AlertController, ModalController } from '@ionic/angular';
import { MealComponent } from './meal/meal.component';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage {
  meals: Array<Meal>;
  
  constructor(private translate: TranslateService, 
              private storage: StorageService, 
              private router: Router, 
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) { }

  ionViewWillEnter(){
    this.storage.getMeals().then(meals => {
      this.meals = meals;
    });
  }

  async onAddNewMeal() {
    const alert = await this.alertCtrl.create({
      message: this.translate.instant('MEALS.LABEL_QUESTION'),
      inputs: [
        {
          placeholder: this.translate.instant('MEALS.LABEL_NEW_FAVORITE_MEAL'),
          name: 'meal'
        }
      ], 
      buttons: [
        {
          text: this.translate.instant('GENERAL.LABEL_CANCEL'),
          role: 'cancel'
        },
        {
          text: this.translate.instant('GENERAL.LABEL_OK'),
          handler: (data)=> {
            if(data.meal){
              if(!this.meals){
                this.meals = [];
              }
              this.meals.push(new Meal(data.meal));
              this.storage.setMeals(this.meals);
            }
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  async onClickMeal(meal: Meal) {
    const modal = await this.modalCtrl.create({
      component: MealComponent,
      componentProps: { meal: meal}
       
    }); 
    await modal.present();
  }

  deleteMeal(meal: Meal){
    let index = this.meals.indexOf(meal);
    this.meals.splice(index, 1);
    this.storage.setMeals(this.meals);
  }
}
