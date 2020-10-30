import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController, LoadingController } from '@ionic/angular';
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
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}

  logIn(email, password) {
    this.authService.signIn(email.value, password.value)
      .then(async (res) => {
        this.presentLoading();
        var tries : number = 0; 
        while (!this.authService.isLoggedIn) {
          await this.presentLoading()
          tries++;
          if (tries > 10) {
            this.loginAlert("Could not retreive user data")
            return
          }
        }
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

    const { role, data } = await loading.onDidDismiss();
  }
}