import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyReservationsComponent } from './my-reservations.component';
import { SharedModule } from '../shared/shared.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [MyReservationsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MyReservationsModule { }
