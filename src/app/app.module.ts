import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogLogout, HeaderComponent } from './header/header.component';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { PauseModule } from './pause/pause.module';
import { AuthModule } from './auth/auth.module';
import { MeetingsModule } from './meetings/meetings.module';
import { MyReservationsModule } from './my-reservations/my-reservations.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CheckInModule } from './check-in/check-in.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorPageComponent,
    DialogLogout
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    HomeModule,
    PauseModule,
    AuthModule,
    MeetingsModule,
    MyReservationsModule,
    ReservationsModule,
    CheckInModule,
    MatToolbarModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
