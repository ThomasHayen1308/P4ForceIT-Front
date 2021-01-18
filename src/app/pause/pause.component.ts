import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss', '../styles/page_style.scss']
})
export class PauseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toHome() {
    this.router.navigate(['/home'])
  }
}
