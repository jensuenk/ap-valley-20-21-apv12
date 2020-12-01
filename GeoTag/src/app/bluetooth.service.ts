import { Injectable } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { NotificationService, Notification } from './notification.service';
import { Device } from 'src/app/device-list.service';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  constructor(public navCtrl: NavController, private alertController: AlertController, private toastCtrl: ToastController, private notificationService: NotificationService) {
  }

  deviceName: string = "Bluno";



  async onDeviceDisconnected(peripheral) {
    let toast = this.toastCtrl.create({
      message: 'The peripheral unexpectedly disconnected',
      duration: 3000,
      position: 'middle'
    });
    (await toast).present();
  }

  async showError(error) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: error,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showToast(msj) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    await toast.present();
  }
}
interface Tag {
  "class": number,
  "id": string,
  "address": string,
  "name": string
}