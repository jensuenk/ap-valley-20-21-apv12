import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth/auth.service';
import { WorkingNotifServiceService } from './working-notif-service.service';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	public notificationCollection: AngularFirestoreCollection<Notification>;
	public notificationList: Array<Notification>;

	constructor(
		private afs: AngularFirestore,
		private auth: AuthService,
		private notificationService: WorkingNotifServiceService
	) { }

	createTestNotification() {
		let notification: Notification = {
			id: "",
			message: "This is a notification discription",
			date: new Date(),
			deviceId: "test-id",
			deviceName: "Test Device Name",
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
			console.log("DEBUG: Notification list changed (notification.service.ts -> getNotifications sub)")
		});
	}

	getNotification(id: string) {
		return this.notificationList.find(x => x.id == id);
	}

	addNotification(notification: Notification) {
		if (notification.alert) {
			var id = new Date().getUTCMilliseconds() * Math.random();
			this.notificationService.generateNotif(id, notification.message)
		}
		const newId = this.afs.createId();
		notification.id = newId;
		this.notificationCollection.doc(newId).set(notification);
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
	deviceId: string;
	deviceName: string;
	icon: string
	alert: boolean

	constructor(id: string, message: string, date: Date, deviceId: string, deviceName: string, icon: string, alert: boolean) {
		this.id = id;
		this.message = message;
		this.date = date;
		this.deviceId = deviceId;
		this.deviceName = deviceName;
		this.icon = icon;
		this.alert = alert
	}
}
