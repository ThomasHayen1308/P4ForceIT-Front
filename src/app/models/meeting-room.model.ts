import { Campus } from './campus.model';

export class MeetingRoom {
    constructor(
        public id: number,
        public campus: Campus,
        public name: string,
        public maxPersons: number
    ) { }
}