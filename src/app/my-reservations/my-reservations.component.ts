import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Reservation } from '../models/reservation.model';

import { ReservationService } from '../services/reservation.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from '../auth/auth.service';

import { User } from '../models/user.model';
import { Time } from '@angular/common';

interface showReservationForUser {
  id: number,
  start: Time,
  end: Time,
  date: Date,
  chair: String,
  campus: String,
  section: String,
}

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss', '../styles/page_style.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MyReservationsComponent implements OnInit, OnDestroy {
  reservationsForUser: Reservation[] = [];
  showReservationsForUser: showReservationForUser[] = [];

  dataSource = new MatTableDataSource<showReservationForUser>(this.showReservationsForUser);
  columnsToDisplay = ['Datum', 'Campus', 'Sectie', 'Stoel', 'Tijdstip'];
  expandedElement: Reservation | null;

  deleteReservationSub: Subscription;
  userSub: Subscription;
  reservationSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageLoaded: boolean = true;

  currentUser: User;

  constructor(private router: Router, private reservationService: ReservationService, public dialog: MatDialog, private _authService: AuthService) { }

  ngOnInit(): void {
    this.pageLoaded = false;
    this.deleteReservationSub = this.reservationService.reservationDelete.subscribe(() => {
      this.showReservationsForUser = [];
      this.ngOnInit();
    })

    this.userSub = this._authService.user.subscribe((user: User) => {
      this.currentUser = user;
    })

    this.reservationSub = this.reservationService.getReservationsByUserId(this.currentUser.id).subscribe((reservations: Reservation[]) => {
      this.reservationsForUser = reservations;
      reservations.map((reservation) => {
        this.showReservationsForUser.push({
          id: reservation.id,
          start: reservation.start,
          end: reservation.end,
          date: reservation.date,
          chair: reservation.chair.name,
          campus: reservation.chair.section.campus.name,
          section: reservation.chair.section.name,
        })
      })
      this.dataSource = new MatTableDataSource(this.showReservationsForUser);
      this.pageLoaded = true;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toHome() {
    this.router.navigate(['/home'])
  }

  openDialog(element: showReservationForUser) {

    this.dialog.open(DialogCancel, {
      data: {
        currentReservation: element
      }
    });
  }

  ngOnDestroy() {
    this.deleteReservationSub.unsubscribe();
    this.userSub.unsubscribe();
    this.reservationSub.unsubscribe();
  }
}


// DialogCancel Component => kan eventueel nog in andere file gezet worden
@Component({
  selector: 'dialog-cancel',
  templateUrl: 'dialog-cancel.html',
})
export class DialogCancel {
  currentReservation: showReservationForUser;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservationService: ReservationService
  ) { }

  ngOnInit() {
    this.currentReservation = this.data.currentReservation;
    // console.log(this.currentReservation);
  }

  onDelete() {
    this.reservationService.deleteReservation(this.currentReservation.id);
  }
}