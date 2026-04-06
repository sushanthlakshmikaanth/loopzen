import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { FadeUp, RevealLine, LineWipe, StaggerGroup } from '../components/ScrollReveal'

const EMAIL = 'loopzen.looptechpc@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      const el = document.createElement('input')
      el.value = EMAIL
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center px-8 md:px-16 py-32 text-center">
        <div className="max-w-4xl mx-auto w-full">

          {/* ── Eyebrow ───────────────────────────────────────── */}
          <FadeUp delay={0.1} className="flex items-center justify-center gap-3 mb-10">
            <span className="w-6 h-px bg-accent/50" />
            <span className="font-body text-xs tracking-[0.4em] uppercase text-muted">
              Let's build together
            </span>
            <span className="w-6 h-px bg-accent/50" />
          </FadeUp>

          {/* ── Giant Heading ─────────────────────────────────── */}
          <RevealLine
            delay={0.2}
            className="font-display text-[clamp(2.8rem,7vw,8rem)] font-light leading-[1] text-text"
          >
            Ready to build
          </RevealLine>
          <RevealLine
            delay={0.34}
            className="font-display text-[clamp(2.8rem,7vw,8rem)] font-light leading-[1] text-accent italic mb-16"
          >
            something real?
          </RevealLine>

          {/* ── Email copy ────────────────────────────────────── */}
          <FadeUp delay={0.55} className="mb-12">
            <button
              onClick={handleCopy}
              className="group relative inline-flex items-center gap-4 font-body text-lg md:text-xl text-muted hover:text-text transition-colors duration-200 tracking-wide border-b border-muted/20 hover:border-muted/60 pb-1"
              aria-label="Copy email to clipboard"
            >
              <span>{EMAIL}</span>
              <span className="font-body text-xs tracking-widest uppercase border border-muted/30 px-2 py-0.5 text-muted/50 group-hover:border-accent/50 group-hover:text-accent transition-all duration-200">
                {copied ? 'Copied ✓' : 'Copy'}
              </span>
            </button>
            <p className="mt-3 font-body text-xs text-muted/40 tracking-widest uppercase">Click to copy</p>
          </FadeUp>

          {/* ── Divider wipe ──────────────────────────────────── */}
          <LineWipe delay={0.7} className="w-16 mx-auto mb-12" />

          {/* ── CTA ───────────────────────────────────────────── */}
          <FadeUp delay={0.8}>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 font-body text-sm tracking-widest uppercase border border-accent text-accent px-8 py-4 hover:bg-accent hover:text-bg transition-all duration-200"
            >
              Start a Project →
            </a>
          </FadeUp>

          {/* ── Info row ──────────────────────────────────────── */}
          <FadeUp delay={0.95} className="mt-20">
            <StaggerGroup
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
              stagger={0.1}
              delayStart={0}
            >
              {[
                { label: 'Response time', value: '< 24 hours' },
                { label: 'Based in',      value: 'Chennai, India' },
                { label: 'Works with',    value: 'Global founders' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted/30 mb-1">{label}</p>
                  <p className="font-body text-sm text-muted/60">{value}</p>
                </div>
              ))}
            </StaggerGroup>
          </FadeUp>

        </div>
      </div>
    </PageTransition>
  )
}
