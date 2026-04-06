/**
 * ScrollReveal — reusable scroll-triggered animation primitives
 * once: false on all useInView → animations replay on BOTH scroll directions.
 */

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/* ── Fade + rise ────────────────────────────────────────────── */
export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.7,
  y = 32,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={inView
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y }}
      initial={{ opacity: 0, y }}
      transition={{ duration, delay: inView ? delay : 0, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ── Clip-reveal text (line by line) ───────────────────────── */
export function RevealLine({
  children,
  className,
  delay = 0,
  duration = 0.8,
  tag = 'div',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-6% 0px' })
  const Tag = motion[tag] ?? motion.div

  return (
    <div ref={ref} className="overflow-hidden">
      <Tag
        className={className}
        animate={inView
          ? { y: '0%',   skewY: 0 }
          : { y: '108%', skewY: 1.5 }}
        initial={{ y: '108%', skewY: 1.5 }}
        transition={{ duration, delay: inView ? delay : 0, ease: EASE }}
      >
        {children}
      </Tag>
    </div>
  )
}

/* ── Stagger container ──────────────────────────────────────── */
export function StaggerGroup({ children, className, stagger = 0.1, delayStart = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-8% 0px' })

  const variants = {
    hidden: { transition: { staggerChildren: stagger * 0.5, staggerDirection: -1 } },
    show:   { transition: { delayChildren: delayStart, staggerChildren: stagger } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24, transition: { duration: 0.4, ease: EASE } },
    show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease: EASE } },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>{child}</motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  )
}

/* ── Horizontal line wipe ───────────────────────────────────── */
export function LineWipe({ className, delay = 0, color = 'bg-accent/40' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-5% 0px' })

  return (
    <motion.span
      ref={ref}
      className={`block h-px origin-left ${color} ${className ?? ''}`}
      animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
      initial={{ scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.75, delay: inView ? delay : 0, ease: EASE }}
    />
  )
}

/* ── Parallax section (scroll-linked, always active) ────────── */
export function ParallaxSection({ children, className, speed = 0.12 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

/* ── Fade in from side ──────────────────────────────────────── */
export function FadeInLeft({ children, className, delay = 0, duration = 0.7, x = -28 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      initial={{ opacity: 0, x }}
      transition={{ duration, delay: inView ? delay : 0, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ── Count-up number ────────────────────────────────────────── */
export function CountUp({ value, suffix = '', className, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-8% 0px' })

  return (
    <motion.span
      ref={ref}
      className={className}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: inView ? delay : 0, ease: EASE }}
    >
      {value}{suffix}
    </motion.span>
  )
}
