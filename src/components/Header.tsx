import React from 'react';
import { HelpCircle, Bell, Sparkles, SlidersHorizontal, MapPin } from 'lucide-react';

interface HeaderProps {
  onOpenHelp: () => void;
  onOpenNovita: () => void;
  onOpenWhatsNew: () => void;
  onOpenPersonalizza: () => void;
  userZone: string;
  activeStoresCount: number;
  unreadNovitaCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHelp,
  onOpenNovita,
  onOpenWhatsNew,
  onOpenPersonalizza,
  userZone,
  activeStoresCount,
  unreadNovitaCount = 2,
}) => {
  return (
    <header id="header-spesa" className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Logo and title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-xs shrink-0">
            S
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight leading-none truncate">
                Spesa
              </h1>
              <button
                id="badge-zona"
                onClick={onOpenPersonalizza}
                className="inline-flex items-center gap-1 text-[11px] bg-red-50 text-red-700 hover:bg-red-100 font-semibold px-2 py-0.5 rounded-full border border-red-200 transition-colors cursor-pointer"
                title="Tocca per cambiare zona e negozi"
              >
                <MapPin className="w-3 h-3 text-red-600" />
                <span className="truncate max-w-[130px] sm:max-w-[180px]">{userZone}</span>
              </button>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-600 truncate mt-0.5">
              Offerte lette a occhio dai volantini vicini
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Tasto Personalizza per scegliere negozi e zona */}
          <button
            id="tasto-personalizza"
            onClick={onOpenPersonalizza}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors shadow-2xs cursor-pointer"
            title="Personalizza dove vivi e i tuoi supermercati"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-700" />
            <span className="hidden xs:inline">Personalizza</span>
            <span className="xs:hidden">Negozi</span>
          </button>

          {/* Whats new button */}
          <button
            id="tasto-cosa-ce-di-nuovo"
            onClick={onOpenWhatsNew}
            className="hidden md:inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
            title="Cosa c'è di nuovo nell'app"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Novità app</span>
          </button>

          {/* Aiuto button: non rosso pieno, sobrio ed elegante */}
          <button
            id="tasto-aiuto"
            onClick={onOpenHelp}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors shadow-xs"
            aria-label="Apri aiuto"
          >
            <HelpCircle className="w-4 h-4 text-gray-500" />
            <span>Aiuto</span>
          </button>

          {/* Novità button */}
          <button
            id="tasto-novita"
            onClick={onOpenNovita}
            className="relative inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors shadow-xs"
            aria-label="Apri pagina novità volantini"
          >
            <Bell className="w-4 h-4 text-red-600" />
            <span>Novità</span>
            {unreadNovitaCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-600 ring-2 ring-white"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
