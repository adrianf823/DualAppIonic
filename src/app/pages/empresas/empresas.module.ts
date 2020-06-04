import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresasPageRoutingModule } from './empresas-routing.module';

import { EmpresasPage } from './empresas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpresasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmpresasPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EmpresasPageModule {}
