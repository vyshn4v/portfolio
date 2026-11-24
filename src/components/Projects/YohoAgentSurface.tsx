import React from 'react';
import { Bot, Network, Search, Sparkles, Radio, Database, Cpu, ArrowRight, Layers } from 'lucide-react';
import type { ArchitectureBlueprint, ArchitectureNode } from '../../data/projects';

interface YohoAgentSurfaceProps {
  data?: ArchitectureBlueprint;
}

const renderNodeIcon = (node: ArchitectureNode) => {
  if (!node.icon) return null;
  switch (node.icon) {
    case 'cpu':
      return <Cpu size={11} color={node.iconColor || 'var(--color-orange)'} />;
    case 'search':
      return <Search size={11} />;
    case 'network':
      return <Network size={11} />;
    case 'database':
      return <Database size={11} />;
    case 'sparkles':
      return <Sparkles size={11} />;
    case 'radio':
      return <Radio size={11} />;
    case 'arrow-right':
      return <ArrowRight size={10} color={node.iconColor || 'var(--color-teal)'} />;
    case 'layers':
      return <Layers size={11} />;
    case 'bot':
      return <Bot size={11} color={node.iconColor || 'var(--color-teal)'} />;
    default:
      return null;
  }
};

export const YohoAgentSurface: React.FC<YohoAgentSurfaceProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="qstack-diagram" aria-label={data.title}>
      <div className="qstack-blueprint-grid" />

      {/* Surface Header */}
      <div className="qstack-diagram-header">
        <div className="qstack-diagram-title">
          <Bot size={15} color="var(--color-teal)" />
          <span>{data.title}</span>
        </div>
        <div className="layer-badge" style={{ backgroundColor: 'rgba(47, 105, 100, 0.4)', color: '#A7F3D0' }}>
          {data.badge}
        </div>
      </div>

      {/* Dynamic Architecture Layers */}
      <div className="qstack-arch-layers">
        {data.layers.map((layer) => (
          <div
            key={layer.step}
            className="arch-layer-card"
            style={layer.borderColor ? { borderColor: layer.borderColor } : undefined}
          >
            <div className="arch-layer-header">
              <span className="layer-name" style={layer.nameColor ? { color: layer.nameColor } : undefined}>
                {layer.name}
              </span>
              <span
                className="layer-badge"
                style={{
                  backgroundColor: layer.badgeBg || 'rgba(215, 114, 12, 0.2)',
                  color: layer.badgeColor || 'var(--color-orange-warm)',
                }}
              >
                {layer.badge}
              </span>
            </div>
            <div className="layer-nodes-grid">
              {layer.nodes.map((node, nIdx) => (
                <span
                  key={nIdx}
                  className={`arch-node-chip ${node.highlight ? 'node-chip-highlight' : ''}`}
                  style={
                    node.highlight && layer.nameColor
                      ? { borderColor: layer.nameColor, color: layer.nameColor }
                      : undefined
                  }
                >
                  {renderNodeIcon(node)}
                  <span>{node.label}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Telemetry Footer */}
      <div className="qstack-diagram-footer">
        <span>{data.telemetry.stateLabel}</span>
        <span>{data.telemetry.metricsLabel}</span>
      </div>
    </div>
  );
};
