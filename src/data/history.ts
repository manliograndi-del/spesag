import { DiarioRecord } from '../types';

export interface VolantinoAggiornato {
  id: string;
  data: string; // YYYY-MM-DD
  tipo: 'nuovo' | 'riletto' | 'finito';
  titolo: string;
  insegna: string;
  dettaglio: string;
}

export const VOLANTINI_AGGIORNATI: VolantinoAggiornato[] = [
  {
    id: 'va_ekom22',
    data: '2026-09-22',
    tipo: 'nuovo',
    titolo: 'Ekom: I più ekonomici (22 set - 5 ott)',
    insegna: 'Ekom',
    dettaglio: 'Letto per intero: 16 pagine, 102 prezzi nuovi. Offerte con carta EKOM UP.',
  },
  {
    id: 'va_lidl24',
    data: '2026-09-22',
    tipo: 'nuovo',
    titolo: 'Lidl: Sottoprezzi d\'Autunno (24 - 30 set)',
    insegna: 'Lidl',
    dettaglio: 'Letto per intero: 52 pagine, 93 prezzi nuovi (date differenziate 24-27 e 28-30 set).',
  },
  {
    id: 'va_ekom08_fin',
    data: '2026-09-21',
    tipo: 'finito',
    titolo: 'Ekom: 1+1 (8 - 21 set)',
    insegna: 'Ekom',
    dettaglio: 'Volantino scaduto ieri 21 settembre, sostituito dal nuovo "I più ekonomici".',
  },
  {
    id: 'va_md08_fin',
    data: '2026-09-20',
    tipo: 'finito',
    titolo: 'MD: Prezzi Shock (8 - 20 set)',
    insegna: 'MD',
    dettaglio: 'Volantino scaduto il 20/09, subentra il nuovo MD 22 set - 4 ott.',
  },
  {
    id: 'va_eurospin10_fin',
    data: '2026-09-20',
    tipo: 'finito',
    titolo: 'Eurospin: Spesa Intelligente (10 - 20 set)',
    insegna: 'Eurospin',
    dettaglio: 'Terminato il 20/09, in arrivo dal 24/09 il nuovo Eurospin.',
  },
  {
    id: 'va_bennet1709',
    data: '2026-09-19',
    tipo: 'nuovo',
    titolo: 'Bennet: Un mondo di bellezza & spesa (17 - 30 set)',
    insegna: 'Bennet',
    dettaglio: 'Letto per intero: 27 pagine, 87 prezzi tra spesa alimentare e cura persona.',
  },
  {
    id: 'va_lidlfv17',
    data: '2026-09-18',
    tipo: 'nuovo',
    titolo: 'Lidl: Speciale Frutta e Verdura (17 - 23 set)',
    insegna: 'Lidl',
    dettaglio: 'Letto per intero: 7 pagine, 12 prezzi aggiuntivi per ortofrutta.',
  },
  {
    id: 'va_md22',
    data: '2026-09-18',
    tipo: 'nuovo',
    titolo: 'MD: Tutto a 1€, 1.50€, 2€ (22 set - 4 ott)',
    insegna: 'MD',
    dettaglio: 'Letto per intero: 37 pagine, 131 prezzi nuovi e offerte carta Buona Spesa.',
  },
  {
    id: 'va_eurospin24',
    data: '2026-09-18',
    tipo: 'nuovo',
    titolo: 'Eurospin: I Grandi del Risparmio (24 set - 4 ott)',
    insegna: 'Eurospin',
    dettaglio: 'Letto per intero: 22 pagine, ~140 prezzi e speciali weekend.',
  },
  {
    id: 'va_mercato17',
    data: '2026-09-17',
    tipo: 'nuovo',
    titolo: 'Mercatò: via Filadelfia 232 (17 - 30 set)',
    insegna: 'Mercatò',
    dettaglio: 'Letto per intero: 32 pagine con prezzi aggiornati per il negozio di Torino.',
  },
];

export const DIARIO_PREZZI: DiarioRecord[] = [
  {
    data: '2026-09-22',
    tipo: 'nuovo_volantino',
    titolo: 'Letto nuovo volantino Ekom (22 set - 5 ott)',
    dettaglio: '102 prezzi aggiunti. Molto convenienti pasta Divella a 0,69 € (1,38 €/kg) e olio extravergine Ekom a 6,99 €/l con carta EKOM UP.',
    insegna: 'Ekom',
  },
  {
    data: '2026-09-22',
    tipo: 'nuovo_volantino',
    titolo: 'Letto nuovo volantino Lidl d\'Autunno (24 - 30 set)',
    dettaglio: '93 prezzi aggiunti per il volantino in arrivo dal 24 settembre. Pasta Combino a 0,59 € e detersivo Formil 40 lavaggi a 3,49 € (0,09 €/lavaggio).',
    insegna: 'Lidl',
  },
  {
    data: '2026-09-21',
    tipo: 'prezzo_ribassato',
    titolo: 'Controllo scadenze: fine volantini 8-21 settembre',
    dettaglio: 'Scaduti i volantini intermedi, restano attivi Mercatò via Filadelfia e Bennet fino al 30 settembre.',
  },
  {
    data: '2026-09-19',
    tipo: 'nuove_offerte',
    titolo: 'Letto volantino Bennet (17 - 30 set)',
    dettaglio: '87 prezzi inseriti tra alimentari e cura persona. Risparmio su riso Gallo Arborio (2,69 €/kg) e detersivo Sole (0,10 €/lavaggio).',
    insegna: 'Bennet',
  },
  {
    data: '2026-09-18',
    tipo: 'nuovo_volantino',
    titolo: 'Letti in anticipo MD (dal 22/9) ed Eurospin (dal 24/9)',
    dettaglio: 'Oltre 270 offerte catalogate in anteprima. Eurospin propone pacco 1 kg di pasta Tre Mulini a 0,89 € e MD petto di pollo a 6,80 €/kg.',
  },
];
