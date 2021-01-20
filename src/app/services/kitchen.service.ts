import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Kitchen} from '../models/kitchen.model';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  BaseURL: string = "http://localhost:8080/kitchens"

  constructor(private http: HttpClient) { }

  getKitchens(): Observable<Kitchen[]> {
    return this.http.get<Kitchen[]>(this.BaseURL);
  }
  
}
