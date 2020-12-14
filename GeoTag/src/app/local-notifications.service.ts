import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Notification } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  notifsEnabled: boolean;

  constructor(
    private alertController: AlertController
  ) { }

  sendNotification(notification: Notification) {
    this.alert(notification.message)
  }

  async alert(message) {
    const alert = await this.alertController.create({
      header: 'Notification',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
