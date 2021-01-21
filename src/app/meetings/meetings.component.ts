import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MeetingService } from '../services/meeting.service';

import { Meeting } from '../models/meeting.model';

// imports for mat-table
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface ShowMeeting {
  date: Date;
  meetingRoom: String;
  companyName: String;
  numberOfPersons: number;
}

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss', '../styles/page_style.scss']
})
export class MeetingsComponent implements OnInit {
  displayedColumns: string[] = ['datum', 'ruimtenaam', 'bedrijfsnaam', 'aantalPersonen'];

  pageLoaded: boolean = true;

  meetings: Meeting[] = [];
  showMeetings: ShowMeeting[] = []

  dataSource = new MatTableDataSource(this.showMeetings);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: false }) sort: MatSort;

  private meetingsSub: Subscription;

  constructor(private router: Router, private meetingService: MeetingService) { }

  ngOnInit(): void {
    this.pageLoaded = false;
    this.meetingService.getMeetings();
    this.meetingsSub = this.meetingService.getMeetingsUpdateListener().subscribe((meetings: Meeting[]) => {
      meetings.map((meeting: Meeting) => {
        this.showMeetings.push({
          date: meeting.date,
          meetingRoom: meeting.meetingRoom.name,
          companyName: meeting.companyName,
          numberOfPersons: meeting.numberOfPersons
        })
      });
      this.dataSource = new MatTableDataSource(this.showMeetings);
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

  toHome() {
    this.router.navigate(['/home'])
  }

}
