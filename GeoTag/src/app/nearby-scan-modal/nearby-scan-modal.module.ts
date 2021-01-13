import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NearbyScanModalPage } from './nearby-scan-modal.page';
import { NearbyScanModalRoutingModule } from './nearby-scan-modal-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NearbyScanModalRoutingModule
  ],
  declarations: [NearbyScanModalPage]
})
export class NearbyScanModalPageModule {}
