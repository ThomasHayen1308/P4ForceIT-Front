import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingRoom } from 'src/app/models/meeting-room.model';
import { Meeting } from 'src/app/models/meeting.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reserve-meeting-room',
  templateUrl: './reserve-meeting-room.component.html',
  styleUrls: ['./reserve-meeting-room.component.scss', '../../styles/page_style.scss']
})
export class ReserveMeetingRoomComponent implements OnInit {

  pageLoaded: boolean = false;

  newMeeting: Meeting = new Meeting(0, "", null, "", null, null, "");

  meetingRooms: MeetingRoom[];

  filteredMeetingRooms: MeetingRoom[];

  constructor(private router: Router, private _reservationService: ReservationService) { 
    _reservationService.getMeetingRooms().subscribe((meetingRooms)=>{
      this.meetingRooms = meetingRooms;
      this.pageLoaded = true;
    })

  }

  ngOnInit(): void {
  }

  back(){
    this.router.navigate(['/reserveren']);
  }

  onSubmit(){
    console.log(this.newMeeting)
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
