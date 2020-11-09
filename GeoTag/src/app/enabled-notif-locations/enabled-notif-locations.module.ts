import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnabledNotifLocationsPageRoutingModule } from './enabled-notif-locations-routing.module';

import { EnabledNotifLocationsPage } from './enabled-notif-locations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnabledNotifLocationsPageRoutingModule
  ],
  declarations: [EnabledNotifLocationsPage]
})
export class EnabledNotifLocationsPageModule {}
