import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyReservationsComponent } from './my-reservations.component';
import { DialogCancel } from './my-reservations.component';

import { SharedModule } from '../shared/shared.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MyReservationsComponent, DialogCancel],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class MyReservationsModule { }
