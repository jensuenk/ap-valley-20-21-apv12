import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IconPickerPageRoutingModule } from './icon-picker-routing.module';

import { IconPickerPage } from './icon-picker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconPickerPageRoutingModule
  ],
  declarations: [IconPickerPage]
})
export class IconPickerPageModule {}
