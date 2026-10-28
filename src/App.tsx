/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { PresentationCover } from './components/PresentationCover';
import { InteractiveGraph } from './components/InteractiveGraph';
import { HierarchicalTree } from './components/HierarchicalTree';
import { GuidedTour } from './components/GuidedTour';
import { ComparativeMatrix } from './components/ComparativeMatrix';
import { NodeDrawer } from './components/NodeDrawer';
import { AboutModal } from './components/AboutModal';
import { CONCEPT_NODES, ConceptNode } from './data/conceptMapData';

export default function App() {
  // First thing presented when entering the page is the presentation cover
  const [showPresentation, setShowPresentation] = useState(true);

  const [currentView, setCurrentView] = useState<'graph' | 'tree' | 'tour' | 'matrix'>('graph');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Lookup the currently selected node
  const selectedNode: ConceptNode | null = selectedNodeId
    ? CONCEPT_NODES.find((n) => n.id === selectedNodeId) || null
    : null;

  const handleSelectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const handleCloseDrawer = () => {
    setSelectedNodeId(null);
  };

  const handleNavigateToGraph = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setCurrentView('graph');
    setShowPresentation(false);
  };

  const handleResetToRoot = () => {
    setSelectedNodeId('core-tesis');
    setCurrentView('graph');
  };

  // If presentation mode is active, display the official presentation cover window first
  if (showPresentation) {
    return (
      <PresentationCover
        onEnterMap={() => {
          setCurrentView('graph');
          setShowPresentation(false);
        }}
        onEnterView={(view) => {
          setCurrentView(view);
          setShowPresentation(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans-clean selection:bg-stone-900 selection:text-white">
      {/* Top Navigation Bar with University Logo and Navigation */}
      <Header
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onResetToRoot={handleResetToRoot}
        onOpenPresentation={() => setShowPresentation(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full relative">
        {currentView === 'graph' && (
          <InteractiveGraph
            selectedNodeId={selectedNodeId}
            onSelectNode={handleSelectNode}
          />
        )}

        {currentView === 'tree' && (
          <HierarchicalTree
            selectedNodeId={selectedNodeId}
            onSelectNode={handleSelectNode}
          />
        )}

        {currentView === 'tour' && (
          <GuidedTour
            onSelectNode={handleSelectNode}
            onNavigateToGraph={handleNavigateToGraph}
          />
        )}

        {currentView === 'matrix' && (
          <ComparativeMatrix
            onSelectModel={handleNavigateToGraph}
          />
        )}
      </main>

      {/* Slide-in Node Details Inspection Drawer */}
      <NodeDrawer
        node={selectedNode}
        onClose={handleCloseDrawer}
        onSelectNode={handleSelectNode}
      />

      {/* Bibliographic Context Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}
