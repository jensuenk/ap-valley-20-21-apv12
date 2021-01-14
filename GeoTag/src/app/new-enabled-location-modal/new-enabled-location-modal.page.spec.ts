import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewEnabledLocationModalPage } from './new-enabled-location-modal.page';

describe('NewEnabledLocationModalPage', () => {
  let component: NewEnabledLocationModalPage;
  let fixture: ComponentFixture<NewEnabledLocationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEnabledLocationModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewEnabledLocationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
