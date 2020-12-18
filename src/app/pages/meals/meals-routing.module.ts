import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MealComponent } from './meal/meal.component';

import { MealsPage } from './meals.page';

const routes: Routes = [
  {
    path: 'meal',
    component: MealComponent
  },
  {
    path: '',
    component: MealsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsPageRoutingModule {}
