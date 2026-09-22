import React, { useState, useMemo } from 'react';
import { Search, X, Store, Calendar, ArrowRight } from 'lucide-react';
import { Offer } from '../types';

interface PriceSearchProps {
  isOpen: boolean;
  onToggle: () => void;
  offers: Offer[];
  onSelectProduct?: (productId: string) => void;
}

export const PriceSearch: React.FC<PriceSearchProps> = ({
  isOpen,
  onToggle,
  offers,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOffers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];

    return offers.filter((o) => {
      return (
        o.nomeProdotto.toLowerCase().includes(term) ||
        o.marca.toLowerCase().includes(term) ||
        o.insegna.toLowerCase().includes(term) ||
        o.formato.toLowerCase().includes(term) ||
        (o.note && o.note.toLowerCase().includes(term))
      );
    });
  }, [offers, searchTerm]);

  return (
    <div id="sezione-cerca-prezzi" className="w-full my-3">
      {/* Tasto rosso pieno su una riga tutta sua, con classi richieste: .tasto.trova.agg */}
      <button
        id="tasto-cerca-prezzi"
        onClick={onToggle}
        className={`tasto trova agg w-full py-3 px-4 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all duration-150 cursor-pointer ${
          isOpen
            ? 'bg-red-800 text-white ring-2 ring-red-300'
            : 'bg-red-600 hover:bg-red-700 text-white active:scale-[0.99]'
        }`}
        aria-expanded={isOpen}
      >
        <Search className="w-5 h-5 shrink-0" />
        <span>{isOpen ? 'Chiudi ricerca fra i prezzi' : 'Cerca fra i prezzi di tutte le offerte'}</span>
      </button>

      {/* Pannello di ricerca che sta FUORI dalla barra sticky */}
      {isOpen && (
        <div
          id="pannello-cerca-prezzi"
          className="mt-3 p-4 bg-white rounded-2xl border-2 border-red-200 shadow-md animate-in fade-in duration-200"
        >
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="input-cerca-prezzi"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca per marca (es. Barilla, Lavazza), formato o prodotto..."
              className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-gray-900 placeholder-gray-500"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full"
                aria-label="Cancella testo"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between mt-2.5 px-1">
            <span className="text-xs text-gray-500">
              {searchTerm ? (
                <span>
                  Trovate <strong>{filteredOffers.length}</strong> offerte per «{searchTerm}»
                </span>
              ) : (
                'Scrivi almeno una parola per cercare tra tutte le offerte lette dai volantini.'
              )}
            </span>
            <span className="text-[11px] text-amber-700 font-medium">
              Nota: nei risultati liberi il bollino verde è disattivato
            </span>
          </div>

          {/* Risultati della ricerca */}
          {searchTerm && (
            <div className="mt-3 space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredOffers.length === 0 ? (
                <div className="p-6 text-center text-gray-500 text-sm bg-gray-50 rounded-xl">
                  Nessuna offerta trovata per «{searchTerm}». Prova con un'altra parola chiave.
                </div>
              ) : (
                filteredOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-3 bg-gray-50 hover:bg-red-50/40 rounded-xl border border-gray-200 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-gray-300 text-gray-800 shadow-2xs">
                          <Store className="w-3 h-3 text-red-600" />
                          {offer.insegna} ({offer.negozio})
                        </span>
                        <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                          {offer.marca}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                          <Calendar className="w-3 h-3" />
                          Fino al {offer.validoAl.slice(8, 10)}/{offer.validoAl.slice(5, 7)}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {offer.nomeProdotto}
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Formato: <span className="font-medium text-gray-800">{offer.formato}</span>
                        {offer.note && (
                          <span className="ml-2 text-amber-800 font-medium">· {offer.note}</span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                      <div className="text-right">
                        <div className="text-base font-bold text-gray-900">
                          {offer.prezzoTotale.toFixed(2).replace('.', ',')} €
                        </div>
                        <div className="text-xs font-semibold text-gray-600">
                          {offer.prezzoUnitario.toFixed(2).replace('.', ',')} €/{offer.unitaMisura}
                        </div>
                      </div>

                      {onSelectProduct && (
                        <button
                          onClick={() => {
                            onSelectProduct(offer.prodottoId);
                            onToggle();
                          }}
                          className="px-2.5 py-1.5 text-xs font-medium text-red-700 bg-white hover:bg-red-50 border border-red-200 rounded-lg flex items-center gap-1 shrink-0"
                          title="Vai al prodotto nella lista"
                        >
                          <span>Scheda</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
