import { Component, ViewChild, ElementRef } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from '../auth/auth.service';
import { Device, DeviceListService } from '../device-list.service';
import { ModalController, ToastController } from '@ionic/angular';
import { RingModalPage } from '../ring-modal/ring-modal.page';
import { BluetoothService } from '../bluetooth.service';
import { NearbyScanModalPage } from '../nearby-scan-modal/nearby-scan-modal.page';

declare var google: any

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.page.html',
  styleUrls: ['./device-details.page.scss'],
})
export class DeviceDetailsPage {

  map: any;
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  currentDeviceId: string
  currentDevice: Device

  currentPosLongitude: any = 0
  currentPosLatitude: any = 0
  infoWindows: any = [];
  markers: Array<marker>

  constructor(
    private geolocation: Geolocation,
    private auth: AuthService,
    private router: Router,
    public deviceListService: DeviceListService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private toastController: ToastController
    ) {
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['login']);
    }
    this.createMarkers()
    this.currentDeviceId = this.route.snapshot.paramMap.get('id');
    this.findCurrentDevice();
  }

  async presentModal() {
    if (!this.currentDevice.isConnected) {
      this.notConnectedToast();
      return;
    }
    const modal = await this.modalController.create({
      component: RingModalPage,
      swipeToClose: true,
      componentProps: {
        'device': this.currentDevice
      }
    });
    return await modal.present();
  }

  findCurrentDevice() {
    this.currentDevice = this.deviceListService.deviceList.find(x => x.id == this.currentDeviceId)
  }

  ionViewDidEnter() {
    this.showMap();
  }

  createMarkers() {
    this.markers = Array<marker>()
    for (let device of this.deviceListService.deviceList) {
      this.markers.push({ title: device.name, latitude: device.location.latitude, longitude: device.location.longitude });
    }
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
    }

  }

  showMap() {
    const location = new google.maps.LatLng(this.currentDevice.location.latitude, this.currentDevice.location.longitude);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options,);
    this.updatePostion()
    this.addMarkersToMap(this.markers);
  }

  updatePostion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentPosLatitude = resp.coords.latitude
      this.currentPosLongitude = resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  
  startDeviceFinder() {
    if (!this.currentDevice.isConnected) {
      this.notConnectedToast();
      return;
    }
    this.presentMeasureModal();
  }
  
  async presentMeasureModal() {
    const modal = await this.modalController.create({
      component: NearbyScanModalPage,
      swipeToClose: true,
      componentProps: {
        'device': this.currentDevice
      }
    });
    return await modal.present();
  }

  async notConnectedToast() {
    const toast = await this.toastController.create({
      message: "You need to be connected to the tag to do this.",
      duration: 2000
    });
    toast.present();
  }

}
class marker {
  title: string;
  latitude: number;
  longitude: number;
}
