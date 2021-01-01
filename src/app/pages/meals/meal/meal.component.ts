import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, NavParams } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Ingredient } from "src/app/models/ingredient";
import { Meal } from "src/app/models/meal";
import { StorageService } from "src/app/services/storage.service";
import { ModalController } from "@ionic/angular";
import { EditIngredientComponent } from "../edit-ingredient/edit-ingredient.component";
import { FormBuilder, FormGroup, NgModel } from "@angular/forms";
import { Difficulty } from "src/app/models/diffuculty";
import { TimeUnit } from "src/app/models/time-unit";
import { EditCookingTimeComponent } from "../edit-cooking-time/edit-cooking-time.component";
import { EditDifficultyComponent } from "../edit-difficulty/edit-difficulty.component";

@Component({
  selector: "app-meal",
  templateUrl: "./meal.component.html",
  styleUrls: ["./meal.component.scss"],
})
export class MealComponent implements OnInit {
  meal: Meal;
  mealForm: FormGroup;
  time: string = "";
  overlay = false;

  constructor(
    private modalController: ModalController,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private navParams: NavParams
  ) {
    this.meal = this.navParams.get('meal');
    this.setTimeValue();
  }

  ngOnInit() {
    this.mealForm = this.fb.group(this.meal);
  }

  onSave() {}

  async addNewIngredient() {
    const modal = await this.modalController.create({
      component: EditIngredientComponent,
      componentProps: { ingredient: null },
    });

    modal.onDidDismiss().then((data) => {
      this.calculateNewAmount(data.data, this.meal.servings);
      this.meal.ingredients.push(data.data);
      this.storage.setMeal(this.meal);
    });

    return modal.present();
  }

  async editIngredient(ingredient: Ingredient) {
    const modal = await this.modalController.create({
      component: EditIngredientComponent,
      componentProps: { ingredient: ingredient },
      cssClass: 'groceryListItem'
    });

    modal.onDidDismiss().then((data) => {
      this.overlay = false;
      if (data != null && data.data != null) {
        this.calculateNewAmount(data.data, this.meal.servings);
        let index = this.meal.ingredients.indexOf(ingredient);
        this.meal.ingredients[index].name = data.data.name;
        this.meal.ingredients[index].amount = data.data.amount;
        this.meal.ingredients[index].unit = data.data.unit;
        this.storage.setMeal(this.meal);
      }
    });
    this.overlay = true;
    return modal.present();
  }

  onChangeServings() {
    this.meal.ingredients.forEach((item) => {
      this.calculateNewAmount(item, this.meal.servings);
    });
    this.storage.setMeal(this.meal);
  }

  calculateNewAmount(ingredient: Ingredient, servings: number): void {
    if (servings == 1) {
      ingredient.calculatedAmount = ingredient.amount;
    } else {
      ingredient.calculatedAmount =
        (ingredient.amount / ingredient.servings) * servings;
    }
  }

  deleteIngredient(ingredient: Ingredient) {
    let index = this.meal.ingredients.indexOf(ingredient);
    this.meal.ingredients.splice(index, 1);
    this.storage.setMeal(this.meal);
  }

  async editTime() {
    const modal = await this.modalController.create({
      component: EditCookingTimeComponent,
      componentProps: {
        timeValueH: this.meal.timeValueH,
        timeValueM: this.meal.timeValueM,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data != null && data.data != null) {
        this.meal.timeValueH =
          data.data.timeValueH < 0 ? 0 : data.data.timeValueH;
        this.meal.timeValueM =
          data.data.timeValueM < 0 ? 0 : data.data.timeValueM;
        this.setTimeValue();
        this.storage.setMeal(this.meal);
      }
    });

    return modal.present();
  }

  async editDifficulty() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant("MEAL.LABEL_DIFFICULTY"),
      inputs: [
        {
          type: "radio",
          value: "EASY",
          label: this.translate.instant("MEAL.EASY"),
          checked: this.meal.difficulty === "EASY",
        },
        {
          type: "radio",
          value: "MIDDLE",
          label: this.translate.instant("MEAL.MIDDLE"),
          checked: this.meal.difficulty === "MIDDLE",
        },
        {
          type: "radio",
          value: "HARD",
          label: this.translate.instant("MEAL.HARD"),
          checked: this.meal.difficulty === "HARD",
        },
      ],
      buttons: [
        {
          text: this.translate.instant("GENERAL.LABEL_CANCEL"),
          role: "calcel",
        },
        {
          text: this.translate.instant("GENERAL.LABEL_SAVE"),
          handler: (data) => {
            console.log(data);
            if (data) {
              this.meal.difficulty = data;
              this.storage.setMeal(this.meal);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  setTimeValue(): void {
    this.time = "";
    if (this.meal.timeValueH > 0) {
      this.time += this.meal.timeValueH + "h ";
    }
    if (this.meal.timeValueM > 0) {
      this.time += this.meal.timeValueM + "min";
    }
  }

  close(){
    this.modalController.dismiss();
  }

  increaseServings(){
    this.meal.servings ++;
    this.onChangeServings();
  }

  decreaseServings(){
    if(this.meal.servings >= 2) {
      this.meal.servings--;
      this.onChangeServings();
    }
  }

  saveAndExit() {
    this.storage.setMeal(this.meal);
    this.modalController.dismiss();
  }
}
