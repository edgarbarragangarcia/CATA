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
import { ScrollReveal } from '@/components/ScrollReveal';

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

  // Mobile: sequential blur effect (text sharpens in first, then photo).
  const heroTextOpacity = useTransform(heroProgress, [0, 0.15], [1, 1]);
  const heroTextBlurPx = useTransform(heroProgress, [0, 0.15], [0, 0]);
  const heroTextBlur = useMotionTemplate`blur(${heroTextBlurPx}px)`;
  const heroImageBlurPx = useTransform(heroProgress, [0.2, 0.55], [24, 0]);
  const heroImageBlur = useMotionTemplate`blur(${heroImageBlurPx}px)`;
  const heroImageOpacityMobile = useTransform(heroProgress, [0.2, 0.45], [0, 1]);
  const heroImageScaleMobile = useTransform(heroProgress, [0.3, 1], [1, 1.1]);

  // Desktop: original Apple-style zoom/fade as the section scrolls away.
  const heroTextOpacityDesktop = useTransform(heroProgress, [0, 0.4], [1, 0]);
  const heroTextScaleDesktop = useTransform(heroProgress, [0, 0.4], [1, 0.8]);
  const heroImageScaleDesktop = useTransform(heroProgress, [0, 1], [1, 1.1]);
  const heroImageOpacityDesktop = useTransform(heroProgress, [0.5, 1], [1, 0]);

  const heroBgStyle = isDesktop
    ? { scale: heroImageScaleDesktop, opacity: heroImageOpacityDesktop }
    : { scale: heroImageScaleMobile, opacity: heroImageOpacityMobile, filter: heroImageBlur };
  const heroPhotoStyle = isDesktop
    ? { scale: heroImageScaleDesktop, opacity: heroImageOpacityDesktop }
    : { scale: heroImageScaleMobile, opacity: heroImageOpacityMobile, filter: heroImageBlur };
  const heroTextStyle = isDesktop
    ? { opacity: heroTextOpacityDesktop, scale: heroTextScaleDesktop }
    : { opacity: heroTextOpacity, filter: heroTextBlur };

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
            className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 lg:right-16 z-[5] h-[55%] md:h-[85%] lg:h-[90%] aspect-[356/723]"
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
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-4 md:mb-6">
              <span className="block text-white mb-1 md:mb-2">Gózate</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-amber to-brand-coral">
                la vida.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl font-light text-white/90 max-w-3xl mx-auto md:mx-0 leading-relaxed mt-4 md:mt-8">
              Un espacio donde no te doy fórmulas mágicas, sino que te devuelvo el poder de descubrir tus propias respuestas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. TERRITORIO ÚNICO (PREMIUM WHITE SECTION) */}
      <section className="relative z-20 bg-white text-black py-32 md:py-48 rounded-t-[3rem] md:rounded-t-[4rem] -mt-20 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-brand-coral uppercase mb-8 text-center">
              Territorio Único
            </h2>
            <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center tracking-tight leading-[1.1] mb-24 max-w-5xl mx-auto">
              Más que motivación,<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brand-amber to-brand-coral">estrategia de vida.</span>
            </h3>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <ScrollReveal yOffset={60}>
              <p className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8 tracking-tight">
                Lejos del espacio saturado del "life coaching genérico", Cata Ayala trae a la mesa <strong className="font-semibold">17 años de liderazgo en marketing</strong>.
              </p>
              <p className="text-xl md:text-2xl font-light text-gray-500 leading-relaxed">
                Formación de alto rendimiento y un Máster en Comunicación Estratégica. Todo esto se fusiona con una feroz resiliencia humana. Es el equilibrio perfecto entre la estructura corporativa implacable y el acompañamiento empático genuino.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} yOffset={60}>
              <a href="#respaldo" className="block relative w-full aspect-square bg-gray-50 rounded-[3rem] md:rounded-[4rem] overflow-hidden group cursor-pointer border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
                  <div className="absolute w-[60%] aspect-[4/3] right-8 md:right-16 top-16 md:top-20 rounded-2xl shadow-2xl transition-all duration-700 group-hover:rotate-6 group-hover:translate-x-6 group-hover:-translate-y-4 bg-white">
                    <Image src="/diplomas/dna-cert.png" alt="DNA" fill className="object-contain p-3" />
                    <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
                  </div>
                  <div className="absolute w-[65%] aspect-[4/3] left-8 md:left-16 bottom-16 md:bottom-20 rounded-2xl shadow-2xl transition-all duration-700 group-hover:-rotate-6 group-hover:-translate-x-6 group-hover:translate-y-4 z-10 bg-white">
                    <Image src="/diplomas/coaching-cert.png" alt="Coaching" fill className="object-contain p-3" />
                    <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
                  </div>
                </div>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. MAJESTIC QUOTE (DARK PARALLAX) */}
      <section className="relative h-[100vh] bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at center, #FF5E36 0%, transparent 60%)' }} />
        <ScrollReveal>
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif italic font-bold text-center leading-tight px-6 max-w-6xl mx-auto relative z-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
              "No te doy respuestas.<br />Te ayudo a descubrir las tuyas."
            </span>
          </h3>
        </ScrollReveal>
      </section>

      {/* 4. FILOSOFÍA */}
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

      {/* 5. PILARES & RESPALDO ACADÉMICO */}
      <section id="respaldo" className="py-32 md:py-48 bg-white text-brand-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-brand-coral uppercase mb-6">El Origen</h2>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tight mb-10 leading-[1.1]">
                Los 5 Tesoros <br />
                <span className="text-gray-400">y la Prueba.</span>
              </h3>
              <p className="text-2xl font-light text-gray-700 leading-relaxed mb-10">
                Toda historia necesita pruebas. El origen de esta fuerza radica en su mayor red de apoyo. La historia de Cata es una historia de milagros: madre de 3 hijos concebidos desafiando diagnósticos médicos restrictivos.
              </p>
              <div className="bg-brand-sand p-10 rounded-[2rem]">
                <p className="text-xl italic text-gray-600 font-serif leading-relaxed">
                  "El liderazgo maternal me preparó para la junta directiva más exigente. Sé exactamente lo que es balancear la presión corporativa con el amor incondicional."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. AGENDA SECTION */}
      <div className="bg-brand-sand">
        <BookingSection />
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
