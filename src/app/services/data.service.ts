import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

import { Data } from '../models/data.model'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    BaseURL: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getData(): Observable<Data>{
        return this.http.get<Data>(this.BaseURL+"data");
    }
}