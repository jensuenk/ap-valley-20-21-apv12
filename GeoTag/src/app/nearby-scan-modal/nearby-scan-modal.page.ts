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
      if (this.rssi <= 47) {
        this.distance = "0m"
      }
      else if (this.rssi <= 50) {
        this.distance = "0.5m"
      }
      else if (this.rssi <= 60 ) {
        this.distance = "1m"
      }
      else if (this.rssi <= 65) {
        this.distance = "2m"
      }
      else if (this.rssi <= 68) {
        this.distance = "3m"
      }
      else if (this.rssi <= 70) {
        this.distance = "4m"
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
