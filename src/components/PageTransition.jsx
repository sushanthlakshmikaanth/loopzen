import { motion } from 'framer-motion'

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(0 0 8% 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      exit={{ opacity: 0, clipPath: 'inset(8% 0 0 0)' }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}
