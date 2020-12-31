import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SystemSetting } from 'src/app/models/system-setting';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  systemSetting: SystemSetting;

  constructor(private storage: Storage, private translate: TranslateService) { }

  ionViewWillEnter(){
    this.storage.get(SystemSetting.ID_SYSTEM_SETTING).then(setting => {
      this.systemSetting = setting;
    });
  }

  onChangeLanguage(event){
    this.systemSetting.language = event.detail.value;
    this.translate.use(this.systemSetting.language);
    this.storage.set(SystemSetting.ID_SYSTEM_SETTING, this.systemSetting);
  }

  onChangeCurrency(event) {
    this.systemSetting.currency = event.detail.value;
    this.storage.set(SystemSetting.ID_SYSTEM_SETTING,this.systemSetting);
  }
}
