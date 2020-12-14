import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RingModalPageRoutingModule } from './ring-modal-routing.module';

import { RingModalPage } from './ring-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RingModalPageRoutingModule
  ],
  declarations: [RingModalPage]
})
export class RingModalPageModule {}
