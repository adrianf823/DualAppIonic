import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreardiarioPage } from './creardiario.page';

const routes: Routes = [
  {
    path: '',
    component: CreardiarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreardiarioPageRoutingModule {}
