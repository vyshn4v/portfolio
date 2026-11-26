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

describe('AIChat launcher button square styling & accessibility', () => {
  const chatCss = readProjectFile('src/components/AIChat/AIChat.css');
  const chatTsx = readProjectFile('src/components/AIChat/AIChat.tsx');

  it('uses equal square dimensions (>= 44px touch target) and non-circular border-radius', () => {
    const btnRule = getCssRuleBody(chatCss, '.ai-chat-launcher-btn');

    assert.match(btnRule, /width:\s*54px;/, 'Launcher button should have 54px width');
    assert.match(btnRule, /height:\s*54px;/, 'Launcher button should have 54px height');
    assert.match(btnRule, /min-inline-size:\s*54px;/, 'Launcher button should enforce >= 44px min-inline-size');
    assert.match(btnRule, /min-block-size:\s*54px;/, 'Launcher button should enforce >= 44px min-block-size');

    assert.match(btnRule, /--launcher-radius:\s*[0-8]px;/, 'Launcher token should define crisp square corners');
    assert.match(btnRule, /border-radius:\s*var\(--launcher-radius\);/, 'Launcher button should consume --launcher-radius');
    assert.doesNotMatch(btnRule, /border-radius:\s*(50%|999px)/, 'Launcher button must not be circular or pill-shaped');
  });

  it('derives inner image wrapper and image radii concentrically instead of using 50%', () => {
    const wrapRule = getCssRuleBody(chatCss, '.launcher-yoho-wrap');
    const imgRule = getCssRuleBody(chatCss, '.yoho-chat-btn-img');

    assert.doesNotMatch(wrapRule, /border-radius:\s*50%/, 'Wrapper must not clip to a circle');
    assert.doesNotMatch(imgRule, /border-radius:\s*50%/, 'Image must not clip to a circle');
    assert.match(imgRule, /border-radius:\s*inherit;/, 'Image should inherit the wrapper square radius');
  });

  it('defines clear :focus-visible outline and forced-colors border support', () => {
    const focusRule = getCssRuleBody(chatCss, '.ai-chat-launcher-btn:focus-visible');
    assert.match(focusRule, /outline:\s*2px solid var\(--color-ink\);/);
    assert.match(focusRule, /outline-offset:\s*3px;/);
    assert.match(chatCss, /@media\s*\(forced-colors:\s*active\)[\s\S]*\.ai-chat-launcher-btn[\s\S]*border-color:\s*ButtonText;/);
  });

  it('renders an explicit button type and accessible name without redundant image text', () => {
    const launcherMatch = chatTsx.match(/<motion\.button[\s\S]*?className="ai-chat-launcher-btn"[\s\S]*?<\/motion\.button>/);
    assert.ok(launcherMatch, 'Expected launcher <motion.button> markup to exist in AIChat.tsx');

    const launcherMarkup = launcherMatch[0];
    assert.match(launcherMarkup, /type="button"/, 'Launcher button should explicitly set type="button"');
    assert.match(launcherMarkup, /aria-label="Open Yoho AI Chat"/, 'Launcher button should have an accessible label');
    assert.match(launcherMarkup, /alt=""/, 'Decorative icon image should use empty alt text');
    assert.match(launcherMarkup, /aria-hidden="true"/, 'Decorative elements inside button should be hidden from screen readers');
  });
});
