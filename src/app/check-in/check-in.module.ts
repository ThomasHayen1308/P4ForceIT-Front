import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckInComponent } from './check-in.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [CheckInComponent, ConfirmComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CheckInModule { }
