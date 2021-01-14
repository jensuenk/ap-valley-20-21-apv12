import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DeviceListService, EnabledLocation } from '../device-list.service';
import { NewEnabledLocationModalPage } from '../new-enabled-location-modal/new-enabled-location-modal.page';
import { Device } from '../device-list.service'
import { BluetoothService } from '../bluetooth.service';


import { EnabledNotifLocationsPage } from './enabled-notif-locations.page';

describe('EnabledNotifLocationsPage', () => {
  let component: EnabledNotifLocationsPage;
  let fixture: ComponentFixture<EnabledNotifLocationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnabledNotifLocationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnabledNotifLocationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
  
});
