import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MealsPageRoutingModule } from './meals-routing.module';

import { MealsPage } from './meals.page';
import { TranslateModule } from '@ngx-translate/core';
import { MealComponent } from './meal/meal.component';
import { StorageService } from 'src/app/services/storage.service';
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    MealsPageRoutingModule
  ],
  declarations: [
    MealsPage, 
    MealComponent,
    EditIngredientComponent
  ],
  providers: [StorageService]
})
export class MealsPageModule {}
