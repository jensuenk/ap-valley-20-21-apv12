import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationHistoryPage } from './location-history.page';

const routes: Routes = [
  {
    path: '',
    component: LocationHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationHistoryPageRoutingModule {}
