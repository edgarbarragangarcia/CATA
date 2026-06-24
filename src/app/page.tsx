import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ColorSwatch } from '@/components/ColorSwatch';
import { Navbar } from '@/components/Navbar';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { BookingSection } from '@/components/BookingSection';
import { Footer } from '@/components/Footer';
import cataImg from '@/img/cata.jpg';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-brand-coral selection:text-white">

      {/* Dynamic Animated Aurora Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10vw] left-[-10vw] w-[50vw] h-[50vw] rounded-full blur-[100px] bg-blob-one" />
        <div className="absolute bottom-[-15vw] right-[-10vw] w-[60vw] h-[60vw] rounded-full blur-[110px] bg-blob-two" />
        <div className="absolute top-[25vw] right-[-5vw] w-[45vw] h-[45vw] rounded-full blur-[100px] bg-blob-three" />
        <div className="absolute bottom-[20vw] left-[-5vw] w-[50vw] h-[50vw] rounded-full blur-[90px] bg-blob-four" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* 1. HERO SECTION (El Espíritu 101%) */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-32 pb-20">
        <ScrollReveal yOffset={40} className="w-full max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            
            {/* Photo Presentation */}
            <div className="order-1 md:col-span-5 flex justify-center md:justify-end">
              <div className="relative w-[260px] sm:w-[300px] md:w-[320px] lg:w-[320px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50">
                <div className="absolute inset-0 bg-brand-amber blur-3xl opacity-30 mix-blend-multiply" />
                <Image 
                  src={cataImg} 
                  alt="Cata Ayala" 
                  className="w-full h-auto relative z-10"
                  priority
                  quality={100}
                  style={{ imageRendering: 'auto' }}
                />
              </div>
            </div>

            {/* Text Presentation */}
            <div className="text-center md:text-left flex flex-col items-center md:items-start order-2 md:col-span-7 md:pl-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy mb-6 md:mb-8 leading-[1.15]">
                <span className="block mb-2 md:mb-3">Gózate la vida:</span>
                <span
                  className="font-serif block pb-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
                  style={{
                    background: 'linear-gradient(135deg, #8B6914 0%, #C8920A 25%, #8B6914 50%, #B8830A 75%, #6B4F0A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  El arte de vivir y tomar decisiones con propósito, criterio y una actitud al 101%
                </span>
              </h1>
              <div className="w-24 h-1 bg-brand-mint mb-8 md:mx-0 rounded-full" />
              <p className="text-lg md:text-xl font-sans font-light text-brand-navy/80 max-w-lg leading-relaxed px-4 md:px-0">
                Una mentoría que no te da fórmulas mágicas, sino que te devuelve el poder de descubrir tus propias respuestas.
              </p>
            </div>

          </div>

        </ScrollReveal>
      </section>

      {/* 2. POSICIONAMIENTO Y PROMESA (Territorio Único) */}
      <section id="posicionamiento" className="relative z-10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 md:mb-24">
          <ScrollReveal delay={0.2}>
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <h2 className="text-xs md:text-sm font-sans font-bold tracking-widest text-brand-coral uppercase mb-4">Territorio Único</h2>
                <h3 className="text-3xl md:text-5xl font-bold text-brand-navy mb-6 leading-tight">
                  Más que motivación, <br/><span className="font-serif italic text-brand-amber">estrategia de vida.</span>
                </h3>
                <p className="text-lg font-sans font-light text-brand-navy/80 leading-relaxed mb-6">
                  Lejos del espacio saturado del "life coaching genérico", Cata Ayala trae a la mesa <strong>17 años de liderazgo en marketing</strong>, formación de alto rendimiento en Dale Carnegie y un Máster en Comunicación Estratégica.
                </p>
                <p className="text-lg font-sans font-light text-brand-navy/80 leading-relaxed">
                  Todo esto se fusiona con una feroz resiliencia humana. Es el equilibrio perfecto entre la estructura corporativa implacable y el acompañamiento empático genuino.
                </p>
              </div>
              <div className="relative h-[300px] sm:h-[400px] w-full rounded-[2rem] overflow-hidden bg-brand-sand shadow-2xl border border-white">
                <div className="absolute inset-0 bg-brand-navy/5 backdrop-blur-3xl" />
                {/* Abstract graphic representing strategy and human warmth */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-brand-coral/20 rounded-full" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-brand-amber/30 rounded-full rotate-45" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-tr from-brand-coral to-brand-amber rounded-full blur-xl opacity-50" />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Majestic Full-Width Callout */}
        <ScrollReveal yOffset={60}>
          <div className="w-full bg-brand-navy text-white relative py-20 md:py-24 px-4 sm:px-6 overflow-hidden border-y border-[#BF953F]/40 shadow-2xl">
            {/* Fine gold accent border mimicking Hot Stamping */}
            <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)' }} />
            
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <h3
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-snug md:leading-tight"
                style={{
                  background: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 35%, #B38728 65%, #AA771C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                "No te doy respuestas. <br className="hidden md:block"/>Te ayudo a descubrir las tuyas."
              </h3>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. FILOSOFÍA (Criterio, Coherencia & El Espíritu 101%) */}
      <section id="filosofia" className="relative z-10 px-4 sm:px-6 pt-10 pb-24 md:pt-12 md:pb-32 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-xs md:text-sm font-sans font-bold tracking-widest text-brand-coral uppercase mb-4">La Filosofía</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-brand-navy mb-6">El Código de Vida</h3>
          </div>
        </ScrollReveal>

        <ScrollReveal staggerChildren={0.2} className="grid md:grid-cols-2 gap-8 md:gap-10">
          {/* Card 1: El Espíritu 101% */}
          <div className="bg-white/40 backdrop-blur-xl border border-white p-8 sm:p-10 md:p-12 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-brand-amber/10 rounded-full blur-3xl group-hover:bg-brand-amber/20 transition-colors duration-500" />
            <h4 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6 relative z-10">El Espíritu 101%</h4>
            <p className="font-sans text-brand-navy/80 leading-relaxed font-light text-base md:text-lg mb-6 relative z-10">
              Nacimos para vivir intensamente. Esta filosofía es el compromiso de prepararnos para <strong>vivir hasta los 101 años</strong>, dando siempre la milla extra en el servicio a los demás.
            </p>
            <p className="font-sans text-brand-navy/80 leading-relaxed font-light text-base md:text-lg italic border-l-4 border-brand-coral pl-4 relative z-10">
              "La vida es demasiado espectacular como para no disfrutarla. Debemos aprender hasta gozarnos las tristezas."
            </p>
          </div>

          {/* Card 2: Criterio & Carácter */}
          <div className="bg-brand-navy text-white p-8 sm:p-10 md:p-12 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-brand-mint/10 rounded-full blur-3xl group-hover:bg-brand-mint/20 transition-colors duration-500" />
            <h4 className="text-2xl md:text-3xl font-bold text-brand-sand mb-6 relative z-10">Criterio & Carácter</h4>
            <p className="font-sans text-brand-sand/80 leading-relaxed font-light text-base md:text-lg mb-6 relative z-10">
              Creemos en un solo "yo" indivisible. Somos la misma persona dentro y fuera de la oficina, equilibrando la lógica implacable, la emoción profunda y una fe inquebrantable.
            </p>
            <p className="font-sans text-brand-sand/90 leading-relaxed font-light text-base md:text-lg italic border-l-4 border-brand-mint pl-4 relative z-10">
              "Necesitamos criterio para saber elegir, y el carácter absoluto para mantener nuestras decisiones".
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. EL ORIGEN DE LA FUERZA (Nuestra Tribu Objetivo y Los 5 Tesoros) */}
      <section id="pilares" className="relative z-10 px-4 sm:px-6 py-24 md:py-32 bg-white/20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="grid lg:grid-cols-12 gap-12 md:gap-16">
              
              <div className="lg:col-span-5">
                <h2 className="text-xs md:text-sm font-sans font-bold tracking-widest text-brand-coral uppercase mb-4">El Origen de la Fuerza</h2>
                <h3 className="text-3xl md:text-5xl font-bold text-brand-navy mb-6 md:mb-8 leading-tight">
                  Los 5 Tesoros <br/><span className="font-serif italic text-brand-mint">y la Prueba Empírica</span>
                </h3>
                <div className="w-16 h-1 bg-brand-navy mb-6 md:mb-8 rounded-full" />
                <p className="text-base md:text-lg font-sans text-brand-navy/80 leading-relaxed mb-6 font-light">
                  Todo marco teórico necesita pruebas. El origen de esta fuerza radica en su mayor red de apoyo: su esposo y su familia. La historia de Cata es una historia de milagros: <strong>madre de 3 hijos (incluidos gemelos)</strong> concebidos de manera natural desafiando diagnósticos médicos restrictivos.
                </p>
              </div>

              <div className="lg:col-span-7 bg-brand-sand border border-brand-amber/20 p-8 sm:p-10 md:p-14 rounded-[2rem] shadow-xl relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-brand-coral/10 rounded-full blur-3xl" />
                <h4 className="text-xl md:text-2xl font-bold text-brand-navy mb-4 md:mb-6 relative z-10">Nuestra Tribu: Madres Multitarea & Comunidad Hispana</h4>
                <p className="text-base md:text-lg font-sans text-brand-navy/80 leading-relaxed font-light mb-6 relative z-10">
                  Dirigido a mujeres profesionales y emprendedoras (25-50 años) de la comunidad hispana que sienten que han tocado un techo de cristal, o que se encuentran bloqueadas entre sus realidades corporativas y la vida familiar.
                </p>
                <p className="text-lg md:text-xl font-serif italic text-brand-navy leading-relaxed border-l-4 border-brand-coral pl-4 md:pl-6 py-2 relative z-10">
                  "El liderazgo maternal me preparó para la junta directiva más exigente. Sé exactamente lo que es balancear la presión corporativa de alto nivel con el amor incondicional. Te guío desde la empatía de quien ya recorrió ese camino."
                </p>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* 6. AGENDA SECTION */}
      <BookingSection />

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

    </main>
  );
}
