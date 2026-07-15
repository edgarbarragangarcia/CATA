'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Flame, Coffee } from 'lucide-react';

// ─────────────────────────────────────────────
// CONFIGURACIÓN — cambia este valor cuando tengas tu link de Calendly o Cal.com
// Ejemplo: 'https://cal.com/cata-ayala/sesion-estrategia'
// ─────────────────────────────────────────────
const CALENDLY_URL = 'https://calendly.com/ayalacata/30min';
const WHATSAPP_NUMBER = '573142736009';
const WHATSAPP_BOOKING_MESSAGE =
  '¡Hola Cata! 👋 Quiero agendar una sesión de mentoría contigo. ¿Cuándo tienes disponibilidad?';
// ─────────────────────────────────────────────

const features = [
  {
    icon: Compass,
    iconColor: 'text-brand-amber',
    bgColor: 'bg-brand-amber/10',
    title: 'Sesión Estratégica',
    desc: '60 minutos de claridad profunda sobre tu próximo gran paso.',
  },
  {
    icon: Flame,
    iconColor: 'text-brand-coral',
    bgColor: 'bg-brand-coral/10',
    title: 'Mentoría Intensiva',
    desc: 'Un proceso de acompañamiento con herramientas y criterio real.',
  },
  {
    icon: Coffee,
    iconColor: 'text-brand-mint',
    bgColor: 'bg-brand-mint/15',
    title: 'Exploración Inicial',
    desc: '30 minutos gratuitos para conocernos y definir si somos el match.',
  },
];

export const BookingSection: React.FC = () => {
  const [calLoaded, setCalLoaded] = useState(false);
  const [calHeight, setCalHeight] = useState(750);
  const [embedDomain, setEmbedDomain] = useState('');
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_BOOKING_MESSAGE)}`;

  useEffect(() => {
    setEmbedDomain(window.location.hostname);

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://calendly.com') return;
      if (event.data?.event === 'calendly.page_height' && event.data.payload?.height) {
        const next = Math.ceil(event.data.payload.height);
        // Calendly fires several height updates as its content loads in
        // stages; only grow to avoid clipping content with an early,
        // smaller reading.
        setCalHeight((prev) => Math.max(prev, next));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

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

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group bg-white/60 backdrop-blur-md border border-white/80 rounded-[1.5rem] p-7 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">
                {f.title}
              </h3>
              <p className="text-sm font-sans font-light text-brand-navy/70 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Calendly embed OR WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {CALENDLY_URL ? (
            /* ── Embed de Calendly ── */
            <div className="relative max-w-3xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border border-white/60 bg-white">
              {!calLoaded && (
                <div className="flex items-center justify-center h-[600px]">
                  <div className="flex flex-col items-center gap-4 text-brand-navy/40">
                    <div className="w-10 h-10 border-2 border-brand-amber border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-sans">Cargando calendario…</p>
                  </div>
                </div>
              )}
              <iframe
                src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=F5E6D3&text_color=0B2545&primary_color=FF9100&embed_type=Inline&embed_domain=${embedDomain}`}
                width="100%"
                height={calHeight}
                frameBorder="0"
                title="Agenda una sesión con Cata Ayala"
                onLoad={() => setCalLoaded(true)}
                style={{ display: calLoaded ? 'block' : 'none', transition: 'height 0.2s ease' }}
              />
            </div>
          ) : (
            /* ── CTA de WhatsApp mientras no hay calendario ── */
            <div
              className="relative rounded-[2rem] overflow-hidden text-center py-16 px-8 shadow-2xl bg-brand-navy"
            >
              {/* Warm shimmer overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background:
                    'linear-gradient(135deg, #FF5E36 0%, #FF9100 50%, #FF5E36 100%)',
                }}
              />

              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                >
                  <svg viewBox="0 0 32 32" className="w-8 h-8" fill="white">
                    <path d="M16.001 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.64 4.64 1.853 6.64L2.667 29.333l6.853-1.8A13.267 13.267 0 0 0 16 29.333c7.363 0 13.333-5.97 13.333-13.333 0-7.363-5.97-13.333-13.332-13.333zM16 27.2a11.147 11.147 0 0 1-5.68-1.547l-.4-.24-4.08 1.067 1.093-3.973-.267-.413A11.12 11.12 0 0 1 4.8 16c0-6.187 5.013-11.2 11.2-11.2S27.2 9.813 27.2 16 22.187 27.2 16 27.2zm6.147-8.387c-.334-.173-1.987-.987-2.294-1.093-.306-.107-.533-.16-.76.173-.226.334-.88 1.094-1.08 1.32-.2.227-.4.254-.733.08-.333-.16-1.414-.52-2.694-1.653-.987-.894-1.654-1.987-1.854-2.32-.2-.334-.013-.507.16-.68.16-.147.333-.387.506-.574.16-.186.213-.32.32-.534.107-.213.054-.4-.027-.573-.08-.174-.747-1.814-1.04-2.48-.267-.64-.546-.56-.747-.573h-.64c-.213 0-.56.08-.853.4s-1.12 1.093-1.12 2.666c0 1.574 1.147 3.094 1.307 3.307.16.213 2.24 3.467 5.467 4.854.76.333 1.36.52 1.827.653.773.24 1.467.2 2.027.12.614-.093 1.987-.813 2.267-1.6.28-.786.28-1.466.2-1.6-.08-.133-.307-.213-.64-.373z" />
                  </svg>
                </div>

                <h3 className="text-2xl md:text-4xl font-bold text-brand-sand mb-4 leading-tight">
                  ¿Lista para dar el paso?
                </h3>
                <p className="text-base md:text-lg font-sans font-light text-brand-sand/70 max-w-lg mx-auto mb-10 leading-relaxed">
                  Escríbeme directamente por WhatsApp y coordinamos tu primera
                  sesión juntas. Respondo personalmente.
                </p>

                <motion.a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="booking-whatsapp-btn"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-sans font-bold tracking-wide text-white shadow-2xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)',
                  }}
                >
                  <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="white">
                    <path d="M16.001 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.64 4.64 1.853 6.64L2.667 29.333l6.853-1.8A13.267 13.267 0 0 0 16 29.333c7.363 0 13.333-5.97 13.333-13.333 0-7.363-5.97-13.333-13.332-13.333zM16 27.2a11.147 11.147 0 0 1-5.68-1.547l-.4-.24-4.08 1.067 1.093-3.973-.267-.413A11.12 11.12 0 0 1 4.8 16c0-6.187 5.013-11.2 11.2-11.2S27.2 9.813 27.2 16 22.187 27.2 16 27.2zm6.147-8.387c-.334-.173-1.987-.987-2.294-1.093-.306-.107-.533-.16-.76.173-.226.334-.88 1.094-1.08 1.32-.2.227-.4.254-.733.08-.333-.16-1.414-.52-2.694-1.653-.987-.894-1.654-1.987-1.854-2.32-.2-.334-.013-.507.16-.68.16-.147.333-.387.506-.574.16-.186.213-.32.32-.534.107-.213.054-.4-.027-.573-.08-.174-.747-1.814-1.04-2.48-.267-.64-.546-.56-.747-.573h-.64c-.213 0-.56.08-.853.4s-1.12 1.093-1.12 2.666c0 1.574 1.147 3.094 1.307 3.307.16.213 2.24 3.467 5.467 4.854.76.333 1.36.52 1.827.653.773.24 1.467.2 2.027.12.614-.093 1.987-.813 2.267-1.6.28-.786.28-1.466.2-1.6-.08-.133-.307-.213-.64-.373z" />
                  </svg>
                  Agendar por WhatsApp
                </motion.a>

                <p className="text-xs font-sans text-brand-sand/40 mt-6 tracking-wide">
                  También puedes escribirme a{' '}
                  <span className="text-brand-sand/60">+57 314 273 6009</span>
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
