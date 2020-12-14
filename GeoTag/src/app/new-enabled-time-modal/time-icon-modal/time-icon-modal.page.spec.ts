import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimeIconModalPage } from './time-icon-modal.page';

describe('TimeIconModalPage', () => {
  let component: TimeIconModalPage;
  let fixture: ComponentFixture<TimeIconModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeIconModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeIconModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
