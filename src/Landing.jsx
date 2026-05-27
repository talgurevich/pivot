// Landing.jsx — Pivot Level landing page (single responsive page)

import React, { useState as useStateWeb } from 'react';
import {
  Wordmark,
  DashboardOrders,
  VANITY_LOGOS,
  Sticker,
  StickerSparkle,
  StickerIcon,
  LogoWatermark,
  ScrollMarquee,
  LiveTicker,
  CommandPanel,
  HeroBackground,
  useIsMobile,
} from './shared.jsx';

function LandingWeb({ tweaks = {} }) {
  const blue = tweaks.accent || '#1A2BFB';
  const rootRef = React.useRef(null);

  // Scroll-reveal: every section below the hero rises + fades in as it enters view.
  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = Array.from(root.children).slice(1); // skip the hero
    sections.forEach((el) => el.classList.add('pivot-reveal'));
    if (!('IntersectionObserver' in window)) {
      sections.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -14% 0px' });
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pivot" ref={rootRef} style={{ width: '100%', minHeight: '100%' }}>
      <Hero blue={blue} />
      <BrandMarquee />
      <Manifesto />
      <MegaStat />
      <HowItWorks />
      <BentoFeatures />
      <TalkToInventory />
      <Advantages />
      <WhatsAppReviews />
      <InsuranceTagline />
      <Waitlist blue={blue} />
      <Footer />
    </div>
  );
}

// ============================================================
// MANIFESTO — premium typographic poster, atmospheric
// ============================================================
function Manifesto() {
  const isMobile = useIsMobile();
  return (
    <section id="story" style={{
      background: '#fff', color: '#000',
      padding: 'clamp(72px, 10vw, 160px) clamp(20px, 5vw, 80px) clamp(64px, 9vw, 140px)',
      position: 'relative', overflow: 'hidden',
    }}>
      <LogoWatermark corner="bottom-left" />
      {/* Subtle blue glow accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: -200, right: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,43,251,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: -200, left: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,43,251,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        {/* Mini header row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 24,
          marginBottom: 56,
        }}>
          <div className="pivot-eyebrow" style={{ color: '#1A2BFB' }}>שפת המותג · 2026</div>
          <div className="pivot-hairline" style={{ flex: 1 }} />
          <div style={{ fontSize: 12, color: '#8C8C8C', fontFamily: 'Rubik, monospace', letterSpacing: '0.06em' }}>
            01 / 04 · MANIFESTO
          </div>
        </div>

        {/* Hero statement — staggered editorial */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr', gap: isMobile ? 32 : 60, alignItems: 'start', marginBottom: isMobile ? 48 : 80 }}>
          {/* Side column — vertical brand mark (hidden on mobile) */}
          <div style={{
            display: isMobile ? 'none' : 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 32, paddingTop: 24,
            minWidth: 60,
          }}>
            <div className="pivot-vertical-tag" style={{ color: '#8C8C8C' }}>
              PIVOT LEVEL · TLV
            </div>
            <div style={{
              width: 1, height: 80, background: '#000', opacity: 0.2,
            }} />
            <Sticker name="wine" size={78} rotate={-10} />
            <div style={{
              width: 1, height: 80, background: '#000', opacity: 0.2,
            }} />
            <div style={{
              fontFamily: 'Rubik, monospace',
              fontSize: 10, letterSpacing: '0.08em',
              color: '#8C8C8C', writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}>EST. 2024</div>
          </div>

          <div>
            <h2 style={{
              fontFamily: 'Heebo, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(34px, 8vw, 128px)',
              letterSpacing: '-0.045em',
              lineHeight: 0.9,
              margin: 0, marginBottom: 40,
            }}>
              לא עוד אפליקציה.<br/>
              <span style={{ color: '#1A2BFB' }}>שפה.</span>
            </h2>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 40,
            }}>
              {[
                {
                  n: '01',
                  t: 'במקום שעובדים',
                  body: 'WhatsApp הוא לא ערוץ נוסף — הוא העסק. פיבוט יושבת בדיוק שם, מבלי לבקש לעבור.',
                  shot: 'assets/hero-screenshot.jpg',
                  tilt: 0,
                },
                {
                  n: '02',
                  t: 'מערכת חכמה',
                  body: 'אינטליגנציה שמבינה את הקצב של מסעדה — מתי להציע, מתי לשתוק, מתי לקרוא לבעלים.',
                  shot: 'assets/hero-screenshot-3.jpg',
                  tilt: 0,
                },
                {
                  n: '03',
                  t: 'שקט מתועד',
                  body: 'כל הזמנה, כל אישור, כל ספירה — חתומה. בלי תזכורות. בלי חיפושים. בלי טעויות.',
                  shot: 'assets/manifesto-screenshot.jpg',
                  tilt: 0,
                },
              ].map((item, i) => (
                <div key={i} style={{
                  borderTop: '1px solid #000', paddingTop: 20,
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{
                    fontFamily: 'Rubik, monospace',
                    fontSize: 12, fontWeight: 700,
                    color: '#1A2BFB', letterSpacing: '0.08em',
                    marginBottom: 14,
                  }}>{item.n} ·</div>
                  <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.015em', marginBottom: 10 }}>{item.t}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: '#4A4A4A', margin: '0 0 28px' }}>{item.body}</p>
                  {/* Phone-framed screenshot */}
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                      width: '100%', maxWidth: 230,
                      padding: 8,
                      background: 'linear-gradient(180deg, #1c1c1c 0%, #050505 100%)',
                      borderRadius: 36,
                      boxShadow:
                        '0 0 0 1.2px #2a2a2a, 0 30px 70px -20px rgba(0,0,0,0.45),' +
                        ' 0 14px 32px -10px rgba(0,0,0,0.3),' +
                        ' inset 0 1px 0 rgba(255,255,255,0.08)',
                      transform: `rotate(${item.tilt}deg)`,
                      transformOrigin: 'center center',
                    }}>
                      <div style={{
                        background: '#000', borderRadius: 29,
                        overflow: 'hidden', position: 'relative',
                        aspectRatio: '740 / 1600',
                      }}>
                        <img src={item.shot} alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand voice quotes — magazine-style pulled */}
        <div className="pivot-hairline" style={{ margin: '80px 0 56px' }} />
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto 1fr',
          gap: 60, alignItems: 'center',
        }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{
              fontFamily: 'Rubik, monospace', fontSize: 11,
              letterSpacing: '0.1em', color: '#8C8C8C',
              marginBottom: 12,
            }}>WE BELIEVE</div>
            <div style={{
              fontSize: 24, fontWeight: 700, letterSpacing: '-0.015em',
              lineHeight: 1.25,
            }}>
              <span style={{ color: '#1A2BFB' }}>פחות חיכוך.</span><br/>
              יותר אוכל.
            </div>
          </div>
          <img src="assets/pivot-logo.jpg" alt="Pivot Level" style={{
            width: 80, height: 80, borderRadius: '50%',
            objectFit: 'cover', display: 'block',
            boxShadow: '0 12px 32px rgba(26,43,251,0.4)',
          }} />
          <div>
            <div style={{
              fontFamily: 'Rubik, monospace', fontSize: 11,
              letterSpacing: '0.1em', color: '#8C8C8C',
              marginBottom: 12,
            }}>WE BUILD FOR</div>
            <div style={{
              fontSize: 24, fontWeight: 700, letterSpacing: '-0.015em',
              lineHeight: 1.25,
            }}>
              בעלי מסעדות שלא ישנים.<br/>
              <span style={{ color: '#1A2BFB' }}>וכן רוצים לישון.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HERO — oversized takeover with cascading phones + live ticker
// ============================================================
// Smooth-scroll to a section by id.
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const NAV_LINKS = [
  { label: 'תכונות', id: 'features' },
  { label: 'איך זה עובד', id: 'how' },
  { label: 'מחירים', id: 'join' },
  { label: 'לקוחות', id: 'reviews' },
];

// Hero sticker constellation — each fly in from its side, staggered after the phone.
// `from`: which side they enter from. `tx` is the final x-offset from center.
const HERO_STICKERS = [
  // LEFT cluster
  { name: 'veggies',  size: 126, from: 'left',  pos: { bottom: -20, left: '50%' },  tx: -280, rot: 14,  shadow: '0 26px 42px rgba(0,0,0,0.45)' },
  { name: 'truck',    size: 84,  from: 'left',  pos: { top: -50,   left: '50%' },   tx: -180, rot: 12,  shadow: '0 20px 32px rgba(0,0,0,0.42)' },
  { name: 'wine',     size: 76,  from: 'left',  pos: { top: 60,    left: '50%' },   tx: -240, rot: -12, shadow: '0 18px 28px rgba(0,0,0,0.4)' },
  { name: 'avocado',  size: 70,  from: 'left',  pos: { top: 40,    left: '50%' },   tx: -340, rot: -22, shadow: '0 16px 26px rgba(0,0,0,0.4)' },
  { name: 'lemon',    size: 64,  from: 'left',  pos: { top: '42%', left: '50%' },   tx: -220, rot: 20,  shadow: '0 16px 26px rgba(0,0,0,0.4)' },
  { name: 'dumpling', size: 72,  from: 'left',  pos: { bottom: 90, left: '50%' },   tx: -380, rot: -18, shadow: '0 18px 28px rgba(0,0,0,0.4)' },
  // RIGHT cluster
  { name: 'steak',    size: 111, from: 'right', pos: { top: -30,   left: '50%' },   tx: 180,  rot: -15, shadow: '0 24px 38px rgba(0,0,0,0.45)' },
  { name: 'mango',    size: 78,  from: 'right', pos: { top: 50,    left: '50%' },   tx: 320,  rot: 20,  shadow: '0 18px 28px rgba(0,0,0,0.4)' },
  { name: 'sushi',    size: 84,  from: 'right', pos: { top: '26%', left: '50%' },   tx: 230,  rot: 18,  shadow: '0 18px 30px rgba(0,0,0,0.4)' },
  { name: 'beer',     size: 84,  from: 'right', pos: { top: '60%', left: '50%' },   tx: 310,  rot: -14, shadow: '0 18px 30px rgba(0,0,0,0.4)' },
  { name: 'cheese',   size: 98,  from: 'right', pos: { bottom: 30, left: '50%' },   tx: 250,  rot: -10, shadow: '0 22px 36px rgba(0,0,0,0.42)' },
  { name: 'boxes',    size: 86,  from: 'right', pos: { bottom: 110, left: '50%' },  tx: 360,  rot: 15,  shadow: '0 20px 32px rgba(0,0,0,0.42)' },
  // New bottles
  { name: 'campari',  size: 48,  from: 'left',  pos: { top: '54%', left: '50%' },   tx: -300, rot: -10, shadow: '0 14px 22px rgba(0,0,0,0.4)' },
  { name: 'brandy',   size: 46,  from: 'right', pos: { top: '46%', left: '50%' },   tx: 270,  rot: 10,  shadow: '0 14px 22px rgba(0,0,0,0.4)' },
  { name: 'cola',     size: 39,  from: 'right', pos: { bottom: 200, left: '50%' },  tx: 145,  rot: -6,  shadow: '0 12px 20px rgba(0,0,0,0.4)' },
];

function Hero({ blue }) {
  const isMobile = useIsMobile();
  const navCompact = useIsMobile(940);

  // Replay the phone + sticker fly-in every time the hero scrolls into view.
  const stageRef = React.useRef(null);
  const [stageIn, setStageIn] = useStateWeb(false);
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setStageIn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setStageIn(entry.isIntersecting),
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Ghost-text parallax — direct DOM mutation via ref to avoid re-rendering
  // the whole hero subtree on every scroll frame (which can make scroll feel
  // unresponsive on weaker devices).
  const ghostRef = React.useRef(null);
  React.useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const el = ghostRef.current;
      if (el) {
        const sy = window.scrollY || window.pageYOffset || 0;
        el.style.transform = `translateY(${sy * 0.34}px)`;
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section style={{ position: 'relative', overflow: 'hidden', color: '#fff', background: '#05061c' }}>
      {/* Layered blue mesh background */}
      <HeroBackground accent={blue} />

      {/* Atmospheric depth — navy vignette grades the electric mesh into ink at the edges */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(4,5,22,0.94) 0%, rgba(4,5,22,0.34) 22%, transparent 44%, rgba(4,5,22,0.18) 60%, rgba(4,5,22,0.72) 84%, rgba(4,5,22,0.97) 100%)',
      }} />
      {/* Electric core glow — a focused light source high-right */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(120% 58% at 78% 6%, rgba(94,111,255,0.45) 0%, transparent 56%)',
        mixBlendMode: 'screen',
      }} />

      {/* Top bar */}
      <div style={{
        background: 'rgba(6,8,34,0.72)', height: 68,
        backdropFilter: 'blur(16px) saturate(150%)',
        WebkitBackdropFilter: 'blur(16px) saturate(150%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(16px, 4vw, 48px)',
        position: 'relative', zIndex: 5,
      }}>
        <Wordmark size={18} color="#fff" onDark={true} />
        <div style={{ display: navCompact ? 'none' : 'flex', gap: 32, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
          {NAV_LINKS.map((l) => (
            <span key={l.id} className="pivot-nav-link" onClick={() => scrollToId(l.id)}>
              {l.label}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {!navCompact && <span className="pivot-nav-link">התחברות</span>}
          <button className="pivot-btn pivot-btn-blue pivot-btn-sm" style={{ background: blue }}
            onClick={() => scrollToId('join')}>
            <span>נסו חינם</span>
            <span aria-hidden="true">←</span>
          </button>
        </div>
      </div>

      {/* Top live-activity ticker — sits right under the top bar */}
      <div style={{
        background: 'rgba(0,0,0,0.5)',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        padding: '10px 0',
        position: 'relative', zIndex: 5,
        backdropFilter: 'blur(4px)',
      }}>
        <LiveTicker />
      </div>

      {/* Hero body */}
      <div style={{
        padding: 'clamp(40px, 7vw, 80px) clamp(20px, 5vw, 80px) clamp(36px, 6vw, 60px)',
        position: 'relative',
        maxWidth: 1440, margin: '0 auto',
        zIndex: 2,
      }}>
        {/* Meta row — branded sticker pill */}
        <div style={{ marginBottom: 36, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '8px 18px 8px 8px', borderRadius: 999,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            fontSize: 13, fontWeight: 800, letterSpacing: '0.04em',
            fontFamily: 'Rubik, sans-serif',
            boxShadow: '0 8px 24px -8px rgba(0,0,0,0.5)',
          }}>
            <StickerIcon name="bolt" size={18} />
            WHATSAPP-FIRST · ניהול מלאי
          </span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'Rubik, sans-serif', textTransform: 'uppercase',
          }}>
            <span className="pivot-pulse-dot" style={{ width: 7, height: 7, borderRadius: 999, background: '#fff' }} />
            240+ מסעדות
          </div>
        </div>

        {/* HUGE display headline (full-width) */}
        <div style={{ position: 'relative' }}>
          <h1 style={{
            fontFamily: 'Heebo, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(44px, 13vw, 200px)',
            lineHeight: 0.82,
            letterSpacing: '-0.05em',
            margin: 0,
            position: 'relative',
            zIndex: 2,
          }}>
            כל הספקים<br/>
            של המסעדה
          </h1>
          {/* Outline echo behind — parallax via ref (no React re-render on scroll) */}
          <div ref={ghostRef} aria-hidden="true" style={{
            position: 'absolute', top: 30, right: 30,
            fontFamily: 'Heebo, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(44px, 13vw, 200px)',
            lineHeight: 0.82,
            letterSpacing: '-0.05em',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(255,255,255,0.15)',
            pointerEvents: 'none',
            zIndex: 1,
            willChange: 'transform',
          }}>כל הספקים<br/>של המסעדה</div>
        </div>

        {/* "בוואטסאפ." pill — separate row, big */}
        <div style={{ marginTop: 24, marginBottom: 56, display: 'flex', alignItems: 'center', gap: 32 }}>
          <span className="pivot-pill-flyin" style={{
            display: 'inline-block',
            background: '#000', color: '#fff',
            padding: '12px 36px 14px',
            borderRadius: 999,
            fontFamily: 'Heebo, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(30px, 7vw, 96px)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            בוואטסאפ.
          </span>
          {/* Logo — double-sided coin; gets knocked by the pill, then swivels twice */}
          <div className="pivot-logo-knock" style={{ perspective: 720, flexShrink: 0 }}>
            <div className="pivot-logo-coin" style={{
              position: 'relative', width: 88, height: 88,
              transformStyle: 'preserve-3d',
            }}>
              {[0, 180].map((deg) => (
                <img key={deg} src="assets/pivot-logo.jpg"
                  alt={deg === 0 ? 'Pivot Level' : ''} aria-hidden={deg !== 0}
                  style={{
                    position: 'absolute', inset: 0,
                    width: 88, height: 88, borderRadius: '50%',
                    objectFit: 'cover', display: 'block',
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                    transform: `rotateY(${deg}deg)`,
                    boxShadow: '0 0 0 4px rgba(255,255,255,0.9), 0 16px 34px -8px rgba(0,0,0,0.6)',
                  }} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: stats on left, copy + CTAs on right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'start',
          marginBottom: 60,
        }}>
          {/* Stats — vertical big numbers */}
          <div className="pivot-fly-right" style={{ display: 'flex', flexDirection: 'column', gap: 24, borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: 28 }}>
            <BigStat n="2.5" unit="שעות" label="חיסכון יומי בממוצע" />
            <BigStat n="90%" unit="" label="פחות טעויות בהזמנה" />
            <BigStat n="0" unit="אפליקציות" label="להוריד או ללמוד" />
          </div>
          {/* Copy + CTAs */}
          <div className="pivot-fly-left" style={{ borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: 28 }}>
            <p style={{
              fontSize: 24, lineHeight: 1.45, fontWeight: 400,
              color: 'rgba(255,255,255,0.92)',
              marginBottom: 24, marginTop: 0,
              maxWidth: 640,
            }}>
              המערכת לניהול מלאי למסעדות הראשונה בווטסאפ. ספירות, הזמנות, אישורי מנהל, קליטת סחורה, חשבוניות ותזמונים —
              <span style={{ color: '#fff', fontWeight: 700 }}> במהלך עבודה אחד ברור.</span>
            </p>

            {/* Chips row — branded sticker icons */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
              {[
                { s: 'box', t: 'מצבת ברזל' },
                { s: 'receipt', t: 'חשבוניות' },
                { s: 'lock', t: 'הרשאות' },
                { s: 'clock', t: 'תזמונים' },
                { s: 'check', t: 'אישורים' },
                { s: 'chat', t: 'לדבר עם המלאי' },
              ].map((c, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '10px 18px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  fontSize: 14, fontWeight: 600,
                  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                }}>
                  <StickerIcon name={c.s} size={20} />
                  <span>{c.t}</span>
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
              <a className="pivot-btn pivot-btn-white" href="https://pivott.digital/login"
                target="_blank" rel="noopener noreferrer">לראות איך זה עובד ▷</a>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              ✓ ללא כרטיס אשראי &nbsp;·&nbsp; ✓ ביטול בכל רגע &nbsp;·&nbsp; ✓ עברית מלאה
            </div>
          </div>
        </div>

        {/* COMMAND PANEL — replaces phone cascade */}
        <div ref={stageRef} className={`hero-stage${stageIn ? ' is-in' : ''}`} style={{
          position: 'relative',
          marginTop: 20,
          marginBottom: -100,
          display: 'flex',
          justifyContent: 'center',
        }}>
          {/* BACK-LEFT iPhone — third screenshot, tilted left, peeks behind on the left */}
          {!isMobile && (
            <div style={{
              position: 'absolute', top: 0, left: '50%',
              width: 'min(360px, 86vw)',
              transform: 'translateX(calc(-50% - 170px)) translateY(56px)',
              zIndex: 2,
              pointerEvents: 'none',
            }}>
              <div className="hero-phone-stage">
                <div style={{
                  width: '100%',
                  padding: 11,
                  background: 'linear-gradient(180deg, #1c1c1c 0%, #050505 100%)',
                  borderRadius: 52,
                  boxShadow:
                    '0 0 0 1.5px #2a2a2a, 0 60px 140px -30px rgba(0,0,0,0.55),' +
                    ' 0 30px 70px -20px rgba(0,0,0,0.35),' +
                    ' inset 0 1px 0 rgba(255,255,255,0.08)',
                  transform: 'rotate(-11deg)',
                  transformOrigin: 'center center',
                }}>
                  <div style={{
                    background: '#000', borderRadius: 42,
                    overflow: 'hidden', position: 'relative',
                    aspectRatio: '740 / 1600',
                  }}>
                    <img
                      src="assets/hero-screenshot-3.jpg"
                      alt="Pivot — נתוני המסעדה"
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover', display: 'block',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* BACK-RIGHT iPhone — second screenshot, tilted right, peeks behind on the right */}
          {!isMobile && (
            <div style={{
              position: 'absolute', top: 0, left: '50%',
              width: 'min(360px, 86vw)',
              transform: 'translateX(calc(-50% + 170px)) translateY(56px)',
              zIndex: 2,
              pointerEvents: 'none',
            }}>
              <div className="hero-phone-stage">
                <div style={{
                  width: '100%',
                  padding: 11,
                  background: 'linear-gradient(180deg, #1c1c1c 0%, #050505 100%)',
                  borderRadius: 52,
                  boxShadow:
                    '0 0 0 1.5px #2a2a2a, 0 60px 140px -30px rgba(0,0,0,0.55),' +
                    ' 0 30px 70px -20px rgba(0,0,0,0.35),' +
                    ' inset 0 1px 0 rgba(255,255,255,0.08)',
                  transform: 'rotate(8deg)',
                  transformOrigin: 'center center',
                }}>
                  <div style={{
                    background: '#000', borderRadius: 42,
                    overflow: 'hidden', position: 'relative',
                    aspectRatio: '740 / 1600',
                  }}>
                    <img
                      src="assets/hero-screenshot-2.jpg"
                      alt="Pivot — מחירון בווטסאפ"
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover', display: 'block',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* FRONT iPhone — primary screenshot, rises in on scroll-in */}
          <div className="hero-phone-stage" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{
            width: 'min(360px, 86vw)',
            padding: 11,
            background: 'linear-gradient(180deg, #1c1c1c 0%, #050505 100%)',
            borderRadius: 52,
            boxShadow:
              '0 0 0 1.5px #2a2a2a, 0 60px 140px -30px rgba(0,0,0,0.7),' +
              ' 0 30px 70px -20px rgba(0,0,0,0.45),' +
              ' inset 0 1px 0 rgba(255,255,255,0.08)',
            transform: 'rotate(-5deg)',
            transformOrigin: 'center center',
          }}>
            <div style={{
              background: '#000',
              borderRadius: 42,
              overflow: 'hidden',
              position: 'relative',
              aspectRatio: '740 / 1600',
            }}>
              <img
                src="assets/hero-screenshot.jpg"
                alt="Pivot — שיחת ווטסאפ עם המערכת"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                }}
              />
            </div>
          </div>
          </div>
          {/* Sticker constellation — pops in from the sides (desktop only) */}
          {!isMobile && HERO_STICKERS.map((s, i) => (
            <div key={s.name}
              className={s.from === 'left' ? 'hero-fly-from-left' : 'hero-fly-from-right'}
              style={{
                position: 'absolute', ...s.pos, zIndex: 5,
                animationDelay: `${0.65 + i * 0.06}s`,
              }}>
              <Sticker name={s.name} size={s.size} style={{
                display: 'block',
                transform: `translateX(${s.tx}px) rotate(${s.rot}deg)`,
                filter: `drop-shadow(${s.shadow})`,
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom watermark — giant "PIVOT" */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: -120, left: -40,
        fontSize: 'clamp(60px, 24vw, 380px)',
        fontWeight: 900, letterSpacing: '-0.07em',
        color: 'rgba(255,255,255,0.08)', lineHeight: 0.8,
        fontFamily: 'Heebo, sans-serif',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        zIndex: 1,
      }}>PIVOT · PIVOT</div>
    </section>
  );
}

function BigStat({ n, unit, label }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
        <div style={{
          fontSize: 72, fontWeight: 900, letterSpacing: '-0.04em',
          lineHeight: 0.9, fontFamily: 'Heebo, sans-serif',
        }}>{n}</div>
        {unit && <div style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{unit}</div>}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{label}</div>
    </div>
  );
}

// ============================================================
// BRAND MARQUEE — restaurant wordmarks scrolling
// ============================================================
function BrandMarquee() {
  return (
    <section style={{ background: '#fff', borderTop: '1px solid #E8E8E8', borderBottom: '1px solid #E8E8E8', padding: '40px 0' }}>
      <div className="pivot-eyebrow" style={{
        textAlign: 'center', color: '#8C8C8C', marginBottom: 28,
      }}>240+ מסעדות מובחרות בישראל כבר עברו לפיבוט</div>
      <ScrollMarquee speed="slow" gap={72}>
        {[...VANITY_LOGOS, ...VANITY_LOGOS].map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 72 }}>
            <div style={{ ...l.style, color: '#8C8C8C', opacity: 0.85, fontSize: 32 }}>{l.name}</div>
            <StickerSparkle size={14} color="#E8E8E8" />
          </div>
        ))}
      </ScrollMarquee>
    </section>
  );
}

// ============================================================
// MEGA STAT — full-bleed editorial typography moment
// ============================================================
// ============================================================
// COUNT-UP — ticks a number from 0 to its target when scrolled into view
// ============================================================
function CountUp({ value, decimals = 0, prefix = '', suffix = '', duration = 1700 }) {
  const [display, setDisplay] = useStateWeb(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setDisplay(value * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setDisplay(value);
      };
      raf = requestAnimationFrame(tick);
    };
    if (!('IntersectionObserver' in window)) {
      run();
      return () => { if (raf) cancelAnimationFrame(raf); };
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { run(); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [value, duration]);

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

function MegaStat() {
  const isMobile = useIsMobile();
  return (
    <section style={{
      background: '#000', color: '#fff',
      padding: 'clamp(72px, 10vw, 160px) clamp(20px, 5vw, 80px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Atmospheric blue glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', right: -300,
        width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,43,251,0.25) 0%, transparent 60%)',
        pointerEvents: 'none', filter: 'blur(40px)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: -100, left: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(94,111,255,0.15) 0%, transparent 60%)',
        pointerEvents: 'none', filter: 'blur(60px)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
          gap: 60,
          alignItems: 'start',
          marginBottom: 32,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <div className="pivot-eyebrow" style={{ color: '#1A2BFB' }}>היקף השנה</div>
              <span className="pivot-pulse-dot" style={{ width: 8, height: 8, borderRadius: 999, background: '#1A2BFB' }} />
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'Rubik, monospace', letterSpacing: '0.06em' }}>LIVE</div>
            </div>
            <h2 className="pivot-h2" style={{ marginBottom: 0 }}>
              המסעדות שלנו<br/>
              חוסכות יחד.
            </h2>
          </div>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10,
          }}>
            <div className="pivot-pill" style={{
              background: 'rgba(26,43,251,0.15)',
              border: '1px solid rgba(26,43,251,0.3)',
              color: '#fff',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#1A2BFB' }} />
              בזמן אמת
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>נכון לרגע זה ↓</div>
          </div>
        </div>

        {/* The big number */}
        <div style={{ position: 'relative', marginBottom: 56 }}>
          <div className="pivot-mega-num pivot-tabular" style={{
            color: '#1A2BFB',
            fontFamily: 'Heebo, sans-serif',
            direction: 'ltr',
            textShadow: '0 0 80px rgba(26,43,251,0.4)',
          }}>
            <CountUp prefix="₪" value={4.8} decimals={1} suffix="M" duration={2100} />
          </div>
          <div aria-hidden="true" style={{
            display: isMobile ? 'none' : 'block',
            position: 'absolute', top: 14, right: 18,
            zIndex: -1,
            fontSize: 'clamp(56px, 20vw, 380px)',
            lineHeight: 0.78,
            fontWeight: 900,
            letterSpacing: '-0.07em',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(26,43,251,0.4)',
            direction: 'ltr',
          }}><CountUp prefix="₪" value={4.8} decimals={1} suffix="M" duration={2100} /></div>
        </div>

        {/* Sub-stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 40, paddingTop: 36,
          borderTop: '1px solid rgba(255,255,255,0.12)',
        }}>
          <SubStat value={12840} label="הזמנות שעובדו" />
          <SubStat value={240} label="מסעדות פעילות" />
          <SubStat value={2300} suffix="+" label="ספקים במערכת" />
          <SubStat value={187} suffix="h" label="חיסכון יומי מצרפי" />
        </div>
      </div>
    </section>
  );
}

function SubStat({ value, decimals = 0, prefix = '', suffix = '', label }) {
  return (
    <div>
      <div style={{
        fontSize: 48, fontWeight: 900, letterSpacing: '-0.03em',
        lineHeight: 0.95, fontFamily: 'Heebo, sans-serif',
        marginBottom: 6, direction: 'ltr', textAlign: 'right',
      }}>
        <CountUp value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{label}</div>
    </div>
  );
}

// ============================================================
// HOW IT WORKS — 3 big numbered steps
// ============================================================
function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'תזכורת',
      body: 'הצוות מקבל תזכורת לספירה או להזמנה בזמן הנכון — לפי תזמוני הספק.',
      side: 'בזמן הנכון',
    },
    {
      n: '02',
      title: 'הזמנה',
      body: 'פיבוט בונה הזמנה לפי מלאי קיים ומצבת בסיס. בדיוק כמה שצריך, לא יותר.',
      side: 'אוטומטי · Par Level',
    },
    {
      n: '03',
      title: 'אישור',
      body: 'מנהל מאשר לפי הרשאות לפני שההזמנה יוצאת. כל הזמנה — חתומה.',
      side: 'הרשאות לפי תפקיד',
    },
    {
      n: '04',
      title: 'קליטה',
      body: 'קליטת הסחורה והחשבונית נסגרות במקום אחד. השוואה למחיר עבר אוטומטית.',
      side: 'OCR · חשבשבת',
    },
    {
      n: '05',
      title: 'ניתוח',
      body: 'פיבוט מנתחת מגמות מחיר, צריכה וספקים — ומציפה תובנות לפני שהן עולות כסף.',
      side: 'תובנות · מגמות',
    },
  ];
  return (
    <section id="how" style={{ background: '#fff', padding: 'clamp(64px, 9vw, 120px) clamp(20px, 5vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      <Sticker name="truck" size={156} rotate={-10}
        style={{ position: 'absolute', top: 64, left: -30, zIndex: 0 }} />
      <Sticker name="boxes" size={124} rotate={12}
        style={{ position: 'absolute', bottom: 52, right: -26, zIndex: 0 }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 32 }}>
          <div className="pivot-eyebrow" style={{ color: '#1A2BFB' }}>הסדר</div>
          <div style={{ flex: 1, height: 1, background: '#E8E8E8' }} />
          <div style={{ fontSize: 14, color: '#8C8C8C' }}>05 שלבים · זרם עבודה אחד</div>
        </div>
        <h2 className="pivot-h2" style={{ marginBottom: 16, maxWidth: 900 }}>
          הסדר שפיבוט<br/>
          <span style={{ color: '#1A2BFB' }}>מייצרת.</span>
        </h2>
        <p style={{ fontSize: 22, lineHeight: 1.45, color: '#4A4A4A', maxWidth: 800, marginBottom: 72 }}>
          במקום שיחות מפוזרות, צילומי מסך, פתקים והודעות שנעלמות —
          <b style={{ color: '#000', fontWeight: 700 }}> כל תהליך ההזמנה הופך לזרם עבודה ברור.</b>
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, position: 'relative' }}>
          {/* Connecting line behind cards */}
          <div style={{
            position: 'absolute', top: 60, right: 8, left: 8,
            height: 2, background: '#E8E8E8', zIndex: 0,
          }} />
          {steps.map((s, i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', gap: 18,
              padding: '32px 0', borderTop: '2px solid #000',
              position: 'relative', zIndex: 1, background: '#fff',
            }}>
              <div style={{
                fontSize: 13, fontWeight: 800, fontFamily: 'Rubik, sans-serif',
                color: '#1A2BFB', letterSpacing: '0.06em',
              }}>{s.n} / 05</div>
              <div style={{
                fontSize: 80, fontWeight: 900, letterSpacing: '-0.04em',
                lineHeight: 0.9, color: '#000',
                fontFamily: 'Heebo, sans-serif',
                direction: 'ltr', textAlign: 'right',
              }}>{s.n}</div>
              <h3 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, margin: 0 }}>{s.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: '#4A4A4A', margin: 0 }}>{s.body}</p>
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#8C8C8C',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                marginTop: 'auto', paddingTop: 8,
                fontFamily: 'Rubik, monospace',
              }}>{s.side}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BENTO FEATURES — varied-size grid
// ============================================================
function BentoFeatures() {
  const isMobile = useIsMobile();
  return (
    <section id="features" style={{ background: '#F5F5F5', padding: 'clamp(64px, 9vw, 120px) clamp(20px, 5vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      <LogoWatermark corner="top-right" />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 32 }}>
          <div className="pivot-eyebrow" style={{ color: '#1A2BFB' }}>היכולות של פיבוט</div>
          <div style={{ flex: 1, height: 1, background: '#E8E8E8' }} />
          <div style={{ fontSize: 14, color: '#8C8C8C' }}>06 כלים · מערכת אחת</div>
        </div>
        <h2 className="pivot-h2" style={{ marginBottom: 16, maxWidth: 1100 }}>
          הזמנה מאושרת.<br/>
          מתועדת. <span style={{ color: '#1A2BFB' }}>מסודרת.</span>
        </h2>
        <p style={{ fontSize: 22, lineHeight: 1.45, color: '#4A4A4A', maxWidth: 700, marginBottom: 56 }}>
          בלי לרדוף. בלי לחפש. בלי לנחש.
          <b style={{ color: '#000', fontWeight: 700 }}> פיבוט עושה סדר במקום שבו המסעדה בדרך כלל מתפזרת.</b>
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)',
          gridAutoRows: 'minmax(180px, auto)',
          gap: 16,
        }}>
          {/* INVENTORY — wide top-left */}
          <BentoCell colSpan={4} rowSpan={2} bg="#1A2BFB" color="#fff">
            <BentoLabel num="01" sticker="box" stickerColor="#fff" label="ניהול מלאי חי" color="rgba(255,255,255,0.85)" />
            <h3 style={{ fontSize: 56, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, margin: '20px 0 16px' }}>
              ספירות, Par Level,<br/>חוסרים בזמן אמת.
            </h3>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', maxWidth: 480, margin: '0 0 32px' }}>
              מצבת בסיס, ספירות לפי מחלקה, חוסרים מול Par Level — והכנת הזמנה לפי מה שבאמת חסר.
            </p>
            <div style={{
              transform: 'scale(0.75)', transformOrigin: 'bottom right',
              marginRight: -100, marginBottom: -80, marginTop: 'auto',
            }}>
              <DashboardOrders width={760} height={460} />
            </div>
          </BentoCell>

          {/* TALK TO INVENTORY — narrow tall top-right */}
          <BentoCell colSpan={2} rowSpan={2} bg="#fff" color="#000">
            <BentoLabel num="02" sticker="chat" stickerColor="#1A2BFB" label="לדבר עם המלאי" color="#1A2BFB" />
            <h3 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, margin: '20px 0 14px' }}>
              שואלים. <span style={{ color: '#1A2BFB' }}>מקבלים תשובה.</span>
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.5, color: '#4A4A4A', margin: '0 0 24px' }}>
              שאלות פשוטות כמו שמדברים עם מנהל תפעול.
            </p>
            {/* Question preview cards */}
            <div style={{
              marginTop: 'auto',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              {[
                'מה חסר לבר?',
                'מה התייקר השבוע?',
                'מה מחכה לאישור?',
                'מי הזמין אתמול?',
                'איזה ספק נסגר ב-14:00?',
              ].map((q, i) => (
                <div key={i} style={{
                  padding: '11px 14px', borderRadius: 12,
                  background: i === 0 ? '#1A2BFB' : '#F5F5F5',
                  color: i === 0 ? '#fff' : '#000',
                  fontSize: 13, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{
                    width: 4, height: 4, borderRadius: 999,
                    background: i === 0 ? '#fff' : '#1A2BFB',
                    flexShrink: 0,
                  }} />
                  {q}
                </div>
              ))}
            </div>
          </BentoCell>

          {/* INVOICE OCR — black square */}
          <BentoCell colSpan={2} rowSpan={2} bg="#000" color="#fff">
            <BentoLabel num="03" sticker="receipt" stickerColor="#fff" label="חשבוניות OCR" color="rgba(255,255,255,0.7)" />
            <h3 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, margin: '16px 0 12px' }}>
              צילום → השוואה<br/>למחירי עבר.
            </h3>
            <div style={{
              fontSize: 76, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.85,
              color: '#1A2BFB',
              fontFamily: 'Heebo, sans-serif',
              margin: '20px 0 8px',
              direction: 'ltr', textAlign: 'right',
            }}>
              ₪48k
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>חשבוניות מעובדות החודש</div>
            <div style={{
              marginTop: 'auto', paddingTop: 16,
              borderTop: '1px solid rgba(255,255,255,0.15)',
              fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              fontFamily: 'Rubik, sans-serif',
            }}>זיהוי ספק · כמות · מחיר</div>
          </BentoCell>

          {/* PERMISSIONS — small */}
          <BentoCell colSpan={2} rowSpan={1} bg="#fff" color="#000">
            <BentoLabel num="04" sticker="lock" stickerColor="#1A2BFB" label="הרשאות" color="#1A2BFB" />
            <h3 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, margin: '12px 0 8px' }}>
              לפי תפקיד.
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.45, color: '#4A4A4A', margin: 0 }}>
              בר, מטבח, מנהל, בעלים — כל אחד רואה מה שרלוונטי לו.
            </p>
            <div style={{ display: 'flex', gap: 6, marginTop: 'auto', flexWrap: 'wrap' }}>
              {['בר', 'מטבח', 'מנהל', 'בעלים'].map((t, i) => (
                <span key={i} style={{
                  padding: '4px 9px', borderRadius: 999,
                  background: i === 2 ? '#1A2BFB' : '#F5F5F5',
                  color: i === 2 ? '#fff' : '#000',
                  fontSize: 11, fontWeight: 700,
                }}>{t}</span>
              ))}
            </div>
          </BentoCell>

          {/* SCHEDULING — wide bottom */}
          <BentoCell colSpan={4} rowSpan={1} bg="#1A2BFB" color="#fff">
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', gap: 24, height: '100%', alignItems: 'center' }}>
              <div>
                <BentoLabel num="05" sticker="clock" stickerColor="#fff" label="תזמוני הזמנות" color="rgba(255,255,255,0.85)" />
                <h3 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, margin: '12px 0 8px' }}>
                  תזכורות בזמן הנכון.<br/>בלי לסמוך על זיכרון.
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, overflow: 'hidden' }}>
                {[
                  { sup: 'אחים כהן', cut: '11:00', deliv: 'מחר 06:00', urgent: true },
                  { sup: 'טמפו', cut: '14:00', deliv: 'מחר 09:00' },
                  { sup: 'קוקה קולה', cut: 'אושר ✓', deliv: 'יום ה׳' },
                ].map((s, i) => (
                  <div key={i} style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(8px)',
                    padding: '14px 16px', borderRadius: 12,
                    border: s.urgent ? '1.5px solid #fff' : '1px solid rgba(255,255,255,0.15)',
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>{s.sup}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', fontFamily: 'Heebo, sans-serif', direction: 'ltr', textAlign: 'right' }}>{s.cut}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{s.deliv}</div>
                  </div>
                ))}
              </div>
            </div>
          </BentoCell>

          {/* OWNER PEACE — small */}
          <BentoCell colSpan={2} rowSpan={1} bg="#000" color="#fff">
            <BentoLabel num="06" sticker="check" stickerColor="#fff" label="שקט לבעלים" color="rgba(255,255,255,0.7)" />
            <h3 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, margin: '12px 0 8px' }}>
              כל הזמנה<br/>מתועדת. אוטומטית.
            </h3>
            <div style={{
              fontSize: 12, fontWeight: 700, color: '#1A2BFB',
              marginTop: 'auto', letterSpacing: '0.08em',
              textTransform: 'uppercase', fontFamily: 'Rubik, sans-serif',
            }}>פחות כאוס · פחות שיחות · פחות טעויות</div>
          </BentoCell>
        </div>
      </div>
    </section>
  );
}

function BentoCell({ colSpan = 2, rowSpan = 1, bg = '#fff', color = '#000', children }) {
  const isMobile = useIsMobile();
  const isLight = bg === '#fff' || bg === '#F5F5F5';
  return (
    <div style={{
      gridColumn: isMobile ? 'auto' : `span ${colSpan}`,
      gridRow: isMobile ? 'auto' : `span ${rowSpan}`,
      background: bg, color,
      borderRadius: 28,
      padding: 'clamp(22px, 4vw, 36px)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      border: isLight ? '1px solid rgba(0,0,0,0.04)' : '1px solid rgba(255,255,255,0.06)',
      boxShadow: isLight
        ? '0 1px 2px rgba(0,0,0,0.03), 0 12px 28px -10px rgba(0,0,0,0.08)'
        : '0 12px 28px -10px rgba(0,0,0,0.18)',
    }}>
      {children}
    </div>
  );
}

function BentoLabel({ num, label, sticker, stickerColor = '#1A2BFB', color }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: 'Rubik, sans-serif',
      fontSize: 12, fontWeight: 700,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color,
    }}>
      {sticker && <StickerIcon name={sticker} size={20} color={stickerColor} />}
      <span>{num}</span>
      <span style={{ opacity: 0.5 }}>—</span>
      <span>{label}</span>
    </div>
  );
}

// ============================================================
// TALK TO INVENTORY — interactive demo
// ============================================================
const TALK_PRESETS = [
  {
    q: 'מה חסר לבר?',
    a: '📦 חסר לפי מצבת בסיס:\nיין לבן × 6\nטוניק × 12\nליים × 4 ק"ג',
  },
  {
    q: 'מה התייקר השבוע?',
    a: '📈 השבוע התייקרו:\nעגבניות +11%\nטונה +7%\nגבינה +5%',
  },
  {
    q: 'מה מחכה לאישור?',
    a: '🔐 ממתין לאישור:\nהזמנת בר — ₪1,840\nהזמנת מטבח — ₪3,260',
  },
  {
    q: 'איזה ספק צריך הזמנה היום?',
    a: '🚚 אחים כהן — עד 11:00\n🚚 טמפו — עד 14:00\n✅ קוקה קולה כבר אושר',
  },
  {
    q: 'מי הזמין אתמול?',
    a: '👤 דנה (בר) — 14:23\n👤 איציק (מטבח) — 11:08\n👤 נועה (בעלים) — אישרה ב-16:40',
  },
];

function TalkToInventory() {
  const isMobile = useIsMobile();
  const [thread, setThread] = useStateWeb([
    { from: 'me', text: 'איזה ספק צריך הזמנה היום?' },
    { from: 'bot', text: '🚚 אחים כהן — עד 11:00\n🚚 טמפו — עד 14:00\n✅ קוקה קולה כבר אושר' },
  ]);
  const [typing, setTyping] = useStateWeb(false);

  const ask = (preset) => {
    setThread((t) => [...t, { from: 'me', text: preset.q }]);
    setTyping(true);
    setTimeout(() => {
      setThread((t) => [...t, { from: 'bot', text: preset.a }]);
      setTyping(false);
    }, 700);
  };

  return (
    <section style={{
      background: 'linear-gradient(180deg, #fff 0%, #F5F5F5 100%)',
      padding: 'clamp(64px, 9vw, 140px) clamp(20px, 5vw, 80px) clamp(72px, 10vw, 160px)', position: 'relative', overflow: 'hidden',
    }}>
      {/* Atmospheric accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', right: -300,
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,43,251,0.06) 0%, transparent 70%)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />
      <Sticker name="lemon" size={132} rotate={-12}
        style={{ position: 'absolute', top: 96, left: -22, zIndex: 0 }} />
      <Sticker name="avocado" size={116} rotate={14}
        style={{ position: 'absolute', bottom: 80, left: 54, zIndex: 0 }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 40 }}>
          <div className="pivot-eyebrow" style={{ color: '#1A2BFB' }}>אינטראקטיבי · נסו עכשיו</div>
          <div className="pivot-hairline" style={{ flex: 1 }} />
          <div style={{ fontSize: 12, color: '#8C8C8C', fontFamily: 'Rubik, monospace', letterSpacing: '0.06em' }}>
            LIVE · TRY ME
          </div>
        </div>
        <h2 className="pivot-h2" style={{ marginBottom: 24, maxWidth: 1000 }}>
          דברו עם המלאי.<br/>
          <span style={{ color: '#1A2BFB' }}>כמו שמדברים עם מנהל תפעול.</span>
        </h2>
        <p style={{ fontSize: 22, lineHeight: 1.5, color: '#4A4A4A', maxWidth: 800, marginBottom: 64 }}>
          שואלים את פיבוט בשפה רגילה — ומקבלים תשובה שאפשר לפעול לפיה.
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: 36,
          alignItems: 'start',
        }}>
          {/* Preset questions — refined */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="pivot-eyebrow" style={{ color: '#8C8C8C', marginBottom: 16 }}>שאלות לדוגמה</div>
            {TALK_PRESETS.map((p, i) => (
              <button key={i} onClick={() => ask(p)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                  padding: '20px 24px', borderRadius: 18,
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.08)',
                  fontFamily: 'inherit', fontSize: 16, fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'right', direction: 'rtl',
                  color: '#000',
                  transition: 'all 0.2s cubic-bezier(0.2, 0.7, 0.3, 1)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1A2BFB';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = '#1A2BFB';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px -8px rgba(26,43,251,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
                }}>
                <span>{p.q}</span>
                <span style={{ fontSize: 16, fontFamily: 'Rubik, sans-serif' }}>↙</span>
              </button>
            ))}
          </div>

          {/* Chat output — premium dark surface */}
          <div style={{
            background: '#000', borderRadius: 28,
            padding: 0,
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.05),
              0 40px 100px -30px rgba(0,0,0,0.5),
              0 20px 50px -15px rgba(0,0,0,0.3)
            `,
            minHeight: 540, position: 'relative',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '22px 28px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
            }}>
              <div style={{ position: 'relative' }}>
                <img src="assets/pivot-logo.jpg" alt="Pivot" style={{
                  width: 40, height: 40, borderRadius: 999,
                  objectFit: 'cover', display: 'block',
                  boxShadow: '0 4px 12px rgba(26,43,251,0.4)',
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: 12, height: 12, borderRadius: 999,
                  background: '#1B7F3A',
                  border: '2px solid #000',
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#fff', letterSpacing: '-0.01em' }}>Pivot · ניהול מלאי</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                  עונה תוך 2 שניות
                </div>
              </div>
              <div className="pivot-pill" style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.8)',
                fontSize: 10,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: '#25D366' }} />
                WhatsApp Business
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column', gap: 12,
              direction: 'rtl', padding: '24px 28px',
            }}>
              {thread.map((m, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: m.from === 'me' ? 'flex-start' : 'flex-end',
                  animation: 'pivot-rise 0.3s ease',
                }}>
                  <div style={{
                    maxWidth: '80%',
                    background: m.from === 'me' ? '#1A2BFB' : '#fff',
                    color: m.from === 'me' ? '#fff' : '#000',
                    padding: '13px 18px',
                    borderRadius: m.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    fontSize: 15.5, lineHeight: 1.5, fontWeight: 500,
                    whiteSpace: 'pre-line',
                    boxShadow: m.from === 'me' ? '0 4px 14px rgba(26,43,251,0.3)' : '0 1px 2px rgba(0,0,0,0.06)',
                  }}>{m.text}</div>
                </div>
              ))}
              {typing && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{
                    padding: '13px 18px', borderRadius: '18px 18px 18px 4px',
                    background: '#fff', display: 'flex', gap: 5,
                  }}>
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="pivot-pulse-dot" style={{
                        width: 6, height: 6, borderRadius: 999, background: '#8C8C8C',
                        animationDelay: `${d * 0.2}s`,
                      }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{
              padding: '14px 28px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center',
              fontFamily: 'Rubik, sans-serif', letterSpacing: '0.05em',
            }}>
              ← לחצו על שאלה כדי להמשיך את הדמו
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INSURANCE TAGLINE — bold poster moment before waitlist
// ============================================================
function InsuranceTagline() {
  return (
    <section style={{ background: '#000', color: '#fff', padding: 'clamp(64px, 9vw, 140px) clamp(20px, 5vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      {/* Background type */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        opacity: 0.04, pointerEvents: 'none',
      }}>
        <ScrollMarquee speed="slow" gap={40}>
          {Array(8).fill(0).map((_, i) => (
            <div key={i} style={{
              fontFamily: 'Heebo, sans-serif', fontWeight: 900,
              fontSize: 'clamp(56px, 22vw, 320px)',
              letterSpacing: '-0.06em', lineHeight: 0.8,
              whiteSpace: 'nowrap', color: '#fff',
            }}>ביטוח תפעולי</div>
          ))}
        </ScrollMarquee>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div className="pivot-eyebrow" style={{ color: '#1A2BFB', marginBottom: 28 }}>במילה אחת</div>
        <h2 style={{
          fontSize: 'clamp(34px, 8.5vw, 130px)',
          fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.92,
          margin: '0 0 36px',
        }}>
          Pivot היא <span style={{
            background: '#1A2BFB', padding: '0 16px', display: 'inline-block', borderRadius: 16,
          }}>ביטוח תפעולי</span><br/>
          למסעדה.
        </h2>
        <p style={{
          fontSize: 24, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)',
          maxWidth: 760, margin: '0 auto 48px',
        }}>
          מערכת שמחזירה לבעלים <b style={{ color: '#fff', fontWeight: 700 }}>סדר, שליטה ושקט</b> — דרך WhatsApp, בלי להכניס עוד אפליקציה לעסק.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <a className="pivot-btn pivot-btn-blue"
            href="https://wa.me/97283761057"
            target="_blank" rel="noopener noreferrer"
            style={{ height: 64, fontSize: 17 }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: '#25D366', boxShadow: '0 0 0 3px rgba(37,211,102,0.32)' }} />
            דברו איתנו בווטסאפ
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ADVANTAGES — editorial spread
// ============================================================
function Advantages() {
  const isMobile = useIsMobile();
  const items = [
    { n: '02:30', unit: 'שעות / יום', title: 'חוסך זמן', body: 'במקום לרדוף אחרי 30 ספקים בוואטסאפ.' },
    { n: '90%', unit: 'פחות', title: 'מפחית טעויות', body: 'אישור כפול, מחירונים, ובדיקת כמויות אוטומטית.' },
    { n: '00:00', unit: 'דקות', title: 'בלי לימוד', body: 'המסעדה כבר בוואטסאפ. פיבוט יושב בדיוק שם.' },
  ];
  return (
    <section style={{ background: '#000', color: '#fff', padding: 'clamp(64px, 9vw, 120px) clamp(20px, 5vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      <LogoWatermark corner="bottom-right" dark />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 56 }}>
          <div className="pivot-eyebrow" style={{ color: '#1A2BFB' }}>למה פיבוט</div>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>03 סיבות</div>
        </div>
        <h2 className="pivot-h2" style={{ marginBottom: 80 }}>
          ההבדל בין מסעדה שעובדת קשה<br/>
          <span style={{ color: '#1A2BFB' }}>למסעדה שעובדת חכם.</span>
        </h2>
        {/* Editorial split list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {items.map((it, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr 1.5fr',
              gap: 40, alignItems: 'center',
              padding: '56px 0',
              borderTop: '1px solid rgba(255,255,255,0.15)',
            }}>
              <div>
                <div style={{
                  fontSize: 120, fontWeight: 900, letterSpacing: '-0.05em',
                  lineHeight: 0.85, fontFamily: 'Rubik, sans-serif',
                  color: '#1A2BFB',
                  direction: 'ltr', textAlign: 'right',
                }}>{it.n}</div>
                <div className="pivot-eyebrow" style={{
                  color: 'rgba(255,255,255,0.6)', marginTop: 8,
                }}>{it.unit}</div>
              </div>
              <div className="pivot-h3" style={{ color: '#fff' }}>{it.title}</div>
              <p style={{ fontSize: 17, lineHeight: 1.5, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{it.body}</p>
            </div>
          ))}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.15)' }} />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHATSAPP-STYLE REVIEWS — testimonials as a chat thread
// ============================================================
function WhatsAppReviews() {
  const messages = [
    { author: 'מיכל ברקן', role: 'בעלים · Sapore', avatar: 'M', side: 'right', text: 'חסכנו שעתיים ביום, אבל החיסכון האמיתי הוא בראש. אני כבר לא חולם בלילה על מי שכחתי להזמין.', time: 'לפני 3 ימים', stars: 5, featured: true },
    { author: 'יוסי לוי', role: 'מנהל רכש · בייקרי 12', avatar: 'Y', side: 'left', text: 'הספקים מתאהבים בזה לפני שאנחנו. ההזמנות מגיעות מסודרות — בלי הודעות קוליות בני 8 דקות.', time: 'לפני שבוע', stars: 5 },
    { author: 'דנה קרן', role: 'CFO · נומאד', avatar: 'D', side: 'right', text: 'בחודש הראשון תפסנו טעות חיוב של ₪14,000. פיבוט החזיר את עצמו פי 50 בשבוע. נקודה.', time: 'לפני שבועיים', stars: 5 },
    { author: 'אבי שמש', role: 'בעלים · KILO', avatar: 'A', side: 'left', text: '3 סניפים, 67 ספקים. פיבוט הוא ה-1 שמדבר עם כולם בבת אחת בלי לאבד שום הזמנה.', time: 'לפני חודש', stars: 5 },
    { author: 'איציק טל', role: 'שף-בעלים · OISO', avatar: 'I', side: 'left', text: 'עברנו 4 מערכות בעבר. פיבוט הוא הראשונה שצוות המטבח באמת השתמש בה.', time: 'לפני 5 ימים', stars: 5 },
  ];
  return (
    <section id="reviews" style={{ background: '#fff', padding: 'clamp(64px, 9vw, 120px) clamp(20px, 5vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      <Sticker name="pasta" size={142} rotate={-12}
        style={{ position: 'absolute', top: 116, left: -32, zIndex: 0 }} />
      <Sticker name="beer" size={120} rotate={13}
        style={{ position: 'absolute', bottom: 84, right: -28, zIndex: 0 }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 56 }}>
          <div className="pivot-eyebrow" style={{ color: '#1A2BFB' }}>הם כבר עברו</div>
          <div style={{ flex: 1, height: 1, background: '#E8E8E8' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', fontSize: 18, color: '#1A2BFB' }}>★★★★★</div>
            <div style={{ fontSize: 13, color: '#8C8C8C' }}>4.9 · 187 ביקורות מאומתות</div>
          </div>
        </div>
        <h2 className="pivot-h2" style={{ marginBottom: 56, maxWidth: 900 }}>
          הביקורות מגיעות לאן שעובדים.<br/>
          <span style={{ color: '#1A2BFB' }}>בוואטסאפ של פיבוט.</span>
        </h2>

        {/* Chat thread layout — 2 columns alternating with bubbles */}
        <div style={{
          maxWidth: 980, margin: '0 auto',
          background: '#F5F5F5',
          borderRadius: 28,
          padding: 'clamp(24px, 5vw, 48px) clamp(20px, 5vw, 56px)',
          position: 'relative',
          boxShadow: '0 30px 80px -20px rgba(0,0,0,0.12)',
        }}>
          {/* Chat header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            paddingBottom: 28, borderBottom: '1px solid #E8E8E8',
            marginBottom: 32,
          }}>
            <img src="assets/pivot-logo.jpg" alt="Pivot" style={{
              width: 48, height: 48, borderRadius: 999,
              objectFit: 'cover', display: 'block',
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>קבוצת לקוחות Pivot</div>
              <div style={{ fontSize: 13, color: '#8C8C8C', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="pivot-pulse-dot" style={{ width: 8, height: 8, borderRadius: 999, background: '#1A2BFB' }} />
                240+ חברים · פעיל כעת
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1A2BFB' }}>הצטרפו →</div>
          </div>

          {/* Messages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {messages.map((m, i) => (
              <ReviewBubble key={i} {...m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewBubble({ author, role, avatar, side, text, time, stars, featured }) {
  const isRight = side === 'right';
  return (
    <div style={{
      display: 'flex',
      flexDirection: isRight ? 'row' : 'row-reverse',
      gap: 14,
      alignItems: 'flex-end',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 999,
        background: isRight ? '#1A2BFB' : '#E8E8E8',
        color: isRight ? '#fff' : '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 900, fontSize: 16, flexShrink: 0,
      }}>{avatar}</div>
      <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12, color: '#8C8C8C',
          justifyContent: isRight ? 'flex-start' : 'flex-end',
        }}>
          <span style={{ fontWeight: 700, color: '#000' }}>{author}</span>
          <span>·</span>
          <span>{role}</span>
        </div>
        <div style={{
          background: featured ? '#1A2BFB' : '#fff',
          color: featured ? '#fff' : '#000',
          padding: featured ? '20px 24px' : '14px 18px',
          fontSize: featured ? 20 : 16,
          lineHeight: 1.45,
          fontWeight: featured ? 600 : 500,
          borderRadius: isRight
            ? (featured ? '20px 20px 6px 20px' : '16px 16px 4px 16px')
            : (featured ? '20px 20px 20px 6px' : '16px 16px 16px 4px'),
          boxShadow: featured ? '0 12px 28px -8px rgba(26,43,251,0.4)' : '0 1px 2px rgba(0,0,0,0.06)',
          letterSpacing: featured ? '-0.01em' : 0,
        }}>
          {text}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 11, color: '#8C8C8C',
          justifyContent: isRight ? 'flex-start' : 'flex-end',
        }}>
          <span style={{ color: '#1A2BFB', fontSize: 12 }}>{'★'.repeat(stars)}</span>
          <span>·</span>
          <span>{time}</span>
          {isRight && <span>✓✓</span>}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// WAITLIST — dramatic typography moment
// ============================================================
function Waitlist({ blue }) {
  const isMobile = useIsMobile();
  const [email, setEmail] = useStateWeb('');
  return (
    <section id="join" style={{ background: blue, color: '#fff', padding: 'clamp(64px, 9vw, 140px) clamp(20px, 5vw, 80px) clamp(56px, 8vw, 120px)', position: 'relative', overflow: 'hidden' }}>
      {/* Background scrolling type */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        opacity: 0.08, pointerEvents: 'none',
      }}>
        <ScrollMarquee speed="slow" gap={40}>
          {Array(8).fill(0).map((_, i) => (
            <div key={i} style={{
              fontFamily: 'Heebo, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(56px, 22vw, 320px)',
              letterSpacing: '-0.06em',
              lineHeight: 0.8,
              whiteSpace: 'nowrap',
              color: '#fff',
            }}>PIVOT LEVEL ·</div>
          ))}
        </ScrollMarquee>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div className="pivot-eyebrow" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>הצטרפו</div>
        <h2 style={{
          fontSize: 'clamp(36px, 9vw, 140px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 0.88,
          marginBottom: 48,
          maxWidth: 1000,
        }}>
          14 ימי התנסות על 5 ספקים.<br/>
          <span style={{
            background: '#000', padding: '8px 24px', display: 'inline-block',
            borderRadius: 16, marginTop: 20,
            fontSize: 'clamp(28px, 3.4vw, 52px)', letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}>הקמה וליווי ראשוני — ללא עלות</span>
        </h2>

        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 36 : 80, alignItems: isMobile ? 'stretch' : 'end',
        }}>
          <div>
            <p style={{ fontSize: 22, lineHeight: 1.45, color: 'rgba(255,255,255,0.85)', maxWidth: 480, marginBottom: 32 }}>
              השאירו אימייל ותקבלו גישה מיידית. צוות פיבוט יתקין לכם את כל הספקים תוך 24 שעות.
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <BulletItem t="התקנה ב-24 שעות" />
              <BulletItem t="ללא כרטיס אשראי" />
              <BulletItem t="ביטול בלחיצה" />
              <BulletItem t="תמיכה בעברית 24/6" />
            </div>
          </div>
          <div style={{
            background: '#fff', color: '#000',
            padding: 'clamp(22px, 6vw, 40px)', borderRadius: 24,
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.3)',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#8C8C8C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
              כתובת אימייל
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="manager@my-restaurant.co.il"
              style={{
                width: '100%', height: 60, border: 'none', borderBottom: '2px solid #000',
                fontSize: 'clamp(15px, 4.6vw, 22px)', fontWeight: 600, fontFamily: 'inherit', outline: 'none',
                minWidth: 0, direction: 'ltr', textAlign: 'right',
                background: 'transparent', padding: '0 0 10px',
                marginBottom: 28,
              }}
            />
            <button className="pivot-btn pivot-btn-blue" style={{
              width: '100%', height: 68, fontSize: 18, background: blue,
            }}>
              קבלו גישה עכשיו →
            </button>
            <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 16, textAlign: 'center' }}>
              ממוצע גישה מאושרת: <b style={{ color: '#000' }}>14 דקות</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BulletItem({ t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700 }}>
      <span style={{
        width: 18, height: 18, borderRadius: 999, background: '#000', color: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 900, flexShrink: 0,
      }}>✓</span>
      {t}
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const isMobile = useIsMobile();
  const cols = [
    { title: 'מוצר', items: ['תכונות', 'איך זה עובד', 'אינטגרציות', 'מחירים', 'API ומפתחים'] },
    { title: 'חברה', items: ['אודות', 'הצוות', 'דרושים', 'בלוג', 'יצירת קשר'] },
    { title: 'משאבים', items: ['מרכז עזרה', 'מדריכים', 'סטטוס', 'שינויי גרסה', 'תאימות'] },
    { title: 'משפטי', items: ['תנאי שימוש', 'מדיניות פרטיות', 'אבטחה', 'GDPR', 'עוגיות'] },
  ];
  return (
    <footer style={{ background: '#000', color: '#fff' }}>
      <div style={{ padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px) 32px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1.5fr repeat(4, 1fr)', gap: isMobile ? 32 : 60,
          paddingBottom: 64,
        }}>
          <div>
            <Wordmark size={22} color="#fff" onDark={true} />
            <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', maxWidth: 280 }}>
              ניהול ספקים למסעדות. ישירות מהוואטסאפ.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {['X', 'IG', 'in', 'YT'].map((s, i) => (
                <div key={i} className="pivot-footer-social" style={{
                  width: 36, height: 36, borderRadius: 999,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, fontFamily: 'Rubik, sans-serif',
                }}>{s}</div>
              ))}
            </div>
          </div>
          {cols.map((c, i) => (
            <div key={i}>
              <div className="pivot-eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>{c.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.items.map((it, j) => (
                  <span key={j} className="pivot-footer-link">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 13, color: 'rgba(255,255,255,0.5)',
        }}>
          <div>
            © 2026 Pivot Level Ltd. כל הזכויות שמורות. · נבנה ועוצב באהבה על ידי{' '}
            <a href="https://errn.io" target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>errn.io</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { LandingWeb };
