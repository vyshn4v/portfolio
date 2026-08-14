import React from 'react';
import { ShieldCheck, Lock, Server, Radio, Database } from 'lucide-react';

export const DomainScannerSurface: React.FC = () => {
  return (
    <div className="domain-surface" aria-label="Domain Scanner Mini Product Surface">
      {/* Window Title Bar */}
      <div className="surface-window-bar">
        <div className="window-dots">
          <span className="window-dot red" />
          <span className="window-dot yellow" />
          <span className="window-dot green" />
        </div>

        <div className="surface-url-bar" title="https://domainscanner.vyshnavpc.com/scan">
          <Lock size={12} className="surface-url-icon" />
          <span>domainscanner.vyshnavpc.com/scan</span>
        </div>

        <div className="pipeline-tag" style={{ color: 'var(--color-teal-dark)', fontWeight: 600 }}>
          <span className="pipeline-dot" style={{ backgroundColor: '#61C454' }} />
          <span>ONLINE</span>
        </div>
      </div>

      {/* Audit Target & Risk Score */}
      <div className="surface-audit-header">
        <div className="audit-target-info">
          <span className="target-host">target-domain.com</span>
          <span className="audit-timestamp">SSL/TLS · PORT SCAN · DNSSEC · HEADERS</span>
        </div>

        <div className="score-badge" title="Security Risk Score">
          <ShieldCheck size={16} />
          <span className="score-num">94</span>
          <span className="score-total">/100</span>
        </div>
      </div>

      {/* Security Check Grid */}
      <div className="surface-checks-grid">
        <div className="surface-check-card">
          <div className="check-card-header">
            <span>SSL / TLS ENCRYPTION</span>
            <span className="check-status-pill">PASSED</span>
          </div>
          <span className="check-card-detail">TLS 1.3 Active · 2048-bit RSA · HSTS Strict</span>
        </div>

        <div className="surface-check-card">
          <div className="check-card-header">
            <span>EXPOSED PORT SCAN</span>
            <span className="check-status-pill">SECURED</span>
          </div>
          <span className="check-card-detail">Ports 80, 443 Open · 0 Vulnerable Endpoints</span>
        </div>

        <div className="surface-check-card">
          <div className="check-card-header">
            <span>DNS &amp; EMAIL AUTH</span>
            <span className="check-status-pill">VERIFIED</span>
          </div>
          <span className="check-card-detail">SPF Valid · DKIM Configured · DMARC Enforced</span>
        </div>

        <div className="surface-check-card">
          <div className="check-card-header">
            <span>HTTP SECURITY HEADERS</span>
            <span className="check-status-pill">A+ RATING</span>
          </div>
          <span className="check-card-detail">CSP · X-Content-Type-Options · Referrer-Policy</span>
        </div>
      </div>

      {/* Asynchronous Pipeline & Cloud Telemetry */}
      <div className="surface-pipeline-bar">
        <div className="pipeline-tag">
          <Radio size={12} color="var(--color-orange)" />
          <span>RabbitMQ Async: 0.14ms</span>
        </div>

        <div className="pipeline-tag">
          <Database size={12} color="var(--color-teal)" />
          <span>Redis Cache: HIT</span>
        </div>

        <div className="pipeline-tag">
          <Server size={12} color="var(--color-ink-muted)" />
          <span>Oracle Cloud · Docker</span>
        </div>
      </div>
    </div>
  );
};
