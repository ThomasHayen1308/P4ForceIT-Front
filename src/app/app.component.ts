import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

import { ColorSchemeService } from '../color-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _authService: AuthService, private colorSchemeService: ColorSchemeService) {
    // Load Color Scheme
    if (!localStorage.getItem('prefers-color')) {
      localStorage.setItem('prefers-color', 'light');
    }
    if (!localStorage.getItem('prefers-sound')) {
      localStorage.setItem('prefers-sound', 'off');
    }
    this.colorSchemeService.load();
  }

  ngOnInit() {
    this._authService.autoLogin();
  }
}
