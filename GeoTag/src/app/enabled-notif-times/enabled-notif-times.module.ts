import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnabledNotifTimesPageRoutingModule } from './enabled-notif-times-routing.module';

import { EnabledNotifTimesPage } from './enabled-notif-times.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnabledNotifTimesPageRoutingModule
  ],
  declarations: [EnabledNotifTimesPage]
})
export class EnabledNotifTimesPageModule {}
