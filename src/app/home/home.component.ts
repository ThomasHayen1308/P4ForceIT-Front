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

  toCheckIn() {
    this.router.navigate(['/inchecken'])
  }

  toReservations(){
    this.router.navigate(['/reserveren'])
  }

  toPause() {
    this.router.navigate(['/pauze'])
  }

  toMyReservations() {
    this.router.navigate(['/mijn-reservaties'])
  }

  toMeetings() {
    this.router.navigate(['/meetings'])
  }
}
