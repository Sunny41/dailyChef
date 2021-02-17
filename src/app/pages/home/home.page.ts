import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Meal } from 'src/app/models/meal';
import { SystemSetting } from 'src/app/models/system-setting';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public meals: Array<Meal>;

  constructor(private storage: Storage, private alertCtrl: AlertController, private translate: TranslateService, private router: Router) {
    this.meals = new Array<Meal>();
  }

  ionViewWillEnter() {

    this.storage.get(SystemSetting.ID_SYSTEM_SETTING).then(setting => {
      this.storage.get(Meal.ID_MEALS).then(meals => {
        this.meals = meals as Array<Meal>;
        if (setting == null) {
          var defaultSetting = SystemSetting.getDefaultSystemSettings();
          this.translate.use(defaultSetting.language);
          this.storage.set(SystemSetting.ID_SYSTEM_SETTING, defaultSetting);
        }
        else {
          this.translate.use(setting.language);
        }
      });
    });

  }




  async chooseRandomRecipe() {
    const random = Math.floor(Math.random() * this.meals.length);
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
