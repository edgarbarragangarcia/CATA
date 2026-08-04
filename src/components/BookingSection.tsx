'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────
// CONFIGURACIÓN — links de Cal.com
// ─────────────────────────────────────────────
const CALENDARS = [
  {
    id: 'coaching',
    title: 'Sesión de Coaching',
    description: 'Una sesión profunda de acompañamiento personalizado.',
    url: 'https://cal.com/cata-ayala/sesioncoaching?layout=mobile&overlayCalendar=true',
  },
  {
    id: 'discovery',
    title: 'Llamada de Descubrimiento',
    description: 'Una primera conversación para conocernos y ver si encajamos.',
    url: 'https://cal.com/cata-ayala/llamadadescubrimiento?layout=mobile&overlayCalendar=true',
  },
];
// ─────────────────────────────────────────────

export const BookingSection: React.FC = () => {
  const [activeCal, setActiveCal] = useState<(typeof CALENDARS)[number] | null>(null);
  const [calLoaded, setCalLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activeCal) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [activeCal]);

  const openCal = (cal: (typeof CALENDARS)[number]) => {
    setCalLoaded(false);
    setActiveCal(cal);
  };

  const closeCal = () => {
    setActiveCal(null);
    setCalLoaded(false);
  };

  const popup = (
    <AnimatePresence>
      {activeCal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(11, 37, 69, 0.6)' }}
          onClick={closeCal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] rounded-[1.5rem] overflow-hidden shadow-2xl bg-white flex flex-col"
          >
            {/* Header del popup */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-navy/10 shrink-0">
              <h4 className="text-base md:text-lg font-bold text-brand-navy">
                {activeCal.title}
              </h4>
              <button
                onClick={closeCal}
                aria-label="Cerrar"
                className="w-9 h-9 flex items-center justify-center rounded-full text-brand-navy/50 hover:text-brand-navy hover:bg-brand-navy/5 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Contenido: iframe de Cal.com */}
            <div className="relative flex-1 overflow-auto">
              {!calLoaded && (
                <div className="flex items-center justify-center h-[600px]">
                  <div className="flex flex-col items-center gap-4 text-brand-navy/40">
                    <div className="w-10 h-10 border-2 border-brand-amber border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-sans">Cargando calendario…</p>
                  </div>
                </div>
              )}
              <iframe
                src={activeCal.url}
                width="100%"
                height="650"
                frameBorder="0"
                title={activeCal.title}
                onLoad={() => setCalLoaded(true)}
                style={{ display: calLoaded ? 'block' : 'none' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

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

      {mounted ? createPortal(popup, document.body) : null}
    </section>
  );
};
