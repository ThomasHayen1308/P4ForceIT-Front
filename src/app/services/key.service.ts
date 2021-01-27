import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

import { Key } from '../models/key.model'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class KeyService {

    BaseURL: string = environment.apiUrl;

    confirmKey: string;

    constructor(private http: HttpClient) { }

    getConfirmKey() {
        return this.confirmKey;
    }

    setConfirmKey(key: string) {
        this.confirmKey =  key;
    }

    getKeys(): Observable<Key[]> {
        return this.http.get<Key[]>(this.BaseURL + "key");
    }
}
