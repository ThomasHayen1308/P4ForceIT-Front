import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import {FormsModule} from '@angular/forms';

import { ShortenPipe } from './shorten.pipe';
import { PresentPipe } from './present.pipe';
import { OccupiedPipe } from './occupied.pipe';
import { TimepipePipe } from './timepipe.pipe';

@NgModule({
  declarations: [
    ShortenPipe,
    PresentPipe,
    OccupiedPipe,
    TimepipePipe
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatBadgeModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    ShortenPipe,
    OccupiedPipe,
    PresentPipe,
    TimepipePipe,
    MatBadgeModule
  ]
})
export class SharedModule { }
