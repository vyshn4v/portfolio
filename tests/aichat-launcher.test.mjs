import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Helper to safely read a repository file with descriptive error handling.
 */
function readProjectFile(relativePath) {
  try {
    const absolutePath = resolve(process.cwd(), relativePath);
    return readFileSync(absolutePath, 'utf8');
  } catch (error) {
    throw new Error(`Unable to read "${relativePath}": ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Extracts a single CSS rule body by selector prefix for straightforward assertions.
 */
function getCssRuleBody(cssText, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`^${escapedSelector}\\s*\\{([^}]*)\\}`, 'm');
  const match = cssText.match(pattern);
  assert.ok(match, `Expected top-level CSS rule for "${selector}" to exist`);
  return match[1];
}

describe('AIChat unified rounded-corner launcher button & expansion morph', () => {
  const chatCss = readProjectFile('src/components/AIChat/AIChat.css');
  const chatTsx = readProjectFile('src/components/AIChat/AIChat.tsx');

  it('uses shared rounded corners across button, chat window, and inner components', () => {
    const rootRule = getCssRuleBody(chatCss, '.ai-chat-root');
    const btnRule = getCssRuleBody(chatCss, '.ai-chat-launcher-btn');
    const windowRule = getCssRuleBody(chatCss, '.ai-chat-window');
    const headerRule = getCssRuleBody(chatCss, '.chat-header');
    const backdropRule = getCssRuleBody(chatCss, '.ai-chat-backdrop');
    const stageBgRule = getCssRuleBody(chatCss, '.chat-messages-stage::before');
    const messagesRule = getCssRuleBody(chatCss, '.chat-messages-container');
    const bubbleRule = getCssRuleBody(chatCss, '.msg-bubble');
    const inputBoxRule = getCssRuleBody(chatCss, '.chat-input-box');
    const sendBtnRule = getCssRuleBody(chatCss, '.chat-send-btn');

    assert.match(rootRule, /--chat-corner-radius:\s*12px;/, 'Shared token should define 12px corner radius');
    assert.match(rootRule, /--chat-inner-radius:\s*10px;/, 'Shared inner token should define 10px corner radius');
    assert.match(rootRule, /--chat-control-radius:\s*8px;/, 'Shared control token should define 8px corner radius');
    assert.match(rootRule, /--chat-accent-border:\s*2px solid var\(--color-orange\);/, 'Shared accent border should match button');

    assert.match(btnRule, /min-inline-size:\s*48px;/, 'Launcher button should enforce >= 44px min-inline-size');
    assert.match(btnRule, /min-block-size:\s*48px;/, 'Launcher button should enforce >= 44px min-block-size');
    assert.match(btnRule, /border:\s*var\(--chat-accent-border\);/, 'Launcher button should use shared accent border');
    assert.match(windowRule, /border:\s*var\(--chat-accent-border\);/, 'Chat window should share button accent border');
    assert.match(headerRule, /background:\s*var\(--color-ink\);/, 'Chat header should match button background');
    assert.match(headerRule, /border-bottom:\s*var\(--chat-accent-border\);/, 'Chat header should share button orange border');

    assert.match(btnRule, /border-radius:\s*var\(--chat-corner-radius\);/, 'Launcher button should use shared --chat-corner-radius');
    assert.match(windowRule, /border-radius:\s*var\(--chat-corner-radius\);/, 'Chat window should use shared --chat-corner-radius');
    assert.match(stageBgRule, /background-image:\s*url\('\/yoho-chat-bg\.png'\);/, 'Chat background stage should provide PNG fallback');
    assert.match(stageBgRule, /image-set\(/, 'Chat background stage should provide resolution/format optimized image-set');
    assert.match(stageBgRule, /opacity:\s*0\.6;/, 'Yoho background watermark should be clearly visible');
    assert.match(backdropRule, /overflow:\s*hidden;/, 'Backdrop must establish a scroll container');
    assert.match(backdropRule, /overscroll-behavior:\s*contain;/, 'Backdrop must contain background scroll');
    assert.match(messagesRule, /overscroll-behavior:\s*contain;/, 'Messages container must prevent scroll chaining');
    assert.doesNotMatch(chatTsx, /document\.(body|documentElement)\.style\.overflow/, 'Must not mutate html/body overflow to lock scroll');
    assert.doesNotMatch(chatTsx, /yoho-mainframe-banner/, 'Foreground mainframe banner should be replaced by background stage');
    assert.match(bubbleRule, /border-radius:\s*var\(--chat-inner-radius\);/, 'Message bubbles should use tightened inner radius');
    assert.match(inputBoxRule, /border-radius:\s*var\(--chat-inner-radius\);/, 'Input box should use tightened inner radius');
    assert.match(sendBtnRule, /border-radius:\s*var\(--chat-control-radius\);/, 'Send button should use tightened control radius');
    assert.match(btnRule, /corner-shape:\s*squircle;/, 'Launcher button should enhance corners with squircle');
    assert.match(windowRule, /corner-shape:\s*squircle;/, 'Chat window should match button corner-shape');
    assert.doesNotMatch(btnRule, /border-radius:\s*(50%|999px)/, 'Launcher button must not be circular or pill-shaped');
    assert.match(chatTsx, /const CHAT_CORNER_RADIUS = 12;/, 'AIChat.tsx should define shared CHAT_CORNER_RADIUS = 12');
  });

  it('defines clear :focus-visible outline and forced-colors border support', () => {
    const focusRule = getCssRuleBody(chatCss, '.ai-chat-launcher-btn:focus-visible');
    assert.match(focusRule, /outline:\s*2px solid var\(--color-ink\);/);
    assert.match(focusRule, /outline-offset:\s*3px;/);
    assert.match(chatCss, /@media\s*\(forced-colors:\s*active\)[\s\S]*\.ai-chat-window[\s\S]*border-color:\s*ButtonText;/);
  });

  it('aligns inner widget cards and badges with reduced chat radii', () => {
    const otpCss = readProjectFile('src/components/AIChat/OtpWidget.css');
    const formCss = readProjectFile('src/components/AIChat/ScheduleFormWidget.css');

    assert.match(getCssRuleBody(otpCss, '.otp-widget-card'), /border-radius:\s*var\(--chat-inner-radius,\s*10px\);/);
    assert.match(getCssRuleBody(formCss, '.schedule-form-card'), /border-radius:\s*var\(--chat-inner-radius,\s*10px\);/);
    assert.match(getCssRuleBody(otpCss, '.otp-submitted-badge'), /border-radius:\s*6px;/);
    assert.match(getCssRuleBody(formCss, '.schedule-submitted-badge'), /border-radius:\s*6px;/);
  });

  it('places both Meet Yoho text and icon inside a single accessible button', () => {
    assert.doesNotMatch(chatTsx, /ai-chat-launcher-hint/, 'Separate non-interactive hint pill should be removed');

    const launcherMatch = chatTsx.match(/<motion\.button[\s\S]*?className="ai-chat-launcher-btn"[\s\S]*?<\/motion\.button>/);
    assert.ok(launcherMatch, 'Expected launcher <motion.button> markup to exist in AIChat.tsx');

    const launcherMarkup = launcherMatch[0];
    assert.match(launcherMarkup, /type="button"/, 'Launcher button should explicitly set type="button"');
    assert.match(
      launcherMarkup,
      /aria-label="Meet Yoho — Open AI Chat"/,
      'Accessible name must start with the visible text "Meet Yoho" (WCAG 2.5.3)'
    );
    assert.match(launcherMarkup, /<span className="ai-chat-launcher-label">Meet Yoho<\/span>/, 'Visible "Meet Yoho" label must be inside the button');
    assert.match(launcherMarkup, /<img[\s\S]*?className="yoho-chat-btn-img"/, 'Yoho icon image must be inside the button');
    assert.match(launcherMarkup, /alt=""/, 'Decorative icon image should use empty alt text');
  });

  it('morphs directly from button to chat window via shared layoutId without blocking exit delay', () => {
    assert.doesNotMatch(chatTsx, /<AnimatePresence\s+mode="wait">/, 'Must not block chat opening with AnimatePresence mode="wait"');
    assert.match(chatTsx, /<LayoutGroup\s+id="yoho-chat-morph">/, 'Should wrap toggle in LayoutGroup for shared morph');
    const layoutIdMatches = chatTsx.match(/layoutId=\{prefersReducedMotion \? undefined : 'yoho-chat-surface'\}/g) || [];
    assert.equal(layoutIdMatches.length, 2, 'Both launcher button and chat window should share the same layoutId');
    assert.match(chatTsx, /layoutDependency=\{isOpen\}/, 'Should scope layout projection to isOpen changes so drag/resize stay unaffected');
    assert.match(chatTsx, /useReducedMotion\(\)/, 'Should respect OS prefers-reduced-motion');
    assert.match(chatTsx, /e\.key === 'Escape'/, 'Should dismiss open dialog on Escape');
  });

  it('prevents duplicate bot avatars and pre-text empty bubbles across SSE, fallback, and restore flows', () => {
    assert.doesNotMatch(chatTsx, /typing-bubble/, 'Duplicate typing indicator fallback row should be removed');
    assert.doesNotMatch(chatCss, /\.typing-bubble\s*\{/, 'Dead typing indicator CSS should be cleaned up');
    assert.match(chatTsx, /hasBubblePayload/, 'Should share hasBubblePayload guard for visible message content');
    assert.match(chatTsx, /msg\.text\.trim\(\)\.length > 0/, 'Should require non-whitespace text before rendering an assistant bubble');
    assert.match(chatTsx, /sanitizeRestoredMessages/, 'Should sanitize restored sessionStorage messages on load');
    assert.match(chatTsx, /delay:\s*0\b/, 'Chat window contents should reveal without an empty-box delay');
  });

  it('provides an interactive Yoho profile bento card on header avatar hover/focus/tap', () => {
    const profileTsx = readProjectFile('src/components/AIChat/YohoProfileCard.tsx');
    const profileCss = readProjectFile('src/components/AIChat/YohoProfileCard.css');

    assert.match(
      chatTsx,
      /<YohoAvatarProfileCard[\s\S]*?avatarSrc=\{YOHO_ICON_SRC\}[\s\S]*?onSelectAction=/,
      'AIChat header should mount YohoAvatarProfileCard with interactive action callback'
    );
    assert.match(profileTsx, /aria-label="Yoho AI profile card"/, 'Trigger button should declare accessible label');
    assert.match(profileTsx, /aria-expanded=\{isOpen\}/, 'Trigger should expose aria-expanded state');
    assert.match(profileTsx, /role="region"/, 'Interactive card with starter action buttons should use region role');
    assert.match(profileTsx, /popover=\{supportsPopover/, 'Profile card should use native Popover API when supported');
    assert.match(profileTsx, /popoverTarget=\{supportsPopover/, 'Trigger should declare popoverTarget to preserve click-after-hover persistence');
    assert.match(profileTsx, /<strong className="yoho-profile-name">Yoho<\/strong>/, 'Profile card should display Yoho name');
    assert.match(profileTsx, /yoho-chat-bg\.avif/, 'Character spotlight should showcase high-res transparent Yoho mascot');
    assert.match(profileTsx, /yoho-profile-bento-grid/, 'Profile traits should use expressive Bento grid tiles');
    assert.match(profileTsx, />Work<[\s\S]*?>Availability<[\s\S]*?>Nature<[\s\S]*Friendly/i, 'Bento tiles should display Work, Availability, and Friendly nature');
    assert.match(profileTsx, /label:\s*'Knowledge'/, 'Profile card should provide interactive Knowledge starter action');
    assert.match(profileTsx, /label:\s*'Scheduling'/, 'Profile card should provide interactive Scheduling starter action');
    assert.match(profileCss, /color-mix\(in oklab,/, 'Card surface tints should mix cleanly in oklab');
    assert.match(profileCss, /filter:\s*drop-shadow\(/, 'Transparent Yoho artwork should use drop-shadow depth');
    assert.match(profileCss, /@supports \(position-area:\s*block-end\) and \(anchor-name:\s*--yoho-avatar-anchor\)/, 'Card CSS should progressively enhance with CSS Anchor Positioning');
    assert.match(profileCss, /@starting-style/, 'Card CSS should animate entry cleanly with @starting-style');
    assert.match(profileCss, /@media \(prefers-reduced-motion:\s*no-preference\)/, 'Card transitions should respect prefers-reduced-motion');
    assert.match(profileCss, /@media \(forced-colors:\s*active\)/, 'Card CSS should support forced-colors mode');
  });
});
