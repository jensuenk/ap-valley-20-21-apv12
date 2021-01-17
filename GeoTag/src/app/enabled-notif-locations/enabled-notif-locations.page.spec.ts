import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BluetoothService } from '../bluetooth.service';
import { DeviceListService } from '../device-list.service';
import { EnabledNotifLocationsPage } from './enabled-notif-locations.page';

describe('EnabledNotifLocationsPage', () => {
  let component: EnabledNotifLocationsPage;
  let route:ActivatedRoute;
  let modalController:ModalController;
  let deviceListService:DeviceListService;
  let alertController:AlertController;
  let bluetoothService:BluetoothService;

  beforeEach(() => {
    route = null;
    modalController = null;
    deviceListService = null;
    alertController = null;
    bluetoothService = null;
    component = new EnabledNotifLocationsPage(route,modalController,deviceListService,alertController);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an unset currentdeviceId',()=>{
    expect(component.currentDeviceId).toBeFalsy();
  });

  it('should have an unset currentdevice',()=>{
    expect(component.currentDevice).toBeFalsy();
  });

  it('should call deletelocation',()=>{
    expect(component.deleteLocation).toBeTruthy();
  });

  it('should call showalert',()=>{
    expect(component.showAlert).toBeTruthy();
  });

  it('shouldnt contain data',()=>{
    expect(component.currentDeviceId).toBeFalsy();
  })

  
  
});
