import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DeviceListService, EnabledTime } from '../device-list.service';
import { NewEnabledTimeModalPage } from '../new-enabled-time-modal/new-enabled-time-modal.page'
import { Device } from '../device-list.service'

@Component({
  selector: 'app-enabled-notif-times',
  templateUrl: './enabled-notif-times.page.html',
  styleUrls: ['./enabled-notif-times.page.scss'],
})
export class EnabledNotifTimesPage implements OnInit {

  currentDeviceId: string;
  currentDevice: Device;

  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,
    private deviceListService: DeviceListService,
    private alertController: AlertController,
  ) { }

  async ngOnInit() {
    this.currentDeviceId = this.route.snapshot.paramMap.get('id');
    this.currentDevice = await this.deviceListService.getDevice(this.currentDeviceId)
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

    this.deviceListService.addEnabledTime(this.currentDevice, new EnabledTime(data.nickname, data.iconName, data.beginTime, data.endTime));
  }

  deleteTime(enabledTime: EnabledTime) {
    this.showAlert(enabledTime);
  }

  showAlert(enabledTime: EnabledTime) {
    this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to delete this setting?',
      buttons: [
        'Cancel',
        {
          text: 'OK',
          handler: () => {
            this.deviceListService.deleteEnabledTime(this.currentDevice, enabledTime);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }


  toggleSettings(ev: any) {
    var newSetting;
    if (ev.detail.value == "true")
      newSetting = true;
    else
      newSetting = false;
    this.currentDevice.settings.timeAlertsEnabled = newSetting;
    this.deviceListService.updateDevice(this.currentDevice);
  }
}