'use client';

import React from 'react';
import { useBookingPopup } from '@/components/BookingPopupProvider';

/*
 * Sistema visual de la marca (brand book Cata Ayala)
 * ─────────────────────────────────────────────────
 * Paleta oficial combinada por significado:
 *   Navy (autoridad) y Arena (fondo orgánico) estructuran las secciones.
 *   Coral = acción · Ámbar = calidez/luz (el "gold" digital) · Menta = frescura.
 * Sobre claro: texto navy. Sobre navy: blanco, ámbar y menta (como pide el
 * brand book para entornos digitales: "Prussian Navy / Sunset Coral & Gold").
 * Títulos: Playfair Display · Citas: Cormorant Garamond · Texto: Montserrat.
 */

type Tone = 'coral' | 'amber' | 'mint' | 'navy' | 'white';

const toneClass: Record<Tone, string> = {
  coral: 'text-brand-coral',
  amber: 'text-brand-amber',
  mint: 'text-brand-mint',
  navy: 'text-brand-navy/70',
  white: 'text-white/70',
};

/** Etiqueta pequeña sobre los títulos de sección. */
export function Eyebrow({
  children,
  tone = 'coral',
  align = 'center',
  className = '',
}: {
  children: React.ReactNode;
  tone?: Tone;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] md:text-xs font-sans font-semibold tracking-[0.28em] uppercase ${toneClass[tone]} ${
        align === 'center' ? 'justify-center' : 'justify-start'
      } ${className}`}
    >
      <span className="h-px w-7 bg-current opacity-70" aria-hidden />
      {children}
      {align === 'center' && <span className="h-px w-7 bg-current opacity-70" aria-hidden />}
    </p>
  );
}

/** Punto final coral: la firma visual (el "sol" del isotipo). */
export function Dot() {
  return <span className="text-brand-coral">.</span>;
}

export const sectionTitle =
  'font-display font-medium text-brand-navy text-4xl sm:text-5xl md:text-6xl leading-[1.08] tracking-tight';

export const leadText = 'text-lg md:text-xl font-light text-brand-navy/80 leading-relaxed';

export const bodyText = 'text-[15px] md:text-base text-brand-navy/70 leading-relaxed';

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full bg-brand-coral px-7 py-3.5 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_24px_-12px_rgba(255,94,54,0.7)] transition-colors duration-300 hover:bg-brand-navy';

export const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-full border border-brand-navy/25 px-7 py-3.5 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-brand-navy transition-colors duration-300 hover:border-brand-navy hover:bg-brand-navy hover:text-white';

/** Botones del hero (necesitan el contexto del popup de agenda). */
export function HeroActions({ className = '' }: { className?: string }) {
  const { openChooser } = useBookingPopup();
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 ${className}`}>
      <button type="button" onClick={openChooser} className={btnPrimary}>
        Agenda tu sesión
      </button>
      <a href="#metodologia" className={btnGhost}>
        Conoce el método VIDA
      </a>
    </div>
  );
}
