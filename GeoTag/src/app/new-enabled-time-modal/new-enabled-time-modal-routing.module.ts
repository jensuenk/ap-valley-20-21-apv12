import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewEnabledTimeModalPage } from './new-enabled-time-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewEnabledTimeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEnabledTimeModalPageRoutingModule {}
