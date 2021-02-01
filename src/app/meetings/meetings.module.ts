import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsComponent } from './meetings.component';
import { DialogMeetingDelete } from './meetings.component';

import { SharedModule } from '../shared/shared.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MeetingsComponent, DialogMeetingDelete],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule
  ]
})
export class MeetingsModule { }
