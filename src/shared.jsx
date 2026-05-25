// shared.jsx — Shared UI primitives for Pivot Level landing
// Logo wordmark, phone mockup w/ WhatsApp-style chat, dashboard screenshot placeholders, etc.

import React, { useState, useEffect, useRef } from 'react';

// ---------- Responsive hook — true below the given breakpoint ----------
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isMobile;
}

// ---------- Brand wordmark ----------
// On white: show the logo image directly.
// On blue/black: place the logo on a white disk so brand stays intact.
function Wordmark({ size = 24, color = '#fff', variant = 'full', onDark = false }) {
  const markSize = size * 1.4;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: size * 0.42,
      direction: 'ltr',
    }}>
      <div style={{
        width: markSize, height: markSize,
        borderRadius: '50%',
        background: onDark ? '#fff' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        padding: onDark ? markSize * 0.04 : 0,
      }}>
        <img
          src="assets/pivot-logo.jpg"
          alt="Pivot Level"
          style={{
            width: '100%', height: '100%',
            objectFit: 'contain',
            display: 'block',
            borderRadius: '50%',
          }}
        />
      </div>
      {variant === 'full' && (
        <span style={{
          fontFamily: 'Heebo, sans-serif',
          fontWeight: 900,
          fontSize: size,
          letterSpacing: '-0.03em',
          color,
          lineHeight: 1,
        }}>Pivot Level</span>
      )}
    </div>
  );
}

// ---------- WhatsApp-style chat mockup (Hebrew, RTL) ----------
// Shows ordering a supplier directly in WA. Stays placeholder-y enough
// not to ape WhatsApp's brand directly — we use our own palette.
function ChatMockup({ scale = 1 }) {
  const messages = [
    { from: 'me', time: '08:42', text: 'בוקר טוב! מה יש לכם היום בעגבניות שרי?' },
    { from: 'bot', time: '08:42', text: 'בוקר טוב 👋\nשרי אדומות — 18.90 ₪/ק"ג\nשרי צהובות — 24.00 ₪/ק"ג\nשרי דובדבן — 22.50 ₪/ק"ג' },
    { from: 'me', time: '08:43', text: 'תזמין לי 12 ק"ג אדומות ו-4 ק"ג צהובות, משלוח מחר 06:00' },
    { from: 'bot', time: '08:43', tag: 'הזמנה #4821', text: '✓ נקלט. סה"כ 322.80 ₪\nאישור משלוח עד 18:00' },
  ];
  return (
    <div style={{
      width: 360, height: 640,
      background: '#000',
      borderRadius: 44,
      padding: 8,
      boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.2)',
      transform: `scale(${scale})`,
      transformOrigin: 'top center',
      direction: 'rtl',
    }}>
      <div style={{
        width: '100%', height: '100%',
        background: '#fff',
        borderRadius: 36,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 100, height: 26, background: '#000', borderRadius: 999, zIndex: 2,
        }} />
        {/* Status bar */}
        <div style={{
          padding: '14px 28px 8px', display: 'flex', justifyContent: 'space-between',
          fontSize: 13, fontWeight: 700, color: '#000',
        }}>
          <span>9:41</span>
          <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ fontSize: 11 }}>●●●●●</span>
            <span>100%</span>
          </span>
        </div>
        {/* Chat header */}
        <div style={{
          padding: '14px 18px 12px',
          display: 'flex', alignItems: 'center', gap: 12,
          borderBottom: '1px solid #E8E8E8',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 999,
            background: '#1A2BFB',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: 16,
          }}>P</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>ירקות השדה · ספק</div>
            <div style={{ fontSize: 11, color: '#8C8C8C' }}>דרך Pivot · מקוון</div>
          </div>
          <div style={{ color: '#8C8C8C', fontSize: 20 }}>⋮</div>
        </div>
        {/* Messages */}
        <div style={{
          flex: 1, padding: '16px 14px',
          display: 'flex', flexDirection: 'column', gap: 10,
          background: '#F5F5F5',
          overflow: 'hidden',
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: m.from === 'me' ? 'flex-start' : 'flex-end',
            }}>
              <div style={{
                maxWidth: '78%',
                background: m.from === 'me' ? '#1A2BFB' : '#fff',
                color: m.from === 'me' ? '#fff' : '#000',
                padding: '8px 12px',
                borderRadius: m.from === 'me'
                  ? '14px 14px 4px 14px'
                  : '14px 14px 14px 4px',
                fontSize: 13.5,
                lineHeight: 1.4,
                whiteSpace: 'pre-line',
                boxShadow: m.from === 'me' ? 'none' : '0 1px 2px rgba(0,0,0,0.06)',
              }}>
                {m.tag && (
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                    color: '#1A2BFB', marginBottom: 4, textTransform: 'uppercase',
                    fontFamily: 'Rubik, monospace',
                  }}>{m.tag}</div>
                )}
                {m.text}
                <div style={{
                  fontSize: 9.5, opacity: 0.6, marginTop: 3, textAlign: 'left',
                  direction: 'ltr',
                }}>{m.time}{m.from === 'me' ? ' ✓✓' : ''}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        <div style={{
          padding: '10px 14px 16px',
          background: '#fff',
          borderTop: '1px solid #E8E8E8',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            flex: 1, height: 38, borderRadius: 19,
            background: '#F5F5F5',
            display: 'flex', alignItems: 'center', padding: '0 14px',
            fontSize: 13, color: '#8C8C8C',
          }}>הקלידו הודעה...</div>
          <div style={{
            width: 38, height: 38, borderRadius: 999,
            background: '#1A2BFB',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 16,
          }}>↑</div>
        </div>
      </div>
    </div>
  );
}

// ---------- Dashboard screenshot (orders board) ----------
function DashboardOrders({ width = 760, height = 480 }) {
  const rows = [
    { id: '#4821', supplier: 'ירקות השדה', status: 'נשלח', statusColor: '#1A2BFB', amount: '322.80', items: 2, eta: 'מחר 06:00' },
    { id: '#4820', supplier: 'בשרים אחים לוי', status: 'אושר', statusColor: '#000', amount: '1,840.00', items: 7, eta: 'היום 14:00' },
    { id: '#4819', supplier: 'מאפיית ברקת', status: 'התקבל', statusColor: '#8C8C8C', amount: '264.50', items: 4, eta: '—' },
    { id: '#4818', supplier: 'דגי הים התיכון', status: 'נשלח', statusColor: '#1A2BFB', amount: '780.00', items: 3, eta: 'מחר 05:30' },
    { id: '#4817', supplier: 'יינות גליל', status: 'אושר', statusColor: '#000', amount: '2,150.00', items: 12, eta: 'יום ה׳ 10:00' },
    { id: '#4816', supplier: 'גבינות בוטיק', status: 'התקבל', statusColor: '#8C8C8C', amount: '512.30', items: 5, eta: '—' },
  ];
  return (
    <div style={{
      width, height,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 24px 60px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)',
      overflow: 'hidden',
      direction: 'rtl',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Window chrome */}
      <div style={{
        height: 36, background: '#F5F5F5',
        display: 'flex', alignItems: 'center', padding: '0 14px',
        borderBottom: '1px solid #E8E8E8',
        direction: 'ltr',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#8C8C8C' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#8C8C8C' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#8C8C8C' }} />
        </div>
        <div style={{
          flex: 1, textAlign: 'center', fontSize: 11, color: '#8C8C8C',
          fontFamily: 'Rubik, monospace', letterSpacing: '0.04em',
        }}>app.pivotlevel.co — הזמנות</div>
      </div>
      {/* Sidebar + content */}
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{
          width: 180, background: '#000', color: '#fff',
          padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <div style={{ marginBottom: 18 }}>
            <Wordmark size={14} color="#fff" onDark={true} />
          </div>
          {[
            { label: 'הזמנות', active: true, count: 12 },
            { label: 'ספקים', count: 34 },
            { label: 'חשבוניות', count: 8 },
            { label: 'מלאי' },
            { label: 'דוחות' },
            { label: 'הגדרות' },
          ].map((it, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 10px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: it.active ? '#1A2BFB' : 'transparent',
              color: it.active ? '#fff' : 'rgba(255,255,255,0.7)',
            }}>
              <span>{it.label}</span>
              {it.count && (
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  background: it.active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                  padding: '2px 7px', borderRadius: 999,
                }}>{it.count}</span>
              )}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, padding: '24px 28px', overflow: 'hidden' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            marginBottom: 20,
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#8C8C8C', textTransform: 'uppercase' }}>היום</div>
              <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em' }}>12 הזמנות פעילות</div>
            </div>
            <div style={{
              height: 38, padding: '0 16px', borderRadius: 999,
              background: '#1A2BFB', color: '#fff', fontSize: 13, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 16 }}>+</span> הזמנה חדשה
            </div>
          </div>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '70px 1fr 90px 100px 110px 30px',
            gap: 12,
            padding: '10px 0', borderBottom: '1px solid #E8E8E8',
            fontSize: 10, fontWeight: 700, color: '#8C8C8C',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            <div>מס׳</div>
            <div>ספק</div>
            <div>פריטים</div>
            <div>סכום</div>
            <div>הגעה</div>
            <div></div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '70px 1fr 90px 100px 110px 30px',
              gap: 12, alignItems: 'center',
              padding: '12px 0', borderBottom: '1px solid #E8E8E8',
              fontSize: 13,
            }}>
              <div style={{ fontFamily: 'Rubik, monospace', fontWeight: 600, color: '#8C8C8C' }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: 999, background: r.statusColor }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{r.supplier}</div>
                  <div style={{ fontSize: 11, color: '#8C8C8C' }}>{r.status}</div>
                </div>
              </div>
              <div style={{ color: '#000' }}>{r.items} פריטים</div>
              <div style={{ fontWeight: 700, fontFamily: 'Rubik, sans-serif' }}>₪{r.amount}</div>
              <div style={{ fontSize: 12, color: '#000' }}>{r.eta}</div>
              <div style={{ color: '#8C8C8C' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Supplier directory card ----------
function SuppliersScreen({ width = 760, height = 480 }) {
  const cats = ['הכל · 34', 'ירקות · 6', 'בשר ועוף · 5', 'דגים · 3', 'מאפים · 4', 'אלכוהול · 7', 'מוצרי חלב · 5', 'ניקיון · 4'];
  const cards = [
    { name: 'ירקות השדה', cat: 'ירקות וירק', orders: 142, avg: '2 שעות', last: 'אתמול' },
    { name: 'בשרים אחים לוי', cat: 'בשר ועוף', orders: 88, avg: '4 שעות', last: 'לפני 3 ימים' },
    { name: 'דגי הים התיכון', cat: 'דגים ופירות ים', orders: 56, avg: '12 שעות', last: 'אתמול' },
    { name: 'מאפיית ברקת', cat: 'לחמים ומאפים', orders: 210, avg: '1 שעה', last: 'היום' },
    { name: 'יינות גליל', cat: 'אלכוהול ומשקאות', orders: 34, avg: '1 יום', last: 'לפני שבוע' },
    { name: 'גבינות בוטיק', cat: 'מוצרי חלב', orders: 71, avg: '6 שעות', last: 'אתמול' },
  ];
  return (
    <div style={{
      width, height,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 24px 60px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)',
      overflow: 'hidden',
      direction: 'rtl',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        height: 36, background: '#F5F5F5',
        display: 'flex', alignItems: 'center', padding: '0 14px',
        borderBottom: '1px solid #E8E8E8', direction: 'ltr',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#8C8C8C' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#8C8C8C' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#8C8C8C' }} />
        </div>
        <div style={{
          flex: 1, textAlign: 'center', fontSize: 11, color: '#8C8C8C',
          fontFamily: 'Rubik, monospace',
        }}>app.pivotlevel.co — ספקים</div>
      </div>
      <div style={{ padding: '28px 32px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#8C8C8C', textTransform: 'uppercase' }}>הספרייה שלי</div>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em' }}>34 ספקים פעילים</div>
          </div>
          <div style={{
            height: 38, padding: '0 16px', borderRadius: 999,
            background: '#000', color: '#fff', fontSize: 13, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>+ הוסיפו ספק</div>
        </div>
        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
          {cats.map((c, i) => (
            <div key={i} style={{
              padding: '6px 12px', borderRadius: 999,
              background: i === 0 ? '#000' : '#F5F5F5',
              color: i === 0 ? '#fff' : '#000',
              fontSize: 12, fontWeight: 600,
            }}>{c}</div>
          ))}
        </div>
        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {cards.map((c, i) => (
            <div key={i} style={{
              padding: 14, borderRadius: 12,
              border: '1px solid #E8E8E8',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: '#1A2BFB', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 14,
              }}>{c.name[0]}</div>
              <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em' }}>{c.name}</div>
              <div style={{ fontSize: 11, color: '#8C8C8C' }}>{c.cat}</div>
              <div style={{
                display: 'flex', gap: 12, marginTop: 4,
                fontSize: 11, color: '#8C8C8C',
              }}>
                <span><b style={{ color: '#000', fontWeight: 700 }}>{c.orders}</b> הזמנות</span>
                <span>תגובה ~{c.avg}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Invoices screen ----------
function InvoicesScreen({ width = 760, height = 480 }) {
  const data = [
    { m: 'ינואר', val: 42 },
    { m: 'פבר׳', val: 58 },
    { m: 'מרץ', val: 51 },
    { m: 'אפר׳', val: 64 },
    { m: 'מאי', val: 72 },
    { m: 'יוני', val: 68 },
    { m: 'יולי', val: 84 },
    { m: 'אוג׳', val: 91 },
  ];
  const max = Math.max(...data.map(d => d.val));
  return (
    <div style={{
      width, height,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 24px 60px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)',
      overflow: 'hidden',
      direction: 'rtl',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        height: 36, background: '#F5F5F5',
        display: 'flex', alignItems: 'center', padding: '0 14px',
        borderBottom: '1px solid #E8E8E8', direction: 'ltr',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#8C8C8C' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#8C8C8C' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#8C8C8C' }} />
        </div>
        <div style={{
          flex: 1, textAlign: 'center', fontSize: 11, color: '#8C8C8C',
          fontFamily: 'Rubik, monospace',
        }}>app.pivotlevel.co — חשבוניות</div>
      </div>
      <div style={{ padding: '28px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#8C8C8C', textTransform: 'uppercase' }}>חודש זה</div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.025em' }}>₪48,210</div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#fff', background: '#1A2BFB',
                padding: '3px 9px', borderRadius: 999,
              }}>+12% חודש קודם</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['שבוע', 'חודש', 'רבעון', 'שנה'].map((t, i) => (
              <div key={i} style={{
                padding: '6px 14px', borderRadius: 999,
                background: i === 1 ? '#000' : 'transparent',
                color: i === 1 ? '#fff' : '#000',
                border: i === 1 ? 'none' : '1px solid #E8E8E8',
                fontSize: 12, fontWeight: 600,
              }}>{t}</div>
            ))}
          </div>
        </div>
        {/* Bar chart */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'flex-end', gap: 12,
          padding: '20px 0', borderTop: '1px solid #E8E8E8',
          direction: 'ltr',
        }}>
          {data.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: '100%', height: `${(d.val / max) * 180}px`,
                background: i === data.length - 1 ? '#1A2BFB' : (i === data.length - 2 ? '#000' : '#E8E8E8'),
                borderRadius: '6px 6px 0 0',
                position: 'relative',
              }}>
                {i === data.length - 1 && (
                  <div style={{
                    position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
                    fontSize: 11, fontWeight: 700, color: '#1A2BFB',
                    fontFamily: 'Rubik, sans-serif',
                  }}>₪{d.val}k</div>
                )}
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#8C8C8C', direction: 'rtl' }}>{d.m}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Notifications screen ----------
function NotificationsScreen({ width = 760, height = 480 }) {
  const notes = [
    { kind: 'urgent', title: 'חסר במלאי: עגבניות שרי', body: 'נשארו 2 ק"ג. ירקות השדה זמינים — לחץ להזמין.', time: 'לפני 2 ד׳', cta: 'הזמינו עכשיו' },
    { kind: 'price', title: 'עלייה במחיר: סלמון נורווגי', body: 'דגי הים התיכון העלו ב-8%. השוו מחירים — 3 חלופות.', time: 'לפני 14 ד׳', cta: 'השוו מחירים' },
    { kind: 'ok', title: 'הזמנה #4818 נמסרה', body: 'דגי הים התיכון — 3 פריטים, ₪780.00', time: 'לפני שעה' },
    { kind: 'price', title: 'מחיר חדש משופר', body: 'גבינות בוטיק — חלת בור פטה זול ב-14% מהרגיל.', time: 'אתמול 17:32', cta: 'הוסיפו לעגלה' },
  ];
  const iconFor = (k) => k === 'urgent' ? '!' : k === 'price' ? '₪' : '✓';
  const colorFor = (k) => k === 'urgent' ? '#1A2BFB' : k === 'price' ? '#000' : '#8C8C8C';
  return (
    <div style={{
      width, height,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 24px 60px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)',
      overflow: 'hidden',
      direction: 'rtl',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        height: 36, background: '#F5F5F5',
        display: 'flex', alignItems: 'center', padding: '0 14px',
        borderBottom: '1px solid #E8E8E8', direction: 'ltr',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#8C8C8C' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#8C8C8C' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#8C8C8C' }} />
        </div>
        <div style={{
          flex: 1, textAlign: 'center', fontSize: 11, color: '#8C8C8C',
          fontFamily: 'Rubik, monospace',
        }}>app.pivotlevel.co — התראות</div>
      </div>
      <div style={{ padding: '28px 32px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#8C8C8C', textTransform: 'uppercase' }}>חי</div>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em' }}>התראות חכמות</div>
          </div>
          <div style={{ fontSize: 12, color: '#8C8C8C' }}>סימן הכל כנקרא</div>
        </div>
        {notes.map((n, i) => (
          <div key={i} style={{
            display: 'flex', gap: 14, padding: '14px 16px',
            border: '1px solid #E8E8E8', borderRadius: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: colorFor(n.kind), color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 16,
              fontFamily: 'Rubik, sans-serif',
              flexShrink: 0,
            }}>{iconFor(n.kind)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em' }}>{n.title}</div>
                <div style={{ fontSize: 11, color: '#8C8C8C' }}>{n.time}</div>
              </div>
              <div style={{ fontSize: 12.5, color: '#4A4A4A', marginTop: 3, lineHeight: 1.45 }}>{n.body}</div>
              {n.cta && (
                <div style={{
                  display: 'inline-flex', marginTop: 8,
                  fontSize: 11.5, fontWeight: 700, color: '#1A2BFB',
                }}>← {n.cta}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Logo bar placeholder wordmarks ----------
const VANITY_LOGOS = [
  { name: 'Sapore', style: { fontFamily: 'Heebo', fontWeight: 900, letterSpacing: '-0.04em', fontSize: 26 } },
  { name: 'נומאד', style: { fontFamily: 'Heebo', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 26 } },
  { name: 'KILO', style: { fontFamily: 'Rubik', fontWeight: 700, letterSpacing: '0.25em', fontSize: 22 } },
  { name: 'בייקרי 12', style: { fontFamily: 'Heebo', fontWeight: 700, fontStyle: 'italic', fontSize: 26 } },
  { name: 'Forma', style: { fontFamily: 'Heebo', fontWeight: 300, letterSpacing: '0.04em', fontSize: 26 } },
  { name: 'מרים בר', style: { fontFamily: 'Heebo', fontWeight: 900, fontSize: 24 } },
  { name: 'OISO', style: { fontFamily: 'Rubik', fontWeight: 900, letterSpacing: '-0.05em', fontSize: 28 } },
  { name: 'דג מלוח', style: { fontFamily: 'Heebo', fontWeight: 600, fontSize: 24 } },
];

// ---------- Sticker — single hand-drawn doodle ----------
// New high-res sticker set in assets/stickers2/
// Available names: steak, veggies, wine, cleaning, banana, cutlery
function Sticker({ name, size = 100, rotate = 0, style = {}, className = '' }) {
  return (
    <img
      src={`assets/stickers2/${name}.png`}
      alt=""
      aria-hidden="true"
      className={className}
      style={{
        width: size,
        height: 'auto',
        display: 'block',
        transform: `rotate(${rotate}deg)`,
        filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.22))',
        pointerEvents: 'none',
        userSelect: 'none',
        ...style,
      }}
    />
  );
}

// ---------- StickerPill — brown rounded label, sticker-pack style ----------
function StickerPill({ children, rotate = 0, color = '#3D2618', fontSize = 16, style = {} }) {
  return (
    <span style={{
      display: 'inline-block',
      background: color,
      color: '#FAF3E0',
      padding: `${fontSize * 0.55}px ${fontSize * 1.15}px`,
      borderRadius: '999px',
      fontFamily: '"Heebo", sans-serif',
      fontWeight: 900,
      fontSize,
      lineHeight: 1,
      letterSpacing: '0.04em',
      transform: `rotate(${rotate}deg)`,
      boxShadow: `0 0 0 6px #FAF3E0, 0 0 0 7px #3D2618, 0 8px 18px rgba(0,0,0,0.18)`,
      whiteSpace: 'nowrap',
      ...style,
    }}>
      {children}
    </span>
  );
}

// ---------- Tiny brown sparkle (vector) ----------
function StickerSparkle({ size = 18, color = '#3D2618', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'inline-block', ...style }} aria-hidden="true">
      <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={color} />
    </svg>
  );
}

// ---------- StickerIcon — branded die-cut sticker icon ----------
// Replaces plain emoji everywhere with one consistent visual language:
// a glossy, white-bordered die-cut sticker carrying a bold white glyph.
// names: box, receipt, lock, clock, check, chat, trend, bolt, sparkle
function shadeHex(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v) => Math.max(0, Math.min(255, v));
  const r = clamp((n >> 16) + amt);
  const g = clamp(((n >> 8) & 255) + amt);
  const b = clamp((n & 255) + amt);
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

const STICKER_GLYPHS = {
  box: (
    <>
      <path d="M12 2.6 L20.5 7 V17 L12 21.4 L3.5 17 V7 Z" />
      <path d="M3.5 7 L12 11.4 L20.5 7" />
      <path d="M12 11.4 V21.4" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 2.8 H18 V20 L15 18.3 L12 20 L9 18.3 L6 20 Z" />
      <path d="M9 8 H15" />
      <path d="M9 11.4 H15" />
      <path d="M9 14.8 H13" />
    </>
  ),
  lock: (
    <>
      <path d="M8.2 10.5 V7.8 A3.8 3.8 0 0 1 15.8 7.8 V10.5" />
      <path d="M5.6 10.5 H18.4 V20 H5.6 Z" />
      <path d="M12 14 V16.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12.5" r="8.6" />
      <path d="M12 12.5 V7.4" />
      <path d="M12 12.5 L16 14.6" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M7.8 12.4 L10.8 15.4 L16.4 8.8" />
    </>
  ),
  chat: (
    <>
      <path d="M3.6 6.4 H20.4 V14.4 H10.2 L6.2 18.4 V14.4 H3.6 Z" />
      <path d="M9 10.4 L9 10.4" />
      <path d="M12 10.4 L12 10.4" />
      <path d="M15 10.4 L15 10.4" />
    </>
  ),
  trend: (
    <>
      <path d="M3.6 16.4 L9 11 L13 14 L20.4 6.6" />
      <path d="M20.4 6.6 H15.6" />
      <path d="M20.4 6.6 V11.4" />
    </>
  ),
  bolt: <path d="M13 2.6 L5 13.4 H11 L10 21.4 L18.4 9.8 H12 Z" />,
  sparkle: <path d="M12 2.4 L13.9 10.1 L21.6 12 L13.9 13.9 L12 21.6 L10.1 13.9 L2.4 12 L10.1 10.1 Z" />,
};

function StickerIcon({ name, size = 24, color = '#fff', rotate = 0, strokeWidth = 2.1, style = {} }) {
  const filled = name === 'sparkle';
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill={filled ? color : 'none'}
      stroke={filled ? 'none' : color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      style={{
        display: 'block', flexShrink: 0,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}>
      {STICKER_GLYPHS[name]}
    </svg>
  );
}

// ---------- LogoWatermark — faint oversized logo behind a section ----------
// Sits absolutely in a section corner, mostly bleeding off-edge. The section
// needs position:relative + overflow:hidden, and its content a positive z-index.
function LogoWatermark({ corner = 'bottom-left', size = 'clamp(260px, 34vw, 520px)', dark = false }) {
  const place = {
    'top-right': { top: '-7%', right: '-6%' },
    'top-left': { top: '-7%', left: '-6%' },
    'bottom-right': { bottom: '-11%', right: '-7%' },
    'bottom-left': { bottom: '-11%', left: '-7%' },
  }[corner];
  return (
    <img
      src="assets/pivot-logo-mark.png"
      alt=""
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        ...place,
        opacity: dark ? 0.16 : 0.09,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
      }}
    />
  );
}

// ---------- ScrollMarquee — infinite horizontal scroller ----------
// Duplicates children so the animation loops seamlessly. Pass speed via className
// (pivot-marquee-slow / pivot-marquee-fast).
function ScrollMarquee({ children, speed = 'normal', reverse = false, gap = 56, style = {} }) {
  const speedCls = speed === 'slow' ? 'pivot-marquee-slow' : speed === 'fast' ? 'pivot-marquee-fast' : '';
  const items = Array.isArray(children) ? children : React.Children.toArray(children);
  return (
    <div style={{ overflow: 'hidden', direction: 'ltr', ...style }}>
      <div
        className={`pivot-marquee ${speedCls}`}
        style={{
          gap, alignItems: 'center',
          animationDirection: reverse ? 'reverse' : 'normal',
        }}>
        {/* Render twice for seamless loop */}
        {items.map((it, i) => <div key={`a-${i}`} style={{ flexShrink: 0 }}>{it}</div>)}
        {items.map((it, i) => <div key={`b-${i}`} style={{ flexShrink: 0 }} aria-hidden="true">{it}</div>)}
      </div>
    </div>
  );
}

// ---------- LiveTicker — fake real-time activity feed ----------
function LiveTicker() {
  const lines = [
    'מסעדת Sapore הזמינה 14 ק"ג עגבניות שרי',
    'נומאד אישרה משלוח מבשרים אחים לוי',
    'בייקרי 12 שלחה הזמנה חדשה למאפיית ברקת',
    'KILO ביטלה הזמנה — קיבלה חזרה ₪322',
    'מרים בר עברה למחירון חדש של יינות גליל',
    'OISO ביצעה הזמנה חוזרת — דגי הים התיכון',
    'דג מלוח הוסיפה ספק חדש: גבינות בוטיק',
    'Forma אישרה משלוח של מאפיית ברקת',
  ];
  return (
    <ScrollMarquee speed="slow" gap={40}>
      {lines.map((l, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 13, fontWeight: 600,
          color: 'rgba(255,255,255,0.9)',
          fontFamily: 'Heebo, sans-serif',
          direction: 'rtl',
          whiteSpace: 'nowrap',
        }}>
          <span className="pivot-pulse-dot" style={{
            width: 8, height: 8, borderRadius: 999,
            background: '#fff', flexShrink: 0,
          }} />
          <span>{l}</span>
          <span style={{ opacity: 0.4 }}>•</span>
        </div>
      ))}
    </ScrollMarquee>
  );
}

// ---------- Compact chat mockup variants (for stacking) ----------
// Two slimmer phone mockups showing different supplier conversations, used in
// the hero cascade. Same visual language as ChatMockup but at 280×500.
function ChatMockupCompact({ scene = 'bakery', scale = 1 }) {
  const scenes = {
    bakery: {
      avatar: 'מ', name: 'מאפיית ברקת', tag: '#4819',
      messages: [
        { from: 'me', text: '20 חלות לשבת בבקשה' },
        { from: 'bot', text: 'מאושר ✓\n₪264.50 · משלוח יום ו׳ 06:00' },
      ],
    },
    fish: {
      avatar: 'ד', name: 'דגי הים התיכון', tag: '#4818',
      messages: [
        { from: 'me', text: 'יש לכם סלמון טרי היום?' },
        { from: 'bot', text: 'יש! ₪89/ק"ג\nכמה ק"ג?' },
        { from: 'me', text: '8 ק"ג, משלוח מחר' },
      ],
    },
    wine: {
      avatar: 'י', name: 'יינות גליל', tag: '#4817',
      messages: [
        { from: 'me', text: 'הזמנה חוזרת — אותו דבר כמו לפני שבוע' },
        { from: 'bot', text: '12 בקבוקים · ₪2,150\nאישור ב-2 שעות ✓' },
      ],
    },
  };
  const s = scenes[scene];
  return (
    <div style={{
      width: 280, height: 500,
      background: '#000', borderRadius: 36, padding: 6,
      boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.2)',
      transform: `scale(${scale})`, transformOrigin: 'top center',
      direction: 'rtl',
    }}>
      <div style={{
        width: '100%', height: '100%', background: '#fff',
        borderRadius: 30, overflow: 'hidden',
        display: 'flex', flexDirection: 'column', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
          width: 76, height: 20, background: '#000', borderRadius: 999, zIndex: 2,
        }} />
        <div style={{
          padding: '34px 18px 10px',
          display: 'flex', alignItems: 'center', gap: 10,
          borderBottom: '1px solid #E8E8E8',
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 999, background: '#1A2BFB',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: 14,
          }}>{s.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>
            <div style={{ fontSize: 10, color: '#8C8C8C' }}>דרך Pivot · מקוון</div>
          </div>
        </div>
        <div style={{
          flex: 1, padding: '14px 12px', background: '#F5F5F5',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {s.messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-start' : 'flex-end' }}>
              <div style={{
                maxWidth: '82%',
                background: m.from === 'me' ? '#1A2BFB' : '#fff',
                color: m.from === 'me' ? '#fff' : '#000',
                padding: '7px 11px',
                borderRadius: m.from === 'me' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                fontSize: 12, lineHeight: 1.35, whiteSpace: 'pre-line',
                boxShadow: m.from === 'me' ? 'none' : '0 1px 2px rgba(0,0,0,0.06)',
              }}>{m.text}</div>
            </div>
          ))}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#fff', borderRadius: 12, padding: '8px 12px',
            marginTop: 'auto',
            fontSize: 10, fontWeight: 700, color: '#1A2BFB',
            border: '1px solid #E8E8E8',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 999, background: '#1A2BFB',
            }} />
            <span style={{ fontFamily: 'Rubik, monospace' }}>הזמנה {s.tag}</span>
            <span style={{ color: '#8C8C8C', flex: 1, textAlign: 'left' }}>נשמר ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// ---------- HeroBackground — layered blue mesh ----------
// Stack of soft blobs in different blue shades, a subtle dot grid, and noise
// for grain. The container needs position:relative so the absolute layers
// fill it. Place the hero content with position:relative + zIndex: 1.
function HeroBackground({ accent = '#1A2BFB', children, style = {} }) {
  return (
    <div className="pivot-hero-bg" style={{ background: accent, ...style }}>
      {/* Soft cyan-violet blob top-right */}
      <div className="pivot-blob" style={{
        width: 900, height: 900,
        background: '#5E6FFF',
        top: -200, right: -150, opacity: 0.45,
        animation: 'pivot-blob-1 18s ease-in-out infinite',
      }} />
      {/* Deep navy blob top-left */}
      <div className="pivot-blob" style={{
        width: 700, height: 700,
        background: '#0A0E5E',
        top: -100, left: -100, opacity: 0.65,
        mixBlendMode: 'multiply',
        animation: 'pivot-blob-2 22s ease-in-out infinite',
      }} />
      {/* Lavender blob center-bottom */}
      <div className="pivot-blob" style={{
        width: 1100, height: 1100,
        background: '#7B66FF',
        bottom: -400, left: '30%', opacity: 0.4,
        animation: 'pivot-blob-3 26s ease-in-out infinite',
      }} />
      {/* Electric highlight middle-right */}
      <div className="pivot-blob" style={{
        width: 550, height: 550,
        background: '#3A4DFF',
        top: '40%', right: '20%', opacity: 0.35,
        animation: 'pivot-blob-1 20s ease-in-out infinite reverse',
      }} />
      {/* Inky bottom-left */}
      <div className="pivot-blob" style={{
        width: 600, height: 600,
        background: '#000B6E',
        bottom: -120, left: -80, opacity: 0.55,
        mixBlendMode: 'multiply',
        animation: 'pivot-blob-2 24s ease-in-out infinite reverse',
      }} />

      {/* Light leaks */}
      <div className="pivot-hero-leak-top" />
      <div className="pivot-hero-leak-bottom" />

      {/* Dotted grid overlay */}
      <div className="pivot-hero-grid" />
      {/* Edge vignette */}
      <div className="pivot-hero-rays" />
      {/* Grain */}
      <div className="pivot-hero-noise" />

      {children}
    </div>
  );
}

// ---------- CommandPanel — premium chat command center ----------
function CommandPanel({ showFloats = true }) {
  const messages = [
    { from: 'me', text: 'מה חסר לבר?' },
    { from: 'bot', text: '📦 חסר לפי מצבת בסיס:\nיין לבן × 6\nטוניק × 12\nליים × 4 ק"ג' },
    { from: 'me', text: 'תכין הזמנה לאישור' },
    { from: 'bot', text: '✅ הזמנה נבנתה\n🔐 ממתינה לאישור מנהל\n⏱️ ספק נסגר בשעה 14:00' },
    { from: 'me', text: 'מה התייקר השבוע?' },
    { from: 'bot', text: '📈 השבוע התייקרו:\nעגבניות +11%\nטונה +7%\nגבינה +5%' },
  ];
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 760 }}>
      {/* Main chat sheet */}
      <div style={{
        width: '100%', maxWidth: 740,
        background: '#fff', color: '#000',
        borderRadius: 32,
        padding: '0',
        boxShadow: `
          0 0 0 1px rgba(255,255,255,0.1),
          0 60px 140px -30px rgba(0,0,0,0.6),
          0 30px 70px -20px rgba(0,0,0,0.4)
        `,
        direction: 'rtl',
        position: 'relative', zIndex: 3,
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '22px 28px',
          borderBottom: '1px solid #E8E8E8',
        }}>
          <div style={{ position: 'relative' }}>
            <img src="assets/pivot-logo.jpg" alt="Pivot" style={{
              width: 46, height: 46, borderRadius: 999,
              objectFit: 'cover', display: 'block',
              boxShadow: '0 4px 16px rgba(26,43,251,0.4)',
            }} />
            {/* Online dot */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0,
              width: 14, height: 14, borderRadius: 999,
              background: '#1B7F3A',
              border: '2.5px solid #fff',
            }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: 8 }}>
              Pivot · ניהול מלאי
              <span style={{
                padding: '3px 8px', borderRadius: 4,
                background: 'rgba(26,43,251,0.1)', color: '#1A2BFB',
                fontSize: 10, fontWeight: 800,
                fontFamily: 'Rubik, sans-serif', letterSpacing: '0.06em',
              }}>BETA</span>
            </div>
            <div style={{ fontSize: 12, color: '#8C8C8C', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              עונה תוך 2 שניות · 240+ מסעדות פעילות
            </div>
          </div>
          <div style={{
            padding: '7px 12px', borderRadius: 999,
            background: '#F5F5F5',
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 700, color: '#000',
            fontFamily: 'Rubik, monospace', letterSpacing: '0.04em',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: '#25D366' }} />
            WhatsApp Business
          </div>
        </div>

        {/* Messages */}
        <div style={{
          padding: '24px 28px 28px',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: m.from === 'me' ? 'flex-start' : 'flex-end',
            }}>
              <div style={{
                maxWidth: '78%',
                background: m.from === 'me' ? '#1A2BFB' : '#F5F5F5',
                color: m.from === 'me' ? '#fff' : '#000',
                padding: '14px 18px',
                borderRadius: m.from === 'me' ? '20px 20px 6px 20px' : '20px 20px 20px 6px',
                fontSize: 17, lineHeight: 1.5, fontWeight: 500,
                whiteSpace: 'pre-line',
                letterSpacing: '-0.01em',
                boxShadow: m.from === 'me' ? '0 6px 18px rgba(26,43,251,0.28)' : '0 1px 2px rgba(0,0,0,0.04)',
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {/* Typing indicator */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              padding: '14px 18px', borderRadius: '20px 20px 20px 6px',
              background: '#F5F5F5', display: 'flex', gap: 5,
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            }}>
              {[0, 1, 2].map((d) => (
                <span key={d} className="pivot-pulse-dot" style={{
                  width: 8, height: 8, borderRadius: 999, background: '#8C8C8C',
                  animationDelay: `${d * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating cards — glass morphism style (desktop only) */}
      {showFloats && (
        <>
      <FloatCard
        style={{ position: 'absolute', top: 40, right: -50, transform: 'rotate(4deg)', width: 250, zIndex: 4 }}
        sticker="box" stickerColor="#1A2BFB" tone="glass-light"
        eyebrow="מצבת חסרים · BAR"
        title="3 פריטים מתחת ל-Par"
        rows={[
          { name: 'יין לבן', value: '6 ↓' },
          { name: 'טוניק', value: '12 ↓' },
          { name: 'ליים', value: '4 ק"ג' },
        ]}
      />
      <FloatCard
        style={{ position: 'absolute', top: 290, right: -20, transform: 'rotate(-5deg)', width: 230, zIndex: 4 }}
        sticker="lock" stickerColor="#fff" tone="dark"
        eyebrow="ממתין לאישור"
        title="2 הזמנות"
        rows={[
          { name: 'בר · ₪1,840', value: '⏱' },
          { name: 'מטבח · ₪3,260', value: '⏱' },
        ]}
      />
      <FloatCard
        style={{ position: 'absolute', bottom: 80, right: -50, transform: 'rotate(3deg)', width: 230, zIndex: 4 }}
        sticker="trend" stickerColor="#fff" tone="blue"
        eyebrow="התייקרו השבוע"
        title="+11% עגבניות"
        rows={[
          { name: 'טונה', value: '+7%' },
          { name: 'גבינה', value: '+5%' },
        ]}
      />
      <FloatCard
        style={{ position: 'absolute', top: 180, left: -60, transform: 'rotate(-3deg)', width: 230, zIndex: 4 }}
        sticker="clock" stickerColor="#1A2BFB" tone="glass-light"
        eyebrow="חיתוך · אחים כהן"
        title="עד 11:00"
        rows={[
          { name: 'נשארו', value: '2:14' },
          { name: 'משלוח', value: 'מחר 06:00' },
        ]}
      />
        </>
      )}
    </div>
  );
}

function FloatCard({ sticker, stickerColor = '#1A2BFB', tone = 'white', eyebrow, title, rows, style }) {
  const palettes = {
    white: {
      bg: '#fff', fg: '#000', muted: '#8C8C8C', accent: '#1A2BFB',
      border: '1px solid rgba(0,0,0,0.05)',
      shadow: '0 30px 60px -15px rgba(0,0,0,0.35), 0 8px 24px -8px rgba(0,0,0,0.2)',
      backdrop: 'none',
    },
    'glass-light': {
      bg: 'rgba(255,255,255,0.92)', fg: '#000', muted: '#8C8C8C', accent: '#1A2BFB',
      border: '1px solid rgba(255,255,255,0.6)',
      shadow: '0 30px 60px -15px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5)',
      backdrop: 'blur(20px) saturate(140%)',
    },
    dark: {
      bg: 'rgba(0,0,0,0.85)', fg: '#fff', muted: 'rgba(255,255,255,0.55)', accent: '#fff',
      border: '1px solid rgba(255,255,255,0.1)',
      shadow: '0 30px 60px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
      backdrop: 'blur(20px)',
    },
    blue: {
      bg: '#1A2BFB', fg: '#fff', muted: 'rgba(255,255,255,0.7)', accent: '#fff',
      border: '1px solid rgba(255,255,255,0.15)',
      shadow: '0 30px 60px -15px rgba(26,43,251,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
      backdrop: 'none',
    },
  };
  const p = palettes[tone];
  return (
    <div style={{
      background: p.bg, color: p.fg,
      borderRadius: 18,
      padding: '16px 18px',
      boxShadow: p.shadow,
      border: p.border,
      backdropFilter: p.backdrop,
      WebkitBackdropFilter: p.backdrop,
      direction: 'rtl',
      ...style,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 9,
        fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: p.muted,
        fontFamily: 'Rubik, sans-serif',
        marginBottom: 10,
      }}>
        <StickerIcon name={sticker} size={18} color={stickerColor} />
        <span>{eyebrow}</span>
      </div>
      <div style={{
        fontSize: 19, fontWeight: 800, letterSpacing: '-0.015em',
        lineHeight: 1.1, marginBottom: 12, color: p.accent,
      }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 12.5, fontWeight: 600,
            paddingBottom: i < rows.length - 1 ? 6 : 0,
            borderBottom: i < rows.length - 1 ? `1px solid ${tone === 'dark' || tone === 'blue' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` : 'none',
          }}>
            <span style={{ color: p.fg }}>{r.name}</span>
            <span style={{ color: p.muted, fontFamily: 'Rubik, monospace' }}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


export {
  Wordmark,
  ChatMockup,
  ChatMockupCompact,
  DashboardOrders,
  SuppliersScreen,
  InvoicesScreen,
  NotificationsScreen,
  VANITY_LOGOS,
  Sticker,
  StickerIcon,
  StickerPill,
  StickerSparkle,
  LogoWatermark,
  ScrollMarquee,
  LiveTicker,
  CommandPanel,
  HeroBackground,
};
