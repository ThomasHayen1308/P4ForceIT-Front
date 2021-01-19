import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MeetingService } from '../services/meeting.service';

// imports for mat-table
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Meeting } from '../models/meeting.model';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss', '../styles/page_style.scss']
})
export class MeetingsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['datum', 'ruimte', 'bedrijf', 'aantalpersonen'];

  meetings: Meeting[] = [];

  dataSource = new MatTableDataSource(this.meetings);

  private meetingsSub: Subscription;

  constructor(private router: Router, private meetingService: MeetingService) { }

  ngOnInit(): void {
    this.meetingService.getMeetings();
    this.meetingsSub = this.meetingService.getMeetingsUpdateListener().subscribe((meetings: Meeting[]) => {
      this.meetings = meetings;
      this.dataSource = new MatTableDataSource(this.meetings);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toHome() {
    this.router.navigate(['/home'])
  }
  
}
