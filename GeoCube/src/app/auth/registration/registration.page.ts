import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() { }

  signUp(email, password) {
    this.authService.registerUser(email.value, password.value)
      .then((res) => {
        this.authService.sendVerificationMail()
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        this.registerAlert(error.message)
      })
  }

  async registerAlert(message) {
    const alert = await this.alertController.create({
      header: 'Could not create account',
      subHeader: 'An error accured when creating your account:',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}