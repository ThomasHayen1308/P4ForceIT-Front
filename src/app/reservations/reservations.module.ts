import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { ReserveDeskComponent } from './reserve-desk/reserve-desk.component';
import { ReserveMeetingRoomComponent } from './reserve-meeting-room/reserve-meeting-room.component';



@NgModule({
  declarations: [MenuComponent, ReserveDeskComponent, ReserveMeetingRoomComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ReservationsModule { }
