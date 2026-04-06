import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Services', to: '/services', num: '01' },
  { label: 'Work',     to: '/work',     num: '02' },
  { label: 'About',    to: '/about',    num: '03' },
  { label: 'Contact',  to: '/contact',  num: '04' },
  { label: 'Book',     to: '/book',     num: '05' },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* ── Floating pill navbar wrapper ──────────────────────── */}
      <div
        style={{
          position: 'fixed',
          top:      '16px',
          left:     0,
          right:    0,
          zIndex:   100,
          display:  'flex',
          justifyContent: 'center',
          padding:  '0 20px',
          pointerEvents: 'none',
        }}
      >
        <motion.header
          animate={{
            width:  scrolled ? '780px' : '900px',
            height: scrolled ? '52px'  : '62px',
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            pointerEvents:        'auto',
            maxWidth:             '100%',
            borderRadius:         '100px',
            background:           scrolled
              ? 'rgba(12,12,12,0.82)'
              : 'rgba(12,12,12,0.55)',
            backdropFilter:       'saturate(180%) blur(24px)',
            WebkitBackdropFilter: 'saturate(180%) blur(24px)',
            border:               '1px solid rgba(255,255,255,0.08)',
            boxShadow:            '0 8px 40px rgba(0,0,0,0.45)',
            display:              'grid',
            gridTemplateColumns:  '1fr auto 1fr',
            alignItems:           'center',
            padding:              '0 28px',
            overflow:             'hidden',
            position:             'relative',
          }}
        >
          {/* gold ring accent on scroll */}
          <motion.span
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position:     'absolute',
              inset:        0,
              borderRadius: '100px',
              border:       '1px solid rgba(201,169,110,0.18)',
              pointerEvents:'none',
            }}
          />

          {/* ── LEFT — Logo ────────────────────────────────────── */}
          <Link
            to="/"
            style={{
              fontFamily:    '"Inter", sans-serif',
              fontWeight:    300,
              fontSize:      '13px',
              letterSpacing: '0.30em',
              textTransform: 'uppercase',
              color:         '#fff',
              textDecoration:'none',
              userSelect:    'none',
              whiteSpace:    'nowrap',
            }}
          >
            LOOP<span style={{ color: '#c9a96e' }}>ZEN</span>
          </Link>

          {/* ── CENTER — Nav links ─────────────────────────────── */}
          <nav
            className="hidden md:flex"
            style={{ alignItems: 'center', gap: '32px' }}
          >
            {LINKS.map(({ label, to }) => (
              <DesktopLink key={to} label={label} to={to} active={location.pathname === to} />
            ))}
          </nav>

          {/* ── RIGHT — hamburger ─────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Hamburger open={open} toggle={() => setOpen(v => !v)} />
          </div>
        </motion.header>
      </div>

      {/* ── Full-screen overlay ───────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{   clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position:      'fixed',
              inset:         0,
              zIndex:        90,
              background:    '#080808',
              display:       'flex',
              flexDirection: 'column',
            }}
          >
            {/* close button strip */}
            <div style={{
              height:         '68px',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'flex-end',
              padding:        '0 40px',
              borderBottom:   '1px solid #111',
            }}>
              <Hamburger open={open} toggle={() => setOpen(false)} />
            </div>

            {/* big stacked links */}
            <div style={{
              flex:           1,
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'center',
              padding:        '0 40px',
            }}>
              {LINKS.map(({ label, to, num }, i) => (
                <div key={to} style={{ overflow: 'hidden', borderBottom: '1px solid #111' }}>
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={to} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
                      <OverlayLink label={label} num={num} active={location.pathname === to} />
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              style={{
                padding:        '20px 40px',
                borderTop:      '1px solid #111',
                display:        'flex',
                justifyContent: 'space-between',
                alignItems:     'center',
              }}
            >
              <a href="mailto:hey@loopzen.in" style={{
                fontFamily: '"Inter", sans-serif', fontWeight: 300,
                fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#333', textDecoration: 'none',
              }}>
                hey@loopzen.in
              </a>
              <div style={{ display: 'flex', gap: '24px' }}>
                {['Instagram', 'LinkedIn'].map(s => (
                  <a key={s} href="#" style={{
                    fontFamily: '"Inter", sans-serif', fontWeight: 300,
                    fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#272727', textDecoration: 'none',
                  }}>{s}</a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Desktop nav link — bold, centered ─────────────────────── */
function DesktopLink({ label, to, active }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:       'relative',
        fontFamily:     '"Inter", sans-serif',
        fontWeight:     300,
        fontSize:       '12px',
        letterSpacing:  '0.12em',
        textTransform:  'uppercase',
        color:          active ? '#c9a96e' : hov ? '#ffffff' : '#888888',
        textDecoration: 'none',
        transition:     'color 0.25s ease',
        paddingBottom:  '3px',
      }}
    >
      {label}
      <span style={{
        position:        'absolute',
        bottom:          0,
        left:            0,
        height:          '1px',
        width:           '100%',
        background:      '#c9a96e',
        transformOrigin: 'left',
        transform:       (hov || active) ? 'scaleX(1)' : 'scaleX(0)',
        transition:      'transform 0.32s cubic-bezier(0.22,1,0.36,1)',
        display:         'block',
      }} />
    </Link>
  )
}

/* ─── Overlay large link ─────────────────────────────────────── */
function OverlayLink({ label, num, active }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:     'flex',
        alignItems:  'baseline',
        gap:         '20px',
        padding:     '20px 0',
        cursor:      'pointer',
        paddingLeft: hov ? '10px' : '0',
        transition:  'padding-left 0.3s ease',
      }}
    >
      <span style={{
        fontFamily: '"Inter", sans-serif', fontWeight: 300,
        fontSize: '10px', letterSpacing: '0.2em', color: '#252525',
      }}>{num}</span>
      <span style={{
        fontFamily:    '"Inter", sans-serif',
        fontWeight:    600,
        fontSize:      'clamp(26px, 5.5vw, 56px)',
        letterSpacing: '-0.01em',
        textTransform: 'uppercase',
        color:         active ? '#c9a96e' : hov ? '#fff' : '#222',
        transition:    'color 0.25s ease',
        lineHeight:    1,
      }}>{label}</span>
      {hov && (
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            fontFamily: '"Inter", sans-serif', fontWeight: 200,
            fontSize: '18px', color: '#c9a96e', marginLeft: 'auto',
          }}
        >↗</motion.span>
      )}
    </div>
  )
}


/* ─── Hamburger button ───────────────────────────────────────── */
function Hamburger({ open, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle menu"
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: '4px',
        alignItems: 'flex-end', padding: '4px',
      }}
    >
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          animate={
            open
              ? i === 0 ? { rotate: 45,  y: 5,  width: '20px' }
              : i === 1 ? { opacity: 0,  scaleX: 0 }
              :           { rotate: -45, y: -5, width: '20px' }
              : i === 1
                ? { opacity: 1, scaleX: 1, rotate: 0, y: 0, width: '12px' }
                : { rotate: 0, y: 0, width: '20px' }
          }
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'block', height: '1px',
            background: '#666', transformOrigin: 'center',
          }}
        />
      ))}
    </button>
  )
}
