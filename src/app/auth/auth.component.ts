import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', '../styles/page_style.scss']
})
export class AuthComponent implements OnInit {
  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

}
