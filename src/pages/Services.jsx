import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { FadeUp, RevealLine, LineWipe, StaggerGroup } from '../components/ScrollReveal'

const services = [
  { num: '01', title: 'AI Automation',     desc: 'Intelligent pipelines, LLM agents, n8n workflows.',          tags: ['LLM Agents', 'n8n', 'Pipelines']     },
  { num: '02', title: 'Web & Mobile Dev',  desc: 'Hand-coded, zero bloat, realtime UIs.',                      tags: ['React', 'Next.js', 'Realtime']        },
  { num: '03', title: 'AI Consulting',     desc: 'Strategy and architecture for AI integration.',               tags: ['Strategy', 'Architecture', 'AI']      },
  { num: '04', title: 'Cloud Consulting',  desc: 'Scalable AWS / GCP / Azure infrastructure.',                  tags: ['AWS', 'GCP', 'Azure']                 },
  { num: '05', title: 'DevOps as a Service', desc: 'CI/CD, containers, deployment automation.',                tags: ['CI/CD', 'Docker', 'Kubernetes']       },
  { num: '06', title: 'API Development',   desc: 'Clean, documented, production-grade APIs.',                   tags: ['REST', 'GraphQL', 'OpenAPI']          },
]

function ServiceRow({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-5%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      whileHover="hovered"
    >
      <div className="hairline" />
      {/* Hover fill — wipes from left */}
      <motion.div
        className="absolute inset-0 bg-surface pointer-events-none"
        initial={{ scaleX: 0 }}
        variants={{ hovered: { scaleX: 1 } }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
      />
      <div className="relative flex items-center gap-6 py-7 px-4 md:px-8 cursor-default">
        <span className="font-body text-xs text-muted/40 tracking-widest w-8 shrink-0">
          {service.num}
        </span>
        <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-8">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-light text-text"
            variants={{ hovered: { color: '#C9A96E' } }}
            transition={{ duration: 0.25 }}
          >
            {service.title}
          </motion.h2>
          <p className="font-body text-sm text-muted/60 max-w-xs md:text-right">{service.desc}</p>
        </div>
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {service.tags.map((tag) => (
            <motion.span
              key={tag}
              className="font-body text-[10px] tracking-widest uppercase text-muted/40 border border-muted/15 px-2.5 py-1"
              variants={{ hovered: { borderColor: 'rgba(201,169,110,0.25)', color: 'rgba(201,169,110,0.7)' } }}
              transition={{ duration: 0.25 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <motion.span
          className="font-body text-muted/25 ml-4"
          variants={{ hovered: { color: 'rgba(201,169,110,0.7)', x: 4 } }}
          transition={{ duration: 0.25 }}
        >
          →
        </motion.span>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-32 px-8 md:px-16">
        <div className="max-w-[1440px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <div className="overflow-hidden mb-3">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-body text-xs tracking-[0.4em] uppercase text-muted flex items-center gap-3"
                >
                  <span className="w-6 h-px bg-accent/50" /> Services
                </motion.span>
              </div>
              <RevealLine
                delay={0.2}
                className="font-display text-[clamp(3rem,7vw,7rem)] font-light leading-[0.95] text-text"
              >
                What We Do
              </RevealLine>
            </div>
            <div className="md:col-span-5 md:flex md:items-end">
              <FadeUp delay={0.4}>
                <p className="font-body text-sm text-muted leading-relaxed max-w-sm">
                  Six disciplines. One team. We go deep on what matters,
                  and deliver without the overhead of a large agency.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* ── Service List ────────────────────────────────── */}
          <div>
            {services.map((service, i) => (
              <ServiceRow key={service.num} service={service} index={i} />
            ))}
            <div className="hairline" />
          </div>

          {/* ── Bottom CTA ──────────────────────────────────── */}
          <FadeUp
            delay={0.2}
            className="mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-muted/20 pt-12"
          >
            <p className="font-display text-3xl md:text-4xl font-light text-text italic max-w-md">
              Not sure what you need? Let's talk first.
            </p>
            <a
              href="/contact"
              className="font-body text-sm tracking-widest uppercase border border-accent text-accent px-7 py-3 hover:bg-accent hover:text-bg transition-all duration-200 shrink-0"
            >
              Start a Conversation →
            </a>
          </FadeUp>

        </div>
      </div>
    </PageTransition>
  )
}
