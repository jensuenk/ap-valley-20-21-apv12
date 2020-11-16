import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocationIconModalPage } from './location-icon-modal/location-icon-modal.page';

declare var google: any;

@Component({
  selector: 'app-new-enabled-location-modal',
  templateUrl: './new-enabled-location-modal.page.html',
  styleUrls: ['./new-enabled-location-modal.page.scss'],
})
export class NewEnabledLocationModalPage {

  @Input() iconName: string;
  @Input() nickname: string;
  @Input() longitude: string;
  @Input() latitude: string;
  private address: string;


  constructor(
    private modalCtrl: ModalController
  ) { }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: LocationIconModalPage,
      swipeToClose: true,
      componentProps: {
        'iconName': this.iconName
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.iconName = data.iconName;
  }

  dismiss(){
    this.modalCtrl.dismiss({
      'iconName': this.iconName,
      'nickname': this.nickname,
      'longitude': this.longitude,
      'latitude': this.latitude
    });
  }
}
