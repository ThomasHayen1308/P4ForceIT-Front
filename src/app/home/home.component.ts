import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../styles/page_style.scss']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  pageLoaded: boolean = false;
  adminUser: boolean = false;

  constructor(private router: Router, private _userService: UserService) {
    const decodedToken = new JwtHelperService().decodeToken(localStorage.getItem("userToken"));
    this._userService.getUserById(decodedToken.userId).subscribe(user=>{
      this.currentUser = user;
      if(this.currentUser.role.name == "admin"){
        this.adminUser = true;
      }
      this.pageLoaded = true;
    })
   }

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

  toTracking(){
    this.router.navigate(['tracking'])
  }

  toData(){
    this.router.navigate(['vandaag'])
  }
}
