import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Notification } from './notification.service';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx'

@Injectable({
  providedIn: 'root'
})
export class WorkingNotifServiceService {

  notifsEnabled:boolean
  constructor(
    private localNotifications: LocalNotifications
  ) { }

  generateNotif(id:number, text:string){
		this.localNotifications.schedule({
			id: id,
			text: text,
			sound: 'file://beep.caf',
		  });
	}
}
