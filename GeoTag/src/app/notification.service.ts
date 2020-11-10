import { Injectable } from '@angular/core';
import { Device } from './device-list.service';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	notificationList: Array<Notification> = [
		{
			date: new Date(),
			device:
			{
				id: "1",
				name: 'Keys',
				location:
				{
					latitude: 1,
					longitude: 1
				},
				icon: "",
				address: ""
			}
		}
	];

	constructor() { }

	addNotification(date: Date, device: Device) {
		this.notificationList.push(new Notification(date, device));
		this; this.notificationList.sort((a, b) => b.date.getTime() - a.date.getTime())
	}
	getNotificationList(): Array<Notification> {
		return this.notificationList;
	}
}

export class Notification {
	date: Date;
	device: Device;

	constructor(date: Date, device: Device) {
		this.date = date;
		this.device = device;
	}
}
