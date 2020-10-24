import { Injectable } from '@angular/core';
import { device } from './app.component';

@Injectable({
	providedIn: 'root'
})
export class DeviceListService {
	public deviceList: Array<device> = [
    {
      id : 1,
      name : "Keys",
      location : {
        latitude : 1,
        longitude : 1
      }
    },
    {
      id : 2,
      name : "Wallet",
      location : {
        latitude : 10,
        longitude : 10
      }
    },
    {
      id : 3,
      name : "Phone",
      location : {
        latitude : 20,
        longitude : 20
      }
    },

  ]

	constructor () {}

	add (device: device) {
		this.deviceList.push(device);
	}
}
