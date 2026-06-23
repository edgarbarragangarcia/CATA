'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ColorSwatchProps {
  name: string;
  hex: string;
  className: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, hex, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative flex flex-col items-center gap-3 transition-transform hover:-translate-y-2 focus:outline-none"
      aria-label={`Copy hex code for ${name}`}
    >
      <div 
        className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg border-4 border-white/50 relative overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          {copied ? (
            <Check className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
          ) : (
            <Copy className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
          )}
        </div>
      </div>
      <div className="text-center">
        <h4 className="font-serif font-semibold text-lg opacity-90">{name}</h4>
        <p className="font-sans text-sm tracking-widest opacity-60 uppercase">
          {copied ? 'Copied!' : hex}
        </p>
      </div>
    </button>
  );
};
