import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-icon-modal',
  templateUrl: './icon-modal.page.html',
  styleUrls: ['./icon-modal.page.scss'],
})
export class IconModalPage implements OnInit {

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
