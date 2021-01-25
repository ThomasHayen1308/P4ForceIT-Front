import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckInComponent } from './check-in.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CheckInComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CheckInModule { }
