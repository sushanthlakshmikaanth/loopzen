import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { FadeUp, RevealLine, LineWipe, StaggerGroup } from '../components/ScrollReveal'

/* ─── helpers ─────────────────────────────────────── */

/* Magnetic CTA button */
function MagneticBtn({ to, children, outline }) {
  const btnRef = useRef(null)
  const [pos, setPos] = [{ x: 0, y: 0 }, () => { }]

  return (
    <Link
      to={to}
      className={`font-body text-sm tracking-widest uppercase px-7 py-3 transition-all duration-300 block ${outline
          ? 'border border-accent/60 text-accent/80 hover:border-accent hover:text-accent hover:bg-accent/5'
          : 'text-muted/60 hover:text-text'
        }`}
    >
      {children}
    </Link>
  )
}

/* ─── page ─────────────────────────────────────────── */

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <PageTransition>
      {/* ── HERO ──────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-14 overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 800, height: 800,
              top: '50%', left: '50%',
              x: '-50%', y: '-50%',
              background: 'radial-gradient(circle, rgba(201,169,110,0.065) 0%, transparent 65%)',
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px"
              style={{
                top: `${15 + i * 14}%`,
                background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.04) 50%, transparent 100%)',
              }}
              animate={{ opacity: [0, 0.6, 0], x: ['-2%', '2%', '-2%'] }}
              transition={{ duration: 6 + i * 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            />
          ))}
        </div>

        {/* Scroll-linked progress line */}
        <motion.div className="absolute bottom-0 left-0 h-px bg-accent/30" style={{ width: lineWidth }} />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 max-w-[1440px] mx-auto w-full">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 flex items-center gap-4"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-10 h-px bg-accent/40 origin-left inline-block"
            />
            <span className="font-body text-[10px] tracking-[0.45em] uppercase text-muted/60">
              Design-Led Dev Agency · Chennai
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-10 space-y-1">
            {['We Design the Vision.', 'We Engineer the Future.'].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%', skewY: 2 }}
                  animate={{ y: 0, skewY: 0 }}
                  transition={{ duration: 1.1, delay: 0.28 + i * 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className={`font-display font-light leading-[0.93] text-text ${i === 1 ? 'italic' : ''}`}
                  style={{ fontSize: 'clamp(3.2rem, 9.5vw, 10rem)' }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Sub + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end gap-10 md:gap-0 md:justify-between"
          >
            <p className="font-body text-base text-muted/60 max-w-sm leading-relaxed">
              We build for founders who don't wait.
            </p>
            <div className="flex items-center gap-2">
              <MagneticBtn to="/contact" outline>Start a Project →</MagneticBtn>
              <MagneticBtn to="/work">See Work</MagneticBtn>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-10 right-8 md:right-16 flex flex-col items-center gap-3"
        >
          <motion.div
            className="w-px bg-muted/30"
            animate={{ height: [16, 40, 16] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span
            className="font-body text-[9px] tracking-[0.4em] uppercase text-muted/40"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ── STATEMENT BLOCK ───────────────────────────── */}
      <section className="min-h-screen flex items-center px-8 md:px-16 py-32 relative overflow-hidden">
        {/* Decorative char — parallax */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-light text-[clamp(16rem,30vw,32rem)] leading-none text-text/[0.015] select-none pointer-events-none"
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          LZ
        </motion.div>

        <div className="max-w-[1440px] mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8 space-y-1">
              {[
                { text: '"We don\'t build templates.', italic: false },
                { text: 'We build products', italic: true, gold: true },
                { text: 'that think."', italic: false },
              ].map(({ text, italic, gold }, i) => (
                <RevealLine
                  key={i}
                  delay={i * 0.14}
                  className={`font-display font-light leading-[1.04] ${italic ? 'italic' : ''} ${gold ? 'text-accent' : 'text-text'}`}
                  style={{ fontSize: 'clamp(2.4rem, 5.5vw, 6.5rem)' }}
                >
                  <span style={{ fontSize: 'clamp(2.4rem, 5.5vw, 6.5rem)' }}>{text}</span>
                </RevealLine>
              ))}
            </div>
            <div className="md:col-span-4 md:pb-2">
              <FadeUp delay={0.5} className="border-t border-muted/15 pt-6 space-y-7">
                <p className="font-body text-sm text-muted/60 leading-relaxed">
                  Engineering precision meets AI intelligence — built to scale, adapt, and evolve.
                </p>
                <Link
                  to="/services"
                  className="font-body text-[11px] tracking-[0.3em] uppercase text-text/60 hover:text-accent transition-colors duration-300 flex items-center gap-3 group"
                >
                  <motion.span
                    className="w-6 h-px bg-current inline-block origin-left"
                    whileHover={{ scaleX: 1.8 }}
                    transition={{ duration: 0.3 }}
                  />
                  View Services
                </Link>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS ───────────────────────────────────── */}
      <section className="px-8 md:px-16 py-20 border-t border-muted/10">
        <div className="max-w-[1440px] mx-auto">
          <LineWipe className="mb-0" delay={0} />
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4" stagger={0.09}>
            {[
              { num: '12+', label: 'Products Shipped' },
              { num: '3', label: 'Countries Served' },
              { num: '100%', label: 'Code-First' },
              { num: '∞', label: 'Founder Ambitions' },
            ].map(({ num, label }) => (
              <div key={label} className="border-l first:border-l-0 border-muted/15 px-8 py-6">
                <div className="font-display text-[clamp(2.5rem,4vw,4rem)] font-light text-accent mb-1">
                  {num}
                </div>
                <div className="font-body text-[10px] tracking-[0.3em] uppercase text-muted/50">{label}</div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </PageTransition>
  )
}
