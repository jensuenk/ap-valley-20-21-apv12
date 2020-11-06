import { Component } from '@angular/core';
import {Notification, NotificationService } from '../notification.service';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: [ 'tab2.page.scss' ]
})
export class Tab2Page {
	notificationList: Array<Notification>;
	constructor (private notificationService: NotificationService) {}

	ngOnInit () {
    this.notificationList = this.notificationService.getNotificationList();
   console.log(this.notificationList)
   this.notificationList[0].date.toLocaleTimeString().slice(0,5)
   
	}
}
