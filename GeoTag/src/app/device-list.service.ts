import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceListService {
  public deviceCollection: AngularFirestoreCollection<Device>;
  
  public deviceList: Array<Device> = []
  
  constructor(private afs: AngularFirestore, private auth: AuthService) { }

  createTestDevice() {
    let newDevice: Device = {
      id: 10,
      name: "Test",
      location: {
        latitude: 20,
        longitude: 20
      }
    }
    this.add(newDevice);
  }

  getDevices() {
    this.deviceCollection = this.afs.collection<Device>('/Users/' + this.auth.getUser().uuid + '/Devices', ref => ref.orderBy('id', 'desc'));
    this.deviceCollection.valueChanges().subscribe((data) => {
      this.deviceList = data;
    })
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