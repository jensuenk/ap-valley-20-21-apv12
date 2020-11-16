import { Component, OnInit } from '@angular/core';
import { LocalNotificationsService } from '../local-notifications.service';
import { Device, DeviceListService } from '../device-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alert-settings',
  templateUrl: './alert-settings.page.html',
  styleUrls: ['./alert-settings.page.scss'],
})
export class AlertSettingsPage implements OnInit {

  currentID: string;
  currentDevice: Device;


  constructor(
    private localNotifs: LocalNotificationsService,
    private deviceListService: DeviceListService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    this.notifsEnabled = this.localNotifs.notifsEnabled;
    console.log(this.notifsEnabled);
    await this.deviceListService.getDevices();
    this.currentID = this.route.snapshot.paramMap.get('id');
    this.currentDevice = await this.deviceListService.getDevice(this.currentID)
    console.log(this.currentDevice);
  }

  saveSettings(){
    this.deviceListService.updateDevice(this.currentDevice);
  }

  setNotifsEnabled(ev: any){
    var newSetting;
    if (ev.detail.value == "true")
      newSetting = true;
    else
      newSetting = false;
    this.currentDevice.settings.alertsEnabled = newSetting;
    console.log('Notifications have been set to: ' + newSetting);
    this.deviceListService.updateDevice(this.currentDevice);
  }

  changeAlertType(ev: any) {
    this.currentDevice.settings.alertType = ev.detail.value;
    console.log('Notification type has been changed to: ', ev.detail.value);
    this.deviceListService.updateDevice(this.currentDevice);
  }
}
