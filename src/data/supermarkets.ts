import { Supermarket } from '../types';

export const SUPERMARKETS: Supermarket[] = [
  {
    id: 'mercato',
    nome: 'Mercatò',
    insegna: 'Mercatò',
    indirizzo: 'via Filadelfia 232',
    citta: 'Torino',
    note: 'Negozio preferito di Manlio (insegna semplice)',
  },
  {
    id: 'lidl',
    nome: 'Lidl',
    insegna: 'Lidl',
    indirizzo: 'via Boston / corso Siracusa',
    citta: 'Torino',
    note: 'A pochi passi da casa',
  },
  {
    id: 'ekom',
    nome: 'Ekom',
    insegna: 'Ekom',
    indirizzo: 'Torino (punti vendita aderenti)',
    citta: 'Torino',
    note: 'Offerte volantino con carta EKOM UP',
  },
  {
    id: 'bennet',
    nome: 'Bennet',
    insegna: 'Bennet',
    indirizzo: 'Torino',
    citta: 'Torino',
    note: 'Ipermercato con offerte alimentari e cura persona',
  },
  {
    id: 'eurospin',
    nome: 'Eurospin',
    insegna: 'Eurospin',
    indirizzo: 'Torino (corso Siracusa / vicinanze)',
    citta: 'Torino',
    note: 'Spesa intelligente e speciali weekend',
  },
  {
    id: 'md',
    nome: 'MD',
    insegna: 'MD',
    indirizzo: 'Torino',
    citta: 'Torino',
    note: 'Offerte Buona Spesa Card',
  },
  {
    id: 'carrefour',
    nome: 'Carrefour Iper',
    insegna: 'Carrefour Iper',
    indirizzo: 'Torino',
    citta: 'Torino',
    note: 'Offerte confermate valide a Torino',
  },
];

export const DEFAULT_ENABLED_SUPERMARKETS = SUPERMARKETS.map((s) => s.id);
export const DEFAULT_USER_ZONE = 'Torino (corso Siracusa)';
