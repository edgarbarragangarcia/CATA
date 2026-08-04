'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CALENDARS, useBookingPopup } from '@/components/BookingPopupProvider';

export const BookingSection: React.FC = () => {
  const { openCal } = useBookingPopup();

  return (
    <section
      id="agenda"
      className="relative z-10 py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #FF9100 0%, transparent 60%), radial-gradient(circle at 80% 50%, #FF5E36 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs md:text-sm font-sans font-bold tracking-widest text-brand-coral uppercase mb-4">
            Da el Primer Paso
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-6 leading-tight">
            Agenda tu{' '}
            <span
              className="font-serif italic"
              style={{
                background:
                  'linear-gradient(135deg, #FF5E36 0%, #FF9100 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              sesión
            </span>
          </h2>
          <div className="w-20 h-1 bg-brand-mint mx-auto mb-6 rounded-full" />
          <p className="text-base md:text-lg font-sans font-light text-brand-navy/70 max-w-xl mx-auto leading-relaxed">
            El mejor momento para comenzar es ahora. Elige el formato que mejor
            se adapta a lo que necesitas.
          </p>
        </motion.div>

        {/* Botones de calendario */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {CALENDARS.map((cal) => (
            <motion.button
              key={cal.id}
              onClick={() => openCal(cal)}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="text-left rounded-[1.75rem] p-8 shadow-xl border border-white/60 bg-white transition-all duration-300 hover:shadow-2xl"
            >
              <div
                className="w-12 h-12 mb-5 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FF5E36 0%, #FF9100 100%)',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-2 leading-snug">
                {cal.title}
              </h3>
              <p className="text-sm md:text-base font-sans font-light text-brand-navy/60 leading-relaxed mb-5">
                {cal.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-sans font-bold text-brand-coral">
                Agendar ahora
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
