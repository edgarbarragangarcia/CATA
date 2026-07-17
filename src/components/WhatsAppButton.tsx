'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, Calendar, Contact, X } from 'lucide-react';

// ─────────────────────────────────────────────
// CONFIGURACIÓN
// ─────────────────────────────────────────────
const WHATSAPP_NUMBER = '573142736009';
const WHATSAPP_MESSAGE = '¡Hola Cata! 👋 Me interesa agendar una sesión de mentoría contigo.';
const EMAIL = 'hola@cataayala.com';
const CALENDLY_URL = 'https://calendly.com/ayalacata/30min';
// ─────────────────────────────────────────────

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Aparece después de 1 segundo
    const t1 = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t1);
  }, []);

  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  const toggleMenu = () => setIsOpen(!isOpen);

  const options = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      href: waUrl,
      target: '_blank',
      bgColor: 'bg-[#25D366]',
      hoverColor: 'hover:bg-[#128C7E]',
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      href: `mailto:${EMAIL}`,
      target: '_self',
      bgColor: 'bg-brand-coral',
      hoverColor: 'hover:brightness-90',
    },
    {
      id: 'agenda',
      label: 'Agendar Sesión',
      icon: Calendar,
      href: CALENDLY_URL,
      target: '_blank',
      bgColor: 'bg-brand-amber',
      hoverColor: 'hover:brightness-90',
    }
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-brand-navy/30 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                  }}
                  className="flex flex-col items-end gap-4"
                >
                  {options.map((option) => (
                    <motion.a
                      key={option.id}
                      href={option.href}
                      target={option.target}
                      rel="noopener noreferrer"
                      variants={{
                        open: { opacity: 1, y: 0, scale: 1 },
                        closed: { opacity: 0, y: 20, scale: 0.8 }
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 group"
                    >
                      <span className="bg-white px-3 py-1.5 rounded-lg shadow-lg text-sm font-sans font-semibold text-brand-navy opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {option.label}
                      </span>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-300 ${option.bgColor} ${option.hoverColor}`}>
                        <option.icon size={22} />
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 overflow-hidden"
              style={{
                background: isOpen
                  ? '#0B2545' // brand-navy
                  : 'linear-gradient(135deg, #0B2545 0%, #30D5C8 100%)', // brand-navy to brand-mint
                boxShadow: isOpen
                  ? '0 4px 20px rgba(0,0,0,0.3)'
                  : '0 8px 32px rgba(48, 213, 200, 0.4)'
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    <X className="text-white" size={26} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    <Contact className="text-white" size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};
