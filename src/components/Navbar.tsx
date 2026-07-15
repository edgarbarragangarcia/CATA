'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import heroBgImg from '@/img/hero-bg.jpg';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Filosofía', href: '#filosofia' },
  { label: 'Posicionamiento', href: '#posicionamiento' },
  { label: 'Pilares Estratégicos', href: '#pilares' },
  { label: 'Agenda', href: '#agenda' },
];

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 py-7 pointer-events-none"
      >
        {/* Textured background bar */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 100%)' }}
        >
          <Image
            src={heroBgImg}
            alt=""
            fill
            className="object-cover blur-md scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/30 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between pointer-events-auto">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-4 group outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/logo-icon.png"
                alt="Cata Ayala"
                width={176}
                height={176}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="leading-tight text-white">
              <span className="font-serif font-bold text-xl tracking-wide block">
                Cata Ayala
              </span>
              <p className="text-[10px] font-sans tracking-[0.2em] uppercase font-semibold text-white/70">
                COACH DE VIDA
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-8 text-white">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-xs font-semibold tracking-widest uppercase transition-colors duration-300 hover:text-gray-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="#agenda"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-sans font-semibold tracking-widest uppercase text-white bg-brand-coral border border-transparent hover:bg-transparent hover:text-brand-coral hover:border-brand-coral shadow-md hover:shadow-lg transition-all duration-300"
          >
            Conectar
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-navy/95 backdrop-blur-xl flex flex-col items-center justify-center lg:hidden">
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-2xl text-white/90 hover:text-brand-coral transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#agenda"
                onClick={() => setMenuOpen(false)}
                className="inline-block mt-4 px-8 py-3 rounded-full text-sm font-sans font-semibold tracking-widest uppercase text-brand-navy bg-brand-sand shadow-lg"
              >
                Conectar
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
