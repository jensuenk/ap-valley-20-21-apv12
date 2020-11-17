import { flatten } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth/auth.service';
import { Device, DeviceListService } from './device-list.service';
import { LocalNotificationsService } from './local-notifications.service';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	public notificationCollection: AngularFirestoreCollection<Notification>;

	public notificationList: Array<Notification>;

	constructor(
		private afs: AngularFirestore, 
		private auth: AuthService, 
		private deviceListServcie: DeviceListService,
		private localNotificationsService: LocalNotificationsService
		) { }

	public currentAddress: string

	createTestNotification() {
		let notification: Notification = {
			id: "",
			message: "This is a notification discribtion",
			date: new Date(),
			device: this.deviceListServcie.createTestDevice(),
			icon: "notifications-outline",
			alert: false
		}
		this.addNotification(notification);
	}

	getNotifications() {
		this.notificationCollection = this.afs.collection<Notification>('/Users/' + this.auth.getUser().uid + '/Notififcations', ref => ref.orderBy('date', 'desc'));
		this.notificationCollection.valueChanges().subscribe((data) => {
			this.notificationList = data;
			this.notificationList.forEach(notification => {
				notification.date = notification.date.toDate()
			});
			//console.log(this.notificationList)
		})
		//this.notificationList.sort((a, b) => b.date.getTime() - a.date.getTime())
	}

	getNotification(id: string) {
		return this.notificationList.find(x => x.id == id);
	}

	addNotification(notification: Notification) {
		if (notification.alert) {
			this.localNotificationsService.sendNotification(notification)
		}
		const newId = this.afs.createId();
		notification.id = newId;
		this.notificationCollection.doc(newId).set(notification)
		return newId;
	}

	updateNotification(notification: Notification) {
		return this.notificationCollection.doc(notification.id).update(notification);
	}

	deleteNotification(id: string) {
		this.notificationCollection.doc(id).delete()
	}
}

export class Notification {
	id: string;
	message: string
	date: any;
	device: Device;
	icon: string
	alert: boolean

	constructor(id: string, message: string, date: Date, device: Device, icon: string, alert: boolean) {
		this.id = id;
		this.message = message;
		this.date = date;
		this.device = device;
		this.icon = icon;
		this.alert = alert
	}
}
