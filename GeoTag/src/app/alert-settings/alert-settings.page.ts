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

  notifsEnabled: boolean;

  currentDeviceID: string;


  constructor(
    private localNotifs: LocalNotificationsService,
    private deviceListService: DeviceListService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.localNotifs.getNotifsEnabled(this.currentDeviceID);
    this.notifsEnabled = this.localNotifs.notifsEnabled;
    console.log(this.notifsEnabled);

    this.currentDeviceID = this.route.snapshot.paramMap.get('id');
  }

  setNotifsEnabled(val: boolean){
    this.localNotifs.setNotifsEnabled(val, this.currentDeviceID);
  }

  segmentChanged(ev: any) {
    console.log('Notification type has been changed to: ', ev.detail.value);
  }



}
