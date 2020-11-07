import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceListService } from 'src/app/device-list.service';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.page.html',
  styleUrls: ['./searching.page.scss'],
})
export class SearchingPage implements OnInit {

  constructor(private router: Router, private deviceListService: DeviceListService) { }

  ngOnInit() {
    // Todo add bluetooth connection + retreive address
    let connected = true;
    if (connected) {
      this.deviceListService.currentAddress = "23.ZD.3Q.E3.2E"
      this.router.navigate(['./setup/setup']);
    }
  }

}
