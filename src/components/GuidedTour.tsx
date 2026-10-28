import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Quote, ArrowRight, Compass } from 'lucide-react';
import { GUIDED_TOUR_STEPS, CONCEPT_NODES, CATEGORIES } from '../data/conceptMapData';

interface GuidedTourProps {
  onSelectNode: (nodeId: string) => void;
  onNavigateToGraph: (nodeId: string) => void;
}

export const GuidedTour: React.FC<GuidedTourProps> = ({
  onSelectNode,
  onNavigateToGraph,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = GUIDED_TOUR_STEPS[currentStepIndex];
  const node = CONCEPT_NODES.find((n) => n.id === step.nodeId)!;
  const category = CATEGORIES[node.category];

  const handleNext = () => {
    if (currentStepIndex < GUIDED_TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Progress bar and Step counter */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Recorrido Analítico Guiado
          </span>
          <h2 className="font-serif-scholarly text-2xl font-bold text-stone-900 mt-0.5">
            Las 6 Claves del Debate
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-stone-600">
          <span>Paso {currentStepIndex + 1} de {GUIDED_TOUR_STEPS.length}</span>
        </div>
      </div>

      {/* Progress pill steps indicators */}
      <div className="grid grid-cols-6 gap-2 mb-8">
        {GUIDED_TOUR_STEPS.map((s, idx) => (
          <button
            key={s.step}
            onClick={() => setCurrentStepIndex(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentStepIndex
                ? 'bg-stone-900 shadow-sm'
                : idx < currentStepIndex
                ? 'bg-stone-400'
                : 'bg-stone-200 hover:bg-stone-300'
            }`}
            title={s.title}
          />
        ))}
      </div>

      {/* Main Narrative Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Step Badge & Category */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ backgroundColor: category.color }}
          />
          <span style={{ color: category.color }} className="font-semibold">
            {category.name}
          </span>
          <span aria-hidden="true">·</span>
          <span>{step.tagline}</span>
        </div>

        {/* Step Title & Node Title */}
        <div>
          <h3 className="font-serif-scholarly text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
            {step.title}
          </h3>
          <p className="mt-2 text-base text-stone-600 font-medium">
            {node.subtitle}
          </p>
        </div>

        {/* Narrative exposition */}
        <div className="text-stone-700 text-base leading-relaxed bg-stone-50/80 rounded-xl p-5 border border-stone-200/60">
          <p>{step.narrative}</p>
        </div>

        {/* Scholarly Quote */}
        <div className="p-5 rounded-xl border border-stone-200 bg-amber-50/30 space-y-2">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold uppercase tracking-wider">
            <Quote className="w-4 h-4" />
            <span>Evidencia Textual del Ensayo</span>
          </div>
          <blockquote className="font-serif-scholarly italic text-stone-800 text-sm leading-relaxed">
            "{node.quote.text}"
          </blockquote>
          <div className="text-xs text-stone-500 pt-2 border-t border-amber-200/50 flex justify-between">
            <span className="font-semibold text-stone-700">{node.quote.author}</span>
            <span>{node.quote.reference} · Pág. {node.quote.page}</span>
          </div>
        </div>

        {/* Actions inside card */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectNode(node.id)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ver ficha completa del nodo</span>
            </button>
            <button
              onClick={() => onNavigateToGraph(node.id)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Ubicar en Mapa de Red</span>
            </button>
          </div>

          {/* Previous / Next buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`flex items-center gap-1 px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                currentStepIndex === 0
                  ? 'text-stone-300 border border-stone-200 cursor-not-allowed'
                  : 'text-stone-700 border border-stone-300 hover:bg-stone-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === GUIDED_TOUR_STEPS.length - 1}
              className={`flex items-center gap-1 px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                currentStepIndex === GUIDED_TOUR_STEPS.length - 1
                  ? 'text-stone-300 border border-stone-200 cursor-not-allowed'
                  : 'text-white bg-stone-900 hover:bg-stone-800 shadow-sm'
              }`}
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
