import React from 'react';
import { Store, Calendar, ExternalLink, ListFilter, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Flyer, Offer } from '../types';

interface FlyersSectionProps {
  flyers: Flyer[];
  allOffers: Offer[];
  onOpenFlyerOffers: (flyer: Flyer) => void;
  currentDate?: string;
}

export const FlyersSection: React.FC<FlyersSectionProps> = ({
  flyers,
  allOffers,
  onOpenFlyerOffers,
  currentDate = '2026-09-22',
}) => {
  return (
    <section id="sezione-volantini" className="mt-10 mb-8 pt-6 border-t-2 border-gray-200">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <Store className="w-5 h-5 text-red-600" />
          <span>I Volantini dei negozi vicini</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
          Supermercati di Torino attorno a corso Siracusa (Mercatò via Filadelfia 232, Lidl, Bennet, Ekom, MD, Eurospin, Carrefour Iper)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {flyers.map((flyer) => {
          // Count offers for this flyer
          const flyerOffers = allOffers.filter((o) => o.flyerId === flyer.id);
          const isExpired = flyer.validoAl < currentDate;
          const isWaiting = flyer.stato === 'atteso';
          const isInFuture = flyer.validoDal > currentDate;

          // Count valid offers today
          const validOffersToday = flyerOffers.filter(
            (o) => o.validoDal <= currentDate && currentDate <= o.validoAl
          );
          const offersCount = isInFuture ? flyerOffers.length : validOffersToday.length;

          return (
            <div
              key={flyer.id}
              id={`scheda-volantino-${flyer.id}`}
              className={`p-4 rounded-2xl border transition-all ${
                isExpired
                  ? 'bg-gray-50 border-gray-200 opacity-65'
                  : isWaiting
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-white border-gray-300 hover:border-gray-400 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-lg border border-gray-200">
                      {flyer.insegna}
                    </span>
                    <span className="text-xs text-gray-600 truncate max-w-[200px]">
                      {flyer.negozio}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 mt-1">
                    {flyer.titolo}
                  </h3>
                </div>

                <div className="shrink-0 text-right">
                  {isExpired ? (
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                      Scaduto
                    </span>
                  ) : isWaiting ? (
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                      In arrivo (atteso)
                    </span>
                  ) : isInFuture ? (
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200">
                      In arrivo
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                      In corso
                    </span>
                  )}
                </div>
              </div>

              {/* Date validità e info pagine */}
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-3 flex-wrap">
                <span className="inline-flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  {flyer.validoDal.slice(8, 10)}/{flyer.validoDal.slice(5, 7)} — {flyer.validoAl.slice(8, 10)}/{flyer.validoAl.slice(5, 7)}
                </span>
                {flyer.totalePagine && (
                  <span className="text-gray-500">
                    · {flyer.totalePagine} pagine
                  </span>
                )}
                {flyer.note && (
                  <span className="w-full text-xs text-gray-600 mt-0.5 line-clamp-2">
                    {flyer.note}
                  </span>
                )}
              </div>

              {/* Due tasti richiesti per ciascun volantino */}
              <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
                {isExpired ? (
                  <span className="text-xs text-gray-400 font-medium py-1.5">
                    Offerte scadute
                  </span>
                ) : isWaiting ? (
                  <span className="text-xs text-amber-700 font-medium py-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Prezzi non ancora letti
                  </span>
                ) : (
                  <button
                    id={`tasto-offerte-volantino-${flyer.id}`}
                    onClick={() => onOpenFlyerOffers(flyer)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-2xs"
                  >
                    <ListFilter className="w-3.5 h-3.5" />
                    <span>Le offerte ({offersCount})</span>
                  </button>
                )}

                {flyer.linkVolantino && (
                  <a
                    id={`tasto-link-volantino-${flyer.id}`}
                    href={flyer.linkVolantino}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-700 text-xs font-medium rounded-xl border border-gray-300 transition-colors shadow-2xs ml-auto"
                  >
                    <span>Il volantino</span>
                    <ExternalLink className="w-3 h-3 text-gray-500" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
