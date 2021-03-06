import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss', '../../styles/page_style.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toHome(){
    this.router.navigate(['/home']);
  }

  toReserveMeeting(){
    this.router.navigate(['/reserveren/ruimte']);
  }

  toReserveDesk(){
    this.router.navigate(['/reserveren/bureau'])
  }

}
