'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Filosofía', href: '#filosofia' },
  { label: 'Posicionamiento', href: '#posicionamiento' },
  { label: 'Pilares Estratégicos', href: '#pilares' },
  { label: 'Agenda', href: '#agenda' },
];

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently behind the navbar
      const elements = document.elementsFromPoint(window.innerWidth / 2, 30);
      let foundDark = false;
      
      // Look through the elements to see if any have a dark background class
      for (const el of elements) {
        if (el.tagName === 'SECTION' || el.tagName === 'DIV') {
          if (el.className.includes('bg-black') || el.className.includes('bg-brand-navy')) {
            foundDark = true;
            break;
          }
          if (el.className.includes('bg-white') || el.className.includes('bg-brand-sand')) {
            break; // found a light section first
          }
        }
      }
      
      setIsLightBg(!foundDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColor = isLightBg ? 'text-brand-navy' : 'text-white';
  const textMuted = isLightBg ? 'text-brand-navy/70' : 'text-white/70';
  const linkHover = isLightBg ? 'hover:text-brand-coral' : 'hover:text-gray-300';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-5 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between pointer-events-auto">
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
            <div className={`leading-tight transition-colors duration-300 ${textColor}`}>
              <span className="font-serif font-bold text-xl tracking-wide block">
                Cata Ayala
              </span>
              <p className={`text-[10px] font-sans tracking-[0.2em] uppercase font-semibold transition-colors duration-300 ${textMuted}`}>
                COACH DE VIDA
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className={`hidden lg:flex items-center gap-8 transition-colors duration-300 ${textColor}`}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-sans text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${linkHover}`}
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
            className={`lg:hidden p-2 rounded-lg transition-colors ${textColor}`}
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
