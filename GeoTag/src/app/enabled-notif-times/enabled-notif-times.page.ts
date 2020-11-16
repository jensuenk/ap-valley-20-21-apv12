import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DeviceListService, EnabledTime } from '../device-list.service';
import { NewEnabledTimeModalPage } from '../new-enabled-time-modal/new-enabled-time-modal.page'
import { Device } from '../device-list.service'

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
    private deviceListService: DeviceListService) { }

  async ngOnInit() {
    this.currentDeviceID = this.route.snapshot.paramMap.get('id');
    this.currentDevice = await this.deviceListService.getDevice(this.currentDeviceID)
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewEnabledTimeModalPage,
      swipeToClose: true,
      componentProps: {
        'beginTime': '0000',
        'endTime': '0000',
        'nickname': 'New Device',
        'iconName': 'keys'
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.deviceListService.addEnabledTime(this.currentDevice, new EnabledTime(data.nickname, data.iconName, data.beginTime, data.endTime));
  }
}