import { Chair } from "./chair.model";
import { User } from './user.model';

export class Reservation {
    constructor(
        public id: number,
        public period: String,
        public date: Date,
        public chair: Chair,
        public user: User
    ) { }
}