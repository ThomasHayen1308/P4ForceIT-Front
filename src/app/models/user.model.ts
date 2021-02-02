import { Role } from './role.model';

export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public token: string,
        public coins: number,
        public role: Role
    ) { }
}