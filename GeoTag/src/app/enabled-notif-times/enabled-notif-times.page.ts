import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DeviceListService, EnabledTime } from '../device-list.service';
import { NewEnabledTimeModalPage } from '../new-enabled-time-modal/new-enabled-time-modal.page'
import { Device } from '../device-list.service'
import { BluetoothService } from '../bluetooth.service';

@Component({
  selector: 'app-enabled-notif-times',
  templateUrl: './enabled-notif-times.page.html',
  styleUrls: ['./enabled-notif-times.page.scss'],
})
export class EnabledNotifTimesPage implements OnInit {

  currentDeviceID: string;
  currentDevice: Device;

  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,
    private deviceListService: DeviceListService,
    private bluetoothService: BluetoothService) { }

  async ngOnInit() {
    this.currentDeviceID = this.route.snapshot.paramMap.get('id');
    this.currentDevice = await this.deviceListService.getDevice(this.currentDeviceID)
    /*if (this.currentDevice == null){
      this.currentDevice = {
        id: "",
        name: "TestDevice",
        location: {
          latitude: 20,
          longitude: 20
        },
        locationHistory: [{
          location: {
            latitude: 20,
            longitude: 20
          },
          date: new Date()
        }],
        icon: "home",
        address: "",
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
    }*/
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewEnabledTimeModalPage,
      swipeToClose: true,
      componentProps: {
        'beginTime': null,
        'endTime': null,
        'nickname': null,
        'iconName': null
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);
    this.currentDevice.settings.enabledTimes.push(new EnabledTime(data.nickname, data.iconName, data.beginTime, data.endTime))
    this.bluetoothService.syncData(this.currentDevice);
    this.deviceListService.updateDevice(this.currentDevice);
  }
}