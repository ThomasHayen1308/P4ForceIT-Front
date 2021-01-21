import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Reservation } from '../models/reservation.model';

import { ReservationService } from '../services/reservation.service';

interface showReservationForUser {
  id: number,
  periode: String,
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
export class MyReservationsComponent implements OnInit {
  reservationsForUser: Reservation[] = [];
  showReservationsForUser: showReservationForUser[] = [];

  dataSource = new MatTableDataSource<showReservationForUser>(this.showReservationsForUser);
  columnsToDisplay = ['Datum', 'Campus', 'Sectie', 'Stoel'];
  expandedElement: Reservation | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservationsByUserId(1).subscribe((reservations: Reservation[]) => {
      this.reservationsForUser = reservations;
      reservations.map((reservation) => {
        this.showReservationsForUser.push({
          id: reservation.id,
          periode: reservation.period,
          date: reservation.date,
          chair: reservation.chair.name,
          campus: reservation.chair.section.campus.name,
          section: reservation.chair.section.name,
        })
      })
      this.dataSource = new MatTableDataSource(this.showReservationsForUser);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toHome() {
    this.router.navigate(['/home'])
  }
}
