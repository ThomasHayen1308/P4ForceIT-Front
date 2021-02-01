import { Injectable, OnDestroy } from '@angular/core';
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

    meetingsUpdated = new Subject<number>();

    constructor(private http: HttpClient) { }

    getMeetings() {
        return this.http.get<Meeting[]>(this.baseUrl + 'meetings');
    }

    getMeetingById(id: number) {
        return this.http.get<Meeting>(this.baseUrl + 'meetings/' + id);
    }

    getMeetingRooms(): Observable<MeetingRoom[]> {
        return this.http.get<MeetingRoom[]>(this.baseUrl + "meetings/rooms");
    }

    postMeeting(newMeeting: Meeting) {
        return this.http.post<Meeting>(this.baseUrl + "meetings", newMeeting);
    }

    deleteMeeting(id: number) {
        return this.http.delete<Meeting>(this.baseUrl + 'meetings/' + id).subscribe(() => {
            this.meetingsUpdated.next(id);
        })
    }
}