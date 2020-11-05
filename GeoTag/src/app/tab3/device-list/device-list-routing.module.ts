import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceListPage } from './device-list.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceListPage
  },
  {
    path: 'instructions',
    loadChildren: () => import('./setup/instructions/instructions.module').then( m => m.InstructionsPageModule)
  },
  {
    path: 'searching',
    loadChildren: () => import('./setup/searching/searching.module').then( m => m.SearchingPageModule)
  },
  {
    path: 'setup',
    loadChildren: () => import('./setup/setup/setup.module').then( m => m.SetupPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceListPageRoutingModule {}
