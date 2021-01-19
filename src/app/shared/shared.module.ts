import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    ShortenPipe
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ShortenPipe
  ]
})
export class SharedModule { }
