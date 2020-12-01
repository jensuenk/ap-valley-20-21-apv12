import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Device } from './device-list.service';
import { Notification, NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  constructor(private ble: BLE, public navCtrl: NavController, private alertController: AlertController, private toastCtrl: ToastController, private notificationService: NotificationService) {
  }

  deviceName: string = "Bluno";

  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  connect(device: Device) {
    console.log('Connecting to ' + device.name || device.address);
    this.ble.connect(device.address).subscribe(
      device => this.onConnected(device),
      device => this.onDeviceDisconnected(device)
    );
  }

  onConnected(device: Device) {
    console.log('Successfully connected to ' + (device.name || device.address));
  }

  async onDeviceDisconnected(device: Device) {
    let notification: Notification = {
      id: "",
      message: "You lost or forgot your " + device.name + "!",
      date: new Date(),
      device: device,
      icon: device.icon,
      alert: true
    }
    this.notificationService.addNotification(notification);
  }

  isConnected(device: Device) {
    this.ble.isConnected(device.address)
      .then(function () {
        console.log("Device is connected")
        return true;
      })
      .catch(function () {
        console.log("Device is not connected")
        return false;
      });
  }

  ring(device: Device) {
    this.sendData(device.address, "ring");
  }

  stopRing(device: Device) {
    this.sendData(device.address, "stop");
  }

  sendData(address, data: string) {
    var bytes = this.stringToBytes(data);
    this.ble.write(address, 'dfb0', 'dfb1', bytes)
      .then(function (result) {
        console.log("Got a response, successfully sent data.")
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  async showError(message) {
    const alert = await this.alertController.create({
      header: 'Bluetooth error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}