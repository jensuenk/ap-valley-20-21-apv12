import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertSettingsPage } from './alert-settings.page';

const routes: Routes = [
  {
    path: '',
    component: AlertSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertSettingsPageRoutingModule {}
