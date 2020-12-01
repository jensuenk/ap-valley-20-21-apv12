import { Component, OnInit } from '@angular/core';
import { Device, DeviceListService } from 'src/app/device-list.service';
import { IconPickerPage } from '../../icon-picker/icon-picker.page';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BluetoothService } from 'src/app/bluetooth.service';
import { NotificationService, Notification } from 'src/app/notification.service';

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
    private bluetoothService: BluetoothService,
    private notificationService: NotificationService
  ) { 
  }

  pingTest: boolean = true
  lastPing = "B"

  deviceList: Array<Device>;
  currentPosLongitude: any = 0;
  currentPosLatitude: any = 0;

  ngOnInit() {
    this.getPostion();
  }

  addDevice() {
    if (this.name == "") {
      this.name = "No name"
    }
    let newDevice: Device = {
      id: "",
      name: this.name,
      location: {
        latitude: this.currentPosLatitude,
        longitude: this.currentPosLongitude
      },
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
          latitude: "1",
          longitude: "1",
          enabled: true
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
    console.log(newDevice)

    this.devicelistService.addDevice(newDevice);
    this.router.navigate(['./device-list']);

  }

  iconName: string = 'key';
  name: string = ""


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
		this.geolocation
			.getCurrentPosition()
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
