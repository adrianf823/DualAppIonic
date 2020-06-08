import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirtareaPageRoutingModule } from './anadirtarea-routing.module';

import { AnadirtareaPage } from './anadirtarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirtareaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AnadirtareaPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AnadirtareaPageModule {}
