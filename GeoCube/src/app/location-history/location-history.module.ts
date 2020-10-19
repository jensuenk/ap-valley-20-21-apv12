import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationHistoryPageRoutingModule } from './location-history-routing.module';

import { LocationHistoryPage } from './location-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationHistoryPageRoutingModule
  ],
  declarations: [LocationHistoryPage]
})
export class LocationHistoryPageModule {}
