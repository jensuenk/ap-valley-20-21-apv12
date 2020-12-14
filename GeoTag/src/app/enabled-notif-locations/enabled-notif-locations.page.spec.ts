import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
