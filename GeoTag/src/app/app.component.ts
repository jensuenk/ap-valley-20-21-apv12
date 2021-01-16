import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { DeviceListService } from './device-list.service';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private router: Router,
    public deviceListService: DeviceListService,
    public notificationService: NotificationService
  ) {
    this.initializeApp();
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['login']);
      return;
    }
    this.deviceListService.getDevices();
    this.notificationService.getNotifications();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
