'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  loading?: 'eager' | 'lazy'
  sizes?: string
  className?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down' | 'none'
  objectPosition?: string
  quality?: number
  blurData?: string
}

export function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  priority = false,
  loading,
  sizes,
  className,
  objectFit = 'cover',
  objectPosition = 'center',
  quality = 80,
  blurData,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(priority)

  useEffect(() => {
    // Preload image to ensure smooth transition
    if (priority) {
      const img = new window.Image()
      img.onload = () => setIsLoaded(true)
      img.src = src
    }
  }, [src, priority])

  const imageProps = {
    alt,
    quality,
    ...(fill && { fill: true }),
    ...(!fill && width && { width }),
    ...(!fill && height && { height }),
    ...(sizes && { sizes }),
    ...(loading && { loading }),
    onLoadingComplete: () => setIsLoaded(true),
  }

  return (
    <div className="relative overflow-hidden bg-foreground/5">
      {/* Blur placeholder - visible while loading */}
      {blurData && !isLoaded && (
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{ backgroundImage: `url(${blurData})`, backgroundSize: 'cover', backgroundPosition: objectPosition }}
        />
      )}

      {/* Main image with fade-in animation */}
      <motion.div
        className={cn('relative w-full h-full', fill && 'absolute inset-0')}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <Image
          src={src}
          {...imageProps}
          className={cn(
            'transition-opacity duration-300',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'fill' && 'object-fill',
            objectFit === 'scale-down' && 'object-scale-down',
            objectFit === 'none' && 'object-none',
            className,
          )}
          style={{ objectPosition }}
        />
      </motion.div>
    </div>
  )
}
