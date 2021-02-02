import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../styles/page_style.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  pageLoaded: boolean = false;

  currentUserId: number;
  currentUser: User;

  userSub1: Subscription;
  userSub2: Subscription;

  constructor(private router: Router, private _authService: AuthService, private _userService: UserService) { }

  ngOnInit(): void {
    this.userSub1 = this._authService.user.subscribe((user: User) => {
      this.currentUserId = user.id;
      console.log('test')
    })

    this.userSub2 = this._userService.getUserById(this.currentUserId).subscribe((user: User) => {
      this.currentUser = user;
      this.pageLoaded = true;
    })
  }

  onClickHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.userSub1.unsubscribe();
    this.userSub2.unsubscribe();
  }
}
