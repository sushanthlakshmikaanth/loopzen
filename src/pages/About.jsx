import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { FadeUp, RevealLine, LineWipe, StaggerGroup, ParallaxSection } from '../components/ScrollReveal'

const manifesto = [
  {
    label: 'Code-First',
    desc: 'Every product we deliver is hand-crafted. No drag-and-drop builders, no bloated templates — just clean, purposeful code that performs.',
  },
  {
    label: 'AI-Native',
    desc: 'We don\'t bolt on AI as an afterthought. Intelligence is woven into the architecture from day one — in the stack, in the workflow, in the product.',
  },
  {
    label: 'Boutique Speed',
    desc: 'Small team, zero bureaucracy. We move as fast as our founders do — with the quality bar of a studio ten times our size.',
  },
]

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-32 px-8 md:px-16">
        <div className="max-w-[1440px] mx-auto">

          {/* ── Hero Split ──────────────────────────────────────── */}
          <section className="min-h-[80vh] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0 items-center mb-0 border-b border-muted/20 pb-20">
            {/* Left: Statement */}
            <div className="md:col-span-6 md:pr-16">
              <div className="overflow-hidden mb-4">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-body text-xs tracking-[0.4em] uppercase text-muted flex items-center gap-3"
                >
                  <span className="w-6 h-px bg-accent/50" /> About
                </motion.span>
              </div>

              {['Built by', 'developers,', 'for founders.'].map((line, i) => (
                <RevealLine
                  key={i}
                  delay={0.2 + i * 0.13}
                  className={`font-display text-[clamp(3.5rem,7vw,7.5rem)] font-light leading-[0.92] ${
                    i === 1 ? 'text-accent italic' : 'text-text'
                  }`}
                >
                  {line}
                </RevealLine>
              ))}
            </div>

            {/* Right: Body */}
            <div className="md:col-span-6 md:pl-16 md:border-l border-muted/20 flex flex-col gap-8">
              <FadeUp delay={0.5}>
                <p className="font-body text-base text-muted leading-relaxed mb-6">
                  LoopZen is a boutique agency built by developers, for founders. We exist
                  in the gap between big agencies that move slow and freelancers who
                  can't scale.
                </p>
                <p className="font-body text-base text-muted leading-relaxed mb-6">
                  We are code-first and AI-native — which means we don't just implement
                  features, we architect systems that keep working as your business grows.
                  No hand-offs. No bloat. No bullshit.
                </p>
                <p className="font-body text-base text-muted leading-relaxed">
                  Based in{' '}
                  <span className="text-text">Chennai, India</span>
                  {' '}— working globally.
                </p>
              </FadeUp>

              <FadeUp delay={0.65} className="flex items-center gap-6">
                <Link
                  to="/contact"
                  className="font-body text-sm tracking-widest uppercase border border-accent text-accent px-6 py-3 hover:bg-accent hover:text-bg transition-all duration-200"
                >
                  Work With Us →
                </Link>
              </FadeUp>
            </div>
          </section>

          {/* ── Manifesto ───────────────────────────────────────── */}
          <section className="py-20">
            <FadeUp className="mb-12" delay={0}>
              <span className="font-body text-xs tracking-[0.4em] uppercase text-muted flex items-center gap-3">
                <span className="w-6 h-px bg-accent/50" /> Our Principles
              </span>
            </FadeUp>

            <LineWipe delay={0.1} />

            <StaggerGroup
              className="grid grid-cols-1 md:grid-cols-3 gap-0"
              stagger={0.12}
              delayStart={0.15}
            >
              {manifesto.map(({ label, desc }) => (
                <div key={label} className="border-l first:border-l-0 border-muted/20 px-0 md:px-10 first:pl-0 py-8">
                  <h3 className="font-display text-3xl md:text-4xl font-light text-text mb-4">{label}</h3>
                  <p className="font-body text-sm text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </StaggerGroup>
          </section>

          {/* ── Quote strip ─────────────────────────────────────── */}
          <ParallaxSection speed={0.06}>
            <FadeUp
              delay={0.2}
              className="border-t border-muted/20 pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            >
              <p className="font-display text-3xl md:text-4xl font-light italic text-text max-w-lg">
                "The best product you can ship is one your users forget is technology."
              </p>
              <div className="shrink-0">
                <p className="font-body text-xs text-muted tracking-widest uppercase">— LoopZen</p>
              </div>
            </FadeUp>
          </ParallaxSection>

        </div>
      </div>
    </PageTransition>
  )
}
