import React, { useState, useMemo } from 'react';
import { Store, Calendar, Tag, Check, Filter } from 'lucide-react';
import { Offer, Product } from '../types';

interface OffersListProps {
  product: Product;
  offers: Offer[];
  currentDate?: string; // YYYY-MM-DD, default '2026-09-22'
  onSelectFlyer?: (flyerId: string) => void;
}

export const OffersList: React.FC<OffersListProps> = ({
  product,
  offers,
  currentDate = '2026-09-22',
  onSelectFlyer,
}) => {
  const [showExpired, setShowExpired] = useState(false);

  // Date comparison helper
  const isOfferValidToday = (offer: Offer) => {
    return offer.validoDal <= currentDate && currentDate <= offer.validoAl;
  };

  const isOfferInFuture = (offer: Offer) => {
    return offer.validoDal > currentDate;
  };

  const isOfferExpired = (offer: Offer) => {
    return offer.validoAl < currentDate;
  };

  // Filter and sort offers
  const { sortedOffers, leastExpensiveTodayId } = useMemo(() => {
    // Filter out expired unless toggle is active
    const available = offers.filter((o) => showExpired || !isOfferExpired(o));

    // Sort strictly by unit price ascending
    const sorted = [...available].sort((a, b) => a.prezzoUnitario - b.prezzoUnitario);

    // Find the offer with the lowest unit price that is VALID TODAY
    const validTodayOffers = sorted.filter(isOfferValidToday);
    const bestToday = validTodayOffers.length > 0 ? validTodayOffers[0].id : null;

    return {
      sortedOffers: sorted,
      leastExpensiveTodayId: bestToday,
    };
  }, [offers, showExpired, currentDate]);

  const expiredCount = useMemo(() => {
    return offers.filter(isOfferExpired).length;
  }, [offers, currentDate]);

  return (
    <div id="sezione-offerte" className="my-4">
      {/* Header offerta per il prodotto selezionato */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-3 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {product.nome}
            </h2>
            <span className="text-xs bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded-full border border-gray-200">
              prezzo per {product.unitaMisura}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Offerte ordinate dal prezzo per unità più conveniente
          </p>
        </div>

        {expiredCount > 0 && (
          <button
            onClick={() => setShowExpired(!showExpired)}
            className="self-start sm:self-auto text-xs font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <span>
              {showExpired ? 'Nascondi scadute' : `Mostra ${expiredCount} offerte scadute`}
            </span>
          </button>
        )}
      </div>

      {/* Lista offerte */}
      {sortedOffers.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 text-gray-600">
          <p className="font-semibold text-base">Nessuna offerta trovata</p>
          <p className="text-xs text-gray-500 mt-1">
            Al momento non ci sono offerte attive per questo prodotto nei volantini letti.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {sortedOffers.map((offer) => {
            const isLeastExpensiveToday = offer.id === leastExpensiveTodayId;
            const validToday = isOfferValidToday(offer);
            const inFuture = isOfferInFuture(offer);
            const expired = isOfferExpired(offer);

            return (
              <div
                key={offer.id}
                id={`offerta-${offer.id}`}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-150 relative ${
                  isLeastExpensiveToday
                    ? 'bg-emerald-50/60 border-emerald-400 shadow-sm ring-1 ring-emerald-300'
                    : expired
                    ? 'bg-gray-50 border-gray-200 opacity-60'
                    : 'bg-white border-gray-200 hover:border-gray-300 shadow-xs'
                }`}
              >
                {/* Badge "IL MENO CARO" verde: va al meno caro che vale oggi */}
                {isLeastExpensiveToday && (
                  <div className="inline-flex items-center gap-1 bg-emerald-600 text-white font-bold text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Il meno caro valido oggi</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Dettagli prodotto e supermercato */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {/* Insegna badge */}
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-gray-300 text-gray-900 shadow-2xs">
                        <Store className="w-3.5 h-3.5 text-red-600" />
                        {offer.insegna} ({offer.negozio})
                      </span>

                      {/* Marca */}
                      <span className="text-xs font-semibold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-md">
                        {offer.marca}
                      </span>

                      {/* Validità date */}
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md ${
                          inFuture
                            ? 'bg-amber-100 text-amber-900 border border-amber-200 font-semibold'
                            : expired
                            ? 'bg-gray-200 text-gray-600'
                            : 'bg-blue-50 text-blue-900'
                        }`}
                      >
                        <Calendar className="w-3 h-3" />
                        {inFuture && `Inizia il ${offer.validoDal.slice(8, 10)}/${offer.validoDal.slice(5, 7)}`}
                        {validToday && `Fino al ${offer.validoAl.slice(8, 10)}/${offer.validoAl.slice(5, 7)}`}
                        {expired && `Scaduta il ${offer.validoAl.slice(8, 10)}/${offer.validoAl.slice(5, 7)}`}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 leading-snug">
                      {offer.nomeProdotto}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-gray-600 mt-1 flex-wrap">
                      <span>
                        Formato: <strong className="text-gray-800">{offer.formato}</strong>
                      </span>
                      {offer.note && (
                        <span className="text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium">
                          {offer.note}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Prezzi: Confezione e Prezzo Unitario ben evidente */}
                  <div className="flex items-center sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100 shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] uppercase tracking-wide text-gray-600 font-semibold block">
                        Al pezzo
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {offer.prezzoTotale.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>

                    <div className="text-right sm:mt-1">
                      <span className="text-[11px] uppercase tracking-wide text-red-600 font-bold block">
                        Prezzo unitario
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-red-600 tracking-tight">
                        {offer.prezzoUnitario.toFixed(2).replace('.', ',')}{' '}
                        <span className="text-xs font-semibold text-gray-600">
                          €/{offer.unitaMisura}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {onSelectFlyer && offer.flyerId && (
                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>Letto a occhio dal volantino</span>
                    <button
                      onClick={() => onSelectFlyer(offer.flyerId)}
                      className="text-red-700 hover:text-red-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>Vedi tutte le offerte del volantino</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
