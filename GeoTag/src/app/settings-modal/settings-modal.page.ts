import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Device, DeviceListService } from '../device-list.service';
import { IconPickerPage } from '../tab3/device-list/icon-picker/icon-picker.page';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.page.html',
  styleUrls: ['./settings-modal.page.scss'],
})
export class SettingsModalPage implements OnInit {

  @Input() id: string;
  currentDevice: Device;
  originalName: string;

  constructor(private deviceListService: DeviceListService, private modalCtrl: ModalController) { }

  iconName: string
  ngOnInit() {
    this.currentDevice = this.deviceListService.getDevice(this.id);
    this.originalName = this.currentDevice.name;
    this.iconName = this.currentDevice.icon
  }
  save() {
    this.currentDevice.icon = this.iconName
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  cancel() {
    this.currentDevice.name = this.originalName;
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  deleteDevice() {
    this.deviceListService.deleteDevice(this.currentDevice.id);
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
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
}