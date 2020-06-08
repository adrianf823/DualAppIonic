import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirtareaPage } from './anadirtarea.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirtareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirtareaPageRoutingModule {}
