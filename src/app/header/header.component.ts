import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private _authService: AuthService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this._authService.user.subscribe((user: User) => {
      this.user = user;
    })
  }

  onLogout() {
    this.dialog.open(DialogLogout)
  }

  toProfile() {
    this.router.navigate(['/profiel']);
  }
}

// DialogLogout Component => kan eventueel nog in andere file gezet worden
@Component({
  selector: 'dialog-logout',
  templateUrl: 'dialog-logout.html',
})
export class DialogLogout {

  constructor(private _authService: AuthService) { }

  ngOnInit() {

  }

  onLogoutDialog() {
    this._authService.logout();
  }
}