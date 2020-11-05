import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Device, DeviceListService } from '../device-list.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.page.html',
  styleUrls: ['./settings-modal.page.scss'],
})
export class SettingsModalPage implements OnInit {

  @Input() id: number;
  currentDevice :Device;
  originalName:string;

  constructor(private deviceListService: DeviceListService, private modalCtrl:ModalController) { }

  ngOnInit() {
    this.currentDevice = this.deviceListService.getDevice(this.id);
    this.originalName = this.currentDevice.name;
  }
  save(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  cancel(){
    this.currentDevice.name=this.originalName;
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  deleteDevice(){
    this.deviceListService.deleteDevice(this.currentDevice);
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
