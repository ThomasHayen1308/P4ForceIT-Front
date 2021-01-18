import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PauseComponent } from './pause.component';

import { SharedModule } from '../shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [PauseComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule
  ]
})
export class PauseModule { }
