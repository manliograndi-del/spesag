import { Department, Product } from '../types';

export const DEPARTMENTS: Department[] = [
  { id: 'dispensa', nome: 'Dispensa & Pasta', icona: 'Package' },
  { id: 'colazione', nome: 'Colazione & Dolci', icona: 'Coffee' },
  { id: 'freschi', nome: 'Freschi & Formaggi', icona: 'Milk' },
  { id: 'macelleria', nome: 'Macelleria & Salumi', icona: 'Beef' },
  { id: 'pesce_surgelati', nome: 'Pesce & Surgelati', icona: 'Fish' },
  { id: 'ortofrutta', nome: 'Ortofrutta', icona: 'Apple' },
  { id: 'bevande', nome: 'Acqua & Bevande', icona: 'Wine' },
  { id: 'cura_casa', nome: 'Cura Casa & Persona', icona: 'Sparkles' },
];

export const CATALOG: Product[] = [
  // 1. Dispensa & Pasta (11 voci)
  { id: 'pasta', nome: 'Pasta di semola', repartoId: 'dispensa', unitaMisura: 'kg' },
  { id: 'riso', nome: 'Riso', repartoId: 'dispensa', unitaMisura: 'kg' },
  { id: 'farina', nome: 'Farina', repartoId: 'dispensa', unitaMisura: 'kg' },
  { id: 'olio_evo', nome: 'Olio extravergine', repartoId: 'dispensa', unitaMisura: 'l' },
  { id: 'olio_semi', nome: 'Olio di semi', repartoId: 'dispensa', unitaMisura: 'l' },
  { id: 'passata', nome: 'Passata e polpa pomodoro', repartoId: 'dispensa', unitaMisura: 'kg' },
  { id: 'legumi', nome: 'Legumi in scatola', repartoId: 'dispensa', unitaMisura: 'kg' },
  { id: 'tonno', nome: 'Tonno sott\'olio', repartoId: 'dispensa', unitaMisura: 'kg' },
  { id: 'zucchero', nome: 'Zucchero', repartoId: 'dispensa', unitaMisura: 'kg' },
  { id: 'sale', nome: 'Sale', repartoId: 'dispensa', unitaMisura: 'kg' },
  { id: 'aceto', nome: 'Aceto', repartoId: 'dispensa', unitaMisura: 'l' },

  // 2. Colazione & Dolci (9 voci)
  { id: 'caffe', nome: 'Caffè macinato', repartoId: 'colazione', unitaMisura: 'kg' },
  { id: 'biscotti', nome: 'Biscotti', repartoId: 'colazione', unitaMisura: 'kg' },
  { id: 'fette_biscottate', nome: 'Fette biscottate', repartoId: 'colazione', unitaMisura: 'kg' },
  { id: 'confettura', nome: 'Marmellata e confettura', repartoId: 'colazione', unitaMisura: 'kg' },
  { id: 'cereali', nome: 'Cereali per colazione', repartoId: 'colazione', unitaMisura: 'kg' },
  { id: 'merendine', nome: 'Merendine', repartoId: 'colazione', unitaMisura: 'kg' },
  { id: 'cioccolato', nome: 'Cioccolato e tavolette', repartoId: 'colazione', unitaMisura: 'kg' },
  { id: 'te_infusi', nome: 'Tè e camomilla', repartoId: 'colazione', unitaMisura: 'pezzo' },
  { id: 'crema_nocciole', nome: 'Crema di nocciole', repartoId: 'colazione', unitaMisura: 'kg' },

  // 3. Freschi & Formaggi (9 voci)
  { id: 'latte', nome: 'Latte fresco e UHT', repartoId: 'freschi', unitaMisura: 'l' },
  { id: 'mozzarella', nome: 'Mozzarella', repartoId: 'freschi', unitaMisura: 'kg' },
  { id: 'parmigiano', nome: 'Parmigiano e Grana', repartoId: 'freschi', unitaMisura: 'kg' },
  { id: 'burro', nome: 'Burro', repartoId: 'freschi', unitaMisura: 'kg' },
  { id: 'uova', nome: 'Uova', repartoId: 'freschi', unitaMisura: 'pezzo' },
  { id: 'yogurt', nome: 'Yogurt', repartoId: 'freschi', unitaMisura: 'kg' },
  { id: 'ricotta', nome: 'Ricotta e freschi', repartoId: 'freschi', unitaMisura: 'kg' },
  { id: 'formaggio_spalmabile', nome: 'Formaggio spalmabile', repartoId: 'freschi', unitaMisura: 'kg' },
  { id: 'formaggi_fette', nome: 'Formaggi a fette', repartoId: 'freschi', unitaMisura: 'kg' },

  // 4. Macelleria & Salumi (8 voci)
  { id: 'pollo', nome: 'Petto di pollo', repartoId: 'macelleria', unitaMisura: 'kg' },
  { id: 'macinato', nome: 'Macinato di manzo', repartoId: 'macelleria', unitaMisura: 'kg' },
  { id: 'prosciutto_cotto', nome: 'Prosciutto cotto', repartoId: 'macelleria', unitaMisura: 'kg' },
  { id: 'prosciutto_crudo', nome: 'Prosciutto crudo', repartoId: 'macelleria', unitaMisura: 'kg' },
  { id: 'salame', nome: 'Salame', repartoId: 'macelleria', unitaMisura: 'kg' },
  { id: 'fesa_tacchino', nome: 'Fesa di tacchino', repartoId: 'macelleria', unitaMisura: 'kg' },
  { id: 'salsiccia', nome: 'Salsiccia e verzini', repartoId: 'macelleria', unitaMisura: 'kg' },
  { id: 'hamburger', nome: 'Hamburger e svizzere', repartoId: 'macelleria', unitaMisura: 'kg' },

  // 5. Pesce & Surgelati (8 voci)
  { id: 'merluzzo', nome: 'Filetti di merluzzo', repartoId: 'pesce_surgelati', unitaMisura: 'kg' },
  { id: 'pesce_fresco', nome: 'Orata e spigola fresca', repartoId: 'pesce_surgelati', unitaMisura: 'kg' },
  { id: 'salmone', nome: 'Salmone affumicato e fresco', repartoId: 'pesce_surgelati', unitaMisura: 'kg' },
  { id: 'bastoncini', nome: 'Bastoncini di pesce', repartoId: 'pesce_surgelati', unitaMisura: 'kg' },
  { id: 'minestrone', nome: 'Minestrone surgelato', repartoId: 'pesce_surgelati', unitaMisura: 'kg' },
  { id: 'pizza_surgelata', nome: 'Pizza surgelata', repartoId: 'pesce_surgelati', unitaMisura: 'kg' },
  { id: 'patatine_surgelate', nome: 'Patatine fritte surgelate', repartoId: 'pesce_surgelati', unitaMisura: 'kg' },
  { id: 'gelato', nome: 'Gelato in vaschetta', repartoId: 'pesce_surgelati', unitaMisura: 'kg' },

  // 6. Ortofrutta (8 voci)
  { id: 'mele', nome: 'Mele', repartoId: 'ortofrutta', unitaMisura: 'kg' },
  { id: 'banane', nome: 'Banane', repartoId: 'ortofrutta', unitaMisura: 'kg' },
  { id: 'pomodori', nome: 'Pomodori da insalata', repartoId: 'ortofrutta', unitaMisura: 'kg' },
  { id: 'patate', nome: 'Patate', repartoId: 'ortofrutta', unitaMisura: 'kg' },
  { id: 'zucchine', nome: 'Zucchine', repartoId: 'ortofrutta', unitaMisura: 'kg' },
  { id: 'insalata_busta', nome: 'Insalata in busta', repartoId: 'ortofrutta', unitaMisura: 'kg' },
  { id: 'arance_agrumi', nome: 'Agrumi e limoni', repartoId: 'ortofrutta', unitaMisura: 'kg' },
  { id: 'carote', nome: 'Carote', repartoId: 'ortofrutta', unitaMisura: 'kg' },

  // 7. Acqua & Bevande (6 voci)
  { id: 'acqua', nome: 'Acqua naturale e frizzante', repartoId: 'bevande', unitaMisura: 'l' },
  { id: 'birra', nome: 'Birra in bottiglia o lattina', repartoId: 'bevande', unitaMisura: 'l' },
  { id: 'vino', nome: 'Vino da tavola e DOC', repartoId: 'bevande', unitaMisura: 'l' },
  { id: 'succhi', nome: 'Succhi di frutta', repartoId: 'bevande', unitaMisura: 'l' },
  { id: 'bibite', nome: 'Bibite gassate e cola', repartoId: 'bevande', unitaMisura: 'l' },
  { id: 'the_freddo', nome: 'Tè freddo', repartoId: 'bevande', unitaMisura: 'l' },

  // 8. Cura Casa & Persona (8 voci)
  { id: 'carta_igienica', nome: 'Carta igienica', repartoId: 'cura_casa', unitaMisura: 'rotolo' },
  { id: 'rotoloni', nome: 'Rotoloni e carta cucina', repartoId: 'cura_casa', unitaMisura: 'rotolo' },
  { id: 'detersivo_lavatrice', nome: 'Detersivo lavatrice', repartoId: 'cura_casa', unitaMisura: 'lavaggio' },
  { id: 'detersivo_piatti', nome: 'Detersivo piatti', repartoId: 'cura_casa', unitaMisura: 'l' },
  { id: 'ammorbidente', nome: 'Ammorbidente', repartoId: 'cura_casa', unitaMisura: 'l' },
  { id: 'bagnoschiuma', nome: 'Bagnoschiuma', repartoId: 'cura_casa', unitaMisura: 'l' },
  { id: 'shampoo', nome: 'Shampoo e balsamo', repartoId: 'cura_casa', unitaMisura: 'l' },
  { id: 'dentifricio', nome: 'Dentifricio', repartoId: 'cura_casa', unitaMisura: 'pezzo' },
];

// Manlio's default active products on first load
export const DEFAULT_ACTIVE_PRODUCT_IDS = [
  'pasta',
  'olio_evo',
  'caffe',
  'latte',
  'pollo',
  'tonno',
  'carta_igienica',
  'detersivo_lavatrice',
  'mele',
  'mozzarella',
  'biscotti',
  'passata',
];
