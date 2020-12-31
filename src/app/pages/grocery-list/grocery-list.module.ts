import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroceryListPageRoutingModule } from './grocery-list-routing.module';

import { GroceryListPage } from './grocery-list.page';
import { TranslateModule } from '@ngx-translate/core';

import { EditItemComponent } from './edit-item/edit-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    GroceryListPageRoutingModule
  ],
  declarations: [GroceryListPage, EditItemComponent]
})
export class GroceryListPageModule {}
