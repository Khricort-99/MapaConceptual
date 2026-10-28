import React from 'react';
import { Table, ArrowRight, CheckCircle, AlertTriangle, Scale } from 'lucide-react';
import { COMPARATIVE_MATRIX, CATEGORIES } from '../data/conceptMapData';

interface ComparativeMatrixProps {
  onSelectModel: (nodeId: string) => void;
}

export const ComparativeMatrix: React.FC<ComparativeMatrixProps> = ({
  onSelectModel,
}) => {
  const modelToNodeId: Record<string, string> = {
    Independencia: 'independencia-postulado',
    Conflicto: 'conflicto-mito',
    Diálogo: 'dialogo-fundamentos',
    Integración: 'propuesta-aragon',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 border-b border-stone-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
          <Scale className="w-3.5 h-3.5" />
          <span>Análisis Comparativo Riguroso</span>
        </div>
        <h2 className="font-serif-scholarly text-2xl font-bold text-stone-900 mt-0.5">
          Matriz de los Cuatro Modelos de Barbour
        </h2>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl">
          Comparación sistemática de los cuatro enfoques de interacción entre ciencia y religión analizados en el ensayo del Dr. Luis Fernando Aragón, contrastando sus postulados, debilidades y el veredicto epistemológico final.
        </p>
      </div>

      {/* Grid of 4 Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COMPARATIVE_MATRIX.map((item) => {
          const category = CATEGORIES[item.categoryKey];
          const nodeId = modelToNodeId[item.model];

          return (
            <div
              key={item.model}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              {/* Category indicator top line */}
              <div
                className="h-2 w-full"
                style={{ backgroundColor: category.color }}
              />

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  {/* Title and Category */}
                  <div className="flex items-center justify-between">
                    <span
                      style={{ color: category.color }}
                      className="text-xs font-bold uppercase tracking-wider"
                    >
                      Modelo {item.model}
                    </span>
                    <button
                      onClick={() => onSelectModel(nodeId)}
                      className="text-xs font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Ver en mapa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="font-serif-scholarly text-xl font-bold text-stone-900 mt-1">
                    {item.model}
                  </h3>

                  {/* Postulate */}
                  <div className="mt-3 bg-stone-50 rounded-xl p-3.5 border border-stone-200/70">
                    <span className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
                      Postulado Central
                    </span>
                    <p className="text-xs text-stone-800 leading-relaxed">
                      {item.postulate}
                    </p>
                  </div>
                </div>

                {/* Arguments For */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase text-emerald-800 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Argumentos a favor / Fortalezas</span>
                  </span>
                  <p className="text-xs text-stone-700 leading-relaxed pl-4">
                    {item.argumentsFor}
                  </p>
                </div>

                {/* Critiques & Limitations */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase text-rose-800 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Críticas, Objeciones y Límites</span>
                  </span>
                  <p className="text-xs text-stone-700 leading-relaxed pl-4">
                    {item.critiquesAndLimits}
                  </p>
                </div>

                {/* Author's Verdict */}
                <div className="pt-3 border-t border-stone-100 bg-stone-50/70 -mx-6 -mb-6 p-4 px-6">
                  <span className="text-[11px] font-bold uppercase text-stone-600 block mb-1">
                    Veredicto del Dr. Luis Fdo. Aragón
                  </span>
                  <p className="text-xs font-medium text-stone-900 leading-relaxed">
                    {item.verdictAuthor}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
