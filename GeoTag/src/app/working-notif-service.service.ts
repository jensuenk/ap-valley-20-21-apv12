import { Injectable } from '@angular/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx'

@Injectable({
  providedIn: 'root'
})
export class WorkingNotifServiceService {

  notifsEnabled: boolean
  constructor(
    private localNotifications: LocalNotifications
  ) { }

  generateNotif(id:number, text:string){

		console.log("Sending notification with id " + id + " and message " + text);
		this.localNotifications.schedule({
			title: "GeoTag Alert",
			id: id,
			text: text,
			sound: 'file://beep.caf',
		  });
	}
}
