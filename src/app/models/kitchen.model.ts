import { Campus } from './campus.model';

export class Kitchen {
    constructor(
        public id: number,
        public numberOfPersons: number,
        public maxPersons: number,
        public campus: Campus
    ) { }
}