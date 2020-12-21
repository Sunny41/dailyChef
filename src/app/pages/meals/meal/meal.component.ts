import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Ingredient } from 'src/app/models/ingredient';
import { Meal } from 'src/app/models/meal';
import { StorageService } from 'src/app/services/storage.service';
import { ModalController } from '@ionic/angular';
import { EditIngredientComponent } from '../edit-ingredient/edit-ingredient.component';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {

  meal: Meal;
  mealForm: FormGroup;

  constructor(private modalController: ModalController, private translate: TranslateService, private route: ActivatedRoute, private router: Router, private storage: StorageService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.meal = this.router.getCurrentNavigation().extras.state.meal;
      }
      
      this.mealForm = this.fb.group(this.meal);
    });
  }

  ngOnInit() {
  }

  onSave(){
    
  }

  async addNewIngredient(){
    const modal = await this.modalController.create({
      component: EditIngredientComponent,
      componentProps: { ingredient: null }
    });

    modal.onDidDismiss().then(data=>{
      data.data.calculateNewAmount(this.meal.servings);
      this.meal.ingredients.push(data.data);
      this.storage.setMeal(this.meal);
    });

    return modal.present();
  }

  async editIngredient(ingredient: Ingredient){
    const modal = await this.modalController.create({
      component: EditIngredientComponent,
      componentProps: { ingredient: ingredient }
    });

    modal.onDidDismiss().then(data=>{
      data.data.calculateNewAmount(this.meal.servings);
      let index = this.meal.ingredients.indexOf(ingredient);
      this.meal.ingredients[index].name = data.data.name;
      this.meal.ingredients[index].amount = data.data.amount;
      this.meal.ingredients[index].unit = data.data.unit;
      this.storage.setMeal(this.meal);
    });

    return modal.present();
  }

  onChangeServings(event){
    if(this.mealForm.get('servings').value <= 0) {
      this.mealForm.patchValue( {servings: 1});
    }
    this.meal.servings = this.mealForm.get('servings').value;
    this.meal.ingredients.forEach(item => {
      item.calculateNewAmount(this.mealForm.get('servings').value);
    });
    this.storage.setMeal(this.meal);
  }
}
