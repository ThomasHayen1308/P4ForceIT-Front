import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './data/data.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [DataComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DataModule { }
