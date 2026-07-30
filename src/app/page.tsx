'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { BookingSection } from '@/components/BookingSection';
import { Footer } from '@/components/Footer';
import heroBgImg from '@/img/hero-bg.jpg';
import cataCutoutImg from '@/img/cata-cutout.png';
import linenTextureImg from '@/img/linen-texture.jpg';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Download } from 'lucide-react';

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

  // Mobile: green background always visible; photo shows first then
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

  const heroBgStyle = isDesktop
    ? { scale: heroImageScaleDesktop, opacity: heroImageOpacityDesktop }
    : {};
  const heroPhotoStyle = isDesktop
    ? { opacity: 1, filter: 'none' }
    : { opacity: heroImageOpacityMobile, filter: heroImageBlur };
  const heroTextStyle = isDesktop
    ? { opacity: heroTextOpacityDesktop, scale: heroTextScaleDesktop }
    : { opacity: heroTextOpacity };

  return (
    <main className="min-h-screen relative selection:bg-brand-coral selection:text-white bg-brand-navy text-white">
      <Navbar />

      {/* 1. HERO SECTION (APPLE STYLE) — scroll: text sharpens in, photo blurs out */}
      <section ref={heroRef} className="relative h-[200vh] bg-brand-navy">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

          {/* Background Texture that scales up */}
          <motion.div
            style={heroBgStyle}
            className="absolute inset-0 z-0"
          >
            <Image
              src={heroBgImg}
              alt=""
              fill
              className="object-cover blur-md scale-110"
              priority
            />
            <div className="absolute inset-x-0 top-0 h-40 md:h-48 bg-gradient-to-b from-brand-navy to-transparent z-10" />
          </motion.div>

          {/* Cata silhouette cutout, sitting on the textured background */}
          <motion.div
            style={heroPhotoStyle}
            className="absolute bottom-[8%] md:bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 lg:right-16 z-[5] h-[75%] md:h-[85%] lg:h-[90%] aspect-[356/723]"
          >
            <Image
              src={cataCutoutImg}
              alt="Cata Ayala"
              fill
              className="object-contain object-bottom"
              priority
            />
          </motion.div>

          {/* Central Hero Text */}
          <motion.div
            style={heroTextStyle}
            className="relative z-10 text-center md:text-left px-6 md:px-0 max-w-5xl md:max-w-none mx-auto flex flex-col items-center md:items-start mt-12 md:mt-20 w-full md:pl-16 lg:pl-24 md:pr-[32%] lg:pr-[28%]"
          >
            <h1 className="text-7xl sm:text-8xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-4 md:mb-6">
              <span className="block text-white mb-1 md:mb-2">Gózate</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-amber to-brand-coral">
                la vida.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 max-w-3xl mx-auto md:mx-0 leading-relaxed mt-4 md:mt-8">
              Un espacio donde no te doy fórmulas mágicas, sino que te devuelvo el poder de descubrir tus propias respuestas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. ¿TE SIENTES ASÍ? */}
      <section className="relative z-20 bg-gradient-to-b from-brand-amber via-[#FFCB80] to-white text-brand-navy py-28 md:py-40 rounded-t-[3rem] md:rounded-t-[4rem] -mt-20 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-brand-navy uppercase mb-6 text-center">
              Tal vez hoy te sientes así
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-center tracking-tight leading-[1.15] mb-16 max-w-4xl mx-auto">
              "La vida es demasiado espectacular <br className="hidden md:block" />
              como para no disfrutarla."
            </h3>
          </ScrollReveal>

          <ScrollReveal yOffset={40} staggerChildren={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
            {[
              'No encuentras claridad.',
              'Trabajas mucho pero no disfrutas.',
              'Quieres cambiar, pero no sabes cómo.',
              'Sientes culpa constantemente.',
              'Te cuesta tomar decisiones.',
              'Vives en automático.',
              'Sabes que puedes dar más.',
              'No has perdido la capacidad.',
              'Solo necesitas reencontrarte.',
            ].map((item) => (
              <div key={item} className="bg-white/70 rounded-2xl p-6 border border-white/80 shadow-sm">
                <p className="text-lg font-light text-brand-navy/80 leading-snug">{item}</p>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-2xl md:text-3xl font-light text-brand-navy/80 leading-relaxed mb-4">
                No significa que todo sea fácil. Significa aprender a encontrar sentido incluso en los momentos difíciles.
              </p>
              <p className="text-2xl md:text-3xl font-light text-brand-navy/80 leading-relaxed">
                Porque cuando cambia tu manera de mirar la vida, cambia la manera de vivirla.
              </p>
              <p className="mt-8 text-xl italic font-serif text-brand-coral">
                "Más que motivación, es estrategia de vida."
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. QUIÉN ES CATA AYALA */}
      <section id="quien-es" className="relative bg-gradient-to-b from-brand-mint via-[#BEF0EB] to-white text-brand-navy pt-28 md:pt-40 pb-28 md:pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-brand-coral uppercase mb-6 text-center">
              Quién es Cata Ayala
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight leading-[1.15] mb-24 max-w-3xl mx-auto text-brand-navy">
              Estructura corporativa,<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brand-amber to-brand-coral">alma de madre.</span>
            </h3>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <ScrollReveal yOffset={60}>
              <p className="text-3xl md:text-4xl lg:text-5xl font-light text-brand-navy leading-tight mb-8 tracking-tight">
                Lejos del espacio saturado del "life coaching genérico", Cata Ayala trae a la mesa <strong className="font-semibold">más de 17 años de liderazgo en marketing</strong>.
              </p>
              <p className="text-xl md:text-2xl font-light text-gray-500 leading-relaxed">
                Junto con formación de alto rendimiento y un Máster en Comunicación Estratégica. Todo esto se fusiona con una feroz resiliencia humana. Es el equilibrio perfecto entre la estructura corporativa implacable y el acompañamiento empático genuino.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} yOffset={60}>
              <a href="#respaldo" className="block relative w-full aspect-square bg-gray-50 rounded-[3rem] md:rounded-[4rem] overflow-hidden group cursor-pointer border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
                  <div className="absolute w-[55%] aspect-[4/3] left-1/2 -translate-x-1/2 top-8 md:top-10 rounded-2xl shadow-2xl transition-all duration-700 group-hover:-rotate-3 group-hover:-translate-y-2 bg-white rotate-[-4deg]">
                    <Image src="/diplomas/master-comunicacion-cert.jpg" alt="Máster en Comunicación Estratégica" fill className="object-contain p-3" />
                    <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
                  </div>
                  <div className="absolute w-[60%] aspect-[4/3] right-8 md:right-16 top-16 md:top-20 rounded-2xl shadow-2xl transition-all duration-700 group-hover:rotate-6 group-hover:translate-x-6 group-hover:-translate-y-4 z-10 bg-white">
                    <Image src="/diplomas/dna-cert.png" alt="DNA" fill className="object-contain p-3" />
                    <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
                  </div>
                  <div className="absolute w-[65%] aspect-[4/3] left-8 md:left-16 bottom-16 md:bottom-20 rounded-2xl shadow-2xl transition-all duration-700 group-hover:-rotate-6 group-hover:-translate-x-6 group-hover:translate-y-4 z-20 bg-white">
                    <Image src="/diplomas/coaching-cert.png" alt="Coaching" fill className="object-contain p-3" />
                    <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
                  </div>
                </div>
              </a>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1} yOffset={40}>
            <div className="max-w-4xl mx-auto mt-24 md:mt-32 space-y-6 text-center">
              <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed">
                Durante años ayudé a construir, crecer y conectar marcas con las audiencias. Después entendí que la marca más importante era la vida de cada persona.
              </p>
              <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed">
                Soy administradora, tengo una maestría en comunicación. Soy Trainer Dale Carnegie y Coach.
              </p>
              <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed">
                Soy mamá de tres hijos —uno de 4 años y gemelos de 2 años—. Un sueño hecho realidad, luego de una pérdida y de escuchar a médicos decirme que no podía ser mamá.
              </p>
              <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed">
                Sobre todo, soy una persona profundamente convencida de que todos tenemos más potencial de lo que imaginamos. A veces nos dejamos convencer de las creencias que permitimos establecernos y olvidamos quiénes somos y lo que queremos.
              </p>
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
                <p className="text-lg italic font-serif text-brand-navy">"La actitud es una decisión."</p>
                <p className="text-lg italic font-serif text-brand-coral">"No te doy respuestas. Te ayudo a descubrir las tuyas."</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. MAJESTIC QUOTE (LINEN TEXTURE) */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <Image src={linenTextureImg} alt="" fill className="object-cover" />
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at center, #0B2545 0%, transparent 60%)' }} />
        <ScrollReveal>
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif italic font-bold text-center leading-tight px-6 max-w-6xl mx-auto relative z-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-navy to-brand-navy/70">
              "No te doy respuestas.<br />Te ayudo a descubrir las tuyas."
            </span>
          </h3>
        </ScrollReveal>
      </section>

      {/* 5. FILOSOFÍA */}
      <section id="filosofia" className="relative py-32 md:py-48 bg-brand-sand text-brand-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 md:mb-32 text-center md:text-left">
            <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-gray-400 uppercase mb-4">El Código de Vida</h2>
            <h3 className="text-6xl md:text-8xl font-bold tracking-tighter">La Filosofía</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal yOffset={80} className="bg-white p-12 md:p-20 rounded-[3rem] shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-gray-100 flex flex-col justify-between">
              <div>
                <h4 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">El Espíritu 101%</h4>
                <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed mb-12">
                  Nacimos para vivir intensamente. Esta filosofía es el compromiso de prepararnos para vivir hasta los 101 años, dando siempre la milla extra.
                </p>
              </div>
              <p className="text-xl italic text-gray-400 font-serif border-l-4 border-gray-200 pl-6">
                "La vida es demasiado espectacular como para no disfrutarla."
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} yOffset={80} className="bg-brand-navy text-white p-12 md:p-20 rounded-[3rem] shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-brand-mint/20 flex flex-col justify-between">
              <div>
                <h4 className="text-4xl md:text-5xl font-bold text-brand-sand mb-8 tracking-tight">Criterio & Carácter</h4>
                <p className="text-xl md:text-2xl font-light text-brand-sand/80 leading-relaxed mb-12">
                  Creemos en un solo "yo" indivisible. Equilibramos la lógica implacable, la emoción profunda y una fe inquebrantable.
                </p>
              </div>
              <p className="text-xl italic text-brand-sand/60 font-serif border-l-4 border-brand-sand/30 pl-6">
                "Necesitamos criterio para saber elegir, y el carácter absoluto para mantener nuestras decisiones."
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. METODOLOGÍA VIDA */}
      <section id="metodologia" className="relative overflow-hidden py-32 md:py-48 bg-gradient-to-b from-brand-coral via-[#FFB09E] to-white text-brand-navy">
        <div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60%] aspect-square rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[45%] aspect-square rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(11,37,69,0.15) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-brand-navy uppercase mb-6 text-center">Metodología</h2>
            <h3
              className="text-6xl md:text-8xl font-bold tracking-tighter text-center mb-20 text-white"
              style={{ textShadow: '0 4px 30px rgba(11,37,69,0.35)' }}
            >
              VIDA
            </h3>
          </ScrollReveal>

          <ScrollReveal yOffset={40} staggerChildren={0.1} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { letter: 'V', title: 'Ver con claridad' },
              { letter: 'I', title: 'Identificar creencias' },
              { letter: 'D', title: 'Decidir con criterio' },
              { letter: 'A', title: 'Actuar con propósito' },
            ].map((step) => (
              <div key={step.letter} className="bg-white/80 border border-white/60 rounded-[2rem] p-8 flex flex-col gap-4 shadow-sm">
                <span className="text-5xl font-bold text-brand-coral font-serif">{step.letter}</span>
                <p className="text-xl font-light text-brand-navy leading-snug">{step.title}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 7. SERVICIOS */}
      <section id="servicios" className="py-32 md:py-48 bg-brand-sand text-brand-navy">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-brand-coral uppercase mb-6 text-center">Servicios</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-center mb-20 leading-[1.1]">
              Encuentra claridad,<br />encuentra tu norte.
            </h3>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
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
                quote: '"No se trata de convertirte en alguien diferente. Se trata de construir, desde quien ya eres, una vida que disfrutes con mayor propósito, coherencia y plenitud."',
              },
              {
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
            ].map((service) => (
              <ScrollReveal key={service.title} yOffset={60} className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-gray-100 flex flex-col">
                <h4 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">{service.title}</h4>
                <p className="text-brand-coral font-semibold mb-6">{service.subtitle}</p>
                <p className="text-lg italic text-gray-500 font-serif mb-6">{service.lead}</p>
                <p className="text-base font-light text-gray-600 leading-relaxed mb-8">{service.body}</p>

                <p className="text-sm font-bold tracking-widest uppercase text-brand-navy/60 mb-4">Ideal si:</p>
                <ul className="space-y-2 mb-8">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-base font-light text-gray-600 leading-relaxed">
                      <span className="text-brand-mint mt-1">●</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto bg-brand-sand/50 p-6 rounded-[1.5rem]">
                  <p className="text-sm font-bold tracking-widest uppercase text-brand-navy/60 mb-2">Objetivo del proceso</p>
                  <p className="text-base font-light text-gray-700 leading-relaxed">{service.objective}</p>
                </div>
                {service.quote && (
                  <p className="text-base italic text-gray-400 font-serif mt-6 border-l-4 border-gray-200 pl-6">{service.quote}</p>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RESULTADOS */}
      <section id="resultados" className="py-28 md:py-40 bg-white text-brand-navy">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-brand-coral uppercase mb-6">Algunos resultados</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-16 leading-[1.1]">
              "Necesitamos criterio para saber elegir<br className="hidden md:block" /> y carácter para mantenerlo."
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={40} staggerChildren={0.1} className="grid sm:grid-cols-2 gap-6">
            {[
              {
                name: 'Vivian Nuñez',
                quote: 'Cata es una persona muy profesional pero sobre todo muy humana. Abre un espacio donde genera confianza desde el momento cero y con paciencia guía a las personas a encontrar las respuestas. Para mí fue un espacio muy enriquecedor que le recomiendo a todos. A ella le agradezco enormemente su empatía, su apertura y su guía.',
              },
              {
                name: 'Pilar Echeverri',
                quote: 'Testimonio próximamente',
              },
            ].map(({ name, quote }) => (
              <div key={name} className="bg-brand-sand/40 border border-brand-sand/60 rounded-[2rem] p-10 text-left flex flex-col">
                <p className="text-lg italic text-gray-600 font-serif mb-6 leading-relaxed">"{quote}"</p>
                <p className="font-semibold text-brand-navy mt-auto">{name}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 9. RECURSOS GRATUITOS */}
      <section id="recursos" className="py-32 md:py-48 bg-brand-sand text-brand-navy">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-brand-coral uppercase mb-6 text-center">Recursos gratuitos</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-center mb-20 leading-[1.1]">
              Para que empieces<br />hoy mismo.
            </h3>
          </ScrollReveal>

          <ScrollReveal yOffset={40} staggerChildren={0.1} className="grid md:grid-cols-3 gap-6">
            {[
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
            ].map((res) => (
              <a
                key={res.title}
                href={res.file}
                download
                className="group bg-white rounded-[2rem] p-10 shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-white flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-mint/15 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6 text-brand-mint" />
                </div>
                <h4 className="text-2xl font-bold mb-4 tracking-tight leading-snug">{res.title}</h4>
                <p className="text-base font-light text-gray-500 leading-relaxed mb-8">{res.desc}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-brand-coral">
                  Descargar PDF
                </span>
              </a>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 10. AGENDA SECTION */}
      <div className="bg-brand-sand">
        <ScrollReveal className="max-w-4xl mx-auto px-6 pt-24 md:pt-32 text-center">
          <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-brand-coral uppercase mb-6">Antes de empezar</p>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-10 leading-[1.15]">
            Tal vez hoy solo necesites una conversación.
          </h3>
          <div className="text-left space-y-6 bg-white p-8 md:p-10 rounded-[2rem] shadow-sm">
            <p className="text-base md:text-lg font-light text-gray-600 leading-relaxed">
              <strong className="font-semibold text-brand-navy">Sesión de descubrimiento:</strong> son 15 minutos en los que nos conoceremos y te explicaré cómo es el proceso, con el fin de establecer acuerdos (tiempos de la sesión, pagos, entre otros). Este espacio NO es para conversar sobre la situación en sí, únicamente para aclarar dudas y conocernos. A veces no conectamos bien con quienes creíamos, por eso es mejor darnos la oportunidad de elegir a la persona correcta que te acompañe en tu camino.
            </p>
            <p className="text-base md:text-lg font-light text-gray-600 leading-relaxed">
              <strong className="font-semibold text-brand-navy">1ra sesión:</strong> aquí comienza el proceso. Empezaremos a hacernos muchas preguntas que solo tú contestarás, y veremos cuántas sesiones adicionales podrías tomar. Usualmente comenzamos con 4.
            </p>
            <p className="text-base md:text-lg font-light text-gray-600 leading-relaxed">
              <strong className="font-semibold text-brand-navy">Continuación:</strong> acorde a las sesiones que se establecieron, continuamos el camino.
            </p>
          </div>
        </ScrollReveal>
        <BookingSection />
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
