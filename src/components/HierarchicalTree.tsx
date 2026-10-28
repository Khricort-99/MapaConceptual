import React, { useState } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Quote, ArrowRight, GitFork } from 'lucide-react';
import { ConceptNode, CONCEPT_NODES, CATEGORIES } from '../data/conceptMapData';

interface HierarchicalTreeProps {
  onSelectNode: (nodeId: string) => void;
  selectedNodeId: string | null;
}

interface TreeNodeData {
  node: ConceptNode;
  children?: TreeNodeData[];
}

export const HierarchicalTree: React.FC<HierarchicalTreeProps> = ({
  onSelectNode,
  selectedNodeId,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(['core-tesis', 'tipologia-barbour', 'independencia-postulado', 'conflicto-mito', 'dialogo-fundamentos', 'raices-cristianas-ciencia'])
  );

  const toggleExpand = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedNodes(new Set(CONCEPT_NODES.map((n) => n.id)));
  };

  const collapseAll = () => {
    setExpandedNodes(new Set(['core-tesis']));
  };

  // Build the hierarchical logical tree
  const getNode = (id: string) => CONCEPT_NODES.find((n) => n.id === id)!;

  const treeStructure: TreeNodeData = {
    node: getNode('core-tesis'),
    children: [
      {
        node: getNode('tipologia-barbour'),
        children: [
          // Rama 1: Independencia
          {
            node: getNode('independencia-postulado'),
            children: [
              {
                node: getNode('independencia-critica'),
                children: [
                  { node: getNode('juan-pablo-aislamiento') },
                ],
              },
            ],
          },
          // Rama 2: Conflicto
          {
            node: getNode('conflicto-mito'),
            children: [
              {
                node: getNode('cosmovisiones-choque'),
              },
              {
                node: getNode('caso-galileo'),
                children: [
                  { node: getNode('caso-lavoisier') },
                ],
              },
              {
                node: getNode('debate-evolucion'),
                children: [
                  { node: getNode('magisterio-catolico-evolucion') },
                ],
              },
            ],
          },
          // Rama 3: Diálogo
          {
            node: getNode('dialogo-fundamentos'),
            children: [
              {
                node: getNode('puentes-filosoficos-artigas'),
                children: [
                  { node: getNode('presuposicion-ontologica') },
                  { node: getNode('presuposicion-epistemologica') },
                  { node: getNode('presuposicion-etica') },
                ],
              },
            ],
          },
          // Rama 4: Integración
          {
            node: getNode('raices-cristianas-ciencia'),
            children: [
              {
                node: getNode('integracion-errores'),
                children: [
                  {
                    node: getNode('propuesta-aragon'),
                    children: [
                      { node: getNode('limites-bioetica') },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const renderBranch = (branch: TreeNodeData, depth: number = 0) => {
    const isExpanded = expandedNodes.has(branch.node.id);
    const hasChildren = branch.children && branch.children.length > 0;
    const isSelected = selectedNodeId === branch.node.id;
    const category = CATEGORIES[branch.node.category];

    return (
      <div key={branch.node.id} className="relative">
        <div
          className={`flex items-start gap-2.5 py-2 px-3 rounded-xl transition-all duration-150 border ${
            isSelected
              ? 'bg-stone-900 text-white border-stone-900 shadow-md'
              : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-stone-300'
          }`}
          style={{
            marginLeft: `${depth * 28}px`,
          }}
        >
          {/* Expand/Collapse Button */}
          {hasChildren ? (
            <button
              onClick={() => toggleExpand(branch.node.id)}
              className={`mt-1 p-1 rounded transition-colors cursor-pointer ${
                isSelected ? 'text-white hover:bg-stone-800' : 'text-stone-500 hover:bg-stone-100'
              }`}
              title={isExpanded ? 'Colapsar rama' : 'Expandir rama'}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          ) : (
            <div className="w-6 mt-1 flex justify-center">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            </div>
          )}

          {/* Node Summary Content */}
          <div
            onClick={() => onSelectNode(branch.node.id)}
            className="flex-1 min-w-0 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs">
              <span
                style={{ color: isSelected ? '#FDE68A' : category.color }}
                className="font-bold uppercase tracking-wider text-[10px]"
              >
                {category.name}
              </span>
              <span
                className={isSelected ? 'text-stone-400' : 'text-stone-400'}
                aria-hidden="true"
              >
                ·
              </span>
              <span
                className={`text-[11px] font-mono ${
                  isSelected ? 'text-stone-300' : 'text-stone-500'
                }`}
              >
                {branch.node.quote.author.split('/')[0].trim()}
              </span>
            </div>

            <h3
              className={`font-semibold text-sm mt-0.5 ${
                isSelected ? 'text-white' : 'text-stone-900'
              }`}
            >
              {branch.node.title}
            </h3>

            <p
              className={`text-xs mt-1 leading-relaxed line-clamp-2 ${
                isSelected ? 'text-stone-300' : 'text-stone-600'
              }`}
            >
              {branch.node.subtitle}
            </p>
          </div>

          {/* Action icon */}
          <button
            onClick={() => onSelectNode(branch.node.id)}
            className={`mt-1 p-1.5 rounded-lg transition-colors cursor-pointer ${
              isSelected ? 'text-white hover:bg-stone-800' : 'text-stone-400 hover:text-stone-900 hover:bg-stone-100'
            }`}
            title="Inspeccionar detalles"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Children Branches */}
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2 relative">
            {/* Guide line */}
            <div
              className="absolute left-0 top-0 bottom-4 w-[1px] bg-stone-200"
              style={{
                left: `${depth * 28 + 12}px`,
              }}
            />
            {branch.children!.map((child) => renderBranch(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
            <GitFork className="w-3.5 h-3.5" />
            <span>Estructura Epistemológica</span>
          </div>
          <h2 className="font-serif-scholarly text-2xl font-bold text-stone-900 mt-1">
            Árbol Lógico del Ensayo
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Navegue por las derivaciones lógicas del argumento del Dr. Aragón: desde la tesis de la tensión esperable hasta la evaluación sistemática de las 4 tipologías y los puentes filosóficos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
          >
            Expandir Todo
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
          >
            Colapsar a Raíz
          </button>
        </div>
      </div>

      {/* Main tree list */}
      <div className="space-y-3 bg-stone-50/50 p-4 sm:p-6 rounded-2xl border border-stone-200">
        {renderBranch(treeStructure, 0)}
      </div>
    </div>
  );
};
