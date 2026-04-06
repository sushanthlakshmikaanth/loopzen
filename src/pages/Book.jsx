import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { FadeUp, RevealLine } from '../components/ScrollReveal'

export default function Book() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "let-s-build" })
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          dark: {
            'cal-border':          'rgba(255,255,255,0.06)',
            'cal-border-emphasis': 'rgba(201,169,110,0.35)',
            'cal-brand':           '#c9a96e',
            'cal-brand-emphasis':  '#e0be89',
            'cal-bg':              '#080808',
            'cal-bg-emphasis':     '#111111',
            'cal-bg-subtle':       '#0d0d0d',
            'cal-text':            '#e8e8e8',
            'cal-text-emphasis':   '#ffffff',
            'cal-text-muted':      '#555555',
          },
        },
      })
    })()
  }, [])

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px', background: '#080808' }}>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '48px', padding: '0 24px' }}>

          <FadeUp delay={0.05}>
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '12px', marginBottom: '28px',
            }}>
              <span style={{ width: '24px', height: '1px', background: 'rgba(201,169,110,0.5)' }} />
              <span style={{
                fontFamily: '"Inter", sans-serif', fontWeight: 300,
                fontSize: '10px', letterSpacing: '0.4em',
                textTransform: 'uppercase', color: '#555',
              }}>Schedule a call</span>
              <span style={{ width: '24px', height: '1px', background: 'rgba(201,169,110,0.5)' }} />
            </div>
          </FadeUp>

          <RevealLine
            delay={0.15}
            className="font-display text-[clamp(2rem,5vw,5rem)] font-light leading-[1] text-text"
          >
            Let's build
          </RevealLine>
          <RevealLine
            delay={0.28}
            className="font-display text-[clamp(2rem,5vw,5rem)] font-light leading-[1] text-accent italic"
          >
            something real
          </RevealLine>

          <FadeUp delay={0.42}>
            <p style={{
              fontFamily: '"Inter", sans-serif', fontWeight: 300,
              fontSize: '13px', letterSpacing: '0.06em', color: '#444',
              marginTop: '20px', maxWidth: '380px', margin: '20px auto 0',
              lineHeight: 1.7,
            }}>
              Pick a time that works — we'll talk through your project, goals, and next steps.
            </p>
          </FadeUp>
        </div>

        {/* ── Cal Embed ──────────────────────────────────────────── */}
        <FadeUp delay={0.55}>
          <motion.div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.015)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
            }}>
              <Cal
                namespace="let-s-build"
                calLink="loopzen/let-s-build"
                config={{ layout: 'month_view', theme: 'dark' }}
                style={{ width: '100%', height: '100%', minHeight: '700px', overflow: 'scroll' }}
              />
            </div>
          </motion.div>
        </FadeUp>

        {/* ── Footer note ────────────────────────────────────────── */}
        <FadeUp delay={0.7}>
          <p style={{
            textAlign: 'center', marginTop: '40px',
            fontFamily: '"Inter", sans-serif', fontWeight: 300,
            fontSize: '10px', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#222',
          }}>
            Powered by Cal.com · All times in your local timezone
          </p>
        </FadeUp>

      </div>
    </PageTransition>
  )
}
