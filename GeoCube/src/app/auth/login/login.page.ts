import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
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
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  logIn(email, password) {
    this.authService.signIn(email.value, password.value)
      .then((res) => {
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
}