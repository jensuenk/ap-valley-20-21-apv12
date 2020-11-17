import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { NotificationService, Notification } from './notification.service';
import { Device } from 'src/app/device-list.service';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  constructor(public navCtrl: NavController, private alertController: AlertController, private bluetoothSerial: BluetoothSerial, private toastCtrl: ToastController, private notificationService: NotificationService) {
    this.checkBluetoothEnabled();
  }

  pairedList: Array<Tag>;
  listToggle: boolean = false;
  pairedDeviceID: number = 0;

  connectedDevicesList: Array<Device> = [];

  startDisconnectSubscriber(newDevice: Device) {
    this.bluetoothSerial.connect(newDevice.address).subscribe(success => {
      this.showToast(newDevice.name + " connected successfully")
      this.connectedDevicesList.push(newDevice)
    }, error => {
      console.log(error)
      if (this.connectedDevicesList.includes(newDevice)) {
        console.log(error)
        let notification: Notification = {
          id: "",
          message: "You forgot or lost your " + newDevice.name + ".",
          date: new Date(),
          device: newDevice,
          icon: "notifications-outline",
          alert: true
          
        }
        this.notificationService.addNotification(notification)
      }
      this.connectedDevicesList.forEach( (item, index) => {
        if(item === newDevice) this.connectedDevicesList.splice(index,1);
      });
      this.startDisconnectSubscriber(newDevice)
    });
  }
  checkBluetoothEnabled(){
    this.bluetoothSerial.isEnabled().then(success => {
      this.listPairedDevices();
    }, error => {
      this.showError("Please Enable Bluetooth")
    });
  }

  listPairedDevices() {
    this.bluetoothSerial.list().then(success => {
      this.pairedList = success;
      console.log(this.pairedList)
      this.listToggle = true;
    }, error => {
      this.showError("Please Enable Bluetooth")
      this.listToggle = false;
    });
  }

  selectDevice() {
    let connectedDevice = this.pairedList[this.pairedDeviceID];
    if (!connectedDevice.address) {
      this.showError('Select Paired Device to connect');
      return;
    }
    let address = connectedDevice.address;
    let name = connectedDevice.name;

    this.connect(address);
  }

  connect(address) {
    // Attempt to connect device with specified address, call app.deviceConnected if success
    this.bluetoothSerial.connect(address).subscribe(success => {
      this.deviceConnected();
      console.log("Successfully Connected");
    }, error => {
    
    });
  }

  deviceConnected() {
    // Subscribe to data receiving as soon as the delimiter is read
    this.bluetoothSerial.subscribe('\n').subscribe(success => {
      this.handleData(success);
      console.log("Connected Successfullly");
    }, error => {
      this.showError(error);
    });
  }

  deviceDisconnected() {
    // Unsubscribe from data receiving
    this.bluetoothSerial.disconnect();
    console.log("Device Disconnected");
  }

  handleData(data) {
    console.log(data);
  }

  sendData(dataSend) {
    dataSend+='\n';
    console.log(dataSend);

    this.bluetoothSerial.write(dataSend).then(success => {
      console.log(success);
    }, error => {
      console.log(error)
    });
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