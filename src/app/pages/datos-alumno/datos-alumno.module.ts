import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosAlumnoPageRoutingModule } from './datos-alumno-routing.module';

import { DatosAlumnoPage } from './datos-alumno.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosAlumnoPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [DatosAlumnoPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DatosAlumnoPageModule {}
