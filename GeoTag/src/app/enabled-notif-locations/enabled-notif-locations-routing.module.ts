import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnabledNotifLocationsPage } from './enabled-notif-locations.page';

const routes: Routes = [
  {
    path: '',
    component: EnabledNotifLocationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnabledNotifLocationsPageRoutingModule {}
