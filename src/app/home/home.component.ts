import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../styles/page_style.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toPause() {
    this.router.navigate(['/pauze'])
  }

  toMyReservations() {
    this.router.navigate(['/mijn-reserveringen'])
  }

  toMeetings() {
    this.router.navigate(['/meetings'])
  }
}
