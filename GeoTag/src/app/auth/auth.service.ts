import { Injectable, NgZone } from '@angular/core';
import { User } from "./user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    public alertController: AlertController
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Login in with email/password
  signIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      this.insertUserData(userCredential)
      .catch(error => {
        this.dataSaveFailed(error)
      });
    })
  }

  // Register user with email/password
  registerUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      this.insertUserData(userCredential)
      .catch(error => {
        this.dataSaveFailed(error)
      });
    })
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
    console.log(user)
    return (user !== null) ? true : false;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  async insertUserData(userCredential: firebase.auth.UserCredential) {
    console.log("Saving userdata to firestore...")
    return this.afStore.doc(`Users/${userCredential.user.uid}`).set({
      email: this.userData.email,
      uid: this.userData.uid
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

  async dataSaveFailed(message) {
    const alert = await this.alertController.create({
      header: 'Could not save data',
      subHeader: 'An error accured trying to save your data:',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
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