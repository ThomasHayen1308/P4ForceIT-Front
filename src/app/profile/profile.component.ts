import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColorSchemeService } from 'src/color-scheme.service';

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

  darkMode: boolean = false;

  constructor(private router: Router, private _authService: AuthService, private _userService: UserService, private colorSchemeService: ColorSchemeService) { }

  ngOnInit(): void {
    this.userSub1 = this._authService.user.subscribe((user: User) => {
      this.currentUserId = user.id;
    })

    this.userSub2 = this._userService.getUserById(this.currentUserId).subscribe((user: User) => {
      this.currentUser = user;
      this.pageLoaded = true;
    })

    //check darkmodeslider
    if (localStorage.getItem('prefers-color')) {
      let currentMode = localStorage.getItem('prefers-color');
      if (currentMode === 'dark') {
        this.darkMode = true;
      } else {
        this.darkMode = false;
      }
    }
  }

  onClickHome() {
    this.router.navigate(['/home']);
  }

  setLightDarkMode(event: MatSlideToggleChange) {
    const modeValue = event.checked;
    
    if (modeValue == true) {
      this.colorSchemeService.update('dark');
    } else {
      this.colorSchemeService.update('light');
    }
  }

  ngOnDestroy() {
    this.userSub1.unsubscribe();
    this.userSub2.unsubscribe();
  }
}
