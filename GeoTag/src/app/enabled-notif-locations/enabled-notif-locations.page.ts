import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-enabled-notif-locations',
  templateUrl: './enabled-notif-locations.page.html',
  styleUrls: ['./enabled-notif-locations.page.scss'],
})
export class EnabledNotifLocationsPage implements OnInit {

  currentDeviceId: Number
  enabledLocations: IEnabledLocation[];

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentDeviceId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.fillLocations();
  }

  fillLocations(){
    this.enabledLocations = [];

    var newLoc = new IEnabledLocation();
    newLoc.name = 'Home';
    newLoc.address = 'Hendrik van Uffelslaan'
    this.enabledLocations.push(newLoc)
  }

}

export class IEnabledLocation{
  xCord: number;
  yCord: number;
  name: string;
  address: string;
}