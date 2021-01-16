import { Component, OnInit } from '@angular/core';
import { LocalNotificationsService } from '../local-notifications.service';
import { Device, DeviceListService } from '../device-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BluetoothService } from '../bluetooth.service';

@Component({
  selector: 'app-alert-settings',
  templateUrl: './alert-settings.page.html',
  styleUrls: ['./alert-settings.page.scss'],
})
export class AlertSettingsPage implements OnInit {

  currentID: string;
  currentDevice: Device;

  private notifsEnabled: boolean;

  constructor(
    private localNotifs: LocalNotificationsService,
    private deviceListService: DeviceListService,
    private bluetoothService: BluetoothService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    this.notifsEnabled = this.localNotifs.notifsEnabled;
    await this.deviceListService.getDevices();
    this.currentID = this.route.snapshot.paramMap.get('id');
    this.currentDevice = await this.deviceListService.getDevice(this.currentID)
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
    this.deviceListService.updateDevice(this.currentDevice);
    if (ev.detail.value == "On") {
      this.bluetoothService.enableRing(this.currentDevice);
    }
    else if (ev.detail.value == "Off") {
      this.bluetoothService.disableRing(this.currentDevice);
    }
  }

  changeAlertType(ev: any) {
    this.currentDevice.settings.alertType = ev.detail.value;
    this.deviceListService.updateDevice(this.currentDevice);
    if (ev.detail.value == "Sound") {
      this.bluetoothService.enableSound(this.currentDevice);
    }
    else if (ev.detail.value == "Vibration") {
      this.bluetoothService.enableVibration(this.currentDevice);
    }
  }
}
