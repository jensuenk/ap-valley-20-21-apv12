import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: firebase.User;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public alertController: AlertController
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      console.log("AuthState changed: ", user)
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        this.insertUserData(user.uid, user.email);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Login in with email/password
  signIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  registerUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  sendVerificationMail() {
    return this.ngFireAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      })
  }

  // Recover password
  passwordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.resetSuccesAlert()
      })
      .catch((error) => {
        this.resetFailedAlert(error)
      })
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  async insertUserData(uid: String, email: String) {
    console.log("Saving userdata to firestore...", uid)
    return this.afStore.doc(`Users/${uid}`).set({
      email: email,
      uid: uid
    })
  }

  // Sign-out 
  public signOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.ngFireAuth.signOut();
      this.router.navigate(['login']);
    })
  }

  async resetFailedAlert(message) {
    const alert = await this.alertController.create({
      header: 'Could not reset password',
      subHeader: 'An error accured trying to reset your password:',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async resetSuccesAlert() {
    const alert = await this.alertController.create({
      header: 'Password Reset',
      subHeader: 'Please check your email inbox to reset your password.',
      buttons: ['OK']
    });
    await alert.present();
  }
}