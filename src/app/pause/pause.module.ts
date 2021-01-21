import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PauseComponent } from './pause.component';

import { SharedModule } from '../shared/shared.module';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [PauseComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ]
})
export class PauseModule { }
