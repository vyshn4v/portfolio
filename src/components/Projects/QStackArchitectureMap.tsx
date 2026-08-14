import React from 'react';
import { Cpu, Search, Sparkles, Database, Shield, Bell, Network } from 'lucide-react';

export const QStackArchitectureMap: React.FC = () => {
  return (
    <div className="qstack-diagram" aria-label="QStack Modular Architecture & Retrieval Map">
      <div className="qstack-blueprint-grid" />

      {/* Diagram Header */}
      <div className="qstack-diagram-header">
        <div className="qstack-diagram-title">
          <Cpu size={14} />
          <span>QSTACK // CLEAN ARCHITECTURE MAP</span>
        </div>
        <div className="layer-badge" style={{ backgroundColor: 'rgba(47, 105, 100, 0.3)', color: '#8EAAA4' }}>
          MODULAR MONOLITH + RAG
        </div>
      </div>

      {/* Architecture Layers */}
      <div className="qstack-arch-layers">
        {/* Layer 1: Client, Ingestion & Auth Guard */}
        <div className="arch-layer-card">
          <div className="arch-layer-header">
            <span className="layer-name">01. INGESTION &amp; ACCESS CONTROL</span>
            <span className="layer-badge">CLIENT &amp; API GATE</span>
          </div>
          <div className="layer-nodes-grid">
            <span className="arch-node-chip">
              <Shield size={11} color="var(--color-orange)" />
              <span>OAuth2 (Google/GitHub)</span>
            </span>
            <span className="arch-node-chip">
              <span>RBAC Role Guard</span>
            </span>
            <span className="arch-node-chip">
              <span>OWASP Rate Limiting</span>
            </span>
            <span className="arch-node-chip">
              <span>React Client SPA</span>
            </span>
          </div>
        </div>

        {/* Layer 2: NestJS Core Domain Modules */}
        <div className="arch-layer-card">
          <div className="arch-layer-header">
            <span className="layer-name">02. DOMAIN BUSINESS LOGIC (NESTJS)</span>
            <span className="layer-badge">CORE SERVICES</span>
          </div>
          <div className="layer-nodes-grid">
            <span className="arch-node-chip">
              <span>Questions &amp; Answers CRUD</span>
            </span>
            <span className="arch-node-chip">
              <span>Hierarchical Tag Engine</span>
            </span>
            <span className="arch-node-chip">
              <span>Weighted Voting &amp; Comments</span>
            </span>
            <span className="arch-node-chip">
              <Sparkles size={11} color="var(--color-orange-warm)" />
              <span>Reputation &amp; Badge Rewards</span>
            </span>
          </div>
        </div>

        {/* Layer 3: Semantic Search & Gemini RAG Pipeline */}
        <div className="arch-layer-card" style={{ borderColor: 'rgba(215, 114, 12, 0.4)' }}>
          <div className="arch-layer-header">
            <span className="layer-name" style={{ color: 'var(--color-orange-warm)' }}>
              03. SEMANTIC SEARCH &amp; /ask RAG RETRIEVAL
            </span>
            <span className="layer-badge" style={{ backgroundColor: 'rgba(215, 114, 12, 0.25)', color: 'var(--color-orange-warm)' }}>
              AI PIPELINE
            </span>
          </div>
          <div className="layer-nodes-grid">
            <span className="arch-node-chip node-chip-highlight">
              <Search size={11} />
              <span>Vector Similarity Search</span>
            </span>
            <span className="arch-node-chip node-chip-highlight">
              <Network size={11} />
              <span>Q&amp;A Context Embeddings</span>
            </span>
            <span className="arch-node-chip node-chip-highlight">
              <Sparkles size={11} />
              <span>Gemini AI RAG Generator</span>
            </span>
          </div>
        </div>

        {/* Layer 4: Event Bus & High-Speed Persistence */}
        <div className="arch-layer-card">
          <div className="arch-layer-header">
            <span className="layer-name">04. EVENT BUS &amp; PERSISTENCE</span>
            <span className="layer-badge">DATA FABRIC</span>
          </div>
          <div className="layer-nodes-grid">
            <span className="arch-node-chip">
              <Bell size={11} color="var(--color-orange)" />
              <span>RabbitMQ Real-Time Notifications</span>
            </span>
            <span className="arch-node-chip">
              <Database size={11} color="var(--color-green)" />
              <span>PostgreSQL (Raw SQL Optimizer)</span>
            </span>
            <span className="arch-node-chip">
              <span>Redis Caching &amp; Session Store</span>
            </span>
          </div>
        </div>
      </div>

      {/* Diagram Footer */}
      <div className="qstack-diagram-footer">
        <span>INFRA: DOCKER · KUBERNETES DEPLOYMENT</span>
        <span>STATUS: IN-DEVELOPMENT</span>
      </div>
    </div>
  );
};
