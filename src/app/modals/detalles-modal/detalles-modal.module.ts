import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesModalPageRoutingModule } from './detalles-modal-routing.module';

import { DetallesModalPage } from './detalles-modal.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesModalPageRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  declarations: [DetallesModalPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DetallesModalPageModule {}
