import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Kitchen} from '../models/kitchen.model';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  BaseURL: string = "http://localhost:8080/kitchens"

  private kitchens: Kitchen[] = [];
  private kitchensUpdated = new Subject<Kitchen[]>();

  constructor(private http: HttpClient) { }

  getKitchens(){
    return this.http.get<Kitchen[]>(this.BaseURL).subscribe((kitchens)=>{
    this.kitchens = kitchens;
    this.kitchensUpdated.next([...this.kitchens]);
    })
  }

  getKitchensUpdateListener() {
    return this.kitchensUpdated.asObservable();
}
}
