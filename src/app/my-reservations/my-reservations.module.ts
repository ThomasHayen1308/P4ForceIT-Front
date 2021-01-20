import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyReservationsComponent } from './my-reservations.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [MyReservationsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MyReservationsModule { }
