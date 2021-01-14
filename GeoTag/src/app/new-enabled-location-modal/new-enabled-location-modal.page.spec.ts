import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { IonicModule } from '@ionic/angular';

import { NewEnabledLocationModalPage } from './new-enabled-location-modal.page';

describe('NewEnabledLocationModalPage', () => {
  let component: NewEnabledLocationModalPage;
  let fixture: ComponentFixture<NewEnabledLocationModalPage>;
  let service: NewEnabledLocationModalPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEnabledLocationModalPage ],
      imports: [IonicModule.forRoot(), NativeGeocoder],
      providers: [Geolocation, NativeGeocoder],
    }).compileComponents();

    fixture = TestBed.createComponent(NewEnabledLocationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
/*
  it('should create', () => {
    //expect(component).toBeTruthy();
  });
*/

});
