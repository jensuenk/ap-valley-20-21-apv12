import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-time-icon-modal',
  templateUrl: './time-icon-modal.page.html',
  styleUrls: ['./time-icon-modal.page.scss'],
})
export class TimeIconModalPage implements OnInit {

  @Input() iconName: string;

  imgPath: string = './assets/images/profileIcons/';
  icons: string[] = [];
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.createIcons();
  }

  createIcons(){
    this.icons.push('defaultMan', 'defaultGirl', 'blackMan', 'businessWoman');
  }

  dismiss(name: string){
    this.modalCtrl.dismiss({
      'iconName': name
    });
  }
}
