import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceListService {
  private deviceCollection: AngularFirestoreCollection<Device>;
  
  public deviceList: Array<Device> = [
    {
      id: 1,
      name: "Keys",
      location: {
        latitude: 1,
        longitude: 1
      }
    },
    {
      id: 2,
      name: "Wallet",
      location: {
        latitude: 10,
        longitude: 10
      }
    },
    {
      id: 3,
      name: "Phone",
      location: {
        latitude: 20,
        longitude: 20
      }
    },
  ]
  

  constructor(private afs: AngularFirestore, private auth: AuthService) { }

  createTestDevice() {
    let newDevice: Device = {
      id: 10,
      name: "Test Device",
      location: {
        latitude: 20,
        longitude: 20
      }
    }
    this.add(newDevice);
  }

  getDevices() {
    return this.deviceList
    /*
    this.deviceCollection = this.afs.collection<Device>('/Users/' + this.auth.getUser().uuid + '/Devices', ref => ref.orderBy('id', 'desc'));
    this.devices = this.deviceCollection.valueChanges();

    this.createTestDevice()
    return this.devices; 
    */
  }
  getDevice(id:number){
    return this.deviceList.find(x=>x.id == id);
  }
  deleteDevice(device:Device){
    this.deviceList = this.deviceList.filter(x=>x!=device);
  }

  refreshDevices() {
     this.createTestDevice()
    this.deviceCollection = this.afs.collection<Device>('/Users/' + this.auth.getUser().uuid + '/Devices', ref => ref.orderBy('id', 'desc'));
    this.deviceCollection.valueChanges().subscribe((data) => {
      this.deviceList = data;
    })
    console.log(this.deviceList)
  }

  add(device: Device) {
    this.deviceCollection.add(device);
  }
}
export class Device {
  id: number
  name: string
  location: Location
}

export class Location {
  latitude: number
  longitude: number
}