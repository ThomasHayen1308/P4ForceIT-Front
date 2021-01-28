import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MeetingRoom } from 'src/app/models/meeting-room.model';
import { Meeting } from 'src/app/models/meeting.model';
import { User } from 'src/app/models/user.model';
import { MeetingService } from 'src/app/services/meeting.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reserve-meeting-room',
  templateUrl: './reserve-meeting-room.component.html',
  styleUrls: ['./reserve-meeting-room.component.scss', '../../styles/page_style.scss']
})
export class ReserveMeetingRoomComponent implements OnInit {

  pageLoaded: boolean = false;

  newMeeting: Meeting = new Meeting(0, null, null, null, null, null, null);

  meetingRooms: MeetingRoom[];

  filteredMeetingRooms: MeetingRoom[];
  submitted: boolean = false;

  starttime: string;
  endtime: string;

  userToken: string;

  currentUser: User;

  now: Time;


  constructor(private router: Router, private _meetingService: MeetingService, private _userService: UserService, public snackBar: MatSnackBar) { 
    _meetingService.getMeetingRooms().subscribe((meetingRooms)=>{
      this.meetingRooms = meetingRooms;
      this.pageLoaded = true;
    })
    
    const decodedToken = new JwtHelperService().decodeToken(localStorage.getItem("userToken"));
    this._userService.getUserById(decodedToken.userId).subscribe((user)=>{this.currentUser = user;});

  }

  ngOnInit(): void {
  }

  back(){
    this.router.navigate(['/reserveren']);
  }

  onSubmit(){
    this.submitted = true;
    this.pageLoaded = false;
    this.newMeeting.users = new Array<User>();
    this.newMeeting.users.push(this.currentUser);
    this._meetingService.postMeeting(this.newMeeting).subscribe(message=>{
      console.log(message);
      if(message == null){
        this.snackBar.open("Er is al een reservering op dat moment.","Sluiten", {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition:'center'
        });
        this.submitted=false;
        this.pageLoaded=true;
      }
      else{
        this.snackBar.open("Reservering van ruimte is geslaagd!","Sluiten", {
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition:'center'
      }), this.router.navigate(['/home']);
      }
      
    }, error=>{
      this.submitted = false;
      this.pageLoaded = true;
      this.snackBar.open(error,"Sluiten", {
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition:'center'
      })
    });
  }

  numberOfPersonsChangeEvent(e){
    this.filteredMeetingRooms = [];
    this.meetingRooms.forEach(meetingRoom => {
      if(meetingRoom.maxPersons>= e.target.value){
        this.filteredMeetingRooms.push(meetingRoom);
      }      
    });
  }

}
