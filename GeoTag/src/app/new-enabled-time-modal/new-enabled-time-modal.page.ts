import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IconPickerPage } from '../tab3/device-list/icon-picker/icon-picker.page';
import { TimeIconModalPage } from './time-icon-modal/time-icon-modal.page';

@Component({
  selector: 'app-new-enabled-time-modal',
  templateUrl: './new-enabled-time-modal.page.html',
  styleUrls: ['./new-enabled-time-modal.page.scss'],
})
export class NewEnabledTimeModalPage implements OnInit {

  @Input() iconName: string;
  @Input() nickname: string;
  @Input() beginTime: string;
  @Input() endTime: string;

  private beginTimeHour: string;
  private beginTimeMinutes: string;

  private endTimeHour: string;
  private endTimeMinutes: string;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: TimeIconModalPage,
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
      'endTime': this.endTimeHour + ":" + this.endTimeMinutes,
      'beginTime': this.beginTimeHour + ":" + this.beginTimeMinutes
    });
  }

}
