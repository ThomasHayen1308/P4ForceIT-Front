import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { Key } from 'src/app/models/key.model';
import { Reservation } from 'src/app/models/reservation.model';
import { User } from 'src/app/models/user.model';
import { KeyService } from 'src/app/services/key.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss', '../../styles/page_style.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {
  idUser: number;
  idCurrentUser: number;
  currentUser: User;
  currentUserReservations: Reservation[];
  currentUserReservationsToday: Reservation[] = [];

  alreadyConfirmed: boolean = null;
  reservationsToday: boolean = false;

  realKey: string;
  confirmKey: string;

  userSub: Subscription;
  keySub: Subscription;
  reservationSub: Subscription;
  userUpdateSub: Subscription;

  checkinError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _keyService: KeyService,
    private _userService: UserService,
    private _reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    this.userSub = this._authService.user.subscribe((user: User) => {
      this.currentUser = user;
      // starts with user = null => if user is set, check if right user is on this page
      if (user && this.idUser) {
        this.idCurrentUser = user.id;
        if (+this.idCurrentUser !== +this.idUser) {
          this.router.navigate(['/']);
        }
      }

      // check if user has reservations ...
      this.reservationSub = this._reservationService.getReservationsByUserId(user.id).subscribe((reservations: Reservation[]) => {
        this.currentUserReservations = reservations;

        // check if one of the reservations is today ...
        reservations.map(reservation => {
          // check if reservation is today, if true, add to array
          if (this.isToday(reservation.date)) {
            console.log("%c Reservations today", "color: orange")
            console.log(reservation)
            console.log(this.isToday(reservation.date));
            this.reservationsToday = true;
            this.currentUserReservationsToday.push(reservation);
            if (reservation.present && this.alreadyConfirmed != false) {
              this.alreadyConfirmed = true;
            } else {
              this.alreadyConfirmed = false;
            }
          }
        })

      })

    })

    this.route.params.subscribe(
      (params: Params) => {
        this.idUser = +params['id'];
      }
    )

    this.confirmKey = this._keyService.getConfirmKey();

    this.keySub = this._keyService.getKeys().subscribe((keys: Key[]) => {
      this.realKey = keys[0].name;
    });

  }

  onConfirm() {
    // check if current key is the same as real key from database
    if (this.confirmKey === this.realKey) {
      console.log('keys oké')
      // if reservation found ...
      // Set present of the reservation of the user true ...
      if (this.currentUserReservationsToday.length > 0) {
        let i;
        let coinsWilBeAdded: boolean = true;
        for (i = 0; i < this.currentUserReservationsToday.length; i++) {
          let updateReservation: Reservation = this.currentUserReservationsToday[i];

          //  check if updateReservation present is not true => give coins
          if (coinsWilBeAdded.valueOf() != false) {
            console.log('lol')
            if (updateReservation.present == true) {
              console.log('if')
              coinsWilBeAdded = false;
            } else {
              console.log('else')
              coinsWilBeAdded = true;
            }
            console.log(coinsWilBeAdded)
          }

          updateReservation.present = true;
          this._reservationService.updateReservation(updateReservation)

          // update coins if => update them ones
          if (i == this.currentUserReservations.length - 1) {
            if (coinsWilBeAdded == true) {
              console.log('Coins will be added');
              let newUser: User = this.currentUser;
              newUser.coins += 10;
              this.userUpdateSub = this._userService.updateUser(newUser).subscribe();
            }
          }
        }
        this.alreadyConfirmed = true;
      }
    }
  }

  // function to check if reservation is today
  isToday = (someDate: Date) => {
    const today = new Date()
    const reservationDate = new Date(someDate)
    return reservationDate.getDate() == today.getDate() &&
      reservationDate.getMonth() == today.getMonth() &&
      reservationDate.getFullYear() == today.getFullYear()
  }

  toHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    if (this.userUpdateSub) {
      this.userUpdateSub.unsubscribe();
    }
  }
}
