import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestorePasswordPageRoutingModule } from './restore-password-routing.module';

import { RestorePasswordPage } from './restore-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RestorePasswordPageRoutingModule
  ],
  declarations: [RestorePasswordPage]
})
export class RestorePasswordPageModule {}
