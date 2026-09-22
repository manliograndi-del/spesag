import React, { useState } from 'react';
import { X, MapPin, Store, Check, RotateCcw } from 'lucide-react';
import { Supermarket, UserPreferences } from '../types';

interface PersonalizzaModalProps {
  isOpen: boolean;
  onClose: () => void;
  supermarkets: Supermarket[];
  preferences: UserPreferences;
  onSavePreferences: (newPreferences: UserPreferences) => void;
}

export const PersonalizzaModal: React.FC<PersonalizzaModalProps> = ({
  isOpen,
  onClose,
  supermarkets,
  preferences,
  onSavePreferences,
}) => {
  const [zona, setZona] = useState(preferences.zona);
  const [enabledStores, setEnabledStores] = useState<string[]>(preferences.supermercatiAbilitati);

  if (!isOpen) return null;

  const toggleStore = (storeId: string) => {
    setEnabledStores((prev) => {
      if (prev.includes(storeId)) {
        if (prev.length <= 1) return prev; // At least one store kept
        return prev.filter((id) => id !== storeId);
      } else {
        return [...prev, storeId];
      }
    });
  };

  const handleSelectAll = () => {
    setEnabledStores(supermarkets.map((s) => s.id));
  };

  const handleSelectManlioFavorites = () => {
    setZona('Torino (corso Siracusa)');
    setEnabledStores(['mercato', 'lidl', 'ekom', 'bennet', 'eurospin', 'md', 'carrefour']);
  };

  const handleSave = () => {
    onSavePreferences({
      zona: zona.trim() || 'Torino (corso Siracusa)',
      supermercatiAbilitati: enabledStores,
    });
    onClose();
  };

  return (
    <div
      id="modal-personalizza-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="modal-personalizza"
        className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-gray-200 my-auto text-gray-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                Personalizza la tua pagina
              </h2>
              <p className="text-xs text-gray-500">
                Imposta la tua zona e scegli solo i negozi che frequenti
              </p>
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

        {/* Corpo scrollabile */}
        <div className="space-y-4 py-3 text-sm overflow-y-auto max-h-[70vh] pr-1">
          {/* Sezione 1: Dove vivi */}
          <div>
            <label htmlFor="input-zona" className="block font-bold text-gray-900 text-sm mb-1">
              Dove fai la spesa? (Città o quartiere)
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="input-zona"
                type="text"
                value={zona}
                onChange={(e) => setZona(e.target.value)}
                placeholder="Es. Torino (corso Siracusa), Santa Rita, Mirafiori..."
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-gray-900 font-medium"
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Questo nome comparirà in cima alla pagina sul tuo dispositivo.
            </p>
          </div>

          {/* Sezione 2: Scelta supermercati */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <label className="font-bold text-gray-900 text-sm">
                Supermercati attivi ({enabledStores.length} su {supermarkets.length})
              </label>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-red-700 hover:text-red-800 font-semibold"
                >
                  Tutti
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={handleSelectManlioFavorites}
                  className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  title="Ripristina i negozi di Manlio"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Predefiniti</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {supermarkets.map((store) => {
                const isChecked = enabledStores.includes(store.id);
                return (
                  <button
                    key={store.id}
                    type="button"
                    onClick={() => toggleStore(store.id)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                      isChecked
                        ? 'bg-red-50/70 border-red-300 shadow-2xs'
                        : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Store className={`w-4 h-4 shrink-0 ${isChecked ? 'text-red-600' : 'text-gray-400'}`} />
                        <span className="font-bold text-gray-900 text-sm">{store.nome}</span>
                        <span className="text-xs text-gray-600 truncate">· {store.indirizzo}</span>
                      </div>
                      {store.note && (
                        <p className="text-xs text-gray-500 mt-0.5 ml-6 truncate">{store.note}</p>
                      )}
                    </div>

                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                        isChecked
                          ? 'bg-red-600 text-white'
                          : 'border-2 border-gray-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Come funziona il salvataggio */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
            <strong>Come funziona:</strong> la tua scelta viene memorizzata sul <strong>tuo telefono o computer</strong>. Chiunque apra il link (tua moglie, parenti o amici) potrà scegliere la propria zona e i propri negozi preferiti senza toccare le impostazioni degli altri.
          </div>
        </div>

        {/* Footer con tasto salva */}
        <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 rounded-xl"
          >
            Annulla
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors"
          >
            Salva preferenze
          </button>
        </div>
      </div>
    </div>
  );
};
