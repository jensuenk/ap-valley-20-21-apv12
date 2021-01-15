import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IconModalPage } from './icon-modal.page';

describe('IconModalPage', () => {
  let component: IconModalPage;
  let fixture: ComponentFixture<IconModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IconModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  
  
  it('should create', () => { //works
    expect(component).toBeTruthy();
  });

  it('shouldnt have icon names set', () => {
    expect(component.iconName).toBeUndefined();
  });

  it('should have imgpath ./assets/images/profileIcons/', () => {
    expect(component.imgPath).toContain('./assets/images/profileIcons/');
  });
  
});
