import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEnabledLocationModalPageRoutingModule } from './new-enabled-location-modal-routing.module';

import { NewEnabledLocationModalPage } from './new-enabled-location-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEnabledLocationModalPageRoutingModule
  ],
  declarations: [NewEnabledLocationModalPage]
})
export class NewEnabledLocationModalPageModule {}
