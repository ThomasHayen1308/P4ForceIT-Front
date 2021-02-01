import { Time } from '@angular/common';
import { MeetingRoom } from './meeting-room.model';
import { User } from './user.model';

export class Meeting {
    constructor(
        public id: number,
        public start: Time,
        public end: Time,
        public date: Date,
        public companyName: string,
        public numberOfPersons: number,
        public creator: User,
        public meetingRoom: MeetingRoom,
        public users?: User[]
    ) { }
}