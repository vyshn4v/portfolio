import React from 'react';
import { Bot, Network, Search, Sparkles, Radio, Database, Cpu, ArrowRight } from 'lucide-react';

export const YohoAgentSurface: React.FC = () => {
  return (
    <div className="qstack-diagram" aria-label="Yoho AI-Agent Multi-Agent RAG Architecture Map">
      <div className="qstack-blueprint-grid" />

      {/* Surface Header */}
      <div className="qstack-diagram-header">
        <div className="qstack-diagram-title">
          <Bot size={15} color="var(--color-teal)" />
          <span>YOHO // MULTI-AGENT STATE MACHINE &amp; RAG PIPELINE</span>
        </div>
        <div className="layer-badge" style={{ backgroundColor: 'rgba(47, 105, 100, 0.3)', color: '#8EAAA4' }}>
          LANGGRAPH.JS + SSE
        </div>
      </div>

      {/* 3-Agent State Machine Workflow */}
      <div className="qstack-arch-layers">
        {/* Node 1: Intent Routing */}
        <div className="arch-layer-card">
          <div className="arch-layer-header">
            <span className="layer-name">01. INTENT CLASSIFICATION AGENT</span>
            <span className="layer-badge">SUPERVISOR ROUTER</span>
          </div>
          <div className="layer-nodes-grid">
            <span className="arch-node-chip">
              <Cpu size={11} color="var(--color-orange)" />
              <span>OpenRouter API</span>
            </span>
            <span className="arch-node-chip">
              <span>Intent Classification Prompt</span>
            </span>
            <span className="arch-node-chip">
              <span>Consultation vs Q&amp;A Branch</span>
            </span>
            <span className="arch-node-chip">
              <ArrowRight size={10} color="var(--color-teal)" />
              <span>Conditional Edge</span>
            </span>
          </div>
        </div>

        {/* Node 2: Vector Search & Retrieval */}
        <div className="arch-layer-card" style={{ borderColor: 'rgba(47, 105, 100, 0.45)' }}>
          <div className="arch-layer-header">
            <span className="layer-name" style={{ color: 'var(--color-teal-light)' }}>
              02. SEMANTIC VECTOR RETRIEVAL AGENT
            </span>
            <span className="layer-badge" style={{ backgroundColor: 'rgba(47, 105, 100, 0.25)', color: 'var(--color-teal-light)' }}>
              PINECONE VECTOR STORE
            </span>
          </div>
          <div className="layer-nodes-grid">
            <span className="arch-node-chip node-chip-highlight" style={{ borderColor: 'var(--color-teal)', color: 'var(--color-teal-light)' }}>
              <Search size={11} />
              <span>1536-dim Embeddings</span>
            </span>
            <span className="arch-node-chip node-chip-highlight" style={{ borderColor: 'var(--color-teal)', color: 'var(--color-teal-light)' }}>
              <Network size={11} />
              <span>Cosine Similarity Top-K</span>
            </span>
            <span className="arch-node-chip node-chip-highlight" style={{ borderColor: 'var(--color-teal)', color: 'var(--color-teal-light)' }}>
              <Database size={11} />
              <span>Profile &amp; Project Knowledge Base</span>
            </span>
          </div>
        </div>

        {/* Node 3: Relevance Validation & RAG Synthesis */}
        <div className="arch-layer-card" style={{ borderColor: 'rgba(215, 114, 12, 0.4)' }}>
          <div className="arch-layer-header">
            <span className="layer-name" style={{ color: 'var(--color-orange-warm)' }}>
              03. RELEVANCE VALIDATION &amp; SYNTHESIS
            </span>
            <span className="layer-badge" style={{ backgroundColor: 'rgba(215, 114, 12, 0.25)', color: 'var(--color-orange-warm)' }}>
              STATE MACHINE GUARD
            </span>
          </div>
          <div className="layer-nodes-grid">
            <span className="arch-node-chip node-chip-highlight">
              <Sparkles size={11} />
              <span>Context Precision Gate</span>
            </span>
            <span className="arch-node-chip node-chip-highlight">
              <Radio size={11} />
              <span>SSE Real-Time Token Streaming</span>
            </span>
            <span className="arch-node-chip node-chip-highlight">
              <span>Hallucination Defense</span>
            </span>
          </div>
        </div>

        {/* Layer 4: Asynchronous Consultation Booking Pipeline */}
        <div className="arch-layer-card">
          <div className="arch-layer-header">
            <span className="layer-name">04. ASYNC BOOKING PIPELINE (BULLMQ + REDIS)</span>
            <span className="layer-badge">DECOUPLED QUEUE</span>
          </div>
          <div className="layer-nodes-grid">
            <span className="arch-node-chip">
              <span>BullMQ Background Job</span>
            </span>
            <span className="arch-node-chip">
              <span>OTP Email Dispatch via Redis</span>
            </span>
            <span className="arch-node-chip">
              <span>Non-Blocking State Handshake</span>
            </span>
          </div>
        </div>
      </div>

      {/* Surface Telemetry Footer */}
      <div className="qstack-diagram-footer">
        <span>STATE MACHINE: 3 AGENTS CONNECTED</span>
        <span>STREAMING: SSE · LATENCY &lt; 280ms</span>
      </div>
    </div>
  );
};
