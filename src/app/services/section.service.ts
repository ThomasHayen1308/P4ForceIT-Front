import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { Section } from '../models/section.model';

@Injectable({
    providedIn: 'root'
})
export class SectionService {
    baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getSections() {
        return this.http.get<Section[]>(this.baseUrl + 'sections');
    }
}