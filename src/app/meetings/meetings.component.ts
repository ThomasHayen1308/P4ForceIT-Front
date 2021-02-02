import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MeetingService } from '../services/meeting.service';

import { Meeting } from '../models/meeting.model';

// imports for mat-table
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Time } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

interface ShowMeeting {
  id: number;
  date: Date;
  meetingRoom: String;
  companyName: String;
  numberOfPersons: number;
  start: Time;
  end: Time;
  creatorId: number;
}

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss', '../styles/page_style.scss']
})
export class MeetingsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['datum', 'ruimtenaam', 'bedrijfsnaam', 'aantalPersonen', 'start', 'actions'];

  pageLoaded: boolean = true;

  meetings: Meeting[] = [];
  showMeetings: ShowMeeting[] = []

  currentUser: User;

  meetingSub: Subscription;
  userSub: Subscription;
  meetingUpdateSub: Subscription;

  dataSource = new MatTableDataSource<ShowMeeting>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private router: Router, private _meetingService: MeetingService, private _authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pageLoaded = false;

    this.meetingUpdateSub = this._meetingService.meetingsUpdated.subscribe(() => {
      this.ngOnDestroy();
      this.showMeetings = [];
      this.ngOnInit();
    })

    this.userSub = this._authService.user.subscribe((user: User) => {
      this.currentUser = user;
    })

    this.meetingSub = this._meetingService.getMeetings().subscribe(meetings => {
      meetings.map(meeting => {
        this.showMeetings.push({
          id: meeting.id,
          date: meeting.date,
          meetingRoom: meeting.meetingRoom.name,
          companyName: meeting.companyName,
          numberOfPersons: meeting.numberOfPersons,
          start: meeting.start,
          end: meeting.end,
          creatorId: meeting.creator.id
        })
      });
      this.dataSource.data = this.showMeetings;
      this.pageLoaded = true;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteMeeting(id: number) {
    let currentMeeting;
    this._meetingService.getMeetingById(id).toPromise()
      .then((meeting: Meeting) => {
        currentMeeting = meeting;
      })
      .then(() => {
        this.dialog.open(DialogMeetingDelete, {
          data: {
            currentMeeting: currentMeeting
          }
        });
      })

  }

  toHome() {
    this.router.navigate(['/home'])
  }

  ngOnDestroy() {
    this.meetingUpdateSub.unsubscribe();
    this.userSub.unsubscribe();
    this.meetingSub.unsubscribe();
  }
}

// DialogCancel Component => kan eventueel nog in andere file gezet worden
@Component({
  selector: 'dialog-meeting-delete',
  templateUrl: 'dialog-meeting-delete.html',
})
export class DialogMeetingDelete {
  currentMeeting: Meeting;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _meetingService: MeetingService
  ) { }

  ngOnInit() {
    this.currentMeeting = this.data.currentMeeting;
  }

  onDelete() {
    this._meetingService.deleteMeeting(this.currentMeeting.id);
  }
}