import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Ingredient } from 'src/app/models/ingredient';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.scss'],
})
export class EditIngredientComponent implements OnInit {

  ingredient: Ingredient;
  form: FormGroup;
  units: any;
  isReady:boolean = false;
  
  constructor(public viewCtrl: ModalController, private navParams: NavParams, private translate: TranslateService, private storage: StorageService) {     
    this.units = storage.getUnits();
  }

  ngOnInit() {
    this.ingredient = this.navParams.get('ingredient');
    if(this.ingredient === null || this.ingredient === undefined){
      this.ingredient = new Ingredient(" ");
    }
    this.isReady = true;
  }

  onChangeUnit(event){
    this.ingredient.unit = event.detail.value;
  }

  dismiss() {
    this.ingredient.calculatedAmount = this.ingredient.amount;
    this.viewCtrl.dismiss(this.ingredient);
  }
}
