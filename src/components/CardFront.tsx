import React, { useState } from 'react';
import { SurpriseConfig, COLOR_THEMES } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface CardFrontProps {
  config: SurpriseConfig;
  onOpen: () => void;
}

export default function CardFront({ config, onOpen }: CardFrontProps) {
  const { themeColor, badgeText, mainHeading, handwrittenSub, character } = config;
  const colors = COLOR_THEMES[themeColor];
  
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    
    // Stagger opening state to sync with animations
    setTimeout(() => {
      onOpen();
    }, 1300); // Wait for flap rotation and glide-up to finish
  };

  // Cute interactive characters (SVG pixel-style)
  const renderCharacter = () => {
    switch (character) {
      case 'hamster':
        return (
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {/* Pulsing floating heart above character */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
              <Heart className="w-5 h-5 text-red-400 fill-red-400 animate-pulse" />
            </div>
            {/* Gray/Pink Hamster */}
            <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-sm select-none">
              <rect x="35" y="30" width="30" height="40" rx="15" fill="#fbc3bc" /> {/* body */}
              <circle cx="30" cy="45" r="8" fill="#ffdcd8" /> {/* cheeks */}
              <circle cx="70" cy="45" r="8" fill="#ffdcd8" />
              <rect x="30" y="22" width="10" height="12" rx="4" fill="#fbc3bc" /> {/* ears */}
              <rect x="60" y="22" width="10" height="12" rx="4" fill="#fbc3bc" />
              <circle cx="43" cy="40" r="2.5" fill="#3b2b30" /> {/* eyes */}
              <circle cx="57" cy="40" r="2.5" fill="#3b2b30" />
              <polygon points="48,46 52,46 50,49" fill="#e25c5c" /> {/* nose */}
              <path d="M 46,55 Q 50,58 54,55" fill="none" stroke="#3b2b30" strokeWidth="2.5" strokeLinecap="round" /> {/* smile */}
              <circle cx="35" cy="72" r="5" fill="#ffdcd8" /> {/* paws */}
              <circle cx="65" cy="72" r="5" fill="#ffdcd8" />
            </svg>
          </div>
        );
      case 'puppy':
        return (
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
              <Heart className="w-5 h-5 text-red-400 fill-red-400 animate-pulse" />
            </div>
            {/* Cute Pixel Dog */}
            <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-sm select-none">
              <rect x="30" y="30" width="40" height="40" rx="12" fill="#e29578" /> {/* face */}
              <rect x="25" y="28" width="12" height="24" rx="6" fill="#8d5b4c" /> {/* floppy ear left */}
              <rect x="63" y="28" width="12" height="24" rx="6" fill="#8d5b4c" /> {/* floppy ear right */}
              <circle cx="42" cy="45" r="3" fill="#2d1a12" /> {/* eyes */}
              <circle cx="58" cy="45" r="3" fill="#2d1a12" />
              <ellipse cx="50" cy="53" rx="5" ry="3.5" fill="#2d1a12" /> {/* nose */}
              <path d="M 46,60 Q 50,63 54,60" fill="none" stroke="#2d1a12" strokeWidth="2" strokeLinecap="round" /> {/* mouth */}
              {/* cute blush */}
              <circle cx="34" cy="52" r="4" fill="#ffccd5" opacity="0.8" />
              <circle cx="66" cy="52" r="4" fill="#ffccd5" opacity="0.8" />
            </svg>
          </div>
        );
      case 'bear':
        return (
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
              <Heart className="w-5 h-5 text-red-400 fill-red-400 animate-pulse" />
            </div>
            {/* Teddy bear */}
            <svg viewBox="0 0 100 100" className="w-23 h-23 drop-shadow-sm select-none">
              <rect x="30" y="32" width="40" height="38" rx="14" fill="#b08968" /> {/* face */}
              <circle cx="32" cy="30" r="8" fill="#7f5539" /> {/* ear left */}
              <circle cx="68" cy="30" r="8" fill="#7f5539" /> {/* ear right */}
              <circle cx="32" cy="30" r="4" fill="#ffccd5" /> {/* ear inner */}
              <circle cx="68" cy="30" r="4" fill="#ffccd5" />
              <circle cx="42" cy="46" r="3" fill="#212529" /> {/* eyes */}
              <circle cx="58" cy="46" r="3" fill="#212529" />
              {/* muzzle */}
              <ellipse cx="50" cy="54" rx="9" ry="6" fill="#ede0d4" />
              <ellipse cx="50" cy="52" rx="3.5" ry="2.5" fill="#212529" />
              <path d="M 50,54 L 50,58" stroke="#212529" strokeWidth="2" />
              {/* blush */}
              <circle cx="35" cy="53" r="4.5" fill="#f8ad9d" />
              <circle cx="65" cy="53" r="4.5" fill="#f8ad9d" />
            </svg>
          </div>
        );
      case 'cat':
      default:
        return (
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {/* Heart floating over kitten */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
              <Heart className="w-5.5 h-5.5 text-[#ff4d6d] fill-[#ff4d6d] animate-pulse" />
            </div>

            {/* Gray Pixel Kitten lying on back (recreating original cat closely!) */}
            <svg viewBox="0 0 100 100" className="w-24 h-24 select-none drop-shadow-sm">
              {/* Body */}
              <rect x="25" y="45" width="50" height="26" rx="13" fill="#b1a7a6" />
              
              {/* Sleepy kitten head rotated back */}
              <circle cx="50" cy="44" r="16" fill="#b1a7a6" />
              
              {/* Soft pink cheeks */}
              <circle cx="40" cy="46" r="4" fill="#ffadad" opacity="0.8" />
              <circle cx="60" cy="46" r="4" fill="#ffadad" opacity="0.8" />

              {/* Ears */}
              <polygon points="34,34 44,30 40,43" fill="#b1a7a6" />
              <polygon points="36,36 41,33 40,41" fill="#ffccd5" />
              <polygon points="66,34 56,30 60,43" fill="#b1a7a6" />
              <polygon points="64,36 59,33 60,41" fill="#ffccd5" />

              {/* Sleeping happy curved closed eyes */}
              <path d="M 38,41 Q 41,44 44,41" fill="none" stroke="#48484a" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 56,41 Q 59,44 62,41" fill="none" stroke="#48484a" strokeWidth="2.5" strokeLinecap="round" />

              {/* Tiny triangle nose */}
              <polygon points="48,46 52,46 50,49" fill="#ff70a6" />

              {/* Lying on back tummy */}
              <rect x="36" y="53" width="28" height="13" rx="6" fill="#f5f3f4" />

              {/* Little cute sticking up paws */}
              <circle cx="34" cy="65" r="5.5" fill="#f5f3f4" stroke="#b1a7a6" strokeWidth="1.5" />
              <circle cx="66" cy="65" r="5.5" fill="#f5f3f4" stroke="#b1a7a6" strokeWidth="1.5" />

              <circle cx="32" cy="49" r="4.5" fill="#f5f3f4" stroke="#b1a7a6" strokeWidth="1.5" />
              <circle cx="68" cy="49" r="4.5" fill="#f5f3f4" stroke="#b1a7a6" strokeWidth="1.5" />

              {/* Pink footprint details on paws */}
              <circle cx="34" cy="65" r="2.5" fill="#ffadad" />
              <circle cx="66" cy="65" r="2.5" fill="#ffadad" />

              {/* Soft tail */}
              <path d="M 72,55 Q 82,50 82,40" fill="none" stroke="#b1a7a6" strokeWidth="6" strokeLinecap="round" />
              <path d="M 72,55 Q 82,50 82,40" fill="none" stroke="#ffadad" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div 
      id="card-front-scene"
      className={`min-h-[75vh] flex flex-col justify-center items-center px-4 py-8 relative ${isOpening ? 'pointer-events-none' : ''}`}
    >
      {/* Floating decorative small sparkles/hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/10 animate-bounce duration-1000 text-pink-400">♥</div>
        <div className="absolute top-1/3 right-1/10 animate-ping duration-2000 text-pink-300">★</div>
        <div className="absolute bottom-1/4 left-1/6 animate-pulse duration-1500 text-purple-400">❀</div>
        <div className="absolute bottom-1/3 right-1/5 animate-pulse duration-1000 text-pink-500">✿</div>
      </div>

      {/* 1. Subtle, elegant heart icon decoration */}
      <motion.div
        id="badge-decoration-heart"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="flex items-center gap-2 mb-6"
      >
        <span className="text-[#1A1A1A]/30 text-xs font-serif italic">❦</span>
        <span className={`text-[10px] font-extrabold tracking-[0.25em] uppercase text-neutral-500`}>
          {badgeText || "a small surprise"}
        </span>
        <span className="text-[#1A1A1A]/30 text-xs font-serif italic">❦</span>
      </motion.div>

      {/* 2. Main titles */}
      <div className="text-center mb-8 max-w-2xl px-4">
        <motion.h1
          id="main-surprise-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif font-normal text-5xl sm:text-6xl md:text-7xl text-[#1A1A1A] tracking-[-0.04em] leading-[0.95] mb-4 text-balance animate-fade-in"
        >
          {mainHeading || "a little something for you"}
        </motion.h1>
        
        <motion.p
          id="cursive-surprise-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-handwritten text-3xl text-pink-700 italic font-medium tracking-wide mt-2"
        >
          {handwrittenSub || "happy birthday ♡"}
        </motion.p>
      </div>

      {/* 3. Render Animated Pixel Character with fine circular layout line */}
      <motion.div 
        id="animated-character"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 12, delay: 0.4 }}
        className="mb-8 relative"
      >
        <div className="absolute inset-0 border border-dashed border-[#1A1A1A]/10 rounded-full scale-125" />
        {renderCharacter()}
      </motion.div>

      {/* 4. Elegant Physical-Style Sealed Envelope Card */}
      <motion.div
        id="sealed-envelope-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full max-w-lg aspect-[5/3.2] flex items-center justify-center filter"
        animate={
          isOpening
            ? { scale: [1, 1.05, 0.9], y: [0, -15, 20], opacity: [1, 1, 0] }
            : isHovered
            ? { y: -8, scale: 1.02 }
            : { y: 0, scale: 1 }
        }
        transition={{ duration: isOpening ? 1.3 : 0.4, ease: 'easeInOut' }}
      >
        {/* Physical Shadow Container underneath */}
        <div className="absolute -bottom-6 left-[8%] right-[8%] h-7 bg-black/5 rounded-full filter blur-xl transition-transform duration-300 transform group-hover:scale-95" />

        {/* Outer Envelope Wrapper */}
        <div className="absolute inset-0 bg-[#F5F2EB] rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-[#DCD9D0] overflow-hidden flex flex-col justify-end">
          {/* Back Paper triangle shapes to make realistic envelope seams */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 320" preserveAspectRatio="none">
            {/* Left flap triangle */}
            <polygon points="0,0 230,160 0,320" fill="#EFECE4" stroke="#D1CDC2" strokeWidth="0.5" />
            {/* Right flap triangle */}
            <polygon points="500,0 270,160 500,320" fill="#EFECE4" stroke="#D1CDC2" strokeWidth="0.5" />
            {/* Bottom flap triangle intersecting top */}
            <polygon points="0,320 250,135 500,320" fill="#EAE6DC" stroke="#C5C0B3" strokeWidth="0.5" />
          </svg>

          {/* Animated top closing lid/flap */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full origin-top"
            animate={isOpening ? { rotateX: -160, zIndex: 0 } : { rotateX: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformStyle: 'preserve-3d', zIndex: 10 }}
          >
            <svg className="w-full h-full" viewBox="0 0 500 320" preserveAspectRatio="none">
              <polygon points="0,0 250,140 500,0" fill="#EAE6DC" stroke="#C5C0B3" strokeWidth="0.5" />
            </svg>
          </motion.div>
        </div>

        {/* The Wax Seal Click Container (matching the design accent theme) */}
        <motion.button
          id="envelope-wax-seal"
          onClick={handleSealClick}
          className="absolute z-30 cursor-pointer group/seal focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] rounded-full"
          animate={isOpening ? { scale: 0.3, opacity: 0 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
          aria-label="Crack and open beautiful birthday card"
        >
          {/* Realistic 3D Matte Wax Seal in Editorial Theme Accent color */}
          <div className={`w-18 h-18 rounded-full ${colors.accentSolid} shadow-md border-4 border-double border-white/40 flex items-center justify-center relative group-hover/seal:scale-115 active:scale-95 transition-all`}>
            {/* Inner concentric organic ring */}
            <div className="w-13 h-13 rounded-full border border-dashed border-white/60 flex items-center justify-center">
              <Heart className="w-5.5 h-5.5 text-white fill-current animate-pulse" />
            </div>

            {/* Glowing seal background rings */}
            <div className="absolute inset-0 bg-[#1A1A1A] rounded-full scale-0 group-hover/seal:scale-125 opacity-10 group-hover/seal:animate-ping duration-1500 pointer-events-none" />
          </div>
        </motion.button>

        {/* Interactive glider card revealing from inside background during flap rotate */}
        <AnimatePresence>
          {isOpening && (
            <motion.div
              className="absolute w-[92%] h-[92%] bg-white rounded-md shadow-sm origin-bottom z-5 flex items-center justify-center text-gray-400 font-mono text-[10px] select-none border border-gray-100"
              initial={{ y: 0, opacity: 0.8 }}
              animate={{ y: -160, scale: 0.95, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
            >
              <div className="text-center uppercase tracking-widest">
                <p className="font-serif italic text-gray-600">Archiving...</p>
                <div className="w-16 h-[1px] bg-gray-200 mx-auto mt-2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 5. Action trigger advice */}
      <motion.div
        id="guide-note-seal"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 flex flex-col items-center gap-1.5"
      >
        <p className="text-[10px] font-extrabold font-sans tracking-[0.25em] text-[#1A1A1A] uppercase flex items-center gap-1.5 select-none">
          TAP THE SEAL TO OPEN <span>—</span>
        </p>
        <span className="text-[10.5px] font-medium text-gray-500 font-sans">- bespoke melody and story included -</span>
      </motion.div>
    </div>
  );
}
