import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DeviceListService, EnabledLocation } from '../device-list.service';
import { NewEnabledLocationModalPage } from '../new-enabled-location-modal/new-enabled-location-modal.page';
import { Device } from '../device-list.service'

@Component({
  selector: 'app-enabled-notif-locations',
  templateUrl: './enabled-notif-locations.page.html',
  styleUrls: ['./enabled-notif-locations.page.scss'],
})
export class EnabledNotifLocationsPage implements OnInit {

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
    this.deviceListService.addEnabledLocation(this.currentDevice, new EnabledLocation(data.nickname, data.iconName, data.longitude, data.latitude, data.secondaryText));
  }

  deleteLocation(enabledLocation: EnabledLocation){
    this.showAlert(enabledLocation)
  }

  showAlert(enabledLocation: EnabledLocation) {

    this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to delete this setting?',
      buttons: [
        'Cancel', 
        {
          text: 'OK',
          handler: (data: any) =>{
            this.deviceListService.deleteEnabledLocation(this.currentDevice, enabledLocation);
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
    this.currentDevice.settings.locationAlertsEnabled = newSetting;
    this.deviceListService.updateDevice(this.currentDevice);
  }
}

export class IEnabledLocation{
  xCord: number;
  yCord: number;
  name: string;
  address: string;
}