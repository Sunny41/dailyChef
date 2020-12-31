import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditItemComponent } from './edit-item/edit-item.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.page.html',
  styleUrls: ['./grocery-list.page.scss'],
})
export class GroceryListPage implements OnInit {
  public items = [];
  public hidden = false;

  constructor(private modalCtrl: ModalController, private storageService: StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storageService.getGroceryListItems().then(items => {
      this.items = items;
    });
  }

  async editItem(index? : any){
    this.hidden = true;
    let componentProps;
    if(index != 'new'){
      componentProps = this.items[index];
    } else {
      componentProps = ''
    }
    const modal = await this.modalCtrl.create({
      componentProps: componentProps,
      component: EditItemComponent,
      cssClass: 'groceryListItem'
    });
    modal.onDidDismiss().then(data => {
      this.hidden = false;
      console.log(data);
      if(data.data){
        if(index != 'new') {
          this.items[index] = data.data;
        } else {
          if(!this.items){
            this.items = [];
          }
          this.items.push(data.data);
        }
      this.storageService.saveGroceryListItems(this.items);
      }
      
    });
    await modal.present();
  }

  safeItem(index: number){
    console.log(this.items[index]);
    this.items[index].checked = !this.items[index].checked;
    this.storageService.saveGroceryListItems(this.items);
  }

  deleteSelectedItems() {
    let tempItems = [];
    for (let i = 0; i< this.items.length; i++){
      if(!this.items[i].checked){
        tempItems.push(this.items[i]);
      }
    }
    this.storageService.saveGroceryListItems(tempItems);
    this.items = tempItems;
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.storageService.saveGroceryListItems(this.items);
  }
}
