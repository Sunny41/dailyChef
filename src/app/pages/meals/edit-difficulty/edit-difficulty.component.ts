import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-difficulty',
  templateUrl: './edit-difficulty.component.html',
  styleUrls: ['./edit-difficulty.component.scss'],
})
export class EditDifficultyComponent implements OnInit {

  difficulties: any;
  difficulty: string = '';

  constructor(public viewCtrl: ModalController, private navParams: NavParams, private translate: TranslateService, private storage: StorageService) {
  }

 ngOnInit() {
   this.difficulties = this.storage.getDifficulties();
   this.difficulty = this.navParams.get('difficulty');
 }

 onChangeDifficulty(event){
  this.difficulty = event.detail.value;
 }

 dismissCancel() {
   this.viewCtrl.dismiss();
 }

 dismissSave() {
   this.viewCtrl.dismiss({difficulty: this.difficulty});
 }

}
