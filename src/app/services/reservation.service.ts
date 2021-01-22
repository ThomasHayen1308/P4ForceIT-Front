import { HttpClient } from '@angular/common/http';
import { Chair } from '../models/chair.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { Reservation } from '../models/reservation.model';
import { Section } from '../models/section.model';
import { MeetingRoom } from '../models/meeting-room.model';

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

    getMeetingRooms(): Observable<MeetingRoom[]> {
        return this.http.get<MeetingRoom[]>(this.baseUrl+"meetings/rooms");
    }

    ngOnDestroy() {
        this.deleteReservationSub.unsubscribe();
    }
}