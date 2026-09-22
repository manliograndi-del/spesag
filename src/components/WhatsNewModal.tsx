import React from 'react';
import { X, Sparkles, Search, Store, ShoppingBag } from 'lucide-react';

interface WhatsNewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsNewModal: React.FC<WhatsNewModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-cosa-ce-di-nuovo-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="modal-cosa-ce-di-nuovo"
        className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl border border-gray-200 my-auto text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Cosa c'è di nuovo nell'app</h2>
          </div>
          <button
            id="chiudi-cosa-ce-di-nuovo"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            aria-label="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2 mb-4">
          Le ultime migliorie apportate all'applicazione per renderla più comoda e veloce:
        </p>

        <div className="space-y-3.5 text-sm">
          <div className="p-3.5 bg-red-50/60 rounded-xl border border-red-100 flex items-start gap-3">
            <div className="p-2 bg-red-600 text-white rounded-lg shrink-0 mt-0.5">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Tasto rosso «Cerca fra i prezzi»</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Adesso c'è un grande pulsante rosso dedicato per cercare liberamente qualunque prodotto, marca o formato tra tutte le offerte lette dai volantini.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-start gap-3">
            <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0 mt-0.5">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Nuovo supermercato: Ekom</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Aggiunto il volantino ufficiale di Ekom (con indicazione chiara delle offerte dedicate ai possessori di carta EKOM UP).
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0 mt-0.5">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Due tasti su ogni volantino</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                In fondo alla pagina ogni volantino ha due opzioni: <strong>«Le offerte»</strong> per visualizzare tutti i prezzi letti da quel punto vendita, e <strong>«Il volantino ↗»</strong> per sfogliare la versione originale online.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-gray-100 flex justify-end">
          <button
            id="ok-cosa-ce-di-nuovo"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-xl transition-colors text-center"
          >
            Continua alla spesa
          </button>
        </div>
      </div>
    </div>
  );
};
