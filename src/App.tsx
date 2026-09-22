import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { ProductPills } from './components/ProductPills';
import { PriceSearch } from './components/PriceSearch';
import { CatalogDrawer } from './components/CatalogDrawer';
import { OffersList } from './components/OffersList';
import { FlyersSection } from './components/FlyersSection';
import { HelpModal } from './components/HelpModal';
import { WhatsNewModal } from './components/WhatsNewModal';
import { NovitaModal } from './components/NovitaModal';
import { FlyerOffersModal } from './components/FlyerOffersModal';
import { PersonalizzaModal } from './components/PersonalizzaModal';

import { CATALOG, DEPARTMENTS, DEFAULT_ACTIVE_PRODUCT_IDS } from './data/catalog';
import { FLYERS } from './data/flyers';
import { OFFERS } from './data/offers';
import {
  SUPERMARKETS,
  DEFAULT_ENABLED_SUPERMARKETS,
  DEFAULT_USER_ZONE,
} from './data/supermarkets';
import { Flyer, UserPreferences } from './types';

// Funzione di corrispondenza insegna -> supermercato abilitato
function matchesEnabledSupermarket(insegna: string, enabledStoreIds: string[]): boolean {
  const norm = insegna.toLowerCase();
  for (const storeId of enabledStoreIds) {
    if (storeId === 'mercato' && norm.includes('mercatò')) return true;
    if (storeId === 'lidl' && norm.includes('lidl')) return true;
    if (storeId === 'ekom' && norm.includes('ekom')) return true;
    if (storeId === 'bennet' && norm.includes('bennet')) return true;
    if (storeId === 'eurospin' && norm.includes('eurospin')) return true;
    if (storeId === 'md' && (norm === 'md' || norm.includes('md ') || norm.includes('md'))) return true;
    if (storeId === 'carrefour' && norm.includes('carrefour')) return true;
  }
  return false;
}

export default function App() {
  const currentDate = '2026-09-22';

  // 1. Preferenze utente (Zona + Supermercati scelti), salvate sul singolo telefono/browser
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('spesa_user_preferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.zona && Array.isArray(parsed.supermercatiAbilitati) && parsed.supermercatiAbilitati.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return {
      zona: DEFAULT_USER_ZONE,
      supermercatiAbilitati: DEFAULT_ENABLED_SUPERMARKETS,
    };
  });

  // Salva preferenze su localStorage quando cambiano
  useEffect(() => {
    try {
      localStorage.setItem('spesa_user_preferences', JSON.stringify(preferences));
    } catch {
      // ignore storage errors
    }
  }, [preferences]);

  // 2. Active products state with localStorage persistence
  const [activeProductIds, setActiveProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('spesa_active_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_ACTIVE_PRODUCT_IDS;
  });

  // 3. Selected product
  const [selectedProductId, setSelectedProductId] = useState<string>(() => {
    return activeProductIds[0] || 'pasta';
  });

  // 4. UI states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isNovitaOpen, setIsNovitaOpen] = useState(false);
  const [isWhatsNewOpen, setIsWhatsNewOpen] = useState(false);
  const [isPersonalizzaOpen, setIsPersonalizzaOpen] = useState(false);
  const [activeFlyerModal, setActiveFlyerModal] = useState<Flyer | null>(null);

  // Check first open for "Cosa c'è di nuovo"
  useEffect(() => {
    try {
      const seen = localStorage.getItem('spesa_whats_new_seen_v2');
      if (!seen) {
        setIsWhatsNewOpen(true);
        localStorage.setItem('spesa_whats_new_seen_v2', 'true');
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Save active products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('spesa_active_products', JSON.stringify(activeProductIds));
    } catch {
      // ignore storage errors
    }
  }, [activeProductIds]);

  // If selected product is removed from active list, select first available
  useEffect(() => {
    if (activeProductIds.length > 0 && !activeProductIds.includes(selectedProductId)) {
      setSelectedProductId(activeProductIds[0]);
    }
  }, [activeProductIds, selectedProductId]);

  // Mutual exclusion rule: Cassetto e ricerca non stanno aperti insieme
  const handleToggleSearch = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) setIsDrawerOpen(false);
      return next;
    });
  };

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => {
      const next = !prev;
      if (next) setIsSearchOpen(false);
      return next;
    });
  };

  const handleToggleProduct = (productId: string) => {
    setActiveProductIds((prev) => {
      if (prev.includes(productId)) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleResetToDefault = () => {
    setActiveProductIds(DEFAULT_ACTIVE_PRODUCT_IDS);
    setSelectedProductId(DEFAULT_ACTIVE_PRODUCT_IDS[0]);
  };

  // Filtra tutte le offerte e i volantini in base ai supermercati scelti dall'utente
  const filteredAllOffers = useMemo(() => {
    return OFFERS.filter((o) =>
      matchesEnabledSupermarket(o.insegna, preferences.supermercatiAbilitati)
    );
  }, [preferences.supermercatiAbilitati]);

  const filteredFlyers = useMemo(() => {
    return FLYERS.filter((f) =>
      matchesEnabledSupermarket(f.insegna, preferences.supermercatiAbilitati)
    );
  }, [preferences.supermercatiAbilitati]);

  // Active products objects
  const activeProducts = useMemo(() => {
    return CATALOG.filter((p) => activeProductIds.includes(p.id));
  }, [activeProductIds]);

  // Current selected product object
  const currentProduct = useMemo(() => {
    return (
      CATALOG.find((p) => p.id === selectedProductId) ||
      activeProducts[0] ||
      CATALOG[0]
    );
  }, [selectedProductId, activeProducts]);

  // Offers for current selected product (solo dei supermercati attivi dell'utente)
  const currentOffers = useMemo(() => {
    return filteredAllOffers.filter((o) => o.prodottoId === currentProduct.id);
  }, [filteredAllOffers, currentProduct.id]);

  const handleSelectFlyerFromOffer = (flyerId: string) => {
    const found = FLYERS.find((f) => f.id === flyerId);
    if (found) {
      setActiveFlyerModal(found);
    }
  };

  return (
    <div id="spesa-app" className="min-h-screen bg-stone-50 text-gray-900 flex flex-col font-sans antialiased selection:bg-red-200">
      {/* Intestazione fissa in alto con tasto Personalizza */}
      <Header
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenNovita={() => setIsNovitaOpen(true)}
        onOpenWhatsNew={() => setIsWhatsNewOpen(true)}
        onOpenPersonalizza={() => setIsPersonalizzaOpen(true)}
        userZone={preferences.zona}
        activeStoresCount={preferences.supermercatiAbilitati.length}
        unreadNovitaCount={2}
      />

      {/* Contenitore principale */}
      <main className="max-w-4xl w-full mx-auto px-3 sm:px-4 py-4 flex-1">
        {/* Barra di contesto con zona personalizzata e negozi attivi */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-600 bg-white py-2 px-3 rounded-xl border border-gray-200 shadow-2xs mb-2">
          <div className="flex items-center gap-2">
            <span>
              Data di riferimento: <strong className="text-gray-900">martedì 22 settembre 2026</strong>
            </span>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <span className="text-gray-700">
              Supermercati selezionati: <strong className="text-red-700 font-bold">{preferences.supermercatiAbilitati.length}</strong> su {SUPERMARKETS.length}
            </span>
            <button
              onClick={() => setIsPersonalizzaOpen(true)}
              className="text-red-700 hover:text-red-800 font-semibold underline underline-offset-2 ml-1"
            >
              Modifica
            </button>
          </div>
        </div>

        {/* Tasto rosso «Cerca fra i prezzi» (largo tutto lo schermo, cerca solo tra le offerte dei negozi abilitati) */}
        <PriceSearch
          isOpen={isSearchOpen}
          onToggle={handleToggleSearch}
          offers={filteredAllOffers}
          onSelectProduct={(prodId) => {
            if (!activeProductIds.includes(prodId)) {
              setActiveProductIds((prev) => [...prev, prodId]);
            }
            setSelectedProductId(prodId);
          }}
        />

        {/* Cassetto catalogo (fuori dalla barra in alto, mutuamente esclusivo con la ricerca) */}
        <CatalogDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          departments={DEPARTMENTS}
          allProducts={CATALOG}
          activeProductIds={activeProductIds}
          onToggleProduct={handleToggleProduct}
          onResetToDefault={handleResetToDefault}
        />

        {/* Barra pastiglie prodotti attivi + tasto «+ altri prodotti» */}
        <ProductPills
          products={activeProducts}
          selectedProductId={currentProduct.id}
          onSelectProduct={(id) => setSelectedProductId(id)}
          onOpenDrawer={handleToggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />

        {/* Elenco offerte per il prodotto selezionato */}
        <OffersList
          product={currentProduct}
          offers={currentOffers}
          currentDate={currentDate}
          onSelectFlyer={handleSelectFlyerFromOffer}
        />

        {/* Sezione Volantini in fondo alla pagina (filtrata per i supermercati attivi) */}
        <FlyersSection
          flyers={filteredFlyers}
          allOffers={filteredAllOffers}
          onOpenFlyerOffers={(flyer) => setActiveFlyerModal(flyer)}
          currentDate={currentDate}
        />
      </main>

      {/* Footer sobrio */}
      <footer className="bg-white border-t border-gray-200 py-5 text-center text-xs text-gray-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Spesa — {preferences.zona}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPersonalizzaOpen(true)}
              className="text-gray-600 hover:text-gray-900 underline underline-offset-2"
            >
              Personalizza negozi
            </button>
            <span>·</span>
            <button
              onClick={() => setIsHelpOpen(true)}
              className="text-gray-600 hover:text-gray-900 underline underline-offset-2"
            >
              Come funziona
            </button>
            <span>·</span>
            <button
              onClick={() => setIsNovitaOpen(true)}
              className="text-gray-600 hover:text-gray-900 underline underline-offset-2"
            >
              Novità volantini
            </button>
          </div>
        </div>
      </footer>

      {/* Finestre modali */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <WhatsNewModal isOpen={isWhatsNewOpen} onClose={() => setIsWhatsNewOpen(false)} />
      <NovitaModal
        isOpen={isNovitaOpen}
        onClose={() => setIsNovitaOpen(false)}
        flyers={filteredFlyers}
        currentDate={currentDate}
      />
      <FlyerOffersModal
        flyer={activeFlyerModal}
        offers={filteredAllOffers}
        departments={DEPARTMENTS}
        onClose={() => setActiveFlyerModal(null)}
      />
      <PersonalizzaModal
        isOpen={isPersonalizzaOpen}
        onClose={() => setIsPersonalizzaOpen(false)}
        supermarkets={SUPERMARKETS}
        preferences={preferences}
        onSavePreferences={(newPrefs) => setPreferences(newPrefs)}
      />
    </div>
  );
}
