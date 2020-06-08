import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiperfilPageRoutingModule } from './miperfil-routing.module';

import { MiperfilPage } from './miperfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiperfilPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MiperfilPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MiperfilPageModule {}
