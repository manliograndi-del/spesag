import React from 'react';
import { X, HelpCircle, CheckCircle2, Search, Plus, Store } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-aiuto-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="modal-aiuto"
        className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl border border-gray-200 my-auto text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Come si usa questa pagina</h2>
          </div>
          <button
            id="chiudi-aiuto"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            aria-label="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div>
              <p className="font-semibold text-gray-900">Tocca un prodotto per vedere le offerte</p>
              <p className="text-gray-600 text-xs mt-0.5">
                Ogni prodotto in alto è un pulsante. Toccandolo si accende di rosso ed escono subito tutte le offerte trovate nei volantini della zona, ordinate dalla più conveniente in giù col prezzo per unità (€/kg, €/litro, ecc.).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-950">Il bollino verde «IL MENO CARO»</p>
              <p className="text-emerald-800 text-xs mt-0.5">
                Segnala l'offerta più conveniente tra quelle <strong>valide oggi</strong>. Le offerte che iniziano tra qualche giorno o quelle scadute non prendono il bollino verde.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <Search className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Il tasto rosso «Cerca fra i prezzi»</p>
              <p className="text-gray-600 text-xs mt-0.5">
                Permette di cercare una marca, un formato o un prodotto specifico tra tutte le offerte lette dai volantini.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <Plus className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Il tasto «+ altri prodotti»</p>
              <p className="text-gray-600 text-xs mt-0.5">
                Apre il catalogo completo di 67 prodotti diviso per reparto (Dispensa, Freschi, Macelleria, Ortofrutta, ecc.) per aggiungere o togliere prodotti dalla tua lista personale.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <Store className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">I volantini in fondo alla pagina</p>
              <p className="text-gray-600 text-xs mt-0.5">
                In fondo trovi tutti i volantini dei supermercati vicini (Mercatò di via Filadelfia 232, Lidl, Bennet, Ekom, MD, Eurospin, Carrefour Iper). Ogni volantino ha due tasti: <strong>«Le offerte»</strong> per vedere tutto quello che è stato letto da quel negozio, e <strong>«Il volantino ↗»</strong> per sfogliarlo sul sito ufficiale.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-gray-100 flex justify-end">
          <button
            id="ho-capito-aiuto"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm rounded-xl transition-colors text-center"
          >
            Ho capito
          </button>
        </div>
      </div>
    </div>
  );
};
