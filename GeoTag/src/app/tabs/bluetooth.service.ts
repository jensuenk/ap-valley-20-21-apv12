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
  timer:number = 50000;
  mode: string = "s"; //or l'oud', change somewehere in else in the app
  i:number = 0; //for loops
  //maximum 10 numbers. there is no need to order them.
  offtimes:number[] = [770, 0,0,0,0,0,0,0,0,0]; //time in seconds ex 12:00 = 12*3600
  ontimes:number[] = [800,0,0,0,0,0,0,0,0,0];

  lattitudes:number[] = [0,0,0,0,0];
  longitudes:number[] = [0,0,0,0,0];

  current_lattitude:number;
  current_longitude:number;

  //time stuff
  time:Date = new Date();


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

    this.sendData(device.address, this.mode); //synchronize mode
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

  loudmode(device: Device){
    this.mode = "l";
    this.sendData(device.address, this.mode);
  }
  silentmode(device: Device){
    this.mode = "s";
    this.sendData(device.address, this.mode);
  }
  sendSilentzones(device: Device){
    this.sendData(device.address, "a");
    for(this.i = 0; this.i < 5; this.i++){
      this.sendData(device.address, (this.longitudes[this.i]).toString());
    }
    for(this.i = 0; this.i < 5; this.i++){
      this.sendData(device.address, (this.lattitudes[this.i]).toString());
    }
  }
  sendCurrentlocation(device: Device){
    this.sendData(device.address, "b");
    this.sendData(device.address, this.current_lattitude.toString());
    this.sendData(device.address, this.current_longitude.toString());
  }

  isConnected(device: Device) {
    this.ble.isConnected(device.address)
      .then(function () {
        device.isConnected = true;
      })
      .catch(function () {
        device.isConnected = false;
      });
      //record 5 minutes every time
      this.timer -= 1;
      if(this.timer == 0){
        this.timer=50000;
        this.sendData(device, this.mode); //either send silent or loud
        //send loud to turn the buzzer on at for example 15 o clock
      }
  }

  ring(device: Device) {
    this.sendData(device.address, "r");
  }

  stopRing(device: Device) {
    this.sendData(device.address, "h");
  }


  setClock(device: Device){
    //get current time
    //convert hours to minutes, add current minutes, set arduino clock
    this.time = new Date(); //update time
    let time_in_minutes:number = 0; //create temp variable
    time_in_minutes = (this.time.getHours() * 60) + this.time.getMinutes(); //calc time in muinutes
    
    this.sendData(device.address, "c");
    this.sendData(device.address, time_in_minutes.toString());
  }
  
 
  sendtimes(device: Device){
    this.sendData(device.address, "t"); //set tag in time mode
    
    for(this.i = 0; this.i < 10; this.i++){
      this.sendData(device.address, (this.ontimes[this.i]).toString());
    }

    for(this.i = 0; this.i < 10; this.i++){
      this.sendData(device.address, (this.offtimes[this.i]).toString());
    }
  }

  sendData(address, data: string) {
    var bytes = this.stringToBytes(data);
    this.ble.write(address, 'dfb0', 'dfb1', bytes)
      .then(function (result) {
        console.log("Got a response, successfully sent data.");
      })
      .catch(function (error) {
        console.log(error);
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