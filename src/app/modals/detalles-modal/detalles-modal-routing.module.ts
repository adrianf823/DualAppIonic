import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesModalPage } from './detalles-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesModalPageRoutingModule {}
