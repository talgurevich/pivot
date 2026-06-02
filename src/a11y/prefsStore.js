// Pub-sub preferences store consumed via useSyncExternalStore.
// Persists to localStorage under a versioned key. Schema bumps invalidate
// stored state. The CLASS_RULES table is the single source of truth for
// which CSS classes are applied to <html> — used by both runtime apply()
// and the FOUC bootstrap script in index.html.

const STORAGE_KEY = 'pivot_a11y_prefs_v1';
const SCHEMA_VERSION = 1;

const DEFAULT_PREFS = Object.freeze({
  version: SCHEMA_VERSION,
  links: false,
  contrast: 'off', // off | high | invert | mono
  textSize: 100,   // 100 | 115 | 130 | 150
  lineSpacing: 'normal', // normal | wide | wider
  readableFont: false,
  highlightHeadings: false,
  blackCursor: false,
  largeCursor: false,
  reduceMotion: false,
});

// [className, predicate(p), bootstrap-js-expression]
// The third column is JS source for the inline bootstrap. Generated below.
export const CLASS_RULES = [
  ['a11y-links',                  (p) => p.links,                          'p.links'],
  ['a11y-contrast-high',          (p) => p.contrast === 'high',            "p.contrast==='high'"],
  ['a11y-contrast-invert',        (p) => p.contrast === 'invert',          "p.contrast==='invert'"],
  ['a11y-contrast-mono',          (p) => p.contrast === 'mono',            "p.contrast==='mono'"],
  ['a11y-text-115',               (p) => p.textSize === 115,               'p.textSize===115'],
  ['a11y-text-130',               (p) => p.textSize === 130,               'p.textSize===130'],
  ['a11y-text-150',               (p) => p.textSize === 150,               'p.textSize===150'],
  ['a11y-lines-16',               (p) => p.lineSpacing === 'wide',         "p.lineSpacing==='wide'"],
  ['a11y-lines-20',               (p) => p.lineSpacing === 'wider',        "p.lineSpacing==='wider'"],
  ['a11y-readable-font',          (p) => p.readableFont,                   'p.readableFont'],
  ['a11y-highlight-headings',     (p) => p.highlightHeadings,              'p.highlightHeadings'],
  ['a11y-cursor-black',           (p) => p.blackCursor,                    'p.blackCursor'],
  ['a11y-cursor-large',           (p) => p.largeCursor,                    'p.largeCursor'],
  ['a11y-reduce-motion',          (p) => p.reduceMotion,                   'p.reduceMotion'],
];

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== SCHEMA_VERSION) return null;
    return { ...DEFAULT_PREFS, ...parsed };
  } catch {
    return null;
  }
}

function writeStored(prefs) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch {}
}

let snapshot = (typeof window !== 'undefined' && readStored()) || DEFAULT_PREFS;
const listeners = new Set();

function notify() {
  for (const l of listeners) l();
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() { return snapshot; }
export function getServerSnapshot() { return DEFAULT_PREFS; }

export function setPrefs(partial) {
  snapshot = { ...snapshot, ...partial, version: SCHEMA_VERSION };
  writeStored(snapshot);
  applyPrefsToElement(typeof document !== 'undefined' ? document.documentElement : null);
  notify();
}

export function resetPrefs() {
  snapshot = { ...DEFAULT_PREFS };
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  applyPrefsToElement(typeof document !== 'undefined' ? document.documentElement : null);
  notify();
}

export function applyPrefsToElement(el) {
  if (!el) return;
  const p = snapshot;
  const c = el.classList;
  for (const [cls, pred] of CLASS_RULES) {
    c.toggle(cls, pred(p));
  }
}

// Bootstrap script source — runs before React hydrates to avoid FOUC.
// Generated from CLASS_RULES so runtime and bootstrap can't drift.
export const A11Y_BOOTSTRAP_SCRIPT =
  "(function(){try{var raw=localStorage.getItem(" + JSON.stringify(STORAGE_KEY) + ");" +
  "if(!raw)return;var p=JSON.parse(raw);if(!p||p.version!==" + SCHEMA_VERSION + ")return;" +
  "var c=document.documentElement.classList;" +
  CLASS_RULES.map(([cls, , js]) => "c.toggle(" + JSON.stringify(cls) + "," + js + ")").join(";") +
  ";}catch(e){}})()";
