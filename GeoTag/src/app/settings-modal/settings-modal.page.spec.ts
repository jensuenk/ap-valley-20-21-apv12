import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { BluetoothService } from '../bluetooth.service';
import { DeviceListService } from '../device-list.service';
import { SettingsModalPage } from './settings-modal.page';

describe('SettingsModalPage', () => {
  let component: SettingsModalPage;
  let bluetoothService:BluetoothService;
  let modalController:ModalController;
  let deviceListService:DeviceListService;
  let alertController:AlertController;

  beforeEach(() => {
    bluetoothService = null;
    modalController = null;
    deviceListService = null;
    alertController = null;
    component = new SettingsModalPage(bluetoothService,deviceListService,modalController,alertController);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define an unset originalname',()=>{
    expect(component.originalName).toBeFalsy();
  });

  it('should define an unset currentdevice',()=>{
    expect(component.currentDevice).toBeFalsy();
  });
  
  it('should define an unset id',()=>{
    expect(component.id).toBeFalsy();
  });

  it('should define an unset iconname',()=>{
    expect(component.iconName).toBeFalsy();
  });

});
