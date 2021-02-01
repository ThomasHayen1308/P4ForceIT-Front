import { HttpClient } from '@angular/common/http';
import { Chair } from '../models/chair.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { environment } from './../../environments/environment';

import { Reservation } from '../models/reservation.model';
import { Section } from '../models/section.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationService implements OnDestroy {
    baseUrl: string = environment.apiUrl;

    deleteReservationSub: Subscription;

    reservationsChanged = new Subject<number>();

    constructor(private http: HttpClient) { }

    getReservations() {
        return this.http.get<Reservation[]>(this.baseUrl + 'reservations')
    }

    getReservationsByUserId(userId: number) {
        return this.http.get<Reservation[]>(this.baseUrl + 'reservations/user/' + userId);
    }

    getSectionsByCampusId(campusId: number){
        return this.http.get<Section[]>(this.baseUrl+"reservations/campus/"+campusId+"/sections");
    }

    getChairsBySectionId(sectionId: number){
        return this.http.get<Chair[]>(this.baseUrl+"reservations/section/"+sectionId+"/chairs");
    }

    postReservation(reservation: Reservation){
        return this.http.post<Reservation>(this.baseUrl+"reservations", reservation);
    }

    updateReservation(reservation: Reservation) {
        this.http.put<Reservation>(this.baseUrl + "reservations/" + reservation.id, reservation).subscribe(() => {
            this.reservationsChanged.next(reservation.id);
        })
    }

    deleteReservation(reservationId: number) {
        this.deleteReservationSub = this.http.delete(this.baseUrl + 'reservations/' + reservationId).subscribe(() => {
            this.reservationsChanged.next(reservationId);
        })
    }

    ngOnDestroy() {
        this.deleteReservationSub.unsubscribe();
    }
}