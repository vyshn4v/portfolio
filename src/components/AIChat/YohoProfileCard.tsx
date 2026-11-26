import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import './YohoProfileCard.css';

interface YohoAvatarProfileCardProps {
  avatarSrc: string;
  isChatOpen: boolean;
}

interface ProfileField {
  label: string;
  value: string;
}

const YOHO_PROFILE_FIELDS: readonly ProfileField[] = [
  { label: 'Work', value: 'Portfolio Q&A, Architecture & Lead Intake' },
  { label: 'Availability', value: '24/7 Online · Instant reply' },
  { label: 'Nature', value: 'Friendly, concise & engineering-focused' },
];

const YOHO_CAPABILITY_ACTIONS: readonly string[] = [
  'Knowledge',
  'Scheduling',
  'Architecture',
  'Consultations',
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
 * editorial profile name card summarizing Yoho's role, availability, nature, and actions.
 */
export const YohoAvatarProfileCard: React.FC<YohoAvatarProfileCardProps> = ({
  avatarSrc,
  isChatOpen,
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
    const cardWidth = Math.min(308, window.innerWidth - 24);
    const estimatedHeight = cardEl?.offsetHeight || 228;

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

  const handleTriggerBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    const nextFocused = e.relatedTarget as Node | null;
    if (nextFocused && cardRef.current?.contains(nextFocused)) {
      return;
    }
    setIsFocused(false);
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
    <div className="yoho-avatar-anchor-group">
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
        onBlur={handleTriggerBlur}
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
        role="tooltip"
        popover={supportsPopover ? (supportsHint ? 'hint' : 'auto') : undefined}
        data-yoho-profile-card="true"
        data-open={isOpen ? 'true' : 'false'}
        className={`yoho-profile-card${isOpen ? ' is-open' : ''}`}
        style={fallbackInlineStyle}
        onMouseEnter={handleMouseEnterHoverArea}
        onMouseLeave={scheduleHoverLeave}
      >
        <div className="yoho-profile-banner">
          <div className="yoho-profile-identity">
            <img
              src={avatarSrc}
              alt=""
              className="yoho-profile-card-avatar"
            />
            <div>
              <div className="yoho-profile-name-row">
                <strong className="yoho-profile-name">Yoho</strong>
                <span className="yoho-profile-role-pill">AI AGENT</span>
              </div>
              <p className="yoho-profile-tagline">Autonomous Portfolio AI</p>
            </div>
          </div>
          <span className="yoho-profile-live-pill">
            <span className="yoho-profile-live-dot" aria-hidden="true" />
            Online
          </span>
        </div>

        <div className="yoho-profile-body">
          <dl className="yoho-profile-meta-list">
            {YOHO_PROFILE_FIELDS.map((field) => (
              <div key={field.label} className="yoho-profile-meta-row">
                <dt className="yoho-profile-meta-label">{field.label}</dt>
                <dd className="yoho-profile-meta-value">{field.value}</dd>
              </div>
            ))}
          </dl>

          <div className="yoho-profile-actions-block">
            <span className="yoho-profile-meta-label">Actions</span>
            <ul className="yoho-profile-actions-list" aria-label="Yoho capabilities">
              {YOHO_CAPABILITY_ACTIONS.map((action) => (
                <li key={action} className="yoho-profile-action-chip">
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
