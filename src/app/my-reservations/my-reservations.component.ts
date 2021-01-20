import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss', '../styles/page_style.scss']
})
export class MyReservationsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toHome() {
    this.router.navigate(['/home'])
  }
}
