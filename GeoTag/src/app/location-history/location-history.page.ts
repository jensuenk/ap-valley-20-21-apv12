import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device, DeviceListService, Location } from '../device-list.service';

@Component({
  selector: 'app-location-history',
  templateUrl: './location-history.page.html',
  styleUrls: ['./location-history.page.scss'],
})
export class LocationHistoryPage implements OnInit {

  currentDevice : Device

  constructor(private deviceListService:DeviceListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.findCurrentDevice()

    let locationAndDate = {
      location: {
        latitude: 1,
        longitude: 1
      },
      date: new Date()
    }
    this.currentDevice.locationHistory.push(locationAndDate)
    this.deviceListService.updateDevice(this.currentDevice)
  }

  findCurrentDevice() {
    this.currentDevice = this.deviceListService.deviceList.find(x => x.id == this.route.snapshot.paramMap.get('id'))
  }

}
