import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationIconModalPage } from './location-icon-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LocationIconModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationIconModalPageRoutingModule {}
