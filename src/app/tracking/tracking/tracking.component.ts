import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Reservation } from '../../models/reservation.model';

import { ReservationService } from 'src/app/services/reservation.service';

// imports for mat-table
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Time } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface ShowReservation {
  naam: string;
  email: string;
  datum: Date;
  tijdslotBegin: Time;
  tijdslotEinde: Time;
  campus: string;
  sectie: string;
}

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss', '../../styles/page_style.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TrackingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['naam', 'datum', 'tijdslot', 'campus', 'sectie'];
  expandedElement: Reservation | null;

  pageLoaded: boolean = true;

  reservations: Reservation[] = [];
  showReservations: ShowReservation[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource(this.showReservations);
  constructor(private router: Router, private _reservationService: ReservationService) { }

  ngOnInit(): void {
    this.pageLoaded = false;
    this._reservationService.getReservations().toPromise()
      .then((reservations: Reservation[]) => {
        this.reservations = reservations;
      })
      .then(() => {
        this.reservations.map((reservation: Reservation) => {
          this.showReservations.push({
            naam: reservation.user.name,
            email: reservation.user.email,
            datum: reservation.date,
            tijdslotBegin: reservation.start,
            tijdslotEinde: reservation.end,
            campus: reservation.chair.section.campus.name,
            sectie: reservation.chair.section.name
          })
        })
      })
      .then(() => {
        this.dataSource.data = this.showReservations;
        this.pageLoaded = true;
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toHome() {
    this.router.navigate(['/home'])
  }

}
