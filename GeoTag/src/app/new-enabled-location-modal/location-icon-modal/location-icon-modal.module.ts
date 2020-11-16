import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationIconModalPageRoutingModule } from './location-icon-modal-routing.module';

import { LocationIconModalPage } from './location-icon-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationIconModalPageRoutingModule
  ],
  declarations: [LocationIconModalPage]
})
export class LocationIconModalPageModule {}
