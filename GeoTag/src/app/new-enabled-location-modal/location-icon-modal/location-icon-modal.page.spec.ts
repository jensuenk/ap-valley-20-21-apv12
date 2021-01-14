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

  it('should have profileicons set', () => {
    expect(component.imgPath).toContain('./assets/images/profileIcons/');
  });

  it('should have an array of icons', () =>{
    expect(component.icons).toBeDefined([]);
  });

  it('should push icons', () =>{
    component.icons = []; //clear
    component.createIcons(); //push 'defaultman to [0]'
    expect(component.icons[0]).toBe('defaultMan');
  });
});
