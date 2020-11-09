import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnabledNotifTimesPage } from './enabled-notif-times.page';

const routes: Routes = [
  {
    path: '',
    component: EnabledNotifTimesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnabledNotifTimesPageRoutingModule {}
