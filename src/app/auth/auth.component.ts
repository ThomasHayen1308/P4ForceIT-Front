import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserLogin } from './models/user-login.model';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', '../styles/page_style.scss']
})
export class AuthComponent implements OnInit {
  hide = true;

  userLogin: UserLogin;

  userSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(authForm: NgForm) {
    const value = authForm.value;
    this.userLogin = new UserLogin(value.username, value.password);

    this.authService.login(this.userLogin);
    authForm.reset();
  }
}
