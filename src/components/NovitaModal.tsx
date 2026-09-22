import React, { useState, useMemo } from 'react';
import { X, Bell, Calendar, Store, AlertCircle, ExternalLink, ChevronRight } from 'lucide-react';
import { Flyer } from '../types';
import { VOLANTINI_AGGIORNATI, DIARIO_PREZZI } from '../data/history';

interface NovitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  flyers: Flyer[];
  currentDate?: string;
  onSelectFlyer?: (flyer: Flyer) => void;
}

export const NovitaModal: React.FC<NovitaModalProps> = ({
  isOpen,
  onClose,
  flyers,
  currentDate = '2026-09-22',
  onSelectFlyer,
}) => {
  const [filterPeriod, setFilterPeriod] = useState<'oggi' | '3_giorni' | '7_giorni'>('oggi');

  // Filter updated flyers based on the window chosen
  const filteredAggiornati = useMemo(() => {
    return VOLANTINI_AGGIORNATI.filter((item) => {
      if (filterPeriod === 'oggi') {
        return item.data === currentDate; // 2026-09-22
      } else if (filterPeriod === '3_giorni') {
        return item.data >= '2026-09-20'; // last 3 days
      } else {
        return item.data >= '2026-09-15'; // last 7 days
      }
    });
  }, [filterPeriod, currentDate]);

  if (!isOpen) return null;

  return (
    <div
      id="modal-novita-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="modal-novita"
        className="bg-white rounded-2xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl border border-gray-200 my-auto text-gray-800 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                Novità & Volantini
              </h2>
              <p className="text-xs text-gray-500">
                Aggiornamenti quotidiani dei negozi vicini (corso Siracusa, Torino)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            aria-label="Chiudi novità"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content scrolling */}
        <div className="overflow-y-auto flex-1 space-y-6 pr-1 py-3 text-sm">
          {/* SEZIONE 1: Volantini aggiornati (con tasti Oggi / 3 giorni / 7 giorni) */}
          <section id="riquadro-volantini-aggiornati" className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="font-bold text-base text-gray-900">
                  Volantini aggiornati
                </h3>
                <p className="text-xs text-gray-600">
                  Volantini nuovi, riletti per intero o arrivati a fine validità
                </p>
              </div>

              {/* Tasti periodo: Oggi / 3 giorni / 7 giorni */}
              <div className="inline-flex rounded-xl bg-gray-200/80 p-0.5 text-xs font-semibold shrink-0">
                <button
                  id="tab-novita-oggi"
                  onClick={() => setFilterPeriod('oggi')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    filterPeriod === 'oggi'
                      ? 'bg-white text-gray-900 shadow-2xs font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Oggi
                </button>
                <button
                  id="tab-novita-3giorni"
                  onClick={() => setFilterPeriod('3_giorni')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    filterPeriod === '3_giorni'
                      ? 'bg-white text-gray-900 shadow-2xs font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  3 giorni
                </button>
                <button
                  id="tab-novita-7giorni"
                  onClick={() => setFilterPeriod('7_giorni')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    filterPeriod === '7_giorni'
                      ? 'bg-white text-gray-900 shadow-2xs font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  7 giorni
                </button>
              </div>
            </div>

            {/* Lista volantini aggiornati nel periodo */}
            <div className="space-y-2">
              {filteredAggiornati.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-xs bg-white rounded-xl border border-gray-200">
                  Nessun nuovo aggiornamento in questa finestra temporale.
                </div>
              ) : (
                filteredAggiornati.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs flex items-start gap-2.5"
                  >
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mt-0.5 shrink-0 ${
                        item.tipo === 'nuovo'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : item.tipo === 'finito'
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.tipo === 'nuovo' ? 'Nuovo' : item.tipo === 'finito' ? 'Finito' : 'Riletto'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.titolo}</h4>
                        <span className="text-[11px] text-gray-600 shrink-0 font-medium">
                          {item.data.slice(8, 10)}/{item.data.slice(5, 7)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{item.dettaglio}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* SEZIONE 2: Tabella di tutti i volantini */}
          <section id="sezione-tabella-volantini">
            <h3 className="font-bold text-base text-gray-900 mb-2">
              Tutti i volantini (in corso, in arrivo e attesi)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-gray-100/80 text-gray-700 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Insegna</th>
                    <th className="py-2.5 px-3">Titolo volantino</th>
                    <th className="py-2.5 px-3">Validità</th>
                    <th className="py-2.5 px-3">Stato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {flyers.map((f) => (
                    <tr key={f.id} className="hover:bg-gray-50/80">
                      <td className="py-2.5 px-3 font-bold text-gray-900 whitespace-nowrap">
                        {f.insegna}
                      </td>
                      <td className="py-2.5 px-3 text-gray-800 font-medium">
                        {f.titolo}
                      </td>
                      <td className="py-2.5 px-3 text-gray-600 whitespace-nowrap">
                        {f.validoDal.slice(8, 10)}/{f.validoDal.slice(5, 7)} — {f.validoAl.slice(8, 10)}/{f.validoAl.slice(5, 7)}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {f.stato === 'atteso' ? (
                          <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                            Prezzi non ancora letti
                          </span>
                        ) : f.stato === 'in_arrivo' ? (
                          <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                            In arrivo
                          </span>
                        ) : f.stato === 'scaduto' ? (
                          <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            Scaduto
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            In corso
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SEZIONE 3: Diario dei prezzi */}
          <section id="sezione-diario-prezzi">
            <h3 className="font-bold text-base text-gray-900 mb-2">
              Diario dei prezzi e delle novità
            </h3>
            <div className="space-y-2">
              {DIARIO_PREZZI.map((entry, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-2.5"
                >
                  <div className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded-md shrink-0">
                    {entry.data.slice(8, 10)}/{entry.data.slice(5, 7)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{entry.titolo}</h4>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{entry.dettaglio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-gray-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-xl"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
