import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chair } from '../models/chair.model';

import { Reservation } from '../models/reservation.model';
import { Section } from '../models/section.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    baseUrl: string = 'http://localhost:8080/'

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
}