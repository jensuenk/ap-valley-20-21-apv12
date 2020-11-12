import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Device } from '../device-list.service';
import { NotificationService, Notification } from '../notification.service';

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

		let notification: Notification = {
			id: "",
			message: "This is a notification description",
			date: new Date(),
			device: this.device
		}
    this.notificationService.addNotification(notification)
  }

  dismiss() {
    this.bluetoothSerial.write(false);

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
