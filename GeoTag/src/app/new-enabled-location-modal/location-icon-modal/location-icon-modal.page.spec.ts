import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationIconModalPage } from './location-icon-modal.page';

describe('LocationIconModalPage', () => {
  let component: LocationIconModalPage;
  let fixture: ComponentFixture<LocationIconModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationIconModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationIconModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
