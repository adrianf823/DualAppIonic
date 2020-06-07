import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorempresaPageRoutingModule } from './tutorempresa-routing.module';

import { TutorempresaPage } from './tutorempresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorempresaPageRoutingModule
  ],
  declarations: [TutorempresaPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TutorempresaPageModule {}
