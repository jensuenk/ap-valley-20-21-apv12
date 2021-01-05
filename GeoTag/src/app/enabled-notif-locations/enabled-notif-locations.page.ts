import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DeviceListService, EnabledLocation } from '../device-list.service';
import { NewEnabledLocationModalPage } from '../new-enabled-location-modal/new-enabled-location-modal.page';
import { Device } from '../device-list.service'
import { BluetoothService } from '../bluetooth.service';

declare var google: any;

@Component({
  selector: 'app-enabled-notif-locations',
  templateUrl: './enabled-notif-locations.page.html',
  styleUrls: ['./enabled-notif-locations.page.scss'],
})
export class EnabledNotifLocationsPage implements OnInit {

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
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewEnabledLocationModalPage,
      swipeToClose: true,
      componentProps: {
        'longitude': '0000',
        'latitude': '0000',
        'nickname': 'New Device',
        'iconName': 'keys',
        'secondaryText': ''
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.currentDevice.settings.enabledLocations.push(new EnabledLocation(data.nickname, data.iconName, data.latitude, data.longitude, data.secondaryText))
    //this.deviceListService.addEnabledLocation(this.currentDevice, new EnabledLocation(data.nickname, data.iconName, data.longitude, data.latitude));
    this.bluetoothService.syncData(this.currentDevice);
    this.deviceListService.updateDevice(this.currentDevice);
  }


}

export class IEnabledLocation{
  xCord: number;
  yCord: number;
  name: string;
  address: string;
}