import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Search,
  GitBranch
} from 'lucide-react';
import {
  ConceptNode,
  CONCEPT_NODES,
  CONCEPT_LINKS,
  ConceptLink,
  CATEGORIES
} from '../data/conceptMapData';

interface InteractiveGraphProps {
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}

// 4 Spacious Column Lanes (370px wide, generous 260px gap between columns)
const COLUMN_LANES = [
  {
    id: 'independencia',
    number: '1',
    title: 'MODELO DE INDEPENDENCIA',
    subtitle: '«Cada quien en lo suyo» / NOMA (NAS, Gould)',
    x: 50,
    width: 370,
    centerX: 235,
    color: '#0284C7',
    bg: 'rgba(2, 132, 199, 0.03)',
    borderColor: 'rgba(2, 132, 199, 0.28)',
    headerBg: '#E0F2FE',
    headerText: '#0369A1',
    synthesisLabel: 'supera el aislamiento en',
    synthesisTargetX: 800, // Outer-left arrival port at Síntesis (left of Col 2's line at 865)
    collectorY: 1560, // Clear horizontal track below Col 2's badge
    badgeX: 517.5, // Centered on horizontal segment [235, 800]
    badgeY: 1560,
    badgeWidth: 170,
  },
  {
    id: 'conflicto',
    number: '2',
    title: 'MODELO DEL CONFLICTO',
    subtitle: 'Mito decimonónico, Cosmovisiones y Casos Históricos',
    x: 680,
    width: 370,
    centerX: 865,
    color: '#E11D48',
    bg: 'rgba(225, 29, 72, 0.03)',
    borderColor: 'rgba(225, 29, 72, 0.28)',
    headerBg: '#FFE4E6',
    headerText: '#BE123C',
    synthesisLabel: 'supera el conflicto en',
    synthesisTargetX: 865, // Direct straight vertical drop (zero horizontal segment, zero collisions!)
    collectorY: 1500,
    badgeX: 865, // Centered vertically on straight drop
    badgeY: 1500,
    badgeWidth: 150,
  },
  {
    id: 'dialogo',
    number: '3',
    title: 'MODELO DEL DIÁLOGO',
    subtitle: 'Encuentro entre iguales y Puentes Filosóficos de Artigas',
    x: 1310,
    width: 370,
    centerX: 1495,
    color: '#4F46E5',
    bg: 'rgba(79, 70, 229, 0.03)',
    borderColor: 'rgba(79, 70, 229, 0.28)',
    headerBg: '#E0E7FF',
    headerText: '#4338CA',
    synthesisLabel: 'aporta diálogo y bases a',
    synthesisTargetX: 1495, // Direct straight vertical drop (zero horizontal segment, zero collisions!)
    collectorY: 1500,
    badgeX: 1495, // Centered vertically on straight drop
    badgeY: 1500,
    badgeWidth: 160,
  },
  {
    id: 'integracion',
    number: '4',
    title: 'MODELO DE INTEGRACIÓN',
    subtitle: 'Raíces cristianas, Vocación divina y Bioética',
    x: 1940,
    width: 370,
    centerX: 2125,
    color: '#0D9488',
    bg: 'rgba(13, 148, 136, 0.03)',
    borderColor: 'rgba(13, 148, 136, 0.28)',
    headerBg: '#CCFBF1',
    headerText: '#0F766E',
    synthesisLabel: 'culmina en síntesis personal con',
    synthesisTargetX: 1560, // Outer-right arrival port at Síntesis (right of Col 3's line at 1495)
    collectorY: 1560, // Clear horizontal track below Col 3's badge
    badgeX: 1842.5, // Centered on horizontal segment [1560, 2125]
    badgeY: 1560,
    badgeWidth: 180,
  },
];

// Column Lane geometry constants
const LANE_TOP_Y = 380; // Column rectangle starts at Y=380 (below the badges at Y=350)
const LANE_BOTTOM_Y = 1460; // Column rectangle ends at Y=1460
const SINTESIS_TOP_Y = 1700; // Síntesis Final box top edge (ample 240px vertical clearance)

interface PathResult {
  pathData: string;
  badgeX: number;
  badgeY: number;
  sourcePoint: { x: number; y: number };
}

export const InteractiveGraph: React.FC<InteractiveGraphProps> = ({
  selectedNodeId,
  onSelectNode,
}) => {
  // Static, fixed nodes directly from data (NO dragging, permanent orderly positions)
  const nodes = CONCEPT_NODES;

  // Viewport transforms (Pan & Zoom)
  const [transform, setTransform] = useState({ x: 0, y: 10, scale: 0.62 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  // Filtering & highlighting
  const [activeModel, setActiveModel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fast map lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, ConceptNode>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  // Connected nodes map for relational path highlighting
  const connectedNodeIds = useMemo(() => {
    const targetId = hoveredNodeId || selectedNodeId;
    if (!targetId) return new Set<string>();

    const set = new Set<string>();
    set.add(targetId);
    CONCEPT_LINKS.forEach((link) => {
      if (link.source === targetId) set.add(link.target);
      if (link.target === targetId) set.add(link.source);
    });
    return set;
  }, [hoveredNodeId, selectedNodeId]);

  // Check if node matches query or model filter
  const isNodeHighlighted = useCallback(
    (node: ConceptNode) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          node.title.toLowerCase().includes(q) ||
          node.subtitle.toLowerCase().includes(q) ||
          node.quote.author.toLowerCase().includes(q) ||
          node.summary.toLowerCase().includes(q) ||
          node.tags.some((t) => t.toLowerCase().includes(q))
        );
      }

      if (activeModel === 'all') return true;
      if (activeModel === 'tesis') {
        return node.category === 'central';
      }
      return (
        node.category === activeModel ||
        (activeModel === 'conflicto' && (node.category === 'casos' || node.category === 'cosmovisiones')) ||
        (activeModel === 'dialogo' && node.category === 'puentes')
      );
    },
    [activeModel, searchQuery]
  );

  // Smooth centering on a coordinate
  const centerOnCoord = useCallback((x: number, y: number, scale = 0.82) => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    setTransform({
      x: clientWidth / 2 - x * scale,
      y: clientHeight / 2 - y * scale,
      scale,
    });
  }, []);

  // Fit all nodes automatically into viewport
  const fitAll = useCallback(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;

    const canvasWidth = 2400;
    const canvasHeight = 1860;

    const scaleX = (clientWidth - 40) / canvasWidth;
    const scaleY = (clientHeight - 40) / canvasHeight;
    const scale = Math.min(Math.max(Math.min(scaleX, scaleY), 0.28), 0.92);

    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    setTransform({
      x: clientWidth / 2 - centerX * scale,
      y: Math.max(16, clientHeight / 2 - centerY * scale),
      scale,
    });
  }, []);

  // Focus preset views
  const focusTesis = () => centerOnCoord(1180, 160, 0.95);
  const focusCol1 = () => centerOnCoord(235, 680, 0.9);
  const focusCol2 = () => centerOnCoord(865, 880, 0.78);
  const focusCol3 = () => centerOnCoord(1495, 780, 0.85);
  const focusCol4 = () => centerOnCoord(2125, 720, 0.85);
  const focusSintesis = () => centerOnCoord(1180, 1700, 0.95);

  // Auto-fit on initial mount
  useEffect(() => {
    fitAll();
    const handleResize = () => fitAll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fitAll]);

  // Center on node if selected externally
  useEffect(() => {
    if (selectedNodeId) {
      const node = nodeMap.get(selectedNodeId);
      if (node) {
        centerOnCoord(node.x + 185, node.y + 46, 0.95);
      }
    }
  }, [selectedNodeId, nodeMap, centerOnCoord]);

  // Canvas Mouse Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.concept-card-static')) return;
    setIsPanning(true);
    setStartPan({
      x: e.clientX - transform.x,
      y: e.clientY - transform.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setTransform((prev) => ({
      ...prev,
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y,
    }));
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Wheel Zoom Handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    const newScale = Math.min(Math.max(transform.scale * zoomFactor, 0.28), 1.6);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newX = mouseX - (mouseX - transform.x) * (newScale / transform.scale);
      const newY = mouseY - (mouseY - transform.y) * (newScale / transform.scale);

      setTransform({
        x: newX,
        y: newY,
        scale: newScale,
      });
    }
  };

  /**
   * PURE ORTHOGONAL & UNCROSSED PATH ROUTER
   * Computes clean 90-degree lines with zero crossings.
   */
  const computeOrthogonalPath = (
    link: ConceptLink,
    sourceNode: ConceptNode,
    targetNode: ConceptNode
  ): PathResult => {
    const sW =
      sourceNode.id === 'core-tesis'
        ? 440
        : sourceNode.id === 'tipologia-barbour'
        ? 400
        : sourceNode.id === 'sintesis-epistemologica'
        ? 700
        : 370;
    const sH = 92;

    const tW =
      targetNode.id === 'core-tesis'
        ? 440
        : targetNode.id === 'tipologia-barbour'
        ? 400
        : targetNode.id === 'sintesis-epistemologica'
        ? 700
        : 370;
    const tH = 92;

    // 1. Tesis -> Tipología de Barbour (Straight vertical line down central axis)
    if (link.source === 'core-tesis' && link.target === 'tipologia-barbour') {
      const x = 1180;
      const sy = sourceNode.y + sH;
      const ty = targetNode.y;
      return {
        pathData: `M ${x} ${sy} L ${x} ${ty}`,
        badgeX: x,
        badgeY: (sy + ty) / 2,
        sourcePoint: { x, y: sy },
      };
    }

    // 2. Barbour -> 4 Column Headers (Orthogonal distributor bus, badges strictly OUTSIDE and ABOVE rectangles)
    if (link.source === 'tipologia-barbour') {
      const sx = 1180;
      const sy = sourceNode.y + sH; // 292
      const tx = targetNode.x + tW / 2;
      const ty = targetNode.y; // 430
      const busY = 320; // Horizontal distributor bus line

      return {
        pathData: `M ${sx} ${sy} L ${sx} ${busY} L ${tx} ${busY} L ${tx} ${ty}`,
        badgeX: tx,
        badgeY: 350, // 30px ABOVE the column rectangle (LANE_TOP_Y = 380) - completely outside without touching the title!
        sourcePoint: { x: sx, y: sy },
      };
    }

    // 3. Intra-Column Connections (Pure straight vertical lines from bottom of node to top of next node)
    const isSameColumn = Math.abs(sourceNode.x - targetNode.x) < 30;
    if (isSameColumn) {
      const x = sourceNode.x + sW / 2;
      const sy = sourceNode.y + sH;
      const ty = targetNode.y;
      return {
        pathData: `M ${x} ${sy} L ${x} ${ty}`,
        badgeX: x,
        badgeY: (sy + ty) / 2,
        sourcePoint: { x, y: sy },
      };
    }

    // 4. Same-Row Horizontal Inter-Model Bridges across the 90px gap (ZERO crossed lines!)
    if (sourceNode.x < targetNode.x) {
      // Left to Right: Exit right edge -> straight horizontal line across gap -> enter left edge
      const sx = sourceNode.x + sW;
      const sy = sourceNode.y + sH / 2;
      const tx = targetNode.x;
      const ty = targetNode.y + tH / 2;
      const gapMidX = (sx + tx) / 2;

      // If on same vertical row, direct horizontal straight line
      if (Math.abs(sy - ty) < 5) {
        return {
          pathData: `M ${sx} ${sy} L ${tx} ${ty}`,
          badgeX: gapMidX,
          badgeY: sy,
          sourcePoint: { x: sx, y: sy },
        };
      }

      // Stepped orthogonal if slight row difference
      return {
        pathData: `M ${sx} ${sy} L ${gapMidX} ${sy} L ${gapMidX} ${ty} L ${tx} ${ty}`,
        badgeX: gapMidX,
        badgeY: (sy + ty) / 2,
        sourcePoint: { x: sx, y: sy },
      };
    } else {
      // Right to Left
      const sx = sourceNode.x;
      const sy = sourceNode.y + sH / 2;
      const tx = targetNode.x + tW;
      const ty = targetNode.y + tH / 2;
      const gapMidX = (sx + tx) / 2;

      if (Math.abs(sy - ty) < 5) {
        return {
          pathData: `M ${sx} ${sy} L ${tx} ${ty}`,
          badgeX: gapMidX,
          badgeY: sy,
          sourcePoint: { x: sx, y: sy },
        };
      }

      return {
        pathData: `M ${sx} ${sy} L ${gapMidX} ${sy} L ${gapMidX} ${ty} L ${tx} ${ty}`,
        badgeX: gapMidX,
        badgeY: (sy + ty) / 2,
        sourcePoint: { x: sx, y: sy },
      };
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col bg-stone-100 overflow-hidden select-none">
      {/* Top Fixed Control Bar: Structured View Controls, Quick Model Jump & Search */}
      <div className="z-30 bg-white border-b border-stone-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        {/* Left: Direct Model Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full scrollbar-none">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-1 hidden sm:inline flex items-center gap-1">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Estructura:</span>
          </span>

          <button
            onClick={() => {
              setActiveModel('all');
              fitAll();
            }}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeModel === 'all'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Ver Mapa Completo
          </button>

          <button
            onClick={() => {
              setActiveModel('tesis');
              focusTesis();
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              activeModel === 'tesis'
                ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Tesis & Tipología
          </button>

          <button
            onClick={() => {
              setActiveModel('independencia');
              focusCol1();
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              activeModel === 'independencia'
                ? 'bg-sky-100 text-sky-900 border-sky-300 font-bold'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            1. Independencia
          </button>

          <button
            onClick={() => {
              setActiveModel('conflicto');
              focusCol2();
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              activeModel === 'conflicto'
                ? 'bg-rose-100 text-rose-900 border-rose-300 font-bold'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            2. Conflicto
          </button>

          <button
            onClick={() => {
              setActiveModel('dialogo');
              focusCol3();
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              activeModel === 'dialogo'
                ? 'bg-indigo-100 text-indigo-900 border-indigo-300 font-bold'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            3. Diálogo
          </button>

          <button
            onClick={() => {
              setActiveModel('integracion');
              focusCol4();
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              activeModel === 'integracion'
                ? 'bg-teal-100 text-teal-900 border-teal-300 font-bold'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            4. Integración
          </button>

          <button
            onClick={() => {
              setActiveModel('all');
              focusSintesis();
            }}
            className="px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 border bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
          >
            Síntesis Final
          </button>
        </div>

        {/* Right: Search box & Zoom ratio indicator */}
        <div className="flex items-center gap-2">
          <div className="relative min-w-[210px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar concepto o autor..."
              className="w-full pl-8 pr-3 py-1 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          <button
            onClick={fitAll}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors cursor-pointer"
            title="Ajustar mapa completo a la pantalla"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Ajustar</span>
          </button>
        </div>
      </div>

      {/* Main Canvas: Structured, Non-interactive, Separated Boxes, Straight Uncrossed Arrows */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing canvas-grid-pattern overflow-hidden bg-stone-50"
      >
        {/* SVG Structure & Straight Arrow Connections Layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Crisp directional arrowheads */}
            <marker
              id="arrow-hierarchy"
              markerWidth="10"
              markerHeight="8"
              refX="9"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 10 4, 0 8, 2.5 4" fill="#475569" />
            </marker>

            <marker
              id="arrow-highlight"
              markerWidth="11"
              markerHeight="8"
              refX="10"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 11 4, 0 8, 2.5 4" fill="#0F172A" />
            </marker>

            <marker
              id="arrow-critique"
              markerWidth="10"
              markerHeight="8"
              refX="9"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 10 4, 0 8, 2.5 4" fill="#E11D48" />
            </marker>

            <marker
              id="arrow-bridge"
              markerWidth="10"
              markerHeight="8"
              refX="9"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 10 4, 0 8, 2.5 4" fill="#4F46E5" />
            </marker>

            <marker
              id="arrow-contrast"
              markerWidth="10"
              markerHeight="8"
              refX="9"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 10 4, 0 8, 2.5 4" fill="#EA580C" />
            </marker>

            <marker
              id="arrow-resolution"
              markerWidth="10"
              markerHeight="8"
              refX="9"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 10 4, 0 8, 2.5 4" fill="#0D9488" />
            </marker>
          </defs>

          <g
            transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}
          >
            {/* 1. TOP TIER CONTAINER: TESIS & TIPOLOGÍA (X: 630 to 1200) */}
            {/* 1. TOP TIER CONTAINER: TESIS & TIPOLOGÍA (Centered at X=1180) */}
            <g>
              <rect
                x="905"
                y="16"
                width="550"
                height="295"
                rx="16"
                fill="rgba(217, 119, 6, 0.03)"
                stroke="rgba(217, 119, 6, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="6,4"
              />
              <rect
                x="1060"
                y="6"
                width="240"
                height="22"
                rx="4"
                fill="#FEF3C7"
                stroke="#F59E0B"
                strokeWidth="1.2"
              />
              <text
                x="1180"
                y="21"
                textAnchor="middle"
                fontSize="10"
                fontWeight="800"
                fill="#92400E"
                fontFamily="var(--font-sans)"
                letterSpacing="0.08em"
              >
                NÚCLEO EPISTEMOLÓGICO CENTRAL
              </text>
            </g>

            {/* 2. FOUR DISTINCT COLUMN LANES WITH GENEROUS 260px GAPS (Starts at Y=380, cleanly below the badges at Y=350) */}
            {COLUMN_LANES.map((lane) => (
              <g key={lane.id}>
                {/* Column background enclosure */}
                <rect
                  x={lane.x - 10}
                  y={LANE_TOP_Y}
                  width={lane.width + 20}
                  height={LANE_BOTTOM_Y - LANE_TOP_Y}
                  rx="14"
                  fill={lane.bg}
                  stroke={lane.borderColor}
                  strokeWidth="1.2"
                />

                {/* Column Top Header Banner (Y=380 to Y=416) */}
                <rect
                  x={lane.x - 10}
                  y={LANE_TOP_Y}
                  width={lane.width + 20}
                  height="36"
                  rx="12"
                  fill={lane.headerBg}
                  stroke={lane.borderColor}
                  strokeWidth="1.2"
                />
                <circle
                  cx={lane.x + 12}
                  cy={LANE_TOP_Y + 18}
                  r="5"
                  fill={lane.color}
                />
                <text
                  x={lane.x + 26}
                  y={LANE_TOP_Y + 22}
                  fontSize="12"
                  fontWeight="800"
                  fill={lane.headerText}
                  fontFamily="var(--font-sans)"
                  letterSpacing="-0.01em"
                >
                  {lane.number}. {lane.title}
                </text>

                {/* Column Bottom Exit Port Circle (Point of origin for final synthesis arrows) */}
                <circle
                  cx={lane.centerX}
                  cy={LANE_BOTTOM_Y}
                  r="5"
                  fill={lane.color}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              </g>
            ))}

            {/* 3. BOTTOM SÍNTESIS CONTAINER (Centered at X=1180) */}
            <g>
              <rect
                x="780"
                y="1670"
                width="800"
                height="150"
                rx="16"
                fill="rgba(217, 119, 6, 0.04)"
                stroke="rgba(217, 119, 6, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="6,4"
              />
              <rect
                x="1040"
                y="1658"
                width="280"
                height="24"
                rx="4"
                fill="#FEF3C7"
                stroke="#F59E0B"
                strokeWidth="1.2"
              />
              <text
                x="1180"
                y="1674"
                textAnchor="middle"
                fontSize="10"
                fontWeight="800"
                fill="#92400E"
                fontFamily="var(--font-sans)"
                letterSpacing="0.08em"
              >
                CONCLUSIÓN & SÍNTESIS FINAL
              </text>
            </g>

            {/* 4. STRAIGHT, ORTHOGONAL & UNCROSSED CONNECTOR LINES */}
            {CONCEPT_LINKS.map((link) => {
              const sourceNode = nodeMap.get(link.source);
              const targetNode = nodeMap.get(link.target);
              if (!sourceNode || !targetNode) return null;

              const isConnectedToFocus =
                connectedNodeIds.size > 0 &&
                connectedNodeIds.has(link.source) &&
                connectedNodeIds.has(link.target);

              const isDimmed =
                connectedNodeIds.size > 0 && !isConnectedToFocus;

              // Compute clean orthogonal straight segments
              const { pathData, badgeX, badgeY, sourcePoint } =
                computeOrthogonalPath(link, sourceNode, targetNode);

              let strokeColor = '#475569'; // slate-600
              let markerEnd = 'url(#arrow-hierarchy)';
              let strokeDash = undefined;

              if (link.type === 'critique') {
                strokeColor = '#E11D48'; // rose-600
                markerEnd = 'url(#arrow-critique)';
                strokeDash = '5,3';
              } else if (link.type === 'bridge') {
                strokeColor = '#4F46E5'; // indigo-600
                markerEnd = 'url(#arrow-bridge)';
              } else if (link.type === 'contrast') {
                strokeColor = '#EA580C'; // orange-600
                markerEnd = 'url(#arrow-contrast)';
                strokeDash = '4,3';
              } else if (link.type === 'resolution') {
                strokeColor = '#0D9488'; // teal-600
                markerEnd = 'url(#arrow-resolution)';
              }

              if (isConnectedToFocus) {
                strokeColor = '#0F172A';
                markerEnd = 'url(#arrow-highlight)';
              }

              return (
                <g
                  key={link.id}
                  className="transition-opacity duration-200"
                  style={{ opacity: isDimmed ? 0.12 : 1 }}
                >
                  {/* Origin Circle */}
                  <circle
                    cx={sourcePoint.x}
                    cy={sourcePoint.y}
                    r={isConnectedToFocus ? 4 : 3}
                    fill={strokeColor}
                  />

                  {/* 100% Straight Orthogonal Arrow Line */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isConnectedToFocus ? 3 : 2}
                    strokeDasharray={strokeDash}
                    markerEnd={markerEnd}
                  />

                  {/* Linking Word Badge on Straight Segments (strictly outside & above column titles) */}
                  {transform.scale >= 0.4 && (() => {
                    const bWidth =
                      link.id === 'l21'
                        ? 200
                        : link.id === 'l20'
                        ? 150
                        : Math.max(120, Math.min(220, link.label.length * 6.6 + 24));
                    return (
                      <g transform={`translate(${badgeX}, ${badgeY})`}>
                        <rect
                          x={-bWidth / 2}
                          y="-10"
                          width={bWidth}
                          height="20"
                          rx="10"
                          fill="#FFFFFF"
                          stroke={isConnectedToFocus ? '#0F172A' : strokeColor}
                          strokeWidth="1.2"
                          style={{
                            filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.12))',
                          }}
                        />
                        <text
                          x="0"
                          y="3.5"
                          textAnchor="middle"
                          fontSize="8.5"
                          fontWeight="700"
                          fill={isConnectedToFocus ? '#0F172A' : '#334155'}
                          fontFamily="var(--font-sans)"
                          fontStyle="italic"
                        >
                          {link.label}
                        </text>
                      </g>
                    );
                  })()}
                </g>
              );
            })}

            {/* 5. FINAL ARROWS TO SÍNTESIS: EMERGING DIRECTLY FROM COLUMN RECTANGLE BOTTOMS WITHOUT CROSSING OR COLLIDING */}
            {COLUMN_LANES.map((lane) => {
              const sx = lane.centerX;
              const sy = LANE_BOTTOM_Y; // Exact bottom border of the column rectangle
              const tx = lane.synthesisTargetX; // Safe arrival port strictly left or right of the title banner
              const ty = SINTESIS_TOP_Y; // Top border of the Síntesis box
              const collectorY = lane.collectorY;

              // Direct straight vertical drop if sx === tx (Col 2 & Col 3), orthogonal bypass if bent (Col 1 & Col 4)
              const pathData =
                sx === tx
                  ? `M ${sx} ${sy} L ${tx} ${ty}`
                  : `M ${sx} ${sy} L ${sx} ${collectorY} L ${tx} ${collectorY} L ${tx} ${ty}`;

              const bW = lane.badgeWidth || 170;

              return (
                <g key={`synthesis-feed-${lane.id}`}>
                  {/* Origin Circle on column bottom border */}
                  <circle cx={sx} cy={sy} r="4.5" fill={lane.color} />

                  {/* Straight uncrossed connection line avoiding the title banner */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={lane.color}
                    strokeWidth="2.4"
                    markerEnd="url(#arrow-resolution)"
                  />

                  {/* Proposition Badge */}
                  {transform.scale >= 0.4 && (
                    <g transform={`translate(${lane.badgeX}, ${lane.badgeY})`}>
                      <rect
                        x={-bW / 2}
                        y="-10"
                        width={bW}
                        height="20"
                        rx="10"
                        fill="#FFFFFF"
                        stroke={lane.color}
                        strokeWidth="1.2"
                        style={{
                          filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.12))',
                        }}
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="700"
                        fill={lane.color}
                        fontFamily="var(--font-sans)"
                        fontStyle="italic"
                      >
                        {lane.synthesisLabel}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* HTML Layer for Concept Map Nodes (Fixed Positions, High Legibility, Spacious Gaps) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0',
          }}
        >
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const isConnected = connectedNodeIds.has(node.id);
            const isHighlighted = isNodeHighlighted(node);
            const category = CATEGORIES[node.category];

            const hasFocus = connectedNodeIds.size > 0;
            const isDimmed = (hasFocus && !isConnected) || !isHighlighted;

            // Dimensions: core-tesis & sintesis are wider, column cards are 370px
            const cardWidth =
              node.id === 'core-tesis'
                ? '440px'
                : node.id === 'tipologia-barbour'
                ? '400px'
                : node.id === 'sintesis-epistemologica'
                ? '700px'
                : '370px';

            const cardHeight = '92px';

            return (
              <div
                key={node.id}
                onClick={() => onSelectNode(node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: cardWidth,
                  height: cardHeight,
                  opacity: isDimmed ? 0.22 : 1,
                  transform: isHovered || isSelected ? 'scale(1.02)' : 'scale(1)',
                  zIndex: isSelected ? 40 : isHovered ? 30 : node.level === 0 ? 20 : 10,
                }}
                className={`concept-card-static pointer-events-auto absolute transition-all duration-200 cursor-pointer rounded-xl bg-white border shadow-2xs flex flex-col justify-between p-2.5 group select-none ${
                  isSelected
                    ? 'ring-2 ring-stone-900 border-stone-900 shadow-md bg-stone-50'
                    : isHovered
                    ? 'border-stone-500 shadow-sm'
                    : 'border-stone-300 hover:border-stone-400'
                }`}
                title="Haz clic para ver el análisis completo, citas y referencias del ensayo"
              >
                {/* Card Top: Category Pip + Category Label + Level Badge */}
                <div className="flex items-center justify-between text-[10px] leading-none">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <span
                      style={{ color: category.color }}
                      className="font-bold uppercase tracking-wider text-[9px] truncate max-w-[190px]"
                    >
                      {category.name}
                    </span>
                  </div>

                  <span className="text-stone-400 font-mono text-[9px] font-semibold bg-stone-100 px-1.5 py-0.5 rounded">
                    N{node.level}
                  </span>
                </div>

                {/* Concept Main Title */}
                <div className="text-xs font-bold text-stone-900 group-hover:text-stone-950 truncate leading-snug">
                  {node.title}
                </div>

                {/* Subtitle / Key Proposition */}
                <div className="text-[10px] text-stone-500 line-clamp-1 leading-tight">
                  {node.subtitle}
                </div>

                {/* Card Footer: Author reference + Quick Tag */}
                <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[9px] text-stone-400">
                  <span className="font-medium text-stone-600 truncate max-w-[210px]">
                    {node.quote.author}
                  </span>
                  <span className="text-stone-400">
                    p. {node.quote.page}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Zoom & Preset Controls (Bottom-Left) */}
        <div className="absolute left-4 bottom-4 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-stone-200 shadow-md">
          <button
            onClick={() =>
              setTransform((prev) => ({
                ...prev,
                scale: Math.min(prev.scale * 1.2, 1.6),
              }))
            }
            className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="Acercar (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              setTransform((prev) => ({
                ...prev,
                scale: Math.max(prev.scale / 1.2, 0.28),
              }))
            }
            className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="Alejar (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="h-[1px] bg-stone-200 my-0.5" />
          <button
            onClick={fitAll}
            className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="Ajustar mapa completo"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => centerOnCoord(1180, 800, 1.0)}
            className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="Tamaño de lectura 100%"
          >
            <span className="text-[10px] font-bold font-mono">100%</span>
          </button>
        </div>
      </div>
    </div>
  );
};
