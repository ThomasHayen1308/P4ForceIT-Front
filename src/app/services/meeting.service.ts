import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from './../../environments/environment';

import { Meeting } from '../models/meeting.model';
import { MeetingRoom } from '../models/meeting-room.model';

@Injectable({
    providedIn: 'root'
})
export class MeetingService {
    baseUrl: string = environment.apiUrl;

    private meetings: Meeting[] = [];
    private meetingsUpdated = new Subject<Meeting[]>();

    constructor(private http: HttpClient) { }

    getMeetings() {
        return this.http.get<Meeting[]>(this.baseUrl + 'meetings').subscribe((meetings) => {
            this.meetings = meetings;
            this.meetingsUpdated.next([...this.meetings]);
        });
    }

    getMeetingRooms(): Observable<MeetingRoom[]> {
        return this.http.get<MeetingRoom[]>(this.baseUrl+"meetings/rooms");
    }

    postMeeting(newMeeting: Meeting){
        return this.http.post<Meeting>(this.baseUrl+"meetings", newMeeting);
    }

    getMeetingsUpdateListener() {
        return this.meetingsUpdated.asObservable();
    }
}