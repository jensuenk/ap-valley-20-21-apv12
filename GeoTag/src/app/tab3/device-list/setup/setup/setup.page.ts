import { Component, OnInit } from '@angular/core';
import { Device, DeviceListService } from 'src/app/device-list.service';
import { IconPickerPage } from '../../icon-picker/icon-picker.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  ) { }

  deviceList: Array<Device>;

  ngOnInit() {
  }

  addDevice() {
    let newDevice: Device = {
      id: "",
      name: this.name,
      location: {
        latitude: 20,
        longitude: 20
      },
      icon: this.iconName,
      address: this.devicelistService.currentAddress
    }
    console.log(newDevice)
    this.devicelistService.addDevice(newDevice);
    this.router.navigate(['./device-list']);
  }

  iconName: string = 'key';
  name: string


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
}
