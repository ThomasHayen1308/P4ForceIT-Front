import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PauseComponent } from './pause/pause.component';
import { AuthComponent } from './auth/auth.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { MenuComponent } from './reservations/menu/menu.component'
import {ReserveDeskComponent} from './reservations/reserve-desk/reserve-desk.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'reserveren', children: [
    { path: '', component: MenuComponent},
    {path: 'bureau', component: ReserveDeskComponent}
    ]
  },
  { path: 'pauze', component: PauseComponent },
  { path: 'meetings', component: MeetingsComponent },
  { path: 'mijn-reservaties', component: MyReservationsComponent },

  { path: 'login', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
