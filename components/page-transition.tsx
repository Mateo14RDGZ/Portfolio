'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE } from '@/lib/motion'

/**
 * Short curtain reveal on first paint, then fades the page content in.
 * Keeps the initial impression intentional instead of a hard content pop.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="curtain"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="bg-background fixed inset-0 z-[100] flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-center gap-5"
            >
              <span className="bg-primary text-primary-foreground grid size-12 place-items-center rounded-2xl font-mono text-base font-semibold">
                MR
              </span>
              <div className="bg-secondary h-px w-28 overflow-hidden rounded-full">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="bg-primary h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
      >
        {children}
      </motion.div>
    </>
  )
}
