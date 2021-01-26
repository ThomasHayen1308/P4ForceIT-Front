import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../models/user.model';
import { UserLogin } from './models/user-login.model';

import { UserService } from '../services/user.service';

import { environment } from 'src/environments/environment';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject(null);
    baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

    login(userLogin: UserLogin) {
        this.http.post<{ token: string }>(this.baseUrl + "users/login", userLogin).subscribe(token => {
            this.authenticationHandler(token);
        }, error => {
            // error handling => noty
        });
    }

    autoLogin() {
        const userToken: string = localStorage.getItem('userToken'); // don't use JSON.parse
        //Exception Handler if token is not valid or does not exist
        if (userToken) {
            this.getCurrentUser(userToken);
        }
        return null;
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
    }

    private authenticationHandler(token: { token: string }) {
        let userToken: string = token.token;
        userToken = userToken.split(" ")[1];

        this.getCurrentUser(userToken);

        localStorage.setItem("userToken", userToken); // don't use JSON.stringefy => double quotes
        this.router.navigate(['/home']);
    }

    // if userToken exists => decode token, find user based on userId from token and make user object (behaviorSubject)
    private getCurrentUser(userToken: string) {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(userToken);
        this.userService.getUserById(decodedToken.userId).subscribe((user: User) => {
            this.user.next(user);
        });
    }
}