export interface Product {
  id: string;
  nome: string;
  repartoId: string;
  unitaMisura: 'kg' | 'l' | 'pezzo' | 'lavaggio' | 'rotolo';
}

export interface Department {
  id: string;
  nome: string;
  icona: string;
}

export interface Flyer {
  id: string;
  titolo: string;
  insegna: string;
  negozio: string;
  validoDal: string; // YYYY-MM-DD
  validoAl: string;  // YYYY-MM-DD
  stato: 'in_corso' | 'in_arrivo' | 'scaduto' | 'atteso';
  linkVolantino: string;
  totalePagine?: number;
  note?: string;
  aggiornatoIl?: string;
}

export interface Offer {
  id: string;
  prodottoId: string;
  nomeProdotto: string;
  marca: string;
  insegna: string;
  negozio: string;
  flyerId: string;
  prezzoTotale: number;
  formato: string;
  prezzoUnitario: number;
  unitaMisura: string;
  validoDal: string; // YYYY-MM-DD
  validoAl: string;  // YYYY-MM-DD
  note?: string;
  linkPagina?: string;
}

export interface Supermarket {
  id: string;
  nome: string;
  insegna: string;
  indirizzo: string;
  citta: string;
  note?: string;
}

export interface UserPreferences {
  zona: string;
  supermercatiAbilitati: string[]; // ids of enabled supermarkets
}

export interface DiarioRecord {
  data: string;
  tipo: 'nuovo_volantino' | 'prezzo_ribassato' | 'volantino_scaduto' | 'nuove_offerte';
  titolo: string;
  dettaglio: string;
  insegna?: string;
}
