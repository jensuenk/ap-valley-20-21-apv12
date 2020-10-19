import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationHistoryPage } from './location-history.page';

describe('LocationHistoryPage', () => {
  let component: LocationHistoryPage;
  let fixture: ComponentFixture<LocationHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
