import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Device } from '../device-list.service';
import { NotificationService, Notification } from '../notification.service';
import { BluetoothService } from '../bluetooth.service';

@Component({
  selector: 'app-ring-modal',
  templateUrl: './ring-modal.page.html',
  styleUrls: ['./ring-modal.page.scss'],
})


export class RingModalPage implements OnInit {

  @Input() device: Device;

  constructor(  public modalCtrl: ModalController,
                private bluetoothService: BluetoothService, private notificationService:NotificationService) { }

  ngOnInit() {
    this.bluetoothService.ring(this.device);

		let notification: Notification = {
			id: "",
			message: "You ringed your " + this.device.name + ".",
			date: new Date(),
      device: this.device,
      icon: "notifications-outline",
			alert: false
		}
    this.notificationService.addNotification(notification)
  }

  dismiss() {
    this.bluetoothService.stopRing(this.device);

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
