import { IonSlides, ModalController } from '@ionic/angular';
import { ExpectedConditions } from 'protractor';
import { NewEnabledTimeModalPage } from './new-enabled-time-modal.page';

describe('NewEnabledTimeModalPage', () => {
  let component: NewEnabledTimeModalPage;
  let modalCtrl: ModalController;
  let slides: IonSlides;

  beforeEach(() => {
    modalCtrl = null;
    slides = null;
    component = new NewEnabledTimeModalPage(modalCtrl, slides);
  });
  
  it('should create enabledtimes', () => {
    expect(component).toBeTruthy();
  });

  it('should have slideopts set',()=>{
    expect(component.slideOpts).toBeTruthy();
  });

  //basically all the tests i could do. if you can do better, go ahead
  
});
