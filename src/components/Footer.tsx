'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Phone, Globe } from 'lucide-react';

const LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Quién es Cata', href: '#quien-es' },
  { label: 'Metodología', href: '#metodologia' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Agenda', href: '#agenda' },
];

const headingClass = 'text-[11px] font-sans font-semibold tracking-[0.28em] uppercase text-brand-amber';
const iconWrap = 'w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110';

export const Footer: React.FC = () => {
  return (
    <footer data-nav-theme="dark" className="relative z-10 bg-brand-navy text-brand-cream pt-20 pb-10 px-6 sm:px-8">
      {/* Gold hairline on top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,145,0,0.7) 35%, rgba(48,213,200,0.7) 65%, transparent 100%)' }} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-14 border-b border-white/10">
        {/* Brand */}
        <div className="md:col-span-5 flex flex-col items-start gap-5">
          <a href="#hero" className="flex items-center gap-4">
            <div className="relative w-11 h-11 flex-shrink-0">
              <Image src="/logo-icon.png" alt="Cata Ayala" width={88} height={88} className="w-full h-full object-contain" />
            </div>
            <div className="leading-tight">
              <span className="font-display font-semibold text-xl tracking-wide block text-brand-cream">Cata Ayala</span>
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase font-semibold text-brand-mint">Coach de vida</span>
            </div>
          </a>
          <p className="font-serif italic text-xl text-brand-cream/80 max-w-sm leading-snug">
            El arte de vivir y tomar decisiones con propósito, criterio y una actitud al 101%.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-3 flex flex-col gap-5">
          <h4 className={headingClass}>Explora</h4>
          <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-brand-cream/70 hover:text-brand-mint transition-colors duration-200">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-4 flex flex-col gap-5">
          <h4 className={headingClass}>Contacto</h4>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="https://wa.me/573142736009?text=Hola%20Cata%21%20Me%20interesa%20agendar%20una%20sesi%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-brand-cream/75 hover:text-brand-cream transition-colors"
              >
                <span className={`${iconWrap} bg-brand-mint`}><Phone size={14} className="text-brand-navy" /></span>
                <span>+57 314 273 6009</span>
              </a>
            </li>
            <li>
              <a href="mailto:hola@cataayala.com" className="group flex items-center gap-3 text-sm text-brand-cream/75 hover:text-brand-cream transition-colors">
                <span className={`${iconWrap} bg-brand-coral`}><Mail size={14} className="text-white" /></span>
                <span>hola@cataayala.com</span>
              </a>
            </li>
            <li className="group flex items-center gap-3 text-sm text-brand-cream/75">
              <span className={`${iconWrap} bg-brand-amber`}><Globe size={14} className="text-brand-navy" /></span>
              <span>Mentoría global online</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] tracking-[0.15em] uppercase text-brand-cream/40 text-center sm:text-left">
          © {new Date().getFullYear()} Cata Ayala · Todos los derechos reservados
        </p>
        <p className="font-serif italic lining-nums text-lg text-brand-amber">Gózate la vida, con actitud al 101%</p>
      </div>
    </footer>
  );
};
