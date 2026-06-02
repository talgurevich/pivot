// Regulation 35 accessibility preferences widget.
// User-controlled comfort tool — toggles CSS classes on <html>.
// Never mutates content DOM, never injects alt text, never rewrites ARIA.

import React from 'react';
import {
  subscribe, getSnapshot, getServerSnapshot,
  setPrefs, resetPrefs, applyPrefsToElement,
} from './prefsStore.js';

const CONTRAST_LABELS = {
  off: 'כבוי',
  high: 'גבוה',
  invert: 'הפוך',
  mono: 'שחור-לבן',
};
const CONTRAST_ORDER = ['off', 'high', 'invert', 'mono'];

const TEXT_SIZE_ORDER = [100, 115, 130, 150];
const LINE_ORDER = ['normal', 'wide', 'wider'];
const LINE_LABELS = { normal: 'רגיל', wide: '1.6', wider: '2.0' };

function nextIn(arr, current) {
  const i = arr.indexOf(current);
  return arr[(i + 1) % arr.length];
}

export function A11yWidget() {
  const prefs = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = React.useState(false);
  const [announce, setAnnounce] = React.useState('');
  const panelRef = React.useRef(null);
  const triggerRef = React.useRef(null);

  // Safety net: re-apply classes after mount in case the FOUC bootstrap
  // was skipped (localStorage blocked, parse error, etc.)
  React.useEffect(() => {
    applyPrefsToElement(document.documentElement);
  }, []);

  // Alt+A keyboard shortcut — uses e.code so it works regardless of
  // keyboard layout. On macOS Alt+A produces "å" via e.key.
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.code === 'KeyA') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Move focus into the panel when it opens, back to trigger on close.
  React.useEffect(() => {
    if (open) {
      const t = setTimeout(() => panelRef.current?.querySelector('button')?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  const updateAndAnnounce = (partial, msg) => {
    setPrefs(partial);
    setAnnounce(msg);
  };

  return (
    <div className="a11y-widget-root">
      {/* Live region OUTSIDE the panel so announcements survive panel close */}
      <div className="a11y-widget-live" role="status" aria-live="polite" aria-atomic="true">
        {announce}
      </div>

      <button
        ref={triggerRef}
        type="button"
        className="a11y-widget-trigger"
        aria-expanded={open}
        aria-controls="a11y-widget-panel"
        aria-keyshortcuts="Alt+A"
        aria-label="פתיחת תפריט נגישות (Alt+A)"
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true">♿</span>
      </button>

      <section
        ref={panelRef}
        id="a11y-widget-panel"
        className="a11y-widget-panel"
        hidden={!open}
        aria-label="העדפות נגישות"
      >
        <header className="a11y-widget-header">
          <h2 className="a11y-widget-title">העדפות נגישות</h2>
          <button
            type="button"
            className="a11y-widget-close"
            aria-label="סגור תפריט נגישות"
            onClick={() => { setOpen(false); triggerRef.current?.focus(); }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="a11y-widget-grid">
          {/* Binary toggles use aria-pressed.
              Cycling toggles omit aria-pressed and embed the value in the label. */}

          <button
            type="button"
            className="a11y-toggle-card"
            aria-pressed={prefs.links}
            onClick={() => updateAndAnnounce(
              { links: !prefs.links },
              !prefs.links ? 'הדגשת קישורים הופעלה' : 'הדגשת קישורים בוטלה'
            )}
          >
            <span>הדגשת קישורים</span>
          </button>

          <button
            type="button"
            className="a11y-toggle-card"
            aria-label={`ניגודיות: ${CONTRAST_LABELS[prefs.contrast]}`}
            onClick={() => {
              const next = nextIn(CONTRAST_ORDER, prefs.contrast);
              updateAndAnnounce({ contrast: next }, `ניגודיות: ${CONTRAST_LABELS[next]}`);
            }}
          >
            <span>ניגודיות</span>
            <span className="a11y-toggle-card-value">{CONTRAST_LABELS[prefs.contrast]}</span>
          </button>

          <button
            type="button"
            className="a11y-toggle-card"
            aria-label={`גודל טקסט: ${prefs.textSize} אחוז`}
            onClick={() => {
              const next = nextIn(TEXT_SIZE_ORDER, prefs.textSize);
              updateAndAnnounce({ textSize: next }, `גודל טקסט: ${next} אחוז`);
            }}
          >
            <span>גודל טקסט</span>
            <span className="a11y-toggle-card-value">{prefs.textSize}%</span>
          </button>

          <button
            type="button"
            className="a11y-toggle-card"
            aria-label={`מרווח שורות: ${LINE_LABELS[prefs.lineSpacing]}`}
            onClick={() => {
              const next = nextIn(LINE_ORDER, prefs.lineSpacing);
              updateAndAnnounce({ lineSpacing: next }, `מרווח שורות: ${LINE_LABELS[next]}`);
            }}
          >
            <span>מרווח שורות</span>
            <span className="a11y-toggle-card-value">{LINE_LABELS[prefs.lineSpacing]}</span>
          </button>

          <button
            type="button"
            className="a11y-toggle-card"
            aria-pressed={prefs.readableFont}
            onClick={() => updateAndAnnounce(
              { readableFont: !prefs.readableFont },
              !prefs.readableFont ? 'גופן קריא הופעל' : 'גופן קריא בוטל'
            )}
          >
            <span>גופן קריא</span>
          </button>

          <button
            type="button"
            className="a11y-toggle-card"
            aria-pressed={prefs.highlightHeadings}
            onClick={() => updateAndAnnounce(
              { highlightHeadings: !prefs.highlightHeadings },
              !prefs.highlightHeadings ? 'הדגשת כותרות הופעלה' : 'הדגשת כותרות בוטלה'
            )}
          >
            <span>הדגשת כותרות</span>
          </button>

          <button
            type="button"
            className="a11y-toggle-card"
            aria-pressed={prefs.blackCursor}
            onClick={() => updateAndAnnounce(
              { blackCursor: !prefs.blackCursor },
              !prefs.blackCursor ? 'סמן שחור הופעל' : 'סמן שחור בוטל'
            )}
          >
            <span>סמן שחור</span>
          </button>

          <button
            type="button"
            className="a11y-toggle-card"
            aria-pressed={prefs.largeCursor}
            onClick={() => updateAndAnnounce(
              { largeCursor: !prefs.largeCursor },
              !prefs.largeCursor ? 'סמן גדול הופעל' : 'סמן גדול בוטל'
            )}
          >
            <span>סמן גדול</span>
          </button>

          <button
            type="button"
            className="a11y-toggle-card"
            aria-pressed={prefs.reduceMotion}
            onClick={() => updateAndAnnounce(
              { reduceMotion: !prefs.reduceMotion },
              !prefs.reduceMotion ? 'עצירת אנימציות הופעלה' : 'עצירת אנימציות בוטלה'
            )}
            style={{ gridColumn: '1 / -1' }}
          >
            <span>עצירת אנימציות</span>
          </button>
        </div>

        <button
          type="button"
          className="a11y-widget-reset"
          onClick={() => { resetPrefs(); setAnnounce('כל ההעדפות אופסו'); }}
        >
          איפוס כל ההעדפות
        </button>

        <a
          className="a11y-widget-footer-link"
          href="./accessibility.html"
        >
          הצהרת נגישות מלאה
        </a>
      </section>
    </div>
  );
}
