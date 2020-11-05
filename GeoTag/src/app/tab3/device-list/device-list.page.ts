import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Device, DeviceListService } from '../../device-list.service';
import { ModalController } from '@ionic/angular';
import { SettingsModalPage } from '../../settings-modal/settings-modal.page';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {

  constructor(private devicelistService: DeviceListService, public modalController:ModalController) { }

  deviceList: Array<Device>;

  ngOnInit() {
    this.deviceList = this.devicelistService.getDevices();
  }

  async presentSettingsModal(id : number) {
    const modal = await this.modalController.create({
      component: SettingsModalPage,
      swipeToClose: true,
      showBackdrop: true,
      cssClass: 'modal',
      componentProps: {
        'id': id,
      }
    });
    modal.onDidDismiss().then(x=>{
      this.deviceList = this.devicelistService.deviceList;
    });
    return await modal.present();
  }

}
