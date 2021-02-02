import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private router: Router, private _kitchenService: KitchenService, private _userService: UserService, private _snackbar: MatSnackBar) {
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

  reload(){
    this.alarmAudio.pause();
    this._kitchenService.getKitchens().subscribe(kitchens=>{
      this.kitchens = kitchens;
      this.checkNumberOfPeople();
    })
  }

  resetKitchens(){
    this._kitchenService.resetKitchens().subscribe(kitchens=>{
      this.kitchens = kitchens;
      this.alarmAudio.pause();
    })
  }

  checkNumberOfPeople(){
    let alarmKeukens: string = "";
    let alarm: boolean = false;
    this.kitchens.forEach(kitchen => {
      if(kitchen.numberOfPersons > kitchen.maxPersons){
        alarmKeukens += kitchen.campus.name;
        alarm = true;
      }
    });
    if(alarm.valueOf() == true){
      this.openSnackBar(alarmKeukens);
      this.alarmAudio.load();
      this.alarmAudio.play();      
    }
  }

  openSnackBar(keukens: string){
    let snackBarRef = this._snackbar.open("Te veel mensen in keuken(s): " + keukens, "Sluiten", {
      duration: 5600,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'alarm-snackbar'
    })

    snackBarRef.afterDismissed().subscribe(()=>{
      this.alarmAudio.pause()
    });
  }

}

