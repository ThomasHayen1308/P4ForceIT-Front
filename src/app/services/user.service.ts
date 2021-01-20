import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl: string = 'http://localhost:8080/'

    constructor(private http: HttpClient) { }

    getUserById(userID: number) {
        return this.http.get<User>('users/' + userID);
    }
}