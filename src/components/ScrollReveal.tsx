'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
  staggerChildren?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  className = '',
  yOffset = 40,
  staggerChildren,
}) => {
  // Staggered Children Approach
  if (staggerChildren) {
    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren,
          delayChildren: delay,
        }
      }
    };
    
    const item = {
      hidden: { opacity: 0, y: yOffset, scale: 0.98 },
      show: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } 
      }
    };

    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className={className}
      >
        {React.Children.map(children, child => (
          <motion.div variants={item}>{child}</motion.div>
        ))}
      </motion.div>
    );
  }

  // Standard Approach for single items
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }} 
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
