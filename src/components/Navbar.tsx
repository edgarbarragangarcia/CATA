'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Filosofía', href: '#filosofia' },
  { label: 'Posicionamiento', href: '#posicionamiento' },
  { label: 'Pilares Estratégicos', href: '#pilares' },
  { label: 'Agenda', href: '#agenda' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-brand-navy/90 backdrop-blur-xl shadow-lg shadow-brand-navy/20 border-b border-white/10 py-3'
            : 'bg-brand-sand/70 backdrop-blur-md py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-4 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-coral to-brand-amber rounded-full opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-5 h-5 text-white">
                  <path d="M50 15 L85 85 L15 85 Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M35 60 L65 60" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="leading-tight">
              <span
                className={`font-serif font-bold text-xl tracking-wide transition-colors duration-500 ${
                  scrolled ? '' : 'text-brand-navy'
                }`}
                style={scrolled ? {
                  background: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 40%, #B38728 70%, #AA771C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                } : {}}
              >
                Cata Ayala
              </span>
              <p className={`text-[10px] font-sans tracking-[0.2em] uppercase font-semibold transition-colors duration-500 ${scrolled ? 'text-brand-sand/60' : 'text-brand-navy/60'}`}>
                COACH DE VIDA
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-sans text-xs font-semibold tracking-widest uppercase transition-colors duration-300 hover:text-brand-coral ${
                    scrolled ? 'text-brand-sand/90' : 'text-brand-navy'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="#agenda"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-sans font-semibold tracking-widest uppercase text-white bg-brand-coral border border-transparent hover:bg-transparent hover:text-brand-coral hover:border-[#BF953F] shadow-md hover:shadow-lg transition-all duration-300"
          >
            Conectar
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-brand-sand' : 'text-brand-navy'}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[68px] left-0 right-0 z-40 bg-brand-navy/95 backdrop-blur-xl border-b border-white/10 shadow-xl"
          >
            <ul className="flex flex-col px-8 py-8 gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-sans text-sm font-semibold tracking-widest uppercase text-brand-sand/80 hover:text-brand-coral transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 border-t border-white/10">
                <a
                  href="#agenda"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase text-white bg-brand-coral hover:bg-transparent hover:text-brand-coral hover:border hover:border-[#BF953F] transition-all"
                >
                  Conectar
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
