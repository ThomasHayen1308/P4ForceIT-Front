import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PauseComponent } from './pause/pause.component';
import { AuthComponent } from './auth/auth.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { MenuComponent } from './reservations/menu/menu.component'
import { ReserveDeskComponent } from './reservations/reserve-desk/reserve-desk.component';
import { ReserveMeetingRoomComponent } from './reservations/reserve-meeting-room/reserve-meeting-room.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CheckInComponent } from './check-in/check-in.component';
import { ConfirmComponent } from './check-in/confirm/confirm.component';

import { AuthGuard } from './auth/guards/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';
import { TrackingComponent } from './tracking/tracking/tracking.component';
import { DataComponent } from './data/data/data.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'inchecken', canActivate: [AuthGuard], children:
      [
        { path: '', component: CheckInComponent },
        { path: 'confirm/:id', component: ConfirmComponent }
      ]
  },
  {
    path: 'reserveren', canActivate: [AuthGuard], children:
      [
        { path: '', component: MenuComponent },
        { path: 'bureau', component: ReserveDeskComponent },
        { path: 'ruimte', component: ReserveMeetingRoomComponent }
      ]
  },
  { path: 'pauze', component: PauseComponent, canActivate: [AuthGuard] },
  { path: 'meetings', component: MeetingsComponent, canActivate: [AuthGuard] },
  { path: 'mijn-reservaties', component: MyReservationsComponent, canActivate: [AuthGuard] },

  { path: 'login', component: AuthComponent },

  { path:'tracking', component: TrackingComponent, canActivate: [AuthGuard]}, // AdminGuard in future
  { path:'vandaag', component: DataComponent, canActivate: [AuthGuard]},

  { path: 'profiel', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: 'not-authorized', component: ErrorPageComponent, data: { message: 'You are not allowed to access this page!' } },
  { path: '**', redirectTo: '/not-found' } // wildcard route --> last route!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
