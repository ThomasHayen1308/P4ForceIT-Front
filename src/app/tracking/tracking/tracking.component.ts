import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss', '../../styles/page_style.scss']
})
export class TrackingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toHome(){
    this.router.navigate(['/home'])
  }

}
