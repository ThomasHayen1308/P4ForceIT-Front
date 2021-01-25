import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.user.subscribe((user: User) => {
      this.user = user;
    })
  }

  onLogout() {
    this._authService.logout();
  }
}
