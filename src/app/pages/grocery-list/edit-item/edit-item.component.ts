import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ModalController, NavParams } from '@ionic/angular';
import { GroceryListItem } from '../../../models/grocery-list-item'
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit {
  public new = false;
  public name;
  private id; 
  public amount;
  public unit;
  public price;
  public units;
  public currency;

  constructor(private modalCtrl: ModalController, private navParams: NavParams, private storageService: StorageService) { 
    this.units = this.storageService.getUnits();
    this.currency = this.storageService.getCurrency();
    if(this.navParams.get('name')){
      this.name = this.navParams.get('name');
      this.new = false;
    } else {
      this.new = true;
    }
  }

  ngOnInit() {
    
  }

  onChangeUnit(event){
    this.unit = event.detail.value;
  }

  close(){
    this.modalCtrl.dismiss();
  }

  dismissSave(){
    if(this.name){
      const item = new GroceryListItem(this.name);
      item.amount = this.amount;
      item.unit = this.unit;
      item.price = this.price;
      this.modalCtrl.dismiss(item);
    }
  }
}
