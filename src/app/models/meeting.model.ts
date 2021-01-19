import { Ruimte } from './ruimte.model';

export interface Meeting {
    id: number;
    periode: String;
    datum: Date;
    bedrijfsnaam: String;
    aantalPersonen: number;
    ruimte: Ruimte;
    users?: string;
}