import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosAlumnoPage } from './datos-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: DatosAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosAlumnoPageRoutingModule {}
