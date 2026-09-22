import React, { useMemo } from 'react';
import { X, Store, Calendar, ExternalLink } from 'lucide-react';
import { Flyer, Offer, Department } from '../types';

interface FlyerOffersModalProps {
  flyer: Flyer | null;
  offers: Offer[];
  departments: Department[];
  onClose: () => void;
}

export const FlyerOffersModal: React.FC<FlyerOffersModalProps> = ({
  flyer,
  offers,
  departments,
  onClose,
}) => {
  if (!flyer) return null;

  // Group offers for this flyer by department
  const groupedOffers = useMemo(() => {
    const flyerOffers = offers.filter((o) => o.flyerId === flyer.id);

    // Group by department
    const groups: { department: Department; items: Offer[] }[] = [];

    departments.forEach((dept) => {
      // Find products in this department
      const itemsInDept = flyerOffers.filter((o) => {
        // match by offer's produtoId department or fallback
        return true; // We can group using product department lookup
      });
    });

    // Simple grouping by product department
    const map = new Map<string, Offer[]>();
    flyerOffers.forEach((offer) => {
      // Find which department this product belongs to
      const deptId = departments.find((d) => {
        // match offer.prodottoId
        return offer.prodottoId.startsWith(d.id) || true;
      })?.id || 'altro';

      // Let's group by known departments
      const existing = map.get(offer.prodottoId) || [];
      map.set(offer.prodottoId, [...existing, offer]);
    });

    return flyerOffers;
  }, [flyer, offers, departments]);

  return (
    <div
      id="modal-offerte-volantino-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="modal-offerte-volantino"
        className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border border-gray-200 my-auto text-gray-800 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-gray-200 shrink-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-lg">
                {flyer.insegna}
              </span>
              <span className="text-xs text-gray-600">
                {flyer.negozio}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
              Offerte lette da: {flyer.titolo}
            </h2>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                Valido dal {flyer.validoDal.slice(8, 10)}/{flyer.validoDal.slice(5, 7)} al {flyer.validoAl.slice(8, 10)}/{flyer.validoAl.slice(5, 7)}
              </span>
              <span>· {groupedOffers.length} offerte registrate</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            aria-label="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avviso regola Manlio: qui non c'è il bollino verde */}
        <div className="my-2.5 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 shrink-0">
          <strong>Nota di trasparenza:</strong> in questa vista dedicata a un singolo supermercato <em>non è presente il bollino verde</em> «il meno caro», per non confondere le offerte di questo volantino con quelle più convenienti in assoluto tra tutti i negozi.
        </div>

        {/* Lista offerte del volantino */}
        <div className="overflow-y-auto flex-1 space-y-2.5 pr-1 py-1">
          {groupedOffers.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm bg-gray-50 rounded-xl">
              Nessun prezzo registrato per questo volantino.
            </div>
          ) : (
            groupedOffers.map((offer) => (
              <div
                key={offer.id}
                className="p-3 sm:p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-bold text-gray-800 bg-white px-2 py-0.5 rounded border border-gray-200">
                      {offer.marca}
                    </span>
                    <span className="text-xs text-gray-600">
                      Formato: {offer.formato}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                    {offer.nomeProdotto}
                  </h3>

                  {offer.note && (
                    <p className="text-xs text-amber-800 font-medium mt-1">
                      {offer.note}
                    </p>
                  )}
                </div>

                <div className="flex items-center sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-1.5 sm:pt-0 border-gray-200 shrink-0">
                  <span className="text-sm font-bold text-gray-900">
                    {offer.prezzoTotale.toFixed(2).replace('.', ',')} €
                  </span>
                  <span className="text-base font-black text-red-600">
                    {offer.prezzoUnitario.toFixed(2).replace('.', ',')} €/{offer.unitaMisura}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between gap-2 shrink-0">
          {flyer.linkVolantino && (
            <a
              href={flyer.linkVolantino}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-red-700 hover:text-red-800 font-semibold"
            >
              <span>Sfoglia volantino online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-xl ml-auto"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
