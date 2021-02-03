import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<User[]>(this.baseUrl +'users');
    }

    getUserById(userID: number) {
        return this.http.get<User>(this.baseUrl + 'users/' + userID);
    }

    updateUser(user: User) {
        return this.http.put<User>(this.baseUrl + 'users/' + user.id, user);
    }
}