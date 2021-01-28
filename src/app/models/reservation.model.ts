import { Time } from "@angular/common";
import { Chair } from "./chair.model";
import { User } from './user.model';

export class Reservation {
    constructor(
        public id: number,
        public start: Time,
        public end: Time,
        public date: Date,
        public present: boolean,
        public chair: Chair,
        public user: User
    ) { }
}