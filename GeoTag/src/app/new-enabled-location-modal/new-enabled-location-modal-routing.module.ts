import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewEnabledLocationModalPage } from './new-enabled-location-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewEnabledLocationModalPage
  },
  {
    path: 'location-icon-modal',
    loadChildren: () => import('./location-icon-modal/location-icon-modal.module').then( m => m.LocationIconModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEnabledLocationModalPageRoutingModule {}
