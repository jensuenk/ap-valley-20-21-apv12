import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Device } from '../device-list.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-ring-modal',
  templateUrl: './ring-modal.page.html',
  styleUrls: ['./ring-modal.page.scss'],
})


export class RingModalPage implements OnInit {

  @Input() device: Device;

  constructor(  public modalCtrl: ModalController,
                private bluetoothSerial: BluetoothSerial, private notificationService:NotificationService) { }

  ngOnInit() {
    this.bluetoothSerial.write(true);
    this.notificationService.addNotification(new Date(), this.device)
  }

  dismiss() {
    this.bluetoothSerial.write(false);

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
