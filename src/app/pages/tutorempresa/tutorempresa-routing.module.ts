import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorempresaPage } from './tutorempresa.page';

const routes: Routes = [
  {
    path: '',
    component: TutorempresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorempresaPageRoutingModule {}
