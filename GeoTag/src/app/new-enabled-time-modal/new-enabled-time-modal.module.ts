import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEnabledTimeModalPageRoutingModule } from './new-enabled-time-modal-routing.module';

import { NewEnabledTimeModalPage } from './new-enabled-time-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEnabledTimeModalPageRoutingModule
  ],
  declarations: [NewEnabledTimeModalPage]
})
export class NewEnabledTimeModalPageModule {}
