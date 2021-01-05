import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Device, DeviceListService } from './device-list.service';
import { Notification, NotificationService } from './notification.service';
import { interval, Subscription } from 'rxjs';

const SERVICE_UUID = 'dfb0';
const CHARACTERISTIC_UUID = 'dfb1';

const source = interval(10000);

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {
  connectedDevices: Device[] = [];
  pingInterval;

  constructor(private ble: BLE, public navCtrl: NavController, private alertController: AlertController, private toastCtrl: ToastController, private notificationService: NotificationService, private deviceListService: DeviceListService, private geolocation: Geolocation) {
    
    const subscribe = source.subscribe(val => this.scedulePings());
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

  scan() {
    this.ble.scan([], 3).subscribe(
      data => {
      })
  }

  connect(device: Device) {
    console.log('Connecting to ' + device.name + ' ' + device.address + '...');
    this.ble.autoConnect(device.address, this.onConnected.bind(this, device), this.onDisconnected.bind(this, device));
  }

  async disconnect(device: Device) {
    this.sendData(device.address, "d");
    device.isConnected = false;
		await new Promise(resolve => setTimeout(resolve, 1000));
    this.ble.disconnect(device.address);
  }

  onConnected(device: Device) {
    console.log('Successfully connected to ' + device.name + ' ' + device.address);
    device.isConnected = true;
    this.ble.startNotification(device.address, SERVICE_UUID, CHARACTERISTIC_UUID).subscribe(
      data => {
        this.onDataChange(device, data);
      },
      () => console.log('Failed to subscribe for service state changes')
    )
    this.syncData(device);
    this.connectedDevices.push(device);
  }

  onDataChange(device, buffer: ArrayBuffer) {
    var data = new Uint8Array(buffer);

    this.ble.read(device.address, SERVICE_UUID, CHARACTERISTIC_UUID).then(
      data => this.onReadData(device, data),
      () => console.log('Failed to read incoming message')
    )
  }

  onReadData(device, buffer: ArrayBuffer) {
    var data = this.bytesToString(buffer);
    console.log("Read: ", data);
    if (data == "a") {
      let notification: Notification = {
        id: "",
        message: "You are ringing your phone from " + device.name + "!",
        date: new Date(),
        device: device,
        icon: device.icon,
        alert: true
      }
      this.notificationService.addNotification(notification);
    }
  }

  async onDisconnected(device: Device, error?) {
    if (this.shouldRingAtCurrentLocation(device) && this.shouldRingAtCurrentTime(device)) {
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
  
  
      this.geolocation.getCurrentPosition()
        .then((resp) => {
          let locationAndDate = {
            location: {
              latitude: resp.coords.latitude,
              longitude: resp.coords.longitude
            },
            date: new Date()
          }
          device.locationHistory.push(locationAndDate);
          //this.deviceListService.updateDevice(device);
        })
        .catch((error) => {
          console.log(error)
        });
    }
    console.log("Disconnected:", error);
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
    this.sendData(device.address, "r");
  }

  stopRing(device: Device) {
    this.sendData(device.address, "p");
  }

  enableVibration(device: Device) {
    this.sendData(device.address, "s");
  }

  enableSound(device: Device) {
    this.sendData(device.address, "l");
  }

  disableRing(device: Device) {
    this.sendData(device.address, "x");
  }

  enableRing(device: Device) {
    this.sendData(device.address, "z");
  }

  sendPing(device: Device) {
    this.sendData(device.address, "i");
  }

  syncData(device: Device) {
    if (device.settings.alertType == "Sound") {
      this.enableSound(device);
    }
    else if (device.settings.alertType == "Vibration") {
      this.enableVibration(device);
    }
    if (device.settings.alertsEnabled == true) {
      this.enableRing(device);
    }
    else {
      this.disableRing(device);
    }
    if (this.shouldRingAtCurrentLocation(device) && this.shouldRingAtCurrentTime(device)) {
      console.log("Should ring now")
      this.enableRing(device);
    }
    else {
      console.log("Should not ring now")
      this.disableRing(device);
    }
  }

  scedulePings() {
    this.connectedDevices.forEach(device => {
      if (device.isConnected) {
        this.sendPing(device);
      }
    });
  }

  shouldRingAtCurrentLocation(device: Device): boolean {
    var should: boolean = false;
    device.settings.enabledLocations.forEach(enabledLocation => {
      if (enabledLocation.nickname == "Home") {
        should = true;
      }
    });
    return should;
  }

  shouldRingAtCurrentTime(device: Device): boolean {
    var now = new Date();
    now.setHours(now.getHours() + 1);
    var should: boolean = false;
    device.settings.enabledTimes.forEach(enabledTime => {
      var beginHours = enabledTime.beginTime.split(":");
      var beginDate = new Date();
      beginDate.setHours(parseInt(beginHours[0])+1, parseInt(beginHours[1]));
      var endHours = enabledTime.endTime.split(":");
      var endDate = new Date();
      endDate.setHours(parseInt(endHours[0])+1, parseInt(endHours[1]));

      console.log("now", now, "begindate", beginDate, "enddate", endDate, now > beginDate && now < endDate)

      if (now > beginDate && now < endDate) {
        should = true;
      }
    });
    return should;
  }

  sendData(address: string, data: string) {
    var bytes = this.stringToBytes(data);
    this.ble.write(address, SERVICE_UUID, CHARACTERISTIC_UUID, bytes)
      .then(function (result) {
        console.log("Got a response, successfully sent data.", result)
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}