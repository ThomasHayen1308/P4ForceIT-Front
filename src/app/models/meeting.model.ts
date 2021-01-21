import { MeetingRoom } from './meeting-room.model';

export class Meeting {
    constructor(
        public id: number,
        public period: String,
        public date: Date,
        public companyName: String,
        public numberOfPersons: number,
        public meetingRoom: MeetingRoom,
        public users?: String
    ) { }
}