import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-ring-modal',
  templateUrl: './ring-modal.page.html',
  styleUrls: ['./ring-modal.page.scss'],
})


export class RingModalPage implements OnInit {

  @Input() deviceName: string;

  constructor(  public modalCtrl: ModalController,
                private bluetoothSerial: BluetoothSerial) { }

  ngOnInit() {
    this.bluetoothSerial.write(true);
  }

  dismiss() {
    this.bluetoothSerial.write(false);

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
