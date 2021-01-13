import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Device } from '../device-list.service';
import { interval, Subscription } from 'rxjs';
import { BluetoothService } from '../bluetooth.service';

const source = interval(500);

@Component({
  selector: 'app-nearby-scan-modal',
  templateUrl: './nearby-scan-modal.page.html',
  styleUrls: ['./nearby-scan-modal.page.scss'],
})

export class NearbyScanModalPage implements OnInit {

  @Input() device: Device;

  subscribe;
  distance: String = "";
  isChecked = false;
  rssi;
  percentage: number = 0;

  constructor(  
    public modalCtrl: ModalController,
    private bluetoothService: BluetoothService, 
  ) { }

  ngOnInit() {
    this.subscribe = source.subscribe(val => this.updateMeasurement());
  }

  updateMeasurement() {
    this.bluetoothService.ble.readRSSI(this.device.address)
    .then(rssi => {
      this.rssi = Math.abs(rssi);
      this.percentage = (100 - ((this.rssi - 45) * 2));
      if (this.percentage > 100) {
        this.percentage = 100;
      }
      if (this.rssi <= 45) {
        this.distance = "With you"
      }
      else if (this.rssi <= 50) {
        this.distance = "Less than 0.5m away"
      }
      else if (this.rssi <= 60 ) {
        this.distance = "About 1m away"
      }
      else if (this.rssi <= 65) {
        this.distance = "About 2m away"
      }
      else if (this.rssi <= 70) {
        this.distance = "About 3m away"
      }
      else if (this.rssi <= 74) {
        this.distance = "About 4m away"
      }
      else if (this.rssi <= 77) {
        this.distance = "About 5m away"
      }
      else if (this.rssi > 77) {
        this.distance = "More than 5m away"
      }
    })
    .catch(err => {
      console.error('Unable to read RSSI', err);
    });
  }

  toggleRing() {
    if (!this.isChecked) {
      this.bluetoothService.ring(this.device);
    }
    else {
      this.bluetoothService.stopRing(this.device);
    }
  }

  dismiss() {
    this.subscribe.unsubscribe();
    this.bluetoothService.stopRing(this.device);
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
