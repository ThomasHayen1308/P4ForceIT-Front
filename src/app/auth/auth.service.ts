import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../models/user.model';
import { UserLogin } from './models/user-login.model';

import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject(null);
    baseUrl: string = "http://localhost:8080/";

    constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

    login(userLogin: UserLogin) {
        console.log(userLogin)
        this.http.post<User>(this.baseUrl + "users/login", userLogin).subscribe(userData => {
            this.authenticationHandler(userData);
        }, error => {
            // error handling => noty
        });
    }

    autoLogin() {
        const userToken: string = JSON.parse(localStorage.getItem('userToken'));
        if (userToken) {
            //Exception Handler if token is not valid
            //if userToken exists => decode token and make user object (behaviorSubject)
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(userToken);
            this.userService.getUserById(decodedToken.UserID).subscribe((user: User) => { 
                this.user.next(user);
            });
        }
        return null;
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
    }

    private authenticationHandler(currentUser: User) {
        this.user.next(currentUser);
        localStorage.setItem("userToken", JSON.stringify(currentUser.token));
        this.router.navigate(['/home']);
    }
}