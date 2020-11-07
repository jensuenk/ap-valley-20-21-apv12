import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Device, DeviceListService } from '../../device-list.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {

  constructor(public devicelistService: DeviceListService, private alertController: AlertController, 
    private router: Router) { }

  deviceList: Array<Device>;

  ngOnInit() {
  }

  addDevice() {
    this.router.navigate(['./setup/instructions']);
  }
}
