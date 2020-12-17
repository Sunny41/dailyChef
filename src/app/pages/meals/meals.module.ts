import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MealsPageRoutingModule } from './meals-routing.module';

import { MealsPage } from './meals.page';
import { TranslateModule } from '@ngx-translate/core';
import { MealComponent } from './meal/meal.component';
import { StorageService } from 'src/app/services/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MealsPageRoutingModule
  ],
  declarations: [
    MealsPage, 
    MealComponent
  ],
  providers: [StorageService]
})
export class MealsPageModule {}
