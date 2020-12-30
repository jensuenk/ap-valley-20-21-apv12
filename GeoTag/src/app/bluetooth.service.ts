import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Device } from './device-list.service';
import { Notification, NotificationService } from './notification.service';
import { interval } from 'rxjs';

const SERVICE_UUID = 'dfb0';
const CHARACTERISTIC_UUID = 'dfb1';

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
    console.log('Connecting to ' + device.name + ' ' + device.address);
    this.ble.connect(device.address).subscribe(
      response => this.onConnected(device),
      response => this.onDeviceDisconnected(device)
    );
  }

  onConnected(device: Device) {
    console.log('Successfully connected to ' + device.name + ' ' + device.address);

    /*
    this.ble.startNotification(device.address, SERVICE_UUID, CHARACTERISTIC_UUID).subscribe(
      data => console.log(data),
      () => this.showError('Failed to subscribe for service state changes')
    )
    */

    this.ble.startNotification(device.address, SERVICE_UUID, CHARACTERISTIC_UUID).subscribe(
      data => this.onDataChange(data),
      () => this.showError('Failed to subscribe for service state changes')
    )

    // Read the current value of the characteristic
    this.ble.read(device.address, SERVICE_UUID, CHARACTERISTIC_UUID).then(
      data => this.onReadData(data),
      () => this.showError('Failed to read')
    )
    /*

      interval(1000).subscribe(x => {
        this.ble.read(device.address, SERVICE_UUID, CHARACTERISTIC_UUID)
          .then(function (data) {
            console.log(data)
          })
          .catch(function (failure) {
            console.log(failure)
        });
      });
      */
  }
  onDataChange(buffer:ArrayBuffer) {
    var data = new Uint8Array(buffer);
    // You will get the notification data here
    console.log(data);
  }

  onReadData(buffer: ArrayBuffer) {
    var data = new Uint8Array(buffer);
    // You will get the read data here
    console.log(data);

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
    this.isConnected(device);
  }

  isConnected(device: Device) {
    this.ble.isConnected(device.address)
      .then(function () {
        device.isConnected = true;
      })
      .catch(function () {
        device.isConnected = false;
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
    this.ble.write(address, SERVICE_UUID, CHARACTERISTIC_UUID, bytes)
      .then(function (result) {
        console.log("Got a response, successfully sent data.", result)
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