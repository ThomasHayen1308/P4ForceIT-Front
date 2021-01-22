import { HttpClient } from '@angular/common/http';
import { Chair } from '../models/chair.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { environment } from './../../environments/environment';

import { Reservation } from '../models/reservation.model';
import { Section } from '../models/section.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationService implements OnDestroy {
    baseUrl: string = environment.apiUrl;

    deleteReservationSub: Subscription;

    reservationDelete = new Subject<number>();

    constructor(private http: HttpClient) { }

    getReservationsByUserId(userId: number) {
        return this.http.get<Reservation[]>(this.baseUrl + 'reservations/user/' + userId);
    }

    getSectionsByCampusId(campusId: number){
        return this.http.get<Section[]>(this.baseUrl+"reservations/sections/campus/"+campusId);
    }

    getChairsBySectionId(sectionId: number){
        return this.http.get<Chair[]>(this.baseUrl+"reservations/section/"+sectionId+"/chairs");
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