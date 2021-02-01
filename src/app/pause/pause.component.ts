import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Kitchen } from '../models/kitchen.model';
import { KitchenService } from '../services/kitchen.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss', '../styles/page_style.scss']
})
export class PauseComponent implements OnInit {

  kitchens: Kitchen[];

  alarmAudio = new Audio();

  pageLoaded: boolean = false;

  currentUserRole: boolean = false;

  constructor(private router: Router, private _kitchenService: KitchenService, private _userService: UserService) {
    const decodedToken = new JwtHelperService().decodeToken(localStorage.getItem("userToken"));
    this._userService.getUserById(decodedToken.userId).subscribe(user=>{
      if(user.role.name=="admin"){
        this.currentUserRole = true;
      };
    })

   }

  ngOnInit(): void {
    this.alarmAudio.src="/assets/audio/alarm.mp3";
    this.alarmAudio.load();
    this._kitchenService.getKitchens().subscribe((kitchens) =>{
      this.kitchens = kitchens;
      this.checkNumberOfPeople();
      this.pageLoaded = true;
    });
    
    
  }

  toHome() {
    this.alarmAudio.pause();
    this.router.navigate(['/home'])
  }

  resetKitchens(){
    this._kitchenService.resetKitchens().subscribe(kitchens=>{
      this.kitchens = kitchens;
      this.checkNumberOfPeople();
    })
  }

  checkNumberOfPeople(){
    let alarm: boolean = false;
    this.kitchens.forEach(kitchen => {
      if(kitchen.numberOfPersons > kitchen.maxPersons){
        alarm = true;
      }
    });
    if(alarm.valueOf() == true){
      this.alarmAudio.play();      
    }
  }
}
