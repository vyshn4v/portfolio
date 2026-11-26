import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Calendar,
  Cpu,
  Layers,
  Smile,
  Sparkles,
  Zap,
} from 'lucide-react';
import './YohoProfileCard.css';

interface YohoAvatarProfileCardProps {
  avatarSrc: string;
  isChatOpen: boolean;
  onSelectAction?: (prompt: string) => void;
  isActionDisabled?: boolean;
}

interface CapabilityAction {
  id: string;
  label: string;
  prompt: string;
  Icon: React.FC<{ size?: number; strokeWidth?: number }>;
}

const YOHO_CAPABILITY_ACTIONS: readonly CapabilityAction[] = [
  {
    id: 'knowledge',
    label: 'Knowledge',
    prompt: 'What did Vyshnav build at Neutrinos?',
    Icon: BookOpen,
  },
  {
    id: 'scheduling',
    label: 'Scheduling',
    prompt: 'Schedule a technical consultation with Vyshnav',
    Icon: Calendar,
  },
  {
    id: 'architecture',
    label: 'Architecture',
    prompt: 'How was Yoho AI-Agent architected?',
    Icon: Cpu,
  },
  {
    id: 'stack',
    label: 'Tech Stack',
    prompt: 'Tell me about the Domain Scanner SaaS platform',
    Icon: Layers,
  },
];

const HOVER_CLOSE_DELAY_MS = 160;
const POPOVER_CARD_GAP_PX = 8;

/**
 * Detects whether the browser natively supports Popover API and `popover="hint"`.
 */
function getPopoverCapabilities() {
  if (typeof document === 'undefined' || typeof HTMLElement === 'undefined') {
    return { supportsPopover: false, supportsHint: false };
  }

  const supportsPopover = 'showPopover' in HTMLElement.prototype;
  if (!supportsPopover) {
    return { supportsPopover: false, supportsHint: false };
  }

  const probe = document.createElement('div');
  probe.setAttribute('popover', 'hint');
  return {
    supportsPopover: true,
    supportsHint: probe.popover === 'hint',
  };
}

/**
 * Renders the interactive chat-header avatar button and a hovered/focused
 * editorial Bento character card with live status, traits, and clickable starter actions.
 */
export const YohoAvatarProfileCard: React.FC<YohoAvatarProfileCardProps> = ({
  avatarSrc,
  isChatOpen,
  onSelectAction,
  isActionDisabled = false,
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const lastPointerTypeRef = useRef<string>('mouse');
  const wasOpenOnPointerDownRef = useRef<boolean>(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [fallbackCoords, setFallbackCoords] = useState<{ top: number; left: number } | null>(null);

  const isOpen = isHovered || isFocused || isPinned;

  const cardId = `yoho-profile-card-${useId().replace(/:/g, '')}`;
  const { supportsPopover, supportsHint } = useMemo(getPopoverCapabilities, []);

  const supportsAnchorPosition = useMemo(() => {
    if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
      return false;
    }
    return (
      CSS.supports('position-area', 'block-end') &&
      CSS.supports('anchor-name', '--yoho-avatar-anchor')
    );
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const updateFallbackPosition = useCallback(() => {
    if (supportsAnchorPosition) return;
    const triggerEl = triggerRef.current;
    const cardEl = cardRef.current;
    if (!triggerEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const cardWidth = Math.min(336, window.innerWidth - 24);
    const estimatedHeight = cardEl?.offsetHeight || 320;

    const left = Math.max(
      12,
      Math.min(triggerRect.left, window.innerWidth - cardWidth - 12)
    );

    const spaceBelow = window.innerHeight - triggerRect.bottom - POPOVER_CARD_GAP_PX;
    const shouldPlaceAbove =
      spaceBelow < estimatedHeight + 12 && triggerRect.top > estimatedHeight + 20;
    const top = shouldPlaceAbove
      ? Math.max(12, triggerRect.top - estimatedHeight - POPOVER_CARD_GAP_PX)
      : triggerRect.bottom + POPOVER_CARD_GAP_PX;

    setFallbackCoords({ top: Math.round(top), left: Math.round(left) });
  }, [supportsAnchorPosition]);

  const dismissAll = useCallback(() => {
    clearCloseTimer();
    setIsHovered(false);
    setIsFocused(false);
    setIsPinned(false);
  }, [clearCloseTimer]);

  const scheduleHoverLeave = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsHovered(false);
      closeTimerRef.current = null;
    }, HOVER_CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const handleMouseEnterHoverArea = useCallback(() => {
    clearCloseTimer();
    updateFallbackPosition();
    setIsHovered(true);
  }, [clearCloseTimer, updateFallbackPosition]);

  // Keep native top-layer popover state synchronized with React visibility state
  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl || !supportsPopover) return;

    try {
      const currentlyOpen = cardEl.matches(':popover-open');
      if (isOpen && !currentlyOpen) {
        cardEl.showPopover();
        updateFallbackPosition();
      } else if (!isOpen && currentlyOpen) {
        cardEl.hidePopover();
      }
    } catch {
      // Safely ignore if detached during window exit transition
    }
  }, [isOpen, supportsPopover, updateFallbackPosition]);

  // Sync React state when browser light-dismiss or Escape closes the native popover
  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const handleToggle = (event: Event) => {
      const toggleEvent = event as ToggleEvent;
      if (toggleEvent.newState !== 'open') {
        dismissAll();
      }
    };

    const handleDismissRequest = () => {
      dismissAll();
    };

    if (supportsPopover) {
      cardEl.addEventListener('toggle', handleToggle);
    }
    cardEl.addEventListener('yoho-profile-dismiss', handleDismissRequest);
    return () => {
      if (supportsPopover) {
        cardEl.removeEventListener('toggle', handleToggle);
      }
      cardEl.removeEventListener('yoho-profile-dismiss', handleDismissRequest);
    };
  }, [supportsPopover, dismissAll]);

  // Dismiss on outside pointer clicks / drag start and refresh fallback position on resize
  useEffect(() => {
    if (!isOpen) return;
    const cardEl = cardRef.current;

    const handleOutsidePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (
        target &&
        (triggerRef.current?.contains(target) || cardEl?.contains(target))
      ) {
        return;
      }
      dismissAll();
    };

    const handleViewportUpdate = () => updateFallbackPosition();

    window.addEventListener('pointerdown', handleOutsidePointerDown, true);
    window.addEventListener('resize', handleViewportUpdate);
    return () => {
      window.removeEventListener('pointerdown', handleOutsidePointerDown, true);
      window.removeEventListener('resize', handleViewportUpdate);
    };
  }, [isOpen, dismissAll, updateFallbackPosition]);

  // Reset open state when parent chat closes or on unmount
  useEffect(() => {
    if (!isChatOpen) {
      dismissAll();
    }
    return () => clearCloseTimer();
  }, [isChatOpen, dismissAll, clearCloseTimer]);

  const handleTriggerPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    lastPointerTypeRef.current = e.pointerType || 'mouse';
    wasOpenOnPointerDownRef.current = isOpen;
  };

  const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (lastPointerTypeRef.current === 'touch') {
      if (wasOpenOnPointerDownRef.current) {
        e.preventDefault();
        dismissAll();
      } else {
        updateFallbackPosition();
        setIsPinned(true);
      }
      return;
    }

    if (isPinned) {
      e.preventDefault();
      dismissAll();
    } else {
      updateFallbackPosition();
      setIsPinned(true);
    }
  };

  const handleTriggerFocus = () => {
    clearCloseTimer();
    updateFallbackPosition();
    setIsFocused(true);
  };

  const handleContainerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const nextFocused = e.relatedTarget as Node | null;
    if (
      nextFocused &&
      (triggerRef.current?.contains(nextFocused) || cardRef.current?.contains(nextFocused))
    ) {
      return;
    }
    setIsFocused(false);
  };

  const handleCapabilityClick = (prompt: string) => {
    if (isActionDisabled) return;
    dismissAll();
    onSelectAction?.(prompt);
  };

  const fallbackInlineStyle: React.CSSProperties | undefined =
    !supportsAnchorPosition && fallbackCoords
      ? {
          top: `${fallbackCoords.top}px`,
          left: `${fallbackCoords.left}px`,
          right: 'auto',
          bottom: 'auto',
          inset: 'auto',
          margin: 0,
        }
      : undefined;

  return (
    <div className="yoho-avatar-anchor-group" onBlur={handleContainerBlur}>
      <button
        ref={triggerRef}
        type="button"
        className="agent-avatar-wrap agent-avatar-trigger"
        aria-label="Yoho AI profile card"
        aria-expanded={isOpen}
        aria-controls={cardId}
        popoverTarget={supportsPopover ? cardId : undefined}
        popoverTargetAction={supportsPopover ? 'show' : undefined}
        onPointerDown={handleTriggerPointerDown}
        onMouseEnter={handleMouseEnterHoverArea}
        onMouseLeave={scheduleHoverLeave}
        onFocus={handleTriggerFocus}
        onClick={handleTriggerClick}
      >
        <img
          src={avatarSrc}
          alt=""
          className="yoho-header-avatar"
        />
        <span className="agent-status-indicator" aria-hidden="true" />
      </button>

      <div
        ref={cardRef}
        id={cardId}
        role="region"
        aria-label="Yoho AI agent profile card"
        popover={supportsPopover ? (supportsHint ? 'hint' : 'auto') : undefined}
        data-yoho-profile-card="true"
        data-open={isOpen ? 'true' : 'false'}
        className={`yoho-profile-card${isOpen ? ' is-open' : ''}`}
        style={fallbackInlineStyle}
        onMouseEnter={handleMouseEnterHoverArea}
        onMouseLeave={scheduleHoverLeave}
      >
        {/* Atmospheric Dark Character Showcase Header */}
        <div className="yoho-profile-banner">
          <div className="yoho-profile-banner-top">
            <span className="yoho-profile-serial">AGENT // YOHO-01</span>
            <span className="yoho-profile-live-pill">
              <span className="yoho-profile-live-dot" aria-hidden="true" />
              24/7 Online
            </span>
          </div>

          <div className="yoho-profile-hero-row">
            <div className="yoho-profile-intro">
              <div className="yoho-profile-name-row">
                <strong className="yoho-profile-name">Yoho</strong>
                <span className="yoho-profile-role-pill">AI PARTNER</span>
              </div>
              <p className="yoho-profile-tagline">
                Friendly ghost-coder built to share Vyshnav&apos;s work &amp; book consultations.
              </p>
            </div>

            <div className="yoho-profile-mascot-stage" aria-hidden="true">
              <picture>
                <source srcSet="/yoho-chat-bg.avif 1x, /yoho-chat-bg-2x.avif 2x" type="image/avif" />
                <source srcSet="/yoho-chat-bg.webp 1x, /yoho-chat-bg-2x.webp 2x" type="image/webp" />
                <img
                  src="/yoho-chat-bg.png"
                  srcSet="/yoho-chat-bg.png 1x, /yoho-chat-bg-2x.png 2x"
                  alt=""
                  className="yoho-profile-mascot-art"
                />
              </picture>
            </div>
          </div>
        </div>

        {/* Expressive Bento Trait Tiles */}
        <div className="yoho-profile-body">
          <div className="yoho-profile-bento-grid">
            <div className="yoho-bento-tile">
              <div className="yoho-bento-tile-head">
                <span className="yoho-bento-icon is-ink" aria-hidden="true">
                  <Briefcase size={12} strokeWidth={2.2} />
                </span>
                <span className="yoho-bento-label">Work</span>
              </div>
              <p className="yoho-bento-value">Backend &amp; AI Portfolio Guide</p>
            </div>

            <div className="yoho-bento-tile">
              <div className="yoho-bento-tile-head">
                <span className="yoho-bento-icon is-emerald" aria-hidden="true">
                  <Zap size={12} strokeWidth={2.2} />
                </span>
                <span className="yoho-bento-label">Availability</span>
              </div>
              <p className="yoho-bento-value">24/7 Live · Instant Reply</p>
            </div>

            <div className="yoho-bento-tile is-wide is-nature">
              <div className="yoho-bento-tile-head">
                <span className="yoho-bento-icon is-orange" aria-hidden="true">
                  <Smile size={12} strokeWidth={2.2} />
                </span>
                <span className="yoho-bento-label">Nature</span>
                <span className="yoho-nature-sparkle">
                  <Sparkles size={10} strokeWidth={2.2} />
                  Helpful
                </span>
              </div>
              <p className="yoho-bento-value">
                Friendly, witty &amp; straight-to-the-point engineering clarity
              </p>
            </div>
          </div>

          {/* Clickable Starter Capabilities */}
          <div className="yoho-profile-actions-block">
            <div className="yoho-actions-header">
              <span className="yoho-bento-label">Actions</span>
              <span className="yoho-actions-hint">Click to ask</span>
            </div>
            <div className="yoho-profile-actions-grid">
              {YOHO_CAPABILITY_ACTIONS.map(({ id, label, prompt, Icon }) => (
                <button
                  key={id}
                  type="button"
                  className="yoho-profile-action-btn"
                  disabled={isActionDisabled}
                  onClick={() => handleCapabilityClick(prompt)}
                >
                  <Icon size={12} strokeWidth={2.1} />
                  <span>{label}</span>
                  <ArrowUpRight size={11} strokeWidth={2.2} className="yoho-action-arrow" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
