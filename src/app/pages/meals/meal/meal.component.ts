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
import { Difficulty } from 'src/app/models/diffuculty';
import { TimeUnit } from 'src/app/models/time-unit';
import { EditCookingTimeComponent } from '../edit-cooking-time/edit-cooking-time.component';
import { EditDifficultyComponent } from '../edit-difficulty/edit-difficulty.component';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {

  meal: Meal;
  mealForm: FormGroup;
  time:string = '';

  constructor(private modalController: ModalController, 
            private translate: TranslateService,
            private route: ActivatedRoute, 
            private router: Router, 
            private storage: StorageService, 
            private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.meal = this.router.getCurrentNavigation().extras.state.meal;

        this.setTimeValue();
      }
      
    });
  }

  ngOnInit() {    
    this.mealForm = this.fb.group(this.meal);
  }

  onSave(){
    
  }

  async addNewIngredient(){
    const modal = await this.modalController.create({
      component: EditIngredientComponent,
      componentProps: { ingredient: null }
    });

    modal.onDidDismiss().then(data=>{
      this.calculateNewAmount(data.data, this.meal.servings);
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
      if(data != null && data.data != null) {
        this.calculateNewAmount(data.data, this.meal.servings);
        let index = this.meal.ingredients.indexOf(ingredient);
        this.meal.ingredients[index].name = data.data.name;
        this.meal.ingredients[index].amount = data.data.amount;
        this.meal.ingredients[index].unit = data.data.unit;
        this.storage.setMeal(this.meal);
      }      
    });

    return modal.present();
  }

  onChangeServings(){
    if(this.mealForm.get('servings').value <= 0) {
      this.mealForm.patchValue( {servings: 1});
    }
    this.meal.servings = this.mealForm.get('servings').value;
    this.meal.ingredients.forEach(item => {
      this.calculateNewAmount(item, this.mealForm.get('servings').value);
    });
    this.storage.setMeal(this.meal);
  }

  calculateNewAmount(ingredient: Ingredient, servings: number): void {
    if(servings == 1) {
        ingredient.calculatedAmount = ingredient.amount;
    }
    else {
        ingredient.calculatedAmount = (ingredient.amount / ingredient.servings) * servings;
    }
  }

  deleteIngredient(ingredient: Ingredient){
    let index = this.meal.ingredients.indexOf(ingredient);
    this.meal.ingredients.splice(index, 1);
    this.storage.setMeal(this.meal);
  }

  async editTime() {
    const modal = await this.modalController.create({
      component: EditCookingTimeComponent,
      componentProps: {timeValueH: this.meal.timeValueH, timeValueM: this.meal.timeValueM}
    });

    modal.onDidDismiss().then(data=>{
      if(data != null && data.data != null) {
        this.meal.timeValueH = data.data.timeValueH < 0 ? 0 : data.data.timeValueH;
        this.meal.timeValueM = data.data.timeValueM < 0 ? 0 : data.data.timeValueM;
        this.setTimeValue();
        this.storage.setMeal(this.meal);
      }
    });

    return modal.present();
  }

  async editDifficulty() {
    const modal = await this.modalController.create({
      component: EditDifficultyComponent,
      componentProps: {difficulty: this.meal.difficulty}
    });

    modal.onDidDismiss().then(data=>{
      if(data != null && data.data != null) {
        this.meal.difficulty = data.data.difficulty;
        this.storage.setMeal(this.meal);
      }
    });

    return modal.present();
  }

  setTimeValue(): void {
    this.time = '';
    if(this.meal.timeValueH > 0) {
      this.time += this.meal.timeValueH + 'h ';
    }
    if(this.meal.timeValueM > 0) {
      this.time += this.meal.timeValueM + 'min';
    }
  }
}
