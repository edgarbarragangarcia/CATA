'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { BookingSection } from '@/components/BookingSection';
import { BookingPopupProvider } from '@/components/BookingPopupProvider';
import { Footer } from '@/components/Footer';
import heroBgImg from '@/img/hero-bg.jpg';
import cataCutoutImg from '@/img/cata-cutout.png';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Eyebrow, Dot, HeroActions, sectionTitle, leadText, bodyText } from '@/components/ui';
import { Download, ArrowRight } from 'lucide-react';

const FEELINGS = [
  'No encuentras claridad.',
  'Trabajas mucho pero no disfrutas.',
  'Quieres cambiar, pero no sabes cómo.',
  'Sientes culpa constantemente.',
  'Te cuesta tomar decisiones.',
  'Vives en automático.',
  'Sabes que puedes dar más.',
];

const CREDENTIALS = [
  { value: '17+', label: 'Años de liderazgo en marketing', bar: 'bg-brand-coral' },
  { value: 'Máster', label: 'Comunicación Estratégica', bar: 'bg-brand-amber' },
  { value: 'Trainer', label: 'Dale Carnegie', bar: 'bg-brand-mint' },
  { value: 'Coach', label: 'De vida certificada', bar: 'bg-brand-navy' },
];

// Cada paso lleva el color cuyo significado le corresponde en el brand book.
const VIDA_STEPS = [
  { letter: 'V', title: 'Ver con claridad', card: 'bg-brand-mint text-brand-navy', num: 'text-brand-navy/60', line: 'bg-brand-navy' },
  { letter: 'I', title: 'Identificar creencias', card: 'bg-brand-amber text-brand-navy', num: 'text-brand-navy/60', line: 'bg-brand-navy' },
  { letter: 'D', title: 'Decidir con criterio', card: 'bg-brand-navy text-white', num: 'text-brand-mint', line: 'bg-brand-amber' },
  { letter: 'A', title: 'Actuar con propósito', card: 'bg-brand-coral text-white', num: 'text-white/80', line: 'bg-brand-navy' },
];

type Accent = 'mint' | 'coral' | 'amber' | 'navy';
const ACCENTS: Record<Accent, { bg: string; badge: string; pill: string; soft: string; border: string }> = {
  mint: { bg: 'bg-brand-mint', badge: 'bg-brand-mint text-brand-navy', pill: 'bg-brand-mint/20 text-brand-navy', soft: 'bg-brand-mint/15', border: 'border-brand-mint' },
  coral: { bg: 'bg-brand-coral', badge: 'bg-brand-coral text-white', pill: 'bg-brand-coral/15 text-brand-navy', soft: 'bg-brand-coral/10', border: 'border-brand-coral' },
  amber: { bg: 'bg-brand-amber', badge: 'bg-brand-amber text-brand-navy', pill: 'bg-brand-amber/20 text-brand-navy', soft: 'bg-brand-amber/15', border: 'border-brand-amber' },
  navy: { bg: 'bg-brand-navy', badge: 'bg-brand-navy text-white', pill: 'bg-brand-navy/10 text-brand-navy', soft: 'bg-brand-navy/[0.06]', border: 'border-brand-navy' },
};

const SERVICES = [
  {
    tag: 'Claridad', accent: 'mint' as Accent,
    title: 'Encuentra tu norte',
    subtitle: 'Claridad para tomar decisiones con confianza.',
    lead: 'Cuando sabes que algo necesita cambiar, pero aún no sabes por dónde empezar.',
    body: 'Hay momentos en los que la vida parece llena de preguntas. Tal vez estás enfrentando una decisión importante, te sientes estancado, has perdido la motivación o simplemente sabes que no estás viviendo la vida que deseas. En este proceso encontrarás un espacio de escucha, reflexión y conversación para ordenar tus ideas, comprender lo que realmente quieres y recuperar la confianza para tomar decisiones con mayor criterio y tranquilidad.',
    bullets: [
      'Tienes muchas dudas y pocas respuestas.',
      'Estás atravesando un cambio importante.',
      'Quieres recuperar el rumbo de tu vida.',
      'Necesitas claridad para tomar una decisión.',
    ],
    objective: 'Salir de la confusión y volver a avanzar con confianza.',
  },
  {
    tag: 'Transformación', accent: 'coral' as Accent,
    title: 'Rediseña tu vida',
    subtitle: 'Un proceso para rediseñar la vida que quieres construir.',
    lead: 'Porque nunca es tarde para construir una vida que realmente disfrutes.',
    body: 'A veces no se trata de cambiarlo todo, sino de transformar la manera en que vivimos. Este proceso está diseñado para quienes desean revisar sus hábitos, ampliar su perspectiva, fortalecer su capacidad para tomar decisiones conscientes y construir una vida más alineada con sus valores y propósito. A través de conversaciones profundas y preguntas poderosas, descubrirás los recursos que ya existen en ti para generar cambios sostenibles y convertir pequeñas acciones en grandes transformaciones.',
    bullets: [
      'Recuperar el equilibrio entre tu vida personal y profesional.',
      'Romper patrones que ya no te generan bienestar.',
      'Tomar decisiones con mayor confianza y criterio.',
      'Desarrollar hábitos más coherentes con la vida que deseas construir.',
      'Vivir con mayor propósito y bienestar.',
    ],
    objective: 'Diseñar una vida más coherente con la persona que quieres ser, desarrollando la claridad, el criterio y la actitud necesarios para avanzar con intención y disfrutar más el camino.',
    quote: '“No se trata de convertirte en alguien diferente. Se trata de construir, desde quien ya eres, una vida que disfrutes con mayor propósito, coherencia y plenitud.”',
  },
  {
    tag: 'Maternidad', accent: 'amber' as Accent,
    title: 'Mamá sin pausa',
    subtitle: 'Coaching para madres.',
    lead: 'Porque cuidar de todos no debería significar dejar de cuidarte a ti.',
    body: 'Ser mamá transforma la vida de una manera maravillosa, pero también trae nuevos retos, emociones y responsabilidades. Es fácil sentir que el tiempo ya no alcanza, que la culpa aparece con frecuencia o que has dejado en pausa algunos de tus propios sueños. Como mamá de tres hijos —nacidos con año y 11 meses de diferencia entre el mayor y los gemelos— conozco de primera mano los desafíos de equilibrar la maternidad, el desarrollo profesional, la vida en pareja y el crecimiento personal. Este es un espacio pensado para que vuelvas a encontrarte contigo misma sin dejar de ser la gran mamá que ya eres.',
    bullets: [
      '¿Cómo volver a tener tiempo para mí?',
      '¿Cómo equilibrar mi familia y mi desarrollo profesional?',
      '¿Cómo dejar de sentir culpa constantemente?',
      '¿Cómo disfrutar más esta etapa?',
    ],
    objective: 'Aceptar y vivir la maternidad con mayor equilibrio, tranquilidad y disfrute.',
  },
  {
    tag: 'Liderazgo', accent: 'navy' as Accent,
    title: 'Lidera desde quién eres',
    subtitle: 'Coaching para líderes.',
    lead: 'Porque el mejor liderazgo nace de la autenticidad, no de la presión.',
    body: 'Los retos del liderazgo no solo transforman las organizaciones; también transforman a quienes las lideran. La presión por los resultados, las decisiones difíciles y las múltiples responsabilidades pueden llevarnos, sin darnos cuenta, a alejarnos de la forma en que realmente queremos liderar. Este proceso de coaching es un espacio para detenerse, reflexionar y reconectar con el líder que deseas ser. No busca enseñarte un modelo de liderazgo, sino ayudarte a descubrir cómo liderar desde tus valores, tu propósito y tu autenticidad.',
    bullets: [
      'Recuperar la coherencia entre lo que piensan, sienten y proyectan.',
      'Reflexionar sobre el tipo de líder que quieren ser.',
      'Tomar decisiones con mayor serenidad y criterio.',
      'Fortalecer la calidad de sus conversaciones y relaciones.',
      'Liderar desde la autenticidad, incluso en contextos de alta exigencia.',
    ],
    objective: 'Reconectar con tu esencia para ejercer un liderazgo más consciente, coherente y auténtico, capaz de generar confianza, fortalecer las relaciones y construir resultados sostenibles.',
  },
];

const TESTIMONIALS = [
  'Cata es una persona muy profesional pero sobre todo muy humana. Abre un espacio donde genera confianza desde el momento cero y con paciencia guía a las personas a encontrar las respuestas. Para mí fue un espacio muy enriquecedor que le recomiendo a todos. A ella le agradezco enormemente su empatía, su apertura y su guía.',
  'Trabajar con Cata cambió la forma en que tomo decisiones. Llegué sin claridad y con muchas dudas, y en cada sesión sentí un acompañamiento genuino, sin juicios, que me ayudó a reconectar conmigo misma. Hoy tengo más criterio, más calma y una vida mucho más alineada con lo que realmente quiero.',
];

const RESOURCES = [
  {
    title: 'Modelo YOU',
    desc: 'Describe tu ADN y cómo eres en el entorno personal, y cómo esos rasgos son tus diferenciales en el mundo laboral.',
    file: '/downloads/Modelo-YOU-by-Cata-Ayala.pdf',
  },
  {
    title: 'Test: ¿Qué tan conectado estás con tu propósito?',
    desc: 'Un test rápido para entender qué tan alineada está tu vida con lo que realmente quieres.',
    file: '/downloads/Test-Conexion-con-tu-Proposito.pdf',
  },
  {
    title: 'Checklist: 7 señales de piloto automático',
    desc: 'Identifica si estás viviendo en automático con este checklist de autodiagnóstico.',
    file: '/downloads/Checklist-7-Senales-Piloto-Automatico.pdf',
  },
];

export default function Home() {
  // Hero Animation Setup
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Mobile: textured sand background always visible; photo shows first then
  // blurs/fades out as the "Gózate la vida" text transitions in.
  const heroTextOpacity = useTransform(heroProgress, [0.25, 0.45], [0, 1]);
  const heroImageBlurPx = useTransform(heroProgress, [0, 0.35], [0, 24]);
  const heroImageBlur = useMotionTemplate`blur(${heroImageBlurPx}px)`;
  const heroImageOpacityMobile = useTransform(heroProgress, [0, 0.35], [1, 0]);

  // Desktop: original Apple-style zoom/fade as the section scrolls away.
  const heroTextOpacityDesktop = useTransform(heroProgress, [0, 0.4], [1, 0]);
  const heroTextScaleDesktop = useTransform(heroProgress, [0, 0.4], [1, 0.8]);
  const heroImageScaleDesktop = useTransform(heroProgress, [0, 1], [1, 1.1]);
  const heroImageOpacityDesktop = useTransform(heroProgress, [0.5, 1], [1, 0]);

  // Agenda steps: reveal one at a time as the box scrolls through view.
  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.85", "end 0.35"]
  });
  const step1Opacity = useTransform(stepsProgress, [0, 0.28], [0, 1]);
  const step1Y = useTransform(stepsProgress, [0, 0.28], [24, 0]);
  const step2Opacity = useTransform(stepsProgress, [0.36, 0.64], [0, 1]);
  const step2Y = useTransform(stepsProgress, [0.36, 0.64], [24, 0]);
  const step3Opacity = useTransform(stepsProgress, [0.72, 1], [0, 1]);
  const step3Y = useTransform(stepsProgress, [0.72, 1], [24, 0]);

  const heroBgStyle = isDesktop
    ? { scale: heroImageScaleDesktop, opacity: heroImageOpacityDesktop }
    : {};
  const heroPhotoStyle = isDesktop
    ? { opacity: 1, filter: 'none' }
    : { opacity: heroImageOpacityMobile, filter: heroImageBlur };
  const heroTextStyle = isDesktop
    ? { opacity: heroTextOpacityDesktop, scale: heroTextScaleDesktop }
    : { opacity: heroTextOpacity };

  const steps = [
    {
      n: 1,
      badge: 'bg-brand-mint text-brand-navy',
      title: 'Sesión de descubrimiento',
      text: 'Son 15 minutos en los que nos conoceremos y te explicaré cómo es el proceso, con el fin de establecer acuerdos (tiempos de la sesión, pagos, entre otros). Este espacio NO es para conversar sobre la situación en sí, únicamente para aclarar dudas y conocernos. A veces no conectamos bien con quienes creíamos, por eso es mejor darnos la oportunidad de elegir a la persona correcta que te acompañe en tu camino.',
      style: { opacity: step1Opacity, y: step1Y },
    },
    {
      n: 2,
      badge: 'bg-brand-amber text-brand-navy',
      title: 'Primera sesión',
      text: 'Aquí comienza el proceso. Empezaremos a hacernos muchas preguntas que solo tú contestarás, y veremos cuántas sesiones adicionales podrías tomar. Usualmente comenzamos con 4.',
      style: { opacity: step2Opacity, y: step2Y },
    },
    {
      n: 3,
      badge: 'bg-brand-coral text-white',
      title: 'Continuación',
      text: 'Acorde a las sesiones que se establecieron, continuamos el camino.',
      style: { opacity: step3Opacity, y: step3Y },
    },
  ];
  const connectorOpacity = [step2Opacity, step3Opacity];

  return (
    <BookingPopupProvider>
    <main className="min-h-screen relative selection:bg-brand-coral selection:text-white bg-brand-sand text-brand-navy">
      <Navbar />

      {/* 1. HERO — scroll: text fades/scales out on desktop; on mobile the photo blurs out and the text fades in */}
      <section id="hero" ref={heroRef} className="relative h-[200vh] bg-brand-sand">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

          {/* Background texture (the stone/sand texture Cata chose) */}
          <motion.div style={heroBgStyle} className="absolute inset-0 z-0">
            <Image src={heroBgImg} alt="" fill className="object-cover" priority />
            {/* Isotipo construction lines behind the photo — the "C" protector circle */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              className="hidden md:block absolute right-[-6vh] lg:right-[2vw] top-1/2 -translate-y-[42%] h-[92vh] w-[92vh] text-brand-navy pointer-events-none"
            >
              <circle
                cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeOpacity="0.16"
                strokeWidth="1.25" vectorEffect="non-scaling-stroke"
                strokeDasharray="270 31.6" strokeDashoffset="-15.8" strokeLinecap="round"
              />
              <circle
                cx="50" cy="50" r="36" fill="none" stroke="#30D5C8" strokeOpacity="0.7"
                strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="2 5"
              />
              <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
          </motion.div>

          {/* Cata cutout */}
          <motion.div
            style={heroPhotoStyle}
            className="absolute bottom-[8%] md:bottom-0 right-0 z-[5] h-[75%] md:h-[85%] lg:h-[90%] aspect-[356/723]"
          >
            <Image src={cataCutoutImg} alt="Cata Ayala" fill className="object-contain object-bottom" priority />
          </motion.div>

          {/* Hero copy */}
          <motion.div
            style={heroTextStyle}
            className="relative z-10 text-center md:text-left px-6 md:px-0 max-w-5xl md:max-w-none mx-auto flex flex-col items-center md:items-start mt-12 md:mt-16 w-full md:pl-16 lg:pl-24 md:pr-[34%] lg:pr-[30%]"
          >
            <p className="mb-6 md:mb-8 flex items-center justify-center md:justify-start gap-3 text-[10px] md:text-xs font-semibold uppercase tracking-[0.22em] md:tracking-[0.28em] text-brand-coral">
              <span className="hidden md:block h-px w-7 bg-current opacity-70" aria-hidden />
              Coach de vida · Mentora estratégica
            </p>
            <h1 className="font-display font-medium text-brand-navy text-[4.25rem] sm:text-8xl lg:text-[8.5rem] leading-[0.95] tracking-[-0.03em]">
              <span className="block">Gózate</span>
              <span className="block italic">la vida<Dot /></span>
            </h1>
            <p className="mt-7 md:mt-9 max-w-xl text-lg sm:text-xl md:text-2xl font-light text-brand-navy/85 leading-relaxed">
              Un espacio donde no te doy fórmulas mágicas, sino que te devuelvo el poder de descubrir tus propias respuestas.
            </p>
            <HeroActions className="mt-9 md:mt-11" />
          </motion.div>
        </div>
      </section>

      {/* 2. ¿TE SIENTES ASÍ? — Marino Eléctrico (entorno digital del brand book) */}
      <section data-nav-theme="dark" className="relative z-20 bg-brand-navy text-white py-24 md:py-36 rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-20 shadow-[0_-24px_60px_rgba(11,37,69,0.25)] overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,145,0,0.16) 0%, transparent 65%)' }} />
        <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(48,213,200,0.12) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-14 lg:gap-20">
          <ScrollReveal className="lg:col-span-6">
            <Eyebrow align="left" tone="mint">El punto de partida</Eyebrow>
            <span aria-hidden className="block mt-8 font-display text-7xl leading-none text-brand-amber">“</span>
            <h2 className="-mt-6 font-display font-medium text-white text-4xl sm:text-5xl md:text-6xl leading-[1.08] tracking-tight">
              La vida es demasiado espectacular como para no <span className="italic text-brand-amber">disfrutarla</span><Dot />
            </h2>
            <div className="mt-8 space-y-4 text-lg md:text-xl font-light text-white/75 leading-relaxed">
              <p>No significa que todo sea fácil. Significa aprender a encontrar sentido incluso en los momentos difíciles.</p>
              <p>Porque cuando cambia tu manera de mirar la vida, cambia la manera de vivirla.</p>
            </div>
            <p className="mt-10 font-serif italic font-medium text-2xl md:text-[1.75rem] text-brand-mint">
              Más que motivación, es estrategia de vida.
            </p>
          </ScrollReveal>

          <div className="lg:col-span-6 lg:pt-6">
            <ScrollReveal>
              <p className="font-serif italic text-2xl md:text-[1.75rem] text-white/80 mb-6">Tal vez hoy te sientes así…</p>
            </ScrollReveal>
            <ScrollReveal yOffset={16} staggerChildren={0.06} className="border-t border-white/15">
              {FEELINGS.map((f, i) => (
                <div key={f} className="flex items-baseline gap-6 py-4 md:py-5 border-b border-white/15">
                  <span className="w-6 shrink-0 text-[11px] font-semibold tracking-[0.15em] text-brand-mint tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-lg md:text-xl text-white/90">{f}</p>
                </div>
              ))}
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-10 font-display text-2xl md:text-3xl leading-snug text-white">
                <span className="italic text-brand-amber">No has perdido la capacidad.</span>
                <br />
                Solo necesitas reencontrarte<Dot />
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. QUIÉN ES CATA AYALA — Sunset Sand */}
      <section id="quien-es" className="relative bg-linen-sand py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          <ScrollReveal className="lg:col-span-6">
            <Eyebrow align="left">Quién es Cata Ayala</Eyebrow>
            <h2 className={`${sectionTitle} mt-6`}>
              Estructura corporativa, <span className="italic text-brand-coral">alma de madre</span><Dot />
            </h2>
            <p className="mt-8 text-xl md:text-2xl font-light text-brand-navy leading-snug">
              Lejos del espacio saturado del “life coaching genérico”, Cata trae a la mesa <strong className="font-semibold">más de 17 años de liderazgo en marketing</strong>.
            </p>
            <p className={`mt-5 ${bodyText}`}>
              Junto con formación de alto rendimiento y un Máster en Comunicación Estratégica. Todo esto se fusiona con una feroz resiliencia humana. Es el equilibrio perfecto entre la estructura corporativa implacable y el acompañamiento empático genuino.
            </p>
            <div className="mt-10 pt-10 border-t border-brand-navy/15 space-y-5">
              <p className={bodyText}>Durante años ayudé a construir, crecer y conectar marcas con las audiencias. Después entendí que la marca más importante era la vida de cada persona.</p>
              <p className={bodyText}>Soy administradora, tengo una maestría en comunicación. Soy Trainer Dale Carnegie y Coach.</p>
              <p className={bodyText}>Soy mamá de tres hijos —uno de 4 años y gemelos de 2 años—. Un sueño hecho realidad, luego de una pérdida y de escuchar a médicos decirme que no podía ser mamá.</p>
              <p className={bodyText}>Sobre todo, soy una persona profundamente convencida de que todos tenemos más potencial de lo que imaginamos. A veces nos dejamos convencer de las creencias que permitimos establecernos y olvidamos quiénes somos y lo que queremos.</p>
            </div>
            <div className="mt-10 flex items-start gap-5">
              <span className="mt-2 h-12 w-1 rounded-full bg-brand-amber shrink-0" aria-hidden />
              <div>
                <p className="font-serif italic font-medium text-3xl md:text-4xl text-brand-navy">“La actitud es una decisión.”</p>
                <p className="mt-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-brand-navy/55">— Cata Ayala</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={60} className="lg:col-span-6">
            <div className="relative w-full aspect-square bg-brand-navy rounded-[2.5rem] overflow-hidden group shadow-card hover:shadow-card-hover transition-shadow duration-500">
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,145,0,0.28) 0%, transparent 55%), radial-gradient(circle at 80% 90%, rgba(48,213,200,0.22) 0%, transparent 55%)' }} />
              <div className="absolute w-[52%] aspect-[4/3] left-4 md:left-8 top-6 md:top-8 rounded-2xl shadow-2xl transition-all duration-700 group-hover:-rotate-12 group-hover:-translate-x-4 group-hover:-translate-y-2 bg-white -rotate-[8deg]">
                <Image src="/diplomas/master-comunicacion-cert.jpg" alt="Máster en Comunicación Estratégica" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain p-3" />
              </div>
              <div className="absolute w-[58%] aspect-[4/3] right-4 md:right-10 top-14 md:top-16 rounded-2xl shadow-2xl transition-all duration-700 group-hover:rotate-6 group-hover:translate-x-6 group-hover:-translate-y-4 z-10 bg-white">
                <Image src="/diplomas/dna-cert.png" alt="Certificación DNA" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain p-3" />
              </div>
              <div className="absolute w-[62%] aspect-[4/3] left-1/2 -translate-x-1/2 bottom-6 md:bottom-8 rounded-2xl shadow-2xl transition-all duration-700 group-hover:-rotate-3 group-hover:translate-y-2 z-20 bg-white rotate-[3deg]">
                <Image src="/diplomas/coaching-cert.png" alt="Maestría en Coaching" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain p-3" />
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3 md:gap-4">
              {CREDENTIALS.map((c) => (
                <div key={c.label} className="relative bg-white rounded-2xl p-5 md:p-6 shadow-card overflow-hidden">
                  <span className={`absolute top-0 left-0 right-0 h-1 ${c.bar}`} aria-hidden />
                  <dt className="font-display lining-nums text-3xl md:text-4xl text-brand-navy">{c.value}</dt>
                  <dd className="mt-2 text-xs md:text-[13px] text-brand-navy/65 leading-snug">{c.label}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. FILOSOFÍA — Navy + "Sunset Coral & Gold" */}
      <section data-nav-theme="dark" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-brand-navy py-28">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 55%, rgba(255,145,0,0.20) 0%, rgba(255,94,54,0.08) 35%, transparent 65%)' }} />
        <Image
          src="/logo-icon.png"
          alt=""
          width={352}
          height={352}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-[920px] opacity-[0.06]"
        />
        <ScrollReveal className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <Eyebrow tone="mint">Mi filosofía</Eyebrow>
          <h2 className="mt-10 font-serif italic font-semibold text-5xl md:text-7xl lg:text-8xl leading-[1.05] pb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-amber via-[#FF7A1C] to-brand-coral">
              “No te doy respuestas.<br />Te ayudo a descubrir las tuyas.”
            </span>
          </h2>
          <div className="mx-auto mt-10 flex items-center justify-center gap-2" aria-hidden>
            <span className="h-1.5 w-8 rounded-full bg-brand-coral" />
            <span className="h-1.5 w-8 rounded-full bg-brand-amber" />
            <span className="h-1.5 w-8 rounded-full bg-brand-mint" />
          </div>
          <p className="mt-6 text-[11px] font-semibold tracking-[0.3em] uppercase text-white/60">Cata Ayala</p>
        </ScrollReveal>
      </section>

      {/* 5. METODOLOGÍA VIDA — un color de la paleta por paso */}
      <section id="metodologia" className="relative overflow-hidden py-24 md:py-36 bg-linen-cream">
        <div className="relative max-w-6xl mx-auto px-6">
          <ScrollReveal className="text-center">
            <Eyebrow>Metodología</Eyebrow>
            <h2 className="mt-6 font-display font-medium text-brand-navy text-7xl md:text-9xl tracking-[0.08em] leading-none">
              <span className="text-brand-mint">V</span><span className="text-brand-amber">I</span><span className="text-brand-navy">D</span><span className="text-brand-coral">A</span>
            </h2>
            <p className={`mt-6 max-w-xl mx-auto ${leadText}`}>
              Cuatro pasos para vivir con propósito, criterio y una actitud al 101%.
            </p>
          </ScrollReveal>

          <ScrollReveal yOffset={40} staggerChildren={0.1} itemClassName="h-full" className="mt-14 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {VIDA_STEPS.map((step, i) => (
              <motion.div
                key={step.letter}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`group relative rounded-3xl shadow-card p-5 sm:p-8 flex flex-col overflow-hidden cursor-default transition-shadow duration-300 hover:shadow-card-hover h-full min-h-[190px] sm:min-h-[260px] justify-between ${step.card}`}
              >
                {/* Glow on hover */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, transparent 70%)' }}
                />
                <span className={`relative text-[11px] font-semibold tracking-[0.2em] tabular-nums ${step.num}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative font-display font-medium text-5xl sm:text-7xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 origin-left">
                  {step.letter}
                </span>
                <p className="relative text-[15px] sm:text-lg font-semibold leading-snug">{step.title}</p>
                {/* Animated bottom line */}
                <span className={`absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out ${step.line}`} />
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 6. SERVICIOS — cada servicio con el color que corresponde a su significado */}
      <section id="servicios" className="py-24 md:py-36 bg-linen-sand">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center">
            <Eyebrow>Servicios</Eyebrow>
            <h2 className={`${sectionTitle} mt-6`}>
              Encuentra claridad,<br /><span className="italic">encuentra tu norte</span><Dot />
            </h2>
          </ScrollReveal>

          <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-6 md:gap-8">
            {SERVICES.map((service, i) => {
              const a = ACCENTS[service.accent];
              return (
                <ScrollReveal
                  key={service.title}
                  yOffset={60}
                  className="relative bg-white rounded-3xl shadow-card overflow-hidden p-8 md:p-12 hover:shadow-card-hover transition-shadow duration-500 flex flex-col"
                >
                  <span className={`absolute top-0 left-0 right-0 h-1.5 ${a.bg}`} aria-hidden />
                  <div className="flex items-center justify-between">
                    <span className={`w-11 h-11 rounded-full flex items-center justify-center font-display lining-nums text-lg ${a.badge}`}>
                      {i + 1}
                    </span>
                    <span className={`rounded-full px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase ${a.pill}`}>{service.tag}</span>
                  </div>
                  <h3 className="mt-8 font-display font-medium text-3xl md:text-4xl leading-tight">{service.title}</h3>
                  <p className="mt-3 text-[15px] font-medium text-brand-navy/80">{service.subtitle}</p>
                  <p className="mt-6 font-serif italic text-xl md:text-2xl text-brand-navy/85 leading-snug">{service.lead}</p>
                  <p className={`mt-5 ${bodyText}`}>{service.body}</p>

                  <p className="mt-8 mb-4 text-[11px] font-semibold tracking-[0.28em] uppercase text-brand-navy/55">Ideal si</p>
                  <ul className="space-y-3">
                    {service.bullets.map((b) => (
                      <li key={b} className={`flex gap-3 ${bodyText}`}>
                        <span className={`mt-[0.55em] h-2 w-2 shrink-0 rounded-full ${a.bg}`} aria-hidden />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <div className={`rounded-2xl px-6 py-5 ${a.soft}`}>
                      <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-brand-navy/60 mb-2">Objetivo del proceso</p>
                      <p className="text-[15px] md:text-base text-brand-navy leading-relaxed">{service.objective}</p>
                    </div>
                    {service.quote && (
                      <p className={`mt-6 pl-6 border-l-2 ${a.border} font-serif italic text-lg text-brand-navy/70 leading-snug`}>{service.quote}</p>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. RESULTADOS — Verde Menta */}
      <section id="resultados" className="relative py-24 md:py-36 bg-brand-mint overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 15% 10%, rgba(255,255,255,0.35) 0%, transparent 45%)' }} />
        <div className="relative max-w-6xl mx-auto px-6">
          <ScrollReveal className="text-center">
            <Eyebrow tone="navy">Algunos resultados</Eyebrow>
            <h2 className="mt-6 font-display font-medium text-brand-navy text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight max-w-4xl mx-auto">
              “Necesitamos criterio para saber elegir y <span className="italic">carácter para mantenerlo</span>.”
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={40} staggerChildren={0.1} itemClassName="h-full" className="mt-16 grid md:grid-cols-2 gap-6 md:gap-8">
            {TESTIMONIALS.map((quote, i) => (
              <figure key={quote.slice(0, 20)} className="h-full bg-white rounded-3xl shadow-card p-8 md:p-12 flex flex-col">
                <span aria-hidden className={`font-display text-7xl leading-none ${i === 0 ? 'text-brand-coral' : 'text-brand-amber'}`}>“</span>
                <blockquote className="-mt-4 font-serif italic text-xl md:text-[1.4rem] text-brand-navy leading-relaxed">
                  {quote}
                </blockquote>
                <span className={`mt-8 h-1 w-12 rounded-full ${i === 0 ? 'bg-brand-coral' : 'bg-brand-amber'}`} aria-hidden />
              </figure>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 8. RECURSOS GRATUITOS — Navy */}
      <section id="recursos" data-nav-theme="dark" className="relative py-24 md:py-36 bg-brand-navy text-white overflow-hidden">
        <div className="absolute -top-32 right-0 w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(48,213,200,0.14) 0%, transparent 65%)' }} />
        <div className="relative max-w-6xl mx-auto px-6">
          <ScrollReveal className="text-center">
            <Eyebrow tone="amber">Recursos gratuitos</Eyebrow>
            <h2 className="mt-6 font-display font-medium text-white text-4xl sm:text-5xl md:text-6xl leading-[1.08] tracking-tight">
              Para que empieces <span className="italic text-brand-amber">hoy mismo</span><Dot />
            </h2>
          </ScrollReveal>

          <ScrollReveal yOffset={40} staggerChildren={0.1} itemClassName="h-full" className="mt-16 md:mt-20 grid md:grid-cols-3 gap-5 md:gap-6">
            {RESOURCES.map((res, i) => {
              const icon = ['bg-brand-mint text-brand-navy', 'bg-brand-amber text-brand-navy', 'bg-brand-coral text-white'][i];
              return (
                <a
                  key={res.title}
                  href={res.file}
                  download
                  className="group h-full rounded-3xl p-8 md:p-10 bg-white/[0.05] border border-white/10 hover:bg-white/[0.09] hover:border-white/25 transition-colors duration-500 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-10">
                    <span className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${icon}`}>
                      <Download className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white/50">PDF gratuito</span>
                  </div>
                  <h3 className="font-display font-medium text-2xl leading-snug text-white">{res.title}</h3>
                  <p className="mt-4 mb-8 text-[15px] md:text-base text-white/70 leading-relaxed">{res.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-mint">
                    Descargar <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </span>
                </a>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* 9. AGENDA — Sunset Sand */}
      <div className="bg-linen-sand">
        <ScrollReveal className="max-w-3xl mx-auto px-6 pt-24 md:pt-36">
          <div className="text-center">
            <Eyebrow>Antes de empezar</Eyebrow>
            <h2 className={`${sectionTitle} mt-6`}>
              Tal vez hoy solo necesites una <span className="italic text-brand-coral">conversación</span><Dot />
            </h2>
          </div>
          <div ref={stepsRef} className="mt-14 md:mt-16 flex flex-col">
            {steps.map((step, i) => (
              <React.Fragment key={step.n}>
                {i > 0 && (
                  <motion.div style={{ opacity: connectorOpacity[i - 1] }} className="ml-[21px] md:ml-[23px] h-8 w-px bg-brand-navy/25" />
                )}
                <motion.div style={step.style} className="flex gap-5 md:gap-7">
                  <span className={`mt-1 w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-full flex items-center justify-center font-display lining-nums text-lg ${step.badge}`}>
                    {step.n}
                  </span>
                  <div className="flex-1 bg-white rounded-3xl shadow-card p-7 md:p-9">
                    <h3 className="font-display font-medium text-xl md:text-2xl">{step.title}</h3>
                    <p className={`mt-3 ${bodyText}`}>{step.text}</p>
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </ScrollReveal>
        <BookingSection />
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
    </BookingPopupProvider>
  );
}
