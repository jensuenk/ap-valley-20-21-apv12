import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewEnabledTimeModalPage } from './new-enabled-time-modal.page';

describe('NewEnabledTimeModalPage', () => {
  let component: NewEnabledTimeModalPage;
  let fixture: ComponentFixture<NewEnabledTimeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEnabledTimeModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewEnabledTimeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  /*
  it('should create enabledtimes', () => {
    expect(component).toBeTruthy();
  });
  */
});
