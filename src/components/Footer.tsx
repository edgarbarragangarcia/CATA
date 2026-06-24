'use client';

import React from 'react';
import { Mail, Phone, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-brand-navy text-white border-t border-[#BF953F]/10 pt-16 pb-12 px-6 sm:px-8">
      {/* Subtle gold line on top */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: 'linear-gradient(90deg, transparent 0%, #BF953F 50%, transparent 100%)' }} />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-white/10">
        {/* Col 1: Brand & Tagline */}
        <div className="flex flex-col items-start gap-4">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-coral to-brand-amber rounded-full opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-4 h-4 text-white">
                  <path d="M50 15 L85 85 L15 85 Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M35 60 L65 60" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="leading-tight">
              <span
                className="font-serif font-bold text-lg tracking-wide block"
                style={{
                  background: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 40%, #B38728 70%, #AA771C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Cata Ayala
              </span>
              <p className="text-[9px] font-sans tracking-[0.2em] uppercase font-semibold text-brand-sand/60">
                COACH & MENTOR
              </p>
            </div>
          </a>
          <p className="text-sm font-sans font-light text-brand-sand/70 max-w-sm leading-relaxed mt-2">
            El arte de vivir y tomar decisiones con propósito, criterio y una actitud al 101%. Una mentoría estratégica diseñada para tu evolución.
          </p>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="flex flex-col gap-4 md:pl-8">
          <h4 className="font-serif text-brand-sand/80 font-bold text-sm tracking-wider uppercase">Enlaces</h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
            {[
              { label: 'Inicio', href: '#hero' },
              { label: 'Filosofía', href: '#filosofia' },
              { label: 'Posición', href: '#posicionamiento' },
              { label: 'Pilares', href: '#pilares' },
              { label: 'Agenda', href: '#agenda' },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-xs font-semibold text-brand-sand/60 hover:text-brand-coral transition-colors duration-200 uppercase tracking-widest"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contact & Info */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-brand-sand/80 font-bold text-sm tracking-wider uppercase">Contacto</h4>
          <ul className="flex flex-col gap-3.5">
            <li>
              <a
                href="https://wa.me/573142736009?text=Hola%20Cata%21%20Me%20interesa%20agendar%20una%20sesi%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-sans font-light text-brand-sand/70 hover:text-brand-mint transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-mint/15 transition-colors">
                  <Phone size={14} className="text-brand-mint shrink-0 group-hover:scale-110 transition-transform" />
                </span>
                <span>+57 314 273 6009</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:hola@cataayala.com"
                className="flex items-center gap-3 text-sm font-sans font-light text-brand-sand/70 hover:text-brand-coral transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-coral/15 transition-colors">
                  <Mail size={14} className="text-brand-coral shrink-0 group-hover:scale-110 transition-transform" />
                </span>
                <span>hola@cataayala.com</span>
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm font-sans font-light text-brand-sand/70">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <Globe size={14} className="text-brand-amber shrink-0" />
              </span>
              <span>Mentoría global online</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom area */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-brand-sand/40 text-[11px] tracking-wider text-center sm:text-left uppercase">
          © {new Date().getFullYear()} Cata Ayala · Todos los derechos reservados.
        </p>
        <p className="font-serif text-brand-sand/30 text-xs italic tracking-wide">
          El Espíritu 101%
        </p>
      </div>
    </footer>
  );
};
