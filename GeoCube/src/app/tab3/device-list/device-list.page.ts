import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Device, DeviceListService } from '../../device-list.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {

  constructor(private devicelistService: DeviceListService) { }

  devices: Array<Device>;

  ngOnInit() {
    this.devices = this.devicelistService.getDevices();
  }

}
