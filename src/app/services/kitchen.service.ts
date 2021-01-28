import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from './../../environments/environment';

import { Kitchen } from '../models/kitchen.model';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  BaseURL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getKitchens(): Observable<Kitchen[]> {
    return this.http.get<Kitchen[]>(this.BaseURL + 'kitchens');
  }

  resetKitchens(): Observable<Kitchen[]>{
    return this.http.get<Kitchen[]>(this.BaseURL+"kitchens/reset");
  }

}
