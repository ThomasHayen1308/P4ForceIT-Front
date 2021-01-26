import { MeetingRoom } from './meeting-room.model';

export class Meeting {
    constructor(
        public id: number,
        public period: string,
        public date: Date,
        public companyName: string,
        public numberOfPersons: number,
        public meetingRoom: MeetingRoom,
        public users?: string
    ) { }
}