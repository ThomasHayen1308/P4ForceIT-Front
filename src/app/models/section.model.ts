import { Campus } from './campus.model';

export class Section {
    constructor(
        public id: number,
        public name: String,
        public campus: Campus
    ) { }
}