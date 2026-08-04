'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────
// CONFIGURACIÓN — links de Cal.com
// ─────────────────────────────────────────────
export const CALENDARS = [
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
] as const;
// ─────────────────────────────────────────────

type Calendar = (typeof CALENDARS)[number];

type BookingPopupContextValue = {
  openChooser: () => void;
  openCal: (cal: Calendar) => void;
};

const BookingPopupContext = createContext<BookingPopupContextValue | null>(null);

export function useBookingPopup() {
  const ctx = useContext(BookingPopupContext);
  if (!ctx) {
    throw new Error('useBookingPopup must be used within a BookingPopupProvider');
  }
  return ctx;
}

const CalendarIcon = () => (
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
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const BookingPopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chooserOpen, setChooserOpen] = useState(false);
  const [activeCal, setActiveCal] = useState<Calendar | null>(null);
  const [calLoaded, setCalLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const shouldLock = chooserOpen || !!activeCal;
    if (!shouldLock) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [chooserOpen, activeCal]);

  const openChooser = () => setChooserOpen(true);
  const closeChooser = () => setChooserOpen(false);

  const openCal = (cal: Calendar) => {
    setCalLoaded(false);
    setChooserOpen(false);
    setActiveCal(cal);
  };

  const closeCal = () => {
    setActiveCal(null);
    setCalLoaded(false);
  };

  const overlays = (
    <>
      {/* Popup de selección: las dos opciones de calendario */}
      <AnimatePresence>
        {chooserOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            style={{ background: 'rgba(11, 37, 69, 0.6)' }}
            onClick={closeChooser}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-[1.5rem] overflow-hidden shadow-2xl bg-white"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-navy/10">
                <h4 className="text-base md:text-lg font-bold text-brand-navy">
                  Elige tu sesión
                </h4>
                <button
                  onClick={closeChooser}
                  aria-label="Cerrar"
                  className="w-9 h-9 flex items-center justify-center rounded-full text-brand-navy/50 hover:text-brand-navy hover:bg-brand-navy/5 transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 p-6">
                {CALENDARS.map((cal) => (
                  <button
                    key={cal.id}
                    onClick={() => openCal(cal)}
                    className="text-left rounded-[1.25rem] p-6 border border-brand-navy/10 bg-brand-sand/20 hover:bg-brand-sand/40 hover:border-brand-coral/30 transition-all duration-300"
                  >
                    <div
                      className="w-10 h-10 mb-4 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #FF5E36 0%, #FF9100 100%)' }}
                    >
                      <CalendarIcon />
                    </div>
                    <h5 className="text-lg font-bold text-brand-navy mb-1.5 leading-snug">
                      {cal.title}
                    </h5>
                    <p className="text-sm font-sans font-light text-brand-navy/60 leading-relaxed">
                      {cal.description}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup con el calendario elegido */}
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
                  <CloseIcon />
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
    </>
  );

  return (
    <BookingPopupContext.Provider value={{ openChooser, openCal }}>
      {children}
      {mounted ? createPortal(overlays, document.body) : null}
    </BookingPopupContext.Provider>
  );
};
