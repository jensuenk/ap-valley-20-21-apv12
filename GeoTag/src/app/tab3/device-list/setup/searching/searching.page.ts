import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BluetoothService } from 'src/app/bluetooth.service';
import { DeviceListService } from 'src/app/device-list.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.page.html',
  styleUrls: ['./searching.page.scss'],
})
export class SearchingPage implements OnInit {

  constructor(private router: Router, private deviceListService: DeviceListService, private bluetoothService: BluetoothService, private bluetoothSerial: BluetoothSerial) { }

  ngOnInit() {
    this.bluetoothSerial.isEnabled().then(success => {

      this.bluetoothSerial.list().then(success => {
        this.bluetoothService.pairedList = success;
        console.log(this.bluetoothService.pairedList)

        this.bluetoothService.pairedList.forEach(device => {
          console.log(device)
          
          // Attempt to connect device with specified address, call app.deviceConnected if success
          this.bluetoothSerial.connect(device.address).subscribe(success => {
            this.deviceListService.currentAddress = device.address
            this.router.navigate(['./setup/setup']);
            this.bluetoothService.deviceDisconnected()
          }, error => {
            this.bluetoothService.showError("Error: Connecting to Device");
            this.router.navigate(['./setup/instructions']);
          });
  
        });
      }, error => {
        this.bluetoothService.showError("Could not found a GeoTag")
        this.router.navigate(['./setup/instructions']);
      });

    }, error => {
      this.bluetoothService.showError("Please Enable Bluetooth")
      this.router.navigate(['./setup/instructions']);
    });
  }
}
