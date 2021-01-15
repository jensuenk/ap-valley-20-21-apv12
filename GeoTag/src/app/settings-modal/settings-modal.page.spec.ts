import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { SettingsModalPage } from './settings-modal.page';

describe('SettingsModalPage', () => {
  let component: SettingsModalPage;
  let fixture: ComponentFixture<SettingsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
