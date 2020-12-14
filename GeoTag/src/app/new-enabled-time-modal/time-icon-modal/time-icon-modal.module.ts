import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeIconModalPageRoutingModule } from './time-icon-modal-routing.module';

import { TimeIconModalPage } from './time-icon-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeIconModalPageRoutingModule
  ],
  declarations: [TimeIconModalPage]
})
export class TimeIconModalPageModule {}
