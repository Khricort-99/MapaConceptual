import React from 'react';
import { Compass, BookOpen, GitFork, Table, Info, Home } from 'lucide-react';

interface HeaderProps {
  currentView: 'graph' | 'tree' | 'tour' | 'matrix';
  onViewChange: (view: 'graph' | 'tree' | 'tour' | 'matrix') => void;
  onOpenAbout: () => void;
  onResetToRoot: () => void;
  onOpenPresentation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenAbout,
  onResetToRoot,
  onOpenPresentation,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: University Logo & Subject Title */}
        <div className="flex items-center gap-3 shrink-0">
          {onOpenPresentation && (
            <button
              onClick={onOpenPresentation}
              className="flex items-center gap-2 cursor-pointer group hover:opacity-85 transition-opacity"
              title="Volver a la portada de presentación"
            >
              <img
                src="/assets/aistudio/logo_eef11e03.JPG"
                alt="Universidad Católica del Norte"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </button>
          )}
        </div>

        {/* Zone 2: Navigation views */}
        <nav className="flex items-center gap-1 sm:gap-2 md:gap-3 overflow-x-auto py-1 text-xs sm:text-sm font-medium scrollbar-none">
          <button
            onClick={() => onViewChange('graph')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'graph'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Mapa Conceptual</span>
          </button>

          <button
            onClick={() => onViewChange('tree')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'tree'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Árbol Lógico</span>
          </button>

          <button
            onClick={() => onViewChange('tour')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'tour'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Recorrido</span>
          </button>

          <button
            onClick={() => onViewChange('matrix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'matrix'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Matriz</span>
          </button>
        </nav>

        {/* Zone 3: Presentation and Essay actions */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenPresentation && (
            <button
              onClick={onOpenPresentation}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors cursor-pointer"
              title="Volver a la portada de presentación institucional"
            >
              <Home className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden md:inline">Portada</span>
            </button>
          )}

          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Información bibliográfica del artículo de Dr. Luis Fdo. Aragón"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden md:inline">El Ensayo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
