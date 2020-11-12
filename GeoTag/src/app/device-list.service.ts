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

  public currentAddress: string

  createTestDevice() {
    let newDevice: Device = {
      id: "",
      name: "Test",
      location: {
        latitude: 20,
        longitude: 20
      },
      icon: "",
      address: "",
      locationHistory :  []
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
  getDevice(id:string){
    return this.deviceList.find(x=>x.id == id);
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

  addLocation(device :Device, location:Location, date:Date){
    device.locationHistory.push(new LocationAndDate(location,date))
  }
}
export class Device {
  id: string
  name: string
  location: Location
  icon: string
  address: string
  locationHistory: Array<LocationAndDate>
}
export class Location {
  latitude: number
  longitude: number

  constructor (latitude: number,longitude:number){
    this.latitude = latitude
    this.longitude = longitude
  }
}
export class LocationAndDate{
location : Location
date:Date

constructor (location: Location, date:Date){
this.location = location;
this.date = date;
}
}