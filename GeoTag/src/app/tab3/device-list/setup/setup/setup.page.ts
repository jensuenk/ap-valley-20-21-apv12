import { Component, NgZone, OnInit } from '@angular/core';
import { Device, DeviceListService } from 'src/app/device-list.service';
import { IconPickerPage } from '../../icon-picker/icon-picker.page';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BluetoothService } from 'src/app/bluetooth.service';
import { NotificationService, Notification } from 'src/app/notification.service';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {

  constructor(
    public devicelistService: DeviceListService,
    private router: Router,
    private modalController: ModalController,
    private geolocation: Geolocation,
    private alertController: AlertController,
    private ngZone: NgZone,
    private bluetoothService: BluetoothService
  ) {
  }

  currentPosLongitude: any = 0;
  currentPosLatitude: any = 0;
  iconName: string = 'key';
  name: string = ""


  device: Device;

  ngOnInit() {
    this.getPostion();
  }

  createDevice() {
    this.device = {
      id: "",
      name: this.name,
      location: {
        latitude: this.currentPosLatitude,
        longitude: this.currentPosLongitude
      },
      isConnected: true,
      icon: this.iconName,
      address: this.devicelistService.currentAddress,
      locationHistory: [],
      settings: {
        alertType: 'Vibration',
        alertsEnabled: true,
        timeAlertsEnabled: true,
        locationAlertsEnabled: true,
        enabledLocations: [
          {
            nickname: 'Home',
            icon: 'home',
            latitude: this.currentPosLatitude,
            longitude: this.currentPosLongitude,
            enabled: true,
            secondaryText: ""
          }],
        enabledTimes: [
          {
            nickname: 'Lunch Time',
            icon: 'fast-food',
            beginTime: "12:00",
            endTime: "14:00",
            enabled: true
          }]
      }
    }

    this.ngZone.run(() => {
      this.bluetoothService.connect(this.device);
    });
  }

  saveDevice() {

    if (this.name == "") {
      this.name = "No name"
    }
    this.device.name = this.name;
    this.device.icon = this.iconName;

    this.devicelistService.addDevice(this.device);
    this.router.navigate(['./device-list']);
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: IconPickerPage,
      swipeToClose: true,
      componentProps: {
        'iconName': 'key',
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);
    this.iconName = data.iconName;
  }

  getPostion() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.currentPosLatitude = resp.coords.latitude;
        this.currentPosLongitude = resp.coords.longitude;

        this.createDevice();
      })
      .catch((error) => {
        this.locationAlert(error)
      });
  }

  async locationAlert(message) {
    const alert = await this.alertController.create({
      header: 'Could not get location',
      subHeader: 'An error accured trying to get your location:',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }



}
