import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Reservation } from '../models/reservation.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    baseUrl: string = 'http://localhost:8080/'

    constructor(private http: HttpClient) { }

    getReservationsByUserId(userId: number) {
        return this.http.get<Reservation[]>(this.baseUrl + 'reservations/user/' + userId);
    }
}