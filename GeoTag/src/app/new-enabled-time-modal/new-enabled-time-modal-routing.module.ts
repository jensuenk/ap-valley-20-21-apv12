import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewEnabledTimeModalPage } from './new-enabled-time-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewEnabledTimeModalPage
  },  {
    path: 'time-icon-modal',
    loadChildren: () => import('./time-icon-modal/time-icon-modal.module').then( m => m.TimeIconModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEnabledTimeModalPageRoutingModule {}
