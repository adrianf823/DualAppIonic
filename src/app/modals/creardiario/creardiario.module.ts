import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreardiarioPageRoutingModule } from './creardiario-routing.module';

import { CreardiarioPage } from './creardiario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreardiarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreardiarioPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CreardiarioPageModule {}
