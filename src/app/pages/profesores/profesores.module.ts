import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesoresPageRoutingModule } from './profesores-routing.module';

import { ProfesoresPage } from './profesores.page';
import { EmpresasPage } from '../empresas/empresas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesoresPageRoutingModule,
  ],
  declarations: [ProfesoresPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProfesoresPageModule {}
