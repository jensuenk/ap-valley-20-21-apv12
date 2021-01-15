import { NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { ModalController } from '@ionic/angular';

import { NewEnabledLocationModalPage } from './new-enabled-location-modal.page';

describe('NewEnabledLocationModalPage', () => {

  let component:NewEnabledLocationModalPage;//create instance of component
  let modalCtrl: ModalController;
  let geolocation:Geolocation;
  let nativeGeocoder:NativeGeocoder;
  let zone:NgZone;


  beforeEach(() => {
    modalCtrl = null;
    geolocation = null;
    nativeGeocoder = null;
    zone = null;
    component = new NewEnabledLocationModalPage(modalCtrl,geolocation,nativeGeocoder,zone);
  });
  /*
  it('should create', ()=>{
    expect(component.nickname).toBe("");
  });
  */
});
