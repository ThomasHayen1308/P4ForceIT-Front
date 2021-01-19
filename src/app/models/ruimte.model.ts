import { Campus } from './campus.model';

export interface Ruimte {
    id: number;
    campus: Campus;
    name: String;
    maxpersonen: number;

}