import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, ArrowRight, BookOpen, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { ConceptNode, CATEGORIES, CONCEPT_NODES, CONCEPT_LINKS } from '../data/conceptMapData';

interface NodeDrawerProps {
  node: ConceptNode | null;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
}

export const NodeDrawer: React.FC<NodeDrawerProps> = ({
  node,
  onClose,
  onSelectNode,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    // Stop any ongoing speech synthesis when node changes or unmounts
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  }, [node]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  const category = CATEGORIES[node.category];

  // Find incoming and outgoing relations
  const connectedLinks = CONCEPT_LINKS.filter(
    (l) => l.source === node.id || l.target === node.id
  );

  const relatedNodes = connectedLinks.map((l) => {
    const isSource = l.source === node.id;
    const targetId = isSource ? l.target : l.source;
    const targetNode = CONCEPT_NODES.find((n) => n.id === targetId);
    return {
      link: l,
      isOutgoing: isSource,
      node: targetNode,
      label: l.label,
    };
  }).filter((item): item is { link: typeof item.link; isOutgoing: boolean; node: ConceptNode; label: string } => item.node !== undefined);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('La síntesis de voz no está soportada en este navegador.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${node.title}. ${node.subtitle}. ${node.summary}. En palabras del autor: ${node.quote.text}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-2xl border-l border-stone-200 flex flex-col transform transition-transform duration-300 ease-out">
      {/* Top action header */}
      <div className="p-5 border-b border-stone-100 flex items-center justify-between gap-4 bg-stone-50/70">
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ backgroundColor: category.color }}
          />
          <span style={{ color: category.color }} className="font-semibold">
            {category.name}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {node.level === 0
              ? 'Tesis Central'
              : node.level === 1
              ? 'Modelo Principal'
              : node.level === 2
              ? 'Concepto Analítico'
              : 'Evidencia Histórica'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSpeech}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-50 text-amber-700 border-amber-300'
                : 'text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
            title={isPlayingAudio ? 'Detener lectura' : 'Escuchar síntesis en voz'}
          >
            {isPlayingAudio ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg border border-transparent hover:border-stone-200 transition-colors cursor-pointer"
            title="Cerrar panel (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main scrollable body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Title and subtitle */}
        <div>
          <h2 className="font-serif-scholarly text-2xl font-bold text-stone-900 leading-tight">
            {node.title}
          </h2>
          <p className="mt-2 text-sm text-stone-600 font-medium leading-relaxed">
            {node.subtitle}
          </p>
        </div>

        {/* Synthesis statement */}
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-stone-700" />
            <span>Síntesis Conceptual</span>
          </h3>
          <p className="text-sm text-stone-800 leading-relaxed">
            {node.summary}
          </p>
        </div>

        {/* Detailed Points */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-stone-700" />
            <span>Desarrollo del Argumento en el Ensayo</span>
          </h3>
          <ul className="space-y-2.5">
            {node.analysis.map((point, index) => (
              <li
                key={index}
                className="text-sm text-stone-700 leading-relaxed flex items-start gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scholarly quote box with citation */}
        <div className="p-5 rounded-xl border border-stone-200 bg-amber-50/30">
          <div className="flex items-center gap-2 mb-2 text-amber-800">
            <Quote className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wide uppercase">
              Cita Textual del Documento
            </span>
          </div>
          <blockquote className="font-serif-scholarly italic text-stone-800 text-sm leading-relaxed">
            "{node.quote.text}"
          </blockquote>
          <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-stone-600">
            <span className="font-semibold text-stone-800">
              {node.quote.author}
            </span>
            <span>
              {node.quote.reference} · Pág. {node.quote.page}
            </span>
          </div>
        </div>

        {/* Concluding takeaway */}
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
            Conclusión / Implicación
          </div>
          <p className="text-sm text-stone-800 font-medium">
            {node.keyTakeaway}
          </p>
        </div>

        {/* Connected nodes */}
        {relatedNodes.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-stone-700" />
              <span>Nodos y Conexiones Vinculadas ({relatedNodes.length})</span>
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {relatedNodes.map(({ link, node: relNode, label, isOutgoing }) => (
                <button
                  key={link.id + relNode.id}
                  onClick={() => onSelectNode(relNode.id)}
                  className="w-full text-left p-3 rounded-lg border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="min-w-0 pr-3">
                    <div className="text-xs text-stone-600 font-medium flex items-center gap-1">
                      <span>{isOutgoing ? 'Conecta con:' : 'Recibe desde:'}</span>
                      <span className="text-stone-900 font-semibold">{label}</span>
                    </div>
                    <div className="text-sm font-medium text-stone-900 group-hover:text-stone-950 truncate mt-0.5">
                      {relNode.title}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tags metadata */}
        <div className="pt-2">
          <div className="text-xs text-stone-600 font-medium flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-semibold text-stone-600">Palabras clave:</span>
            {node.tags.map((tag, i) => (
              <React.Fragment key={tag}>
                <span>{tag}</span>
                {i < node.tags.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
