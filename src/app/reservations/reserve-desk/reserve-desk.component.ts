import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chair } from 'src/app/models/chair.model';
import { Reservation } from 'src/app/models/reservation.model';
import { Section } from 'src/app/models/section.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reserve-desk',
  templateUrl: './reserve-desk.component.html',
  styleUrls: ['./reserve-desk.component.scss', '../../styles/page_style.scss']
})
export class ReserveDeskComponent implements OnInit {

  planImgPath: string = "/assets/Grondplan_Corda_1.png";

  showDetails: boolean = false;

  newReservation: Reservation = new Reservation(0, "", null, null, null);

  campusId: number = 6;

  sections: Section[];

  chairs: Chair[];

  submitted: boolean = false;

  constructor(private router: Router, private _reservationService: ReservationService) { }

  ngOnInit(): void {
  }

  back(){
    this.router.navigate(['/reserveren'])
  }

  setCampus(id: number){
    this.campusId = id;
    switch(this.campusId){
      case 7: this.planImgPath = "/assets/Grondplan_Corda_2.png"; break;
      default: this.planImgPath = "/assets/Grondplan_Corda_1.png"; break; 
    }

    this._reservationService.getSectionsByCampusId(this.campusId).subscribe((sections)=>{
      this.sections = sections;
    })
    this.showDetails = true;
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.newReservation);
  }

  sectionChange(e){
    this._reservationService.getChairsBySectionId(e.value).subscribe((chairs)=>{
      this.chairs = chairs;
    })
  }

}
