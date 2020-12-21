import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-cooking-time',
  templateUrl: './edit-cooking-time.component.html',
  styleUrls: ['./edit-cooking-time.component.scss'],
})
export class EditCookingTimeComponent implements OnInit {

  timeValueH: number;
  timeValueM: number;

  constructor(public viewCtrl: ModalController, private navParams: NavParams, private translate: TranslateService, private storage: StorageService) {
   }

  ngOnInit() {
    let valueH = this.navParams.get('timeValueH');
    let valueM = this.navParams.get('timeValueM');
    if(valueH === null){
      this.timeValueH = 0;
    }
    else{
      this.timeValueH = valueH;
    }

    if(valueM === null) {
      this.timeValueM = 0;
    }
    else {
      this.timeValueM = valueM;
    }
  }

  dismissCancel() {
    this.viewCtrl.dismiss();
  }

  dismissSave() {
    let timeData = {timeValueH: this.timeValueH, timeValueM: this.timeValueM};
    this.viewCtrl.dismiss(timeData);
  }
}
