import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Settings } from 'http2';
import { AuthService } from './auth/auth.service';
import { SettingsModalPageRoutingModule } from './settings-modal/settings-modal-routing.module';

import * as firebase from 'firebase';

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
    let LocationAndDate = {
      location: {
        latitude: 20,
        longitude: 20
      },
      date: new Date()
    }
    let newDevice: Device = {
      id: "",
      name: "TestDevice",
      location: {
        latitude: 20,
        longitude: 20
      },
      locationHistory: [LocationAndDate],
      icon: "home",
      address: "",
      settings: {
        alertType: 'Vibration',
        alertsEnabled: true,
        timeAlertsEnabled: true,
        locationAlertsEnabled: true,
        enabledLocations: [
        {
          nickname: 'Home',
          icon: 'home',
          latitude: "1",
          longitude: "1",
          enabled: true
        }],
        enabledTimes: [
          {
            nickname: 'Lunch Time',
            icon: 'fast-food',
            beginTime: "12:00",
            endTime: "14:00",
            enabled: true
        }]
      }
    }
    this.addDevice(newDevice);
    return newDevice;
  }

  getDevices() {
    this.deviceCollection = this.afs.collection<Device>('/Users/' + this.auth.getUser().uid + '/Devices', ref => ref.orderBy('name', 'desc'));
    this.deviceCollection.valueChanges().subscribe((data) => {
      this.deviceList = data;
      this.deviceList.forEach(device => {
        device.locationHistory.forEach(history => {
          history.date = history.date.toDate()
        })
      });
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
  getDevice(id: string) {
    return this.deviceList.find(x => x.id == id);
  }

  addDevice(device: Device) {
    const newId = this.afs.createId();
    device.id = newId;
    this.deviceCollection.doc(newId).set(device)
    return newId;
  }

  updateDevice(device: Device) {
    console.log(device)
    return this.deviceCollection.doc(device.id).update(device);
  }

  addEnabledTime(device: Device, enabledTime: EnabledTime){
    device.settings.enabledTimes.push(enabledTime)
    return this.deviceCollection.doc(device.id).update({
      enabledTimes: firebase.firestore.FieldValue.arrayUnion(enabledTime)
    });
  }

  addEnabledLocation(device: Device, enabledLocation: EnabledLocation){
    device.settings.enabledLocations.push(enabledLocation)
    return this.deviceCollection.doc(device.id).update({
      enabledTimes: firebase.firestore.FieldValue.arrayUnion(enabledLocation)
    });
  }


  deleteDevice(id: string) {
    this.deviceCollection.doc(id).delete()
  }

  addLocation(device: Device, location: Location, date: Date) {
    let LocationAndDate = {
      location: location,
      date: date
    }
    device.locationHistory.push(LocationAndDate)
    console.log(device)
    return this.deviceCollection.doc(device.id).update(device);
  }
}
export class Device {
  id: string
  name: string
  location: Location
  icon: string
  address: string
  locationHistory: Array<LocationAndDate>
  settings: AlertSettings
}
export class Location {
  latitude: number
  longitude: number

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude
    this.longitude = longitude
  }
}
export class LocationAndDate {
  location: Location
  date: any

  constructor(location: Location, date: Date) {
    this.location = location;
    this.date = date;
  }
}

export class AlertSettings{
  alertType: string;
  alertsEnabled: boolean;
  timeAlertsEnabled: boolean;
  locationAlertsEnabled: boolean;
  enabledTimes: EnabledTime[];
  enabledLocations: EnabledLocation[];
}

export class EnabledTime{
  nickname: string;
  icon: string;
  beginTime: string;
  endTime: string; 
  enabled: boolean;

  constructor(nickname: string, icon: string, beginTime: string, endTime: string) {
    this.nickname = nickname;
    this.icon = icon;
    this.beginTime = beginTime;
    this.endTime = endTime; 
    this.enabled = true;
  }
}

export class EnabledLocation{
  nickname: string;
  icon: string;
  latitude: string;
  longitude: string;
  enabled: boolean;

  constructor(nickname: string, icon: string, latitude: string, longitude: string) {
    this.nickname = nickname;
    this.icon = icon;
    this.latitude = latitude;
    this.longitude = longitude; 
    this.enabled = true;
  }
}