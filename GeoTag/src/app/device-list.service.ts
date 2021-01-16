import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceListService {

  public deviceCollection: AngularFirestoreCollection<Device>;
  public deviceList: Array<Device>;

  public currentAddress: string;

  constructor(
    private afs: AngularFirestore, 
    private auth: AuthService
  ) { }

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
      isConnected:true,
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
        enabledLocations: [],
        enabledTimes: []
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
          history.date = history.date.toDate();
        });
      });
			console.log("DEBUG: Device list changed (device-list.service.ts -> getDevices sub)");
    })
  }

  getDevice(id: string) {
    return this.deviceList.find(x => x.id == id);
  }

  addDevice(device: Device) {
    const newId = this.afs.createId();
    device.id = newId;
    this.deviceCollection.doc(newId).set(device)
  }

  updateDevice(device: Device) {
    this.deviceCollection.doc(device.id).update(device);
  }

  deleteDevice(id: string) {
    this.deviceCollection.doc(id).delete()
  }

  addLocation(device: Device, location: Location, date: Date) {
    let LocationAndDate = {
      location: location,
      date: date
    }
    device.locationHistory.push(LocationAndDate);
    this.deviceCollection.doc(device.id).update(device);
  }

  addEnabledTime(device: Device, enabledTime: EnabledTime) {
    if (device.settings.enabledTimes == null) {
      device.settings.enabledTimes = [];
    }
    device.settings.enabledTimes.push(JSON.parse(JSON.stringify(enabledTime)));
    this.updateDevice(device);
  }

  deleteEnabledTime(device: Device, enabledTime: EnabledTime) {
    const index = device.settings.enabledTimes.indexOf(enabledTime, 0);
    if (index > -1) {
      device.settings.enabledTimes.splice(index, 1);
    }
    this.updateDevice(device);
  }

  addEnabledLocation(device: Device, enabledLocation: EnabledLocation) {
    if (device.settings.enabledLocations == null) {
      device.settings.enabledLocations = [];
    }
    device.settings.enabledLocations.push(JSON.parse(JSON.stringify(enabledLocation)));
    this.updateDevice(device);
  }

  deleteEnabledLocation(device: Device, enabledLocation: EnabledLocation) {
    const index = device.settings.enabledLocations.indexOf(enabledLocation, 0);
    if (index > -1) {
      device.settings.enabledLocations.splice(index, 1);
    }
    this.updateDevice(device);
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
  isConnected:boolean
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
  id?: string
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
  secondaryText: string;

  constructor(nickname: string, icon: string, latitude: string, longitude: string, secondaryText: string) {
    this.nickname = nickname;
    this.icon = icon;
    this.latitude = latitude;
    this.longitude = longitude; 
    this.enabled = true;
    this.secondaryText = secondaryText
  }
}