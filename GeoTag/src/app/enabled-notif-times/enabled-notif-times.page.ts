import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewEnabledTimeModalPage } from '../new-enabled-time-modal/new-enabled-time-modal.page'

@Component({
  selector: 'app-enabled-notif-times',
  templateUrl: './enabled-notif-times.page.html',
  styleUrls: ['./enabled-notif-times.page.scss'],
})
export class EnabledNotifTimesPage implements OnInit {

  currentDeviceId: Number
  enabledTimes: IEnabledTime[];

  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController) { }

  ngOnInit() {
    this.currentDeviceId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.fillLocations();
  }

  fillLocations(){
    this.enabledTimes = [];

    var newLoc = new IEnabledTime();
    newLoc.name = 'Lunch Time';
    newLoc.time = '12:00 - 13:00'
    this.enabledTimes.push(newLoc)
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewEnabledTimeModalPage,
      swipeToClose: true,
      componentProps: {
        'beginTime': null,
        'endTime': null
      }
    });
    return await modal.present();
  }


}

export class IEnabledTime{
  time: string;
  name: string;
}