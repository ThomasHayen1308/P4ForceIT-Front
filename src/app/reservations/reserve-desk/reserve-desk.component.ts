import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Chair } from 'src/app/models/chair.model';
import { Reservation } from 'src/app/models/reservation.model';
import { Section } from 'src/app/models/section.model';
import { User } from 'src/app/models/user.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reserve-desk',
  templateUrl: './reserve-desk.component.html',
  styleUrls: ['./reserve-desk.component.scss', '../../styles/page_style.scss']
})
export class ReserveDeskComponent implements OnInit {

  pageLoaded: boolean = true;

  planImgPath: string = "/assets/Grondplan_Corda_1.png";

  showDetails: boolean = false;

  newReservation: Reservation = new Reservation(0, null, null, null, false, null, null);

  campusId: number = 4;

  sections: Section[];

  chairs: Chair[];

  submitted: boolean = false;

  currentUser: User;

  constructor(private router: Router, private _reservationService: ReservationService, private _userService: UserService, public snackbar: MatSnackBar) {
    const decodedToken = new JwtHelperService().decodeToken(localStorage.getItem("userToken"));
    this._userService.getUserById(decodedToken.userId).subscribe((user)=>{this.currentUser = user;});
    
   }

  ngOnInit(): void {
  }

  back(){
    this.router.navigate(['/reserveren'])
  }

  setCampus(id: number){
    this.campusId = id;
    switch(this.campusId){
      case 5: this.planImgPath = "/assets/Grondplan_Corda_2.png"; break;
      default: this.planImgPath = "/assets/Grondplan_Corda_1.png"; break; 
    }

    this.newReservation.chair = null;

    this._reservationService.getSectionsByCampusId(this.campusId).subscribe((sections)=>{
      this.sections = sections;
    })
    this.showDetails = true;
  }

  onSubmit(){
    this.submitted = true;
    this.pageLoaded = false;
    this.newReservation.user = this.currentUser;
    this._reservationService.postReservation(this.newReservation).subscribe(message=>{
      console.log(message);
      if(message == null){
        this.snackbar.open("Er is al een reservatie op dat moment.", "Sluiten",
      {
        duration: 2500,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'warning-snackbar'
      });
      this.submitted = false;
      this.pageLoaded = true;
      }
      else{
        this.snackbar.open("Reservatie geslaagd!", "Sluiten",
      {
        duration: 2500,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'warning-snackbar'
      });
      this.router.navigate(['/home'])
      }
      
    }, error=>{
      this.submitted = false;
      this.pageLoaded = true;
      console.log(error);
      this.snackbar.open("Er ging iets mis...", "Sluiten",
      {
        duration: 2500,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'warning-snackbar'
      })
    });
  }

  sectionChange(e){
    this._reservationService.getChairsBySectionId(e.value).subscribe((chairs)=>{
      this.chairs = chairs;
    })
  }

}
