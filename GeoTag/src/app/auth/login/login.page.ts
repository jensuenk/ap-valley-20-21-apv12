import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController, LoadingController } from '@ionic/angular';
import { DeviceListService } from 'src/app/device-list.service';
import { NotificationService } from 'src/app/notification.service';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private deviceListService: DeviceListService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  logIn(email, password) {
    this.authService.signIn(email.value, password.value)
      .then(async () => {
        this.presentLoading();
        var tries : number = 0; 
        while (!this.authService.isLoggedIn) {
          await this.presentLoading()
          tries++;
          if (tries > 10) {
            return;
          }
        }
        this.deviceListService.getDevices();
        this.notificationService.getNotifications();
        this.router.navigate(['home']);          
      }).catch((error) => {
        this.loginAlert(error.message)
      })
  }

  forgotPassword(email) {
    this.authService.passwordRecover(email.value)
  }
  
  goToRegister(){
    this.router.navigate(['/registration'])
  }

  async loginAlert(message) {
    const alert = await this.alertController.create({
      header: 'Could not login',
      subHeader: 'An error accured trying to login:',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loggin in...',
      duration: 500
    });
    await loading.present();
  }
}