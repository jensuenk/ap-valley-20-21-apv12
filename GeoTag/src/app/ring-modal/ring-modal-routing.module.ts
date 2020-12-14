import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RingModalPage } from './ring-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RingModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RingModalPageRoutingModule {}
