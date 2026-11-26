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
  const pattern = new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`, 'm');
  const match = cssText.match(pattern);
  assert.ok(match, `Expected CSS rule for "${selector}" to exist`);
  return match[1];
}

describe('AIChat unified rounded-corner launcher button & expansion morph', () => {
  const chatCss = readProjectFile('src/components/AIChat/AIChat.css');
  const chatTsx = readProjectFile('src/components/AIChat/AIChat.tsx');

  it('uses shared rounded corners across button and chat window plus accessible touch target minimums (>= 44px)', () => {
    const rootRule = getCssRuleBody(chatCss, '.ai-chat-root');
    const btnRule = getCssRuleBody(chatCss, '.ai-chat-launcher-btn');
    const windowRule = getCssRuleBody(chatCss, '.ai-chat-window');

    assert.match(rootRule, /--chat-corner-radius:\s*12px;/, 'Shared token should define 12px corner radius');
    assert.match(btnRule, /min-inline-size:\s*48px;/, 'Launcher button should enforce >= 44px min-inline-size');
    assert.match(btnRule, /min-block-size:\s*48px;/, 'Launcher button should enforce >= 44px min-block-size');
    assert.match(btnRule, /border-radius:\s*var\(--chat-corner-radius\);/, 'Launcher button should use shared --chat-corner-radius');
    assert.match(windowRule, /border-radius:\s*var\(--chat-corner-radius\);/, 'Chat window should use shared --chat-corner-radius');
    assert.match(btnRule, /corner-shape:\s*squircle;/, 'Launcher button should enhance corners with squircle');
    assert.match(windowRule, /corner-shape:\s*squircle;/, 'Chat window should match button corner-shape');
    assert.doesNotMatch(btnRule, /border-radius:\s*(50%|999px)/, 'Launcher button must not be circular or pill-shaped');
    assert.match(chatTsx, /const CHAT_CORNER_RADIUS = 12;/, 'AIChat.tsx should define shared CHAT_CORNER_RADIUS = 12');
  });

  it('defines clear :focus-visible outline and forced-colors border support', () => {
    const focusRule = getCssRuleBody(chatCss, '.ai-chat-launcher-btn:focus-visible');
    assert.match(focusRule, /outline:\s*2px solid var\(--color-ink\);/);
    assert.match(focusRule, /outline-offset:\s*3px;/);
    assert.match(chatCss, /@media\s*\(forced-colors:\s*active\)[\s\S]*\.ai-chat-launcher-btn[\s\S]*border-color:\s*ButtonText;/);
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
});
