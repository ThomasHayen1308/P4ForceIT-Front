import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSlideToggleModule
  ]
})
export class ProfileModule { }
