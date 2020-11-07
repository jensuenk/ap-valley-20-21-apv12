import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceListService {
  public deviceCollection: AngularFirestoreCollection<Device>;

  public deviceList: Array<Device>;
  doc: any;

  constructor(private afs: AngularFirestore, private auth: AuthService) { }

  createTestDevice() {
    let newDevice: Device = {
      id: "",
      name: "Test",
      location: {
        latitude: 20,
        longitude: 20
      },
      icon: "",
      address: ""
    }
    this.addDevice(newDevice);
  }

  getDevices() {
    this.deviceCollection = this.afs.collection<Device>('/Users/' + this.auth.getUser().uid + '/Devices', ref => ref.orderBy('name', 'desc'));
    this.deviceCollection.valueChanges().subscribe((data) => {
      this.deviceList = data;
    })
    /*
    // Alternative method of retreiving data
    this.deviceCollection.snapshotChanges().subscribe(res => {
      if (res) {
        this.deviceList = res.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            location: e.payload.doc.data()['location']
          }
        })
      }
    })
    */
  }

  addDevice(device: Device) {
    const newId = this.afs.createId();
    device.id = newId;
    this.deviceCollection.doc(newId).set(device)
    return newId;
  }

  updateDevice(device: Device) {
    return this.deviceCollection.doc(device.id).update(device);
  }

  deleteDevice(id: string) {
    this.deviceCollection.doc(id).delete()
  }
}
export class Device {
  id: string
  name: string
  location: Location
  icon: string
  address: string
}

export class Location {
  latitude: number
  longitude: number
}