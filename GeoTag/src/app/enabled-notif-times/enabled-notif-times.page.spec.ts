import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnabledNotifTimesPage } from './enabled-notif-times.page';

describe('EnabledNotifTimesPage', () => {
  let component: EnabledNotifTimesPage;
  let fixture: ComponentFixture<EnabledNotifTimesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnabledNotifTimesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnabledNotifTimesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  /* //ionicmodule.forroot should only be called once
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
  
});
