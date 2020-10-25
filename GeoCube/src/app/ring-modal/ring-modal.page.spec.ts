import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RingModalPage } from './ring-modal.page';

describe('RingModalPage', () => {
  let component: RingModalPage;
  let fixture: ComponentFixture<RingModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RingModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RingModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
