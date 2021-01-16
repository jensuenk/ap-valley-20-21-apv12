import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { IconModalPage } from '../icon-modal/icon-modal.page';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {

  iconName: string = 'defaultMan.jpg';

  constructor(
    public actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private toastController: ToastController,
    private router: Router,
    private auth: AuthService,
    private inAppBrowser: InAppBrowser 
  ) {}

  ngOnInit() {
  }

    openDeviceList() {
      this.router.navigate(['/device-list'])
    }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Change Icon',
        icon: 'image',
        handler: () => {
          this.presentModal();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: IconModalPage,
      swipeToClose: true,
      componentProps: {
        'iconName': 'defaultMan',
      }    
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.iconName = data.iconName;
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your icon has been changed.',
      duration: 2000
    });
    toast.present();
  }

  logOut() {
    this.auth.signOut();
  }

  openWebsite() {
    const browser = this.inAppBrowser.create('https://geotag.store/');
  }
}
