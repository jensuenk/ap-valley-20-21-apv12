import { Component , ViewChild, ElementRef} from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';

declare var google: any

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  map: any;
@ViewChild('map', {read: ElementRef, static: false}) mapRef:ElementRef;
  constructor() {

  }
  ionViewDidEnter(){
    this.showMap();
  }

  showMap(){
    const location  = new google.maps.LatLng(-17.824858, 31.053028);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

}
