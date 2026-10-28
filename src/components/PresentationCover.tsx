import React from 'react';
import {
  Compass,
  ArrowRight,
  BookOpen,
  GitFork,
  Table,
  GraduationCap,
  Sparkles,
  Users,
  Layers,
  FileText
} from 'lucide-react';

interface PresentationCoverProps {
  onEnterMap: () => void;
  onEnterView?: (view: 'graph' | 'tree' | 'tour' | 'matrix') => void;
}

export const PresentationCover: React.FC<PresentationCoverProps> = ({
  onEnterMap,
  onEnterView,
}) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between selection:bg-stone-900 selection:text-white font-sans-clean canvas-grid-pattern relative">
      {/* Top Header with University Logo on the top-left */}
      <header className="w-full px-6 sm:px-10 py-6 flex items-center justify-between border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <img
            src="/assets/aistudio/logo_eef11e03.JPG"
            alt="Universidad Católica del Norte"
            className="h-12 sm:h-16 w-auto object-contain drop-shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Asignatura: Ecología Integral</span>
          </span>
        </div>
      </header>

      {/* Main Hero Showcase */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center max-w-5xl mx-auto w-full">
        {/* Academic Subject Tag */}
       

        {/* Requested Main Title */}
        <h1 className="font-serif-scholarly text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15] mb-4 max-w-4xl">
          MAPA CONCEPTUAL
          <span className="block text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-700 mt-2">
            INTERACCIÓN FE Y CIENCIA
          </span>
        </h1>

        

        {/* Students & Academic Metadata Card */}
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-10 text-left">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-stone-600" />
              <span>Estudiantes Desarrolladores</span>
            </span>
          
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student 1 */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200/60">
              <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center font-serif-scholarly font-bold text-sm shrink-0 shadow-2xs">
                CC
              </div>
              <div>
                <span className="text-xs text-stone-500 font-medium block">Estudiante</span>
                <span className="text-sm font-bold text-stone-900">Christian Cortés</span>
              </div>
            </div>

            {/* Student 2 */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200/60">
              <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center font-serif-scholarly font-bold text-sm shrink-0 shadow-2xs">
                EG
              </div>
              <div>
                <span className="text-xs text-stone-500 font-medium block">Estudiante</span>
                <span className="text-sm font-bold text-stone-900">Eduardo García</span>
              </div>
            </div>
          </div>

        
        </div>

        {/* Primary Requested Action Button: "Ir al Mapa" */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <button
            onClick={onEnterMap}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
          >
            <Compass className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
            <span>Ir al Mapa Conceptual</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

        
        </div>

        {/* 4 Models Fast Overview Badges */}
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-3 bg-white rounded-xl border border-sky-200/80 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block mb-0.5">
              1. Independencia
            </span>
            <span className="text-xs font-semibold text-stone-900 block">Esferas Separadas</span>
            <span className="text-[11px] text-stone-500 leading-tight block mt-0.5">NOMA y crítica a la dicotomía</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-rose-200/80 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-0.5">
              2. Conflicto
            </span>
            <span className="text-xs font-semibold text-stone-900 block">Mito & Casos</span>
            <span className="text-[11px] text-stone-500 leading-tight block mt-0.5">Galileo, Lavoisier y Darwin</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-indigo-200/80 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block mb-0.5">
              3. Diálogo
            </span>
            <span className="text-xs font-semibold text-stone-900 block">Puentes de Artigas</span>
            <span className="text-[11px] text-stone-500 leading-tight block mt-0.5">Ontología, Epistemología y Ética</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-teal-200/80 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-0.5">
              4. Integración
            </span>
            <span className="text-xs font-semibold text-stone-900 block">Síntesis Personal</span>
            <span className="text-[11px] text-stone-500 leading-tight block mt-0.5">Vocación divina & Bioética</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center border-t border-stone-200 bg-white/60 text-xs text-stone-500">
        Universidad Católica del Norte • Ecología Integral • Christian Cortés & Eduardo García
      </footer>
    </div>
  );
};
