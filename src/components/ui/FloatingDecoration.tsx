'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FloatingDecorationProps {
  src: string;
  alt: string;
  className?: string;
  animationStyle?: 'float' | 'pulse';
  style?: React.CSSProperties;
}

export function FloatingDecoration({
  src,
  alt,
  className = '',
  animationStyle = 'float',
  style = {}
}: FloatingDecorationProps) {
  const animations = {
    float: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut' as const
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut' as const
      }
    }
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={animations[animationStyle]}
      style={style}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'contain' }}
      />
    </motion.div>
  );
}
