import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PauseComponent } from './pause/pause.component';
import { AuthComponent } from './auth/auth.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { MenuComponent } from './reservations/menu/menu.component'
import { ReserveDeskComponent } from './reservations/reserve-desk/reserve-desk.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'reserveren', children: [
      { path: '', component: MenuComponent },
      { path: 'bureau', component: ReserveDeskComponent }
    ]
  },
  { path: 'pauze', component: PauseComponent },
  { path: 'meetings', component: MeetingsComponent },
  { path: 'mijn-reservaties', component: MyReservationsComponent },

  { path: 'login', component: AuthComponent },

  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: 'not-authorized', component: ErrorPageComponent, data: { message: 'You are not allowed to access this page!' } },
  { path: '**', redirectTo: '/not-found' } // wildcard route --> last route!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
