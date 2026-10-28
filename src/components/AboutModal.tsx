import React, { useEffect } from 'react';
import { X, BookOpen, ExternalLink, GraduationCap, FileText, User } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
              <GraduationCap className="w-4 h-4 text-stone-700" />
              <span>Publicación Académica de Referencia</span>
            </div>
            <h3 className="font-serif-scholarly text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              La interacción entre ciencia y religión: una actualización sobre el conflicto
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Author & Journal details */}
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <User className="w-4 h-4 text-stone-500 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-stone-900">Autor: </span>
              <span className="text-stone-700">Dr. Luis Fernando Aragón</span>
              <p className="text-xs text-stone-500 mt-0.5">
                Catedrático, Escuela de Educación Física y Deportes, Centro de Investigación en Ciencias del Movimiento Humano, Universidad de Costa Rica.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-stone-500 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-stone-900">Revista: </span>
              <span className="text-stone-700">
                InterSedes: Revista de las Sedes Regionales, Universidad de Costa Rica. Vol. 18, Núm. 37, 2017, pp. 1-30. ISSN: 2215-2458.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <FileText className="w-4 h-4 text-stone-500 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-stone-900">DOI / Enlace: </span>
              <a
                href="https://www.redalyc.org/articulo.oa?id=66677161003"
                target="_blank"
                rel="noreferrer"
                className="text-stone-900 hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>redalyc.org/articulo.oa?id=66677161003</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Abstract summary */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
            Resumen del Ensayo
          </h4>
          <p className="text-sm text-stone-700 leading-relaxed">
            El ensayo evalúa la interacción entre las ciencias naturales y el cristianismo a través de los cuatro modelos de Ian Barbour (Conflicto, Independencia, Diálogo e Integración). Muestra con evidencia histórica y filosófica que la tesis del conflicto perenne es un mito decimonónico infundado, y que la independencia radical es insostenible en la vida de cualquier científico creyente.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            Propone como vía sólida el diálogo enriquecido por los puentes filosóficos de Mariano Artigas (presuposiciones ontológica, epistemológica y ética de la ciencia) y culmina en una integración personal donde el quehacer científico se vive como una tarea humana de profundo significado divino.
          </p>
        </div>

        {/* Core thinkers referenced */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
            Pensadores y Obras Analizadas
          </h4>
          <div className="flex flex-wrap gap-1.5 text-xs text-stone-600">
            <span className="px-2 py-1 bg-stone-100 rounded text-stone-800">Ian Barbour</span>
            <span className="px-2 py-1 bg-stone-100 rounded text-stone-800">Mariano Artigas</span>
            <span className="px-2 py-1 bg-stone-100 rounded text-stone-800">Papa Juan Pablo II (Fides et Ratio)</span>
            <span className="px-2 py-1 bg-stone-100 rounded text-stone-800">Alister McGrath</span>
            <span className="px-2 py-1 bg-stone-100 rounded text-stone-800">Peter Harrison</span>
            <span className="px-2 py-1 bg-stone-100 rounded text-stone-800">David Lindberg</span>
            <span className="px-2 py-1 bg-stone-100 rounded text-stone-800">Christopher Decaen</span>
            <span className="px-2 py-1 bg-stone-100 rounded text-stone-800">John Lennox</span>
            <span className="px-2 py-1 bg-stone-100 rounded text-stone-800">Stanley Jaki</span>
            <span className="px-2 py-1 bg-stone-100 rounded text-stone-800">Joseph Needham</span>
            <span className="px-2 py-1 bg-stone-100 rounded text-stone-800">Charles Coulson</span>
            <span className="px-2 py-1 bg-stone-100 rounded text-stone-800">C. S. Lewis</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
