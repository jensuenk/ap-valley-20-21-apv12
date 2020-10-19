import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertSettingsPageRoutingModule } from './alert-settings-routing.module';

import { AlertSettingsPage } from './alert-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertSettingsPageRoutingModule
  ],
  declarations: [AlertSettingsPage]
})
export class AlertSettingsPageModule {}
