import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BLE } from '@ionic-native/ble/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';
import { BluetoothService } from './bluetooth.service';
import { DeviceListService } from './device-list.service';
import { NotificationService } from './notification.service';


describe('bluetoothservice', () => {
  let component: BluetoothService;
  //let fixture: ComponentFixture<BluetoothService>;
  let ble:BLE;
  let navCtrl:NavController;
  let alertController:AlertController;
  let toastCtrl:ToastController;
  let notificationService: NotificationService;
  let deviceListService:DeviceListService;
  let geolocation:Geolocation;
  let device;

  beforeEach(() => {
    navCtrl = null;
    ble = null;
    alertController = null;
    toastCtrl = null;
    notificationService = null;
    deviceListService = null;
    geolocation = null;
    component = new BluetoothService(ble, deviceListService, navCtrl, notificationService, geolocation);
    device = null; //no need for any data as we'ill simply poll the functions
  });
  

  it('should be created',()=>{
    expect(component).toBeTruthy();
  });

  it('should have devicename Bluno', () => {
    expect(component.deviceName).toContain("Bluno");
  });
  
  it('should have an array of connecteddevices',()=>{
    expect(component.connectedDevices).toBeDefined([]);
  });

  it('should convert a string to bytes', () =>{
    let testvar:string = "test";
    console.log(component.stringToBytes("test"));
    expect(component.stringToBytes(testvar)).toBeDefined(Number); //bytes are numbers
  });

  it('should convert bytes to string',()=>{
    let testarray:number[] = [253,254,255,251];
    expect(component.bytesToString(testarray)).toContain("");
  });


});
