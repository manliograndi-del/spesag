import React, { useState, useMemo } from 'react';
import { X, Search, Check, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Product, Department } from '../types';

interface CatalogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  departments: Department[];
  allProducts: Product[];
  activeProductIds: string[];
  onToggleProduct: (productId: string) => void;
  onResetToDefault: () => void;
}

export const CatalogDrawer: React.FC<CatalogDrawerProps> = ({
  isOpen,
  onClose,
  departments,
  allProducts,
  activeProductIds,
  onToggleProduct,
  onResetToDefault,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [collapsedDept, setCollapsedDept] = useState<Record<string, boolean>>({});

  const toggleDeptCollapse = (deptId: string) => {
    setCollapsedDept((prev) => ({ ...prev, [deptId]: !prev[deptId] }));
  };

  const filteredProductsByDept = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const result: { department: Department; products: Product[] }[] = [];

    departments.forEach((dept) => {
      const deptProducts = allProducts.filter((p) => p.repartoId === dept.id);
      const filtered = term
        ? deptProducts.filter((p) => p.nome.toLowerCase().includes(term))
        : deptProducts;

      if (filtered.length > 0) {
        result.push({ department: dept, products: filtered });
      }
    });

    return result;
  }, [departments, allProducts, searchTerm]);

  if (!isOpen) return null;

  return (
    <div id="cassetto-catalogo" className="my-3 p-4 sm:p-5 bg-white rounded-2xl border-2 border-gray-300 shadow-lg animate-in fade-in duration-200">
      {/* Header cassetto */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            Catalogo prodotti ({allProducts.length} voci)
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Accendi i prodotti che vuoi avere nella tua lista rapida
          </p>
        </div>
        <button
          id="chiudi-cassetto"
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          aria-label="Chiudi catalogo"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Barra di ricerca dentro il cassetto per filtrare i prodotti */}
      <div className="relative mt-3 mb-3">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          id="input-filtro-catalogo"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cerca prodotto nel catalogo (es. pasta, olio, pollo...)"
          className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-gray-900"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Azioni rapide */}
      <div className="flex items-center justify-between gap-2 mb-3 px-1 text-xs">
        <span className="text-gray-600">
          Attivi in lista: <strong className="text-gray-900">{activeProductIds.length}</strong> su {allProducts.length}
        </span>
        <button
          onClick={onResetToDefault}
          className="inline-flex items-center gap-1 text-red-700 hover:text-red-800 font-medium hover:underline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Ripristina lista di Manlio</span>
        </button>
      </div>

      {/* Lista reparti e prodotti */}
      <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
        {filteredProductsByDept.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-sm bg-gray-50 rounded-xl">
            Nessun prodotto trovato per «{searchTerm}».
          </div>
        ) : (
          filteredProductsByDept.map(({ department, products }) => {
            const isCollapsed = !!collapsedDept[department.id];
            const activeInDept = products.filter((p) => activeProductIds.includes(p.id)).length;

            return (
              <div key={department.id} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
                {/* Intestazione reparto */}
                <button
                  onClick={() => toggleDeptCollapse(department.id)}
                  className="w-full px-3.5 py-2.5 bg-gray-100/80 hover:bg-gray-200/70 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{department.nome}</span>
                    <span className="text-xs bg-white text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                      {activeInDept}/{products.length}
                    </span>
                  </div>
                  {isCollapsed ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                {/* Voci del reparto */}
                {!isCollapsed && (
                  <div className="p-2 sm:p-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {products.map((product) => {
                      const isActive = activeProductIds.includes(product.id);
                      return (
                        <button
                          key={product.id}
                          id={`toggle-catalogo-${product.id}`}
                          onClick={() => onToggleProduct(product.id)}
                          className={`flex items-center justify-between p-2 rounded-lg text-xs sm:text-sm text-left transition-all ${
                            isActive
                              ? 'bg-red-50 text-red-900 border border-red-300 font-semibold'
                              : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          <span className="truncate pr-2">{product.nome}</span>
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-red-600 text-white'
                                : 'border border-gray-300 bg-white'
                            }`}
                          >
                            {isActive && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end">
        <button
          onClick={onClose}
          className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm rounded-xl"
        >
          Fatto
        </button>
      </div>
    </div>
  );
};
