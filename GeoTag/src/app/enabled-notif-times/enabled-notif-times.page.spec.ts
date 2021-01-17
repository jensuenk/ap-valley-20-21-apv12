import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BluetoothService } from '../bluetooth.service';
import { DeviceListService } from '../device-list.service';

import { EnabledNotifTimesPage } from './enabled-notif-times.page';

describe('EnabledNotifTimesPage', () => {
  let component: EnabledNotifTimesPage;
  let route:ActivatedRoute;
  let modalCtrl:ModalController;
  let deviceListService:DeviceListService;
  let alertController:AlertController;
  let bluetoothservice:BluetoothService;
  beforeEach(() => {
    route = null;
    modalCtrl = null;
    deviceListService = null;
    alertController = null;
    bluetoothservice = null;
    component = new EnabledNotifTimesPage(route,modalCtrl,deviceListService,alertController);
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have currentDeviceID defined as empty', ()=>{
    expect(component.currentDeviceId).toBeFalsy();
  });

  it('should have a currentDevice defined as empty',()=>{
    expect(component.currentDevice).toBeFalsy();
  });
  
  
});
