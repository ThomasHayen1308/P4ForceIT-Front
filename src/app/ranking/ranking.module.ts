import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RankingComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RankingModule { }
