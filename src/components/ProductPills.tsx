import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductPillsProps {
  products: Product[];
  selectedProductId: string;
  onSelectProduct: (productId: string) => void;
  onOpenDrawer: () => void;
  isDrawerOpen: boolean;
}

export const ProductPills: React.FC<ProductPillsProps> = ({
  products,
  selectedProductId,
  onSelectProduct,
  onOpenDrawer,
  isDrawerOpen,
}) => {
  return (
    <div id="barra-pastiglie-container" className="my-2">
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          I tuoi prodotti ({products.length})
        </span>
        <span className="text-xs text-gray-500">
          Tocca per confrontare i prezzi
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap" id="elenco-pastiglie">
        {products.map((product) => {
          const isSelected = product.id === selectedProductId;
          return (
            <button
              key={product.id}
              id={`pastiglia-${product.id}`}
              onClick={() => onSelectProduct(product.id)}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer select-none ${
                isSelected
                  ? 'pastiglia-accesa bg-red-600 text-white shadow-sm ring-2 ring-red-200 font-semibold'
                  : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 shadow-2xs'
              }`}
              aria-pressed={isSelected}
            >
              <span>{product.nome}</span>
            </button>
          );
        })}

        {/* Pulsante «+ altri prodotti» tratteggiato con classe agg */}
        <button
          id="tasto-altri-prodotti"
          onClick={onOpenDrawer}
          className={`tasto agg px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer border-2 border-dashed ${
            isDrawerOpen
              ? 'border-gray-800 bg-gray-100 text-gray-900 font-semibold'
              : 'border-gray-400 hover:border-gray-600 bg-white hover:bg-gray-50 text-gray-700'
          }`}
          aria-expanded={isDrawerOpen}
        >
          <Plus className="w-4 h-4 text-gray-600" />
          <span>+ altri prodotti</span>
        </button>
      </div>
    </div>
  );
};
