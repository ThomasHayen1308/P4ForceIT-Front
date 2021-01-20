import {Campus} from './campus.model';

export interface Kitchen{
    id: number;
    aantalPersonen: number;
    maxPersonen: number;
    campus: Campus;
}