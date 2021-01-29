import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingComponent } from './tracking/tracking.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [TrackingComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TrackingModule { }
