import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NearbyScanModalPage } from './nearby-scan-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NearbyScanModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NearbyScanModalRoutingModule {}
