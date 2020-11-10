import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  notifsEnabled: boolean;

  constructor(
    private storage: Storage) { }

  setNotifsEnabled(enabled: boolean, id: string) {
    this.storage.set('notifsEnabled' + id, enabled);
    this.notifsEnabled = enabled;
    console.log('Notification have been changed to: ' + enabled);
  }

  async getNotifsEnabled(id: string) {
    await this.storage.get('notifsEnabled' + id).then((val) => {
      if (val == null){
        this.setNotifsEnabled(true, id);
        console.log('Value was null, notification are set to: ' + true);
        this.notifsEnabled = true;
      }
      else{
        console.log('Notification are set to: ' + val);
        this.notifsEnabled = val;
      }
    });
  }
}
