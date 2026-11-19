'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CALENDARS, useBookingPopup } from '@/components/BookingPopupProvider';
import { Eyebrow, Dot, sectionTitle, leadText } from '@/components/ui';

export const BookingSection: React.FC = () => {
  const { openCal } = useBookingPopup();

  return (
    <section id="agenda" className="relative z-10 py-24 md:py-36 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-16"
        >
          <Eyebrow>Da el primer paso</Eyebrow>
          <h2 className={`${sectionTitle} mt-6`}>
            Agenda tu <span className="italic">sesión</span>
            <Dot />
          </h2>
          <p className={`mt-6 max-w-xl mx-auto ${leadText}`}>
            El mejor momento para comenzar es ahora. Elige el formato que mejor se adapta a lo que necesitas.
          </p>
        </motion.div>

        {/* Calendar options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto"
        >
          {CALENDARS.map((cal, i) => {
            const featured = i === 0;
            return (
            <motion.button
              key={cal.id}
              onClick={() => openCal(cal)}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative overflow-hidden text-left rounded-3xl p-8 md:p-10 shadow-card transition-all duration-300 hover:shadow-card-hover ${
                featured ? 'bg-brand-navy text-white' : 'bg-white text-brand-navy'
              }`}
            >
              {featured && (
                <span className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 90% 0%, rgba(255,145,0,0.25) 0%, transparent 55%)' }} />
              )}
              <span className={`relative w-12 h-12 mb-8 rounded-full flex items-center justify-center ${featured ? 'bg-brand-amber' : 'bg-brand-mint'}`}>
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0B2545" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <h3 className="relative font-display font-medium text-2xl md:text-[1.7rem] leading-snug">{cal.title}</h3>
              <p className={`relative mt-3 text-[15px] md:text-base leading-relaxed ${featured ? 'text-white/75' : 'text-brand-navy/70'}`}>{cal.description}</p>
              <span className={`relative mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase ${featured ? 'text-brand-amber' : 'text-brand-coral'}`}>
                Agendar ahora
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
