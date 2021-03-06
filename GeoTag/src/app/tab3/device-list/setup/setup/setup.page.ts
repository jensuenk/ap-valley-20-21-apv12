import { Component, NgZone, OnInit } from '@angular/core';
import { Device, DeviceListService } from 'src/app/device-list.service';
import { IconPickerPage } from '../../icon-picker/icon-picker.page';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BluetoothService } from 'src/app/bluetooth.service';

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
        alertType: 'Sound',
        alertsEnabled: true,
        timeAlertsEnabled: true,
        locationAlertsEnabled: true,
        enabledLocations: [],
        enabledTimes: []
      }
    }

    this.ngZone.run(() => {
      this.bluetoothService.connect(this.device);
    });
  }

  saveDevice() {
    this.createDevice();

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
    this.iconName = data.iconName;
  }

  getPostion() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.currentPosLatitude = resp.coords.latitude;
        this.currentPosLongitude = resp.coords.longitude;

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
