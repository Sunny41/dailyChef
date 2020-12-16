import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public recipes;

  constructor(private storage: Storage, private alertCtrl: AlertController) {

  }

  ionViewWillEnter(){
    this.storage.get('recipes').then(recipes=>{
      this.recipes = recipes;
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
              if(!this.recipes){
                this.recipes = [];
              }
              this.recipes.push(data.favorite);
              this.storage.set('recipes',  this.recipes);
            }
            console.log(data);
          }
        }
      ]
    });
    await alert.present();
  }

  delete(index) {
    const temp = []
    for(let i = 0; i< this.recipes.length; i++){
      if(i != index){
        temp.push(this.recipes[i]);
      }
    }
    this.recipes = temp;
    this.storage.set('recipes', this.recipes);
  }

  async chooseRandomRecipe() {
    const random = Math.floor(Math.random()*this.recipes.length);
    const alert = await this.alertCtrl.create({
      message: 'Wir machen heute ' + this.recipes[random],
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }]
    });
    await alert.present();
  }
}
