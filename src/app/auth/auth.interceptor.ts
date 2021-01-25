import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private _authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userToken: string = JSON.parse(localStorage.getItem("userToken"));
        const helper = new JwtHelperService();
        if (userToken) {
            //wanneer token lastig doet en in console _token staat ==> localstorage clearen (leegmaken) en terug opnieuw inloggen
            const decodedToken = helper.decodeToken(userToken);
            const expirationTime = decodedToken.exp * 1000;

            const currentDate = new Date();
            const currentDateTime = currentDate.getTime();

            if(currentDateTime > expirationTime){
                this._authService.logout();
            }

            else{
                request = request.clone({
                    setHeaders: {
                        Authorization: 'Bearer ' + userToken
                    }
                });
            }
        }
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status === 401) {
                    this.router.navigate(['login']);
                }

                return throwError("unauthorized");
            }));
    }
}