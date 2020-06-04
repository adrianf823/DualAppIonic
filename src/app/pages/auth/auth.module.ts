import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AuthPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AuthPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthPageModule {}
