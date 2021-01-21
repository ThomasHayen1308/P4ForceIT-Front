import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { Reservation } from '../models/reservation.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationService implements OnDestroy {
    baseUrl: string = 'http://localhost:8080/'

    deleteReservationSub: Subscription;

    reservationDelete = new Subject<number>();

    constructor(private http: HttpClient) { }

    getReservationsByUserId(userId: number) {
        return this.http.get<Reservation[]>(this.baseUrl + 'reservations/user/' + userId);
    }

    deleteReservation(reservationId: number) {
        this.deleteReservationSub = this.http.delete(this.baseUrl + 'reservations/' + reservationId).subscribe(() => {
            this.reservationDelete.next(reservationId);
        })
    }

    ngOnDestroy() {
        this.deleteReservationSub.unsubscribe();
    }
}