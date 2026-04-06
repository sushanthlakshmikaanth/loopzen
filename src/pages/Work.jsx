import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { FadeUp, RevealLine, LineWipe } from '../components/ScrollReveal'

const projects = [
  {
    name: 'FranchiseDiscovery Platform',
    category: 'Web & Mobile Dev',
    year: '2024',
    desc: 'A full-stack discovery engine connecting franchise seekers with verified opportunities, featuring realtime matching and AI-driven recommendations.',
  },
  {
    name: 'AI Invoice Generator',
    category: 'AI Automation',
    year: '2024',
    desc: 'End-to-end invoice automation with LLM extraction, smart categorization, and multi-format export — reducing billing time by 90%.',
  },
  {
    name: 'n8n Automation Suite',
    category: 'DevOps / AI',
    year: '2023',
    desc: 'A custom n8n workflow library with 40+ pre-built automations for SaaS teams — from CRM sync to Slack-based approvals.',
  },
]

function ProjectRow({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-5%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="hairline" />
      <div className="py-8 px-4 md:px-8 transition-all duration-300 cursor-default group-hover:bg-surface">
        <div className="flex items-start justify-between gap-6 mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline gap-4 md:gap-8 mb-2">
              <h2 className="font-display text-2xl md:text-3xl font-light text-text group-hover:text-accent transition-colors duration-300">
                {project.name}
              </h2>
            </div>
            <p className="font-body text-sm text-muted leading-relaxed max-w-xl">{project.desc}</p>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-2">
            <span className="font-body text-xs tracking-widest uppercase text-muted">{project.category}</span>
            <span className="font-body text-xs text-muted/40">{project.year}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="w-1.5 h-1.5 bg-accent/30 group-hover:bg-accent transition-colors duration-300" />
            <span className="w-1.5 h-1.5 bg-accent/20 group-hover:bg-accent/60 transition-colors duration-300" />
            <span className="w-1.5 h-1.5 bg-accent/10 group-hover:bg-accent/30 transition-colors duration-300" />
          </div>
          <span className="font-body text-xs tracking-widest uppercase text-muted/40 group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
            View <span>→</span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Work() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-32 px-8 md:px-16">
        <div className="max-w-[1440px] mx-auto">

          {/* ── Header ──────────────────────────────────────── */}
          <div className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <div className="overflow-hidden mb-3">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-body text-xs tracking-[0.4em] uppercase text-muted flex items-center gap-3"
                >
                  <span className="w-6 h-px bg-accent/50" /> Selected Work
                </motion.span>
              </div>
              <RevealLine
                delay={0.2}
                className="font-display text-[clamp(3rem,7vw,7rem)] font-light leading-[0.95] text-text"
              >
                Our Work
              </RevealLine>
            </div>
            <div className="md:col-span-5 md:flex md:items-end">
              <FadeUp delay={0.4}>
                <p className="font-body text-sm text-muted leading-relaxed max-w-sm">
                  A selection of products and systems built for founders
                  who needed more than a template.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* ── Table Header ────────────────────────────────── */}
          <FadeUp delay={0.5}>
            <div className="hidden md:flex items-center gap-6 px-8 py-3 mb-2">
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-muted/40 flex-1">Project Name</span>
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-muted/40 w-40 text-right">Category</span>
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-muted/40 w-16 text-right">Year</span>
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-muted/40 w-16 text-right">View</span>
            </div>
          </FadeUp>

          <LineWipe delay={0.55} />

          {/* ── Projects ────────────────────────────────────── */}
          <div>
            {projects.map((project, i) => (
              <ProjectRow key={project.name} project={project} index={i} />
            ))}
            <div className="hairline" />
          </div>

          {/* ── Bottom note ─────────────────────────────────── */}
          <FadeUp delay={0.2} className="mt-16">
            <p className="font-body text-xs text-muted/40 tracking-widest uppercase">
              More projects under NDA — available on request.
            </p>
          </FadeUp>

        </div>
      </div>
    </PageTransition>
  )
}
