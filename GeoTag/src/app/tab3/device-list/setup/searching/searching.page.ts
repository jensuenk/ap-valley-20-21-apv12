import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BLE } from '@ionic-native/ble/ngx';
import { BluetoothService } from 'src/app/bluetooth.service';
import { DeviceListService } from 'src/app/device-list.service';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.page.html',
  styleUrls: ['./searching.page.scss'],
})
export class SearchingPage implements OnInit {

  constructor(
    private router: Router, 
    private ble: BLE,
    private deviceListService: DeviceListService,
    private bluetoothService: BluetoothService,
    private ngZone: NgZone
    ) { }

  ngOnInit() {
    this.scan();
  }

  scan() {
    console.log('Scanning for Bluetooth LE Device');

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.bluetoothService.showError(error)
    );
  }

  onDeviceDiscovered(device) {
    if (device.name == this.bluetoothService.deviceName) {
      console.log('Discovered ' + JSON.stringify(device, null, 2));
      this.deviceListService.currentAddress = device.id
      this.router.navigate(['./setup/setup']);
    }
  }
}
