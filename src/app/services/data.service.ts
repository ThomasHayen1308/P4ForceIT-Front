import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    BaseURL: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getData(): Observable<Reservation[]>{
        return this.http.get<Reservation[]>(this.BaseURL+"data");
    }
}