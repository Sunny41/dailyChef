import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Meal } from 'src/app/models/meal';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public meals: Array<Meal>;

  constructor(private storage: Storage, private alertCtrl: AlertController, translate: TranslateService) {
    this.meals = new Array<Meal>(); 
  }

  ionViewWillEnter(){
    this.storage.get(Meal.ID_MEALS).then(meals => {
      this.meals = meals as Array<Meal>;
    })
  }

  async add() {
    const alert = await this.alertCtrl.create({
      message: 'Was möchtest du hinzufügen?',
      inputs: [
        {
          placeholder: 'Neues Lieblingsgericht',
          name: 'favorite'
        }
      ], 
      buttons: [
        {
          text: 'ok',
          handler: (data)=> {
            if(data.favorite){
              this.meals.push(new Meal(data.favorite));
              this.storage.set(Meal.ID_MEALS,  this.meals);
            }
            console.log(data);
          }
        }
      ]
    });
    await alert.present();
  }

  delete(index:number) {
    this.meals.splice(index, 1);
    this.storage.set(Meal.ID_MEALS, this.meals);
  }

  async chooseRandomRecipe() {
    const random = Math.floor(Math.random()*this.meals.length);
    const alert = await this.alertCtrl.create({
      message: 'Wir machen heute ' + this.meals[random].name,
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }]
    });
    await alert.present();
  }
}
