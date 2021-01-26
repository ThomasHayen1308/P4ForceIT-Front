import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { UserLogin } from './models/user-login.model';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', '../styles/page_style.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  hide = true;

  userLogin: UserLogin;

  userSub: Subscription;

  constructor(private router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this._authService.user.subscribe(user => {
      this.router.navigate(['/home'])
  })
  }

  onSubmit(authForm: NgForm) {
    const value = authForm.value;
    this.userLogin = new UserLogin(value.username, value.password);

    this._authService.login(this.userLogin);
    // authForm.reset();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
