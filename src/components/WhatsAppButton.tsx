'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────
// CONFIGURACIÓN — cambia estos valores
// ─────────────────────────────────────────────
const WHATSAPP_NUMBER = '573142736009'; // Número con código de país, sin + ni espacios
const WHATSAPP_MESSAGE =
  '¡Hola Cata! 👋 Me interesa agendar una sesión de mentoría contigo.';
// ─────────────────────────────────────────────

export const WhatsAppButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Aparece después de 3 segundos
    const t1 = setTimeout(() => setVisible(true), 3000);
    // Pulso de atención cada 8 segundos
    const t2 = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 8000);
    return () => {
      clearTimeout(t1);
      clearInterval(t2);
    };
  }, []);

  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Burbuja de mensaje */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="bubble"
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 8 }}
                transition={{ duration: 0.2 }}
                className="relative bg-white rounded-2xl rounded-br-sm shadow-2xl px-4 py-3 max-w-[220px]"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
              >
                {/* Flecha de la burbuja */}
                <div
                  className="absolute bottom-[-8px] right-4 w-0 h-0"
                  style={{
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '8px solid white',
                  }}
                />
                <p className="text-sm font-sans font-semibold text-gray-800 leading-snug">
                  ¡Hablemos! 💬
                </p>
                <p className="text-xs font-sans text-gray-500 mt-0.5">
                  Respondo rápidamente
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón principal */}
          <div className="relative">
            {/* Anillo de pulso */}
            {pulse && (
              <motion.div
                key="pulse-ring"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-[#25D366]"
              />
            )}

            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              id="whatsapp-floating-btn"
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.08 }}
              className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                boxShadow: '0 4px 24px rgba(37, 211, 102, 0.45)',
              }}
            >
              {/* Ícono WhatsApp SVG */}
              <svg
                viewBox="0 0 32 32"
                className="w-7 h-7"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.001 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.64 4.64 1.853 6.64L2.667 29.333l6.853-1.8A13.267 13.267 0 0 0 16 29.333c7.363 0 13.333-5.97 13.333-13.333 0-7.363-5.97-13.333-13.332-13.333zM16 27.2a11.147 11.147 0 0 1-5.68-1.547l-.4-.24-4.08 1.067 1.093-3.973-.267-.413A11.12 11.12 0 0 1 4.8 16c0-6.187 5.013-11.2 11.2-11.2S27.2 9.813 27.2 16 22.187 27.2 16 27.2zm6.147-8.387c-.334-.173-1.987-.987-2.294-1.093-.306-.107-.533-.16-.76.173-.226.334-.88 1.094-1.08 1.32-.2.227-.4.254-.733.08-.333-.16-1.414-.52-2.694-1.653-.987-.894-1.654-1.987-1.854-2.32-.2-.334-.013-.507.16-.68.16-.147.333-.387.506-.574.16-.186.213-.32.32-.534.107-.213.054-.4-.027-.573-.08-.174-.747-1.814-1.04-2.48-.267-.64-.546-.56-.747-.573h-.64c-.213 0-.56.08-.853.4s-1.12 1.093-1.12 2.666c0 1.574 1.147 3.094 1.307 3.307.16.213 2.24 3.467 5.467 4.854.76.333 1.36.52 1.827.653.773.24 1.467.2 2.027.12.614-.093 1.987-.813 2.267-1.6.28-.786.28-1.466.2-1.6-.08-.133-.307-.213-.64-.373z" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
