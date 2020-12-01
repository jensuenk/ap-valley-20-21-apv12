import { Component, OnInit, Input } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
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

  private beginTimeDate: Date;
  private endTimeDate: Date;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private modalCtrl: ModalController,
    private slides: IonSlides
  ) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: TimeIconModalPage,
      swipeToClose: true,
      componentProps: {
        'iconName': this.iconName
      },
      cssClass: "accentModal"
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.iconName = data.iconName;
  }

  dismiss(){
    this.modalCtrl.dismiss({
      'iconName': this.iconName,
      'nickname': this.nickname,
      'endTime': this.endTime,
      'beginTime': this.beginTime
    });
  }

  InputChanged(){
    console.log("value changed");
    this.beginTime = this.beginTime;
    this.endTime = this.endTime;
  }

  MarcoNextSlide(){
    this.slides.slideNext();
  }

  BeginDateChanged(ev: any){
    this.beginTime = ev.detail.value.slice(11,16)
    console.log(this.beginTime)
  }

  EndDateChanged(ev: any){
    this.endTime = ev.detail.value.slice(11,16)
    console.log(this.endTime)
  }

  NicknameChanged(ev: any){
    console.log(ev);
    this.nickname = ev;
  }

  IconChange(newIcon: string){
    this.iconName = newIcon;
  }

}
