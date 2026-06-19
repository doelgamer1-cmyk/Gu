import React from 'react';
import { SurpriseConfig, COLOR_THEMES } from '../types';
import { motion } from 'motion/react';
import AudioPlayer from './AudioPlayer';
import { Heart } from 'lucide-react';

interface CardBackProps {
  config: SurpriseConfig;
  onNavigateToAlbum: () => void;
  onReset: () => void;
}

export default function CardBack({ config, onNavigateToAlbum, onReset }: CardBackProps) {
  const { themeColor, recipientName, mainHeading, messageText, character } = config;
  const colors = COLOR_THEMES[themeColor];

  // Helper to draw matching profile avatar in top-right
  const renderAvatar = () => {
    switch (character) {
      case 'hamster':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 rounded-none p-1 bg-white border border-[#1A1A1A]">
            <rect x="35" y="30" width="30" height="40" rx="15" fill="#fbc3bc" />
            <circle cx="30" cy="45" r="8" fill="#ffdcd8" />
            <circle cx="70" cy="45" r="8" fill="#ffdcd8" />
            <rect x="30" y="22" width="10" height="12" rx="4" fill="#fbc3bc" />
            <rect x="60" y="22" width="10" height="12" rx="4" fill="#fbc3bc" />
            <circle cx="43" cy="40" r="2.5" fill="#3b2b30" />
            <circle cx="57" cy="40" r="2.5" fill="#3b2b30" />
            <polygon points="48,46 52,46 50,49" fill="#e25c5c" />
            <path d="M 46,55 Q 50,58 54,55" fill="none" stroke="#3b2b30" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'puppy':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 rounded-none p-1 bg-white border border-[#1A1A1A]">
            <rect x="30" y="30" width="40" height="40" rx="12" fill="#e29578" />
            <rect x="25" y="28" width="12" height="24" rx="6" fill="#8d5b4c" />
            <rect x="63" y="28" width="12" height="24" rx="6" fill="#8d5b4c" />
            <circle cx="42" cy="45" r="3" fill="#2d1a12" />
            <circle cx="58" cy="45" r="3" fill="#2d1a12" />
            <ellipse cx="50" cy="53" rx="5" ry="3.5" fill="#2d1a12" />
            <circle cx="34" cy="52" r="4" fill="#ffccd5" />
            <circle cx="66" cy="52" r="4" fill="#ffccd5" />
          </svg>
        );
      case 'bear':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 rounded-none p-1 bg-white border border-[#1A1A1A]">
            <rect x="30" y="32" width="40" height="38" rx="14" fill="#b08968" />
            <circle cx="32" cy="30" r="8" fill="#7f5539" />
            <circle cx="68" cy="30" r="8" fill="#7f5539" />
            <circle cx="32" cy="30" r="4" fill="#ffccd5" />
            <circle cx="68" cy="30" r="4" fill="#ffccd5" />
            <circle cx="42" cy="46" r="3" fill="#212529" />
            <circle cx="58" cy="46" r="3" fill="#212529" />
            <ellipse cx="50" cy="54" rx="9" ry="6" fill="#ede0d4" />
            <ellipse cx="50" cy="52" rx="3.5" ry="2.5" fill="#212529" />
            <circle cx="35" cy="53" r="4.5" fill="#f8ad9d" />
            <circle cx="65" cy="53" r="4.5" fill="#f8ad9d" />
          </svg>
        );
      case 'cat':
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 rounded-none p-1 bg-white border border-[#1A1A1A]">
            <rect x="25" y="45" width="50" height="26" rx="13" fill="#b1a7a6" />
            <circle cx="50" cy="44" r="16" fill="#b1a7a6" />
            <polygon points="34,34 44,30 40,43" fill="#b1a7a6" />
            <polygon points="36,36 41,33 40,41" fill="#ffccd5" />
            <polygon points="66,34 56,30 60,43" fill="#b1a7a6" />
            <polygon points="64,36 59,33 60,41" fill="#ffccd5" />
            <path d="M 38,41 Q 41,44 44,41" fill="none" stroke="#48484a" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 56,41 Q 59,44 62,41" fill="none" stroke="#48484a" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="48,46 52,46 50,49" fill="#ff70a6" />
            <rect x="36" y="53" width="28" height="13" rx="6" fill="#f5f3f4" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      id="opened-card-scene"
      initial={{ scale: 0.95, y: 30, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 15, duration: 0.9 }}
      className="w-full max-w-xl mx-auto px-4 py-8"
    >
      {/* Real Paper Card Container overlay */}
      <div className="bg-[#FCFAF6] rounded-none p-6 sm:p-10 border border-[#1A1A1A] relative overflow-hidden shadow-none">
        
        {/* Handcrafted soft paper background decoration */}
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-neutral-200" />

        {/* 1. Header Row (Cute badge & profile avatar) with fade-slide animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-start gap-4 mb-6 mt-2"
        >
          <div className="flex-1">
            <div className="font-handwritten text-xl text-neutral-500 italic mb-2">
              especially for you...
            </div>
            {/* Title heading in elegant Playfair serif */}
            <h2 className="font-serif font-normal text-3xl sm:text-4xl text-[#1A1A1A] tracking-tight leading-tight">
              Happy Birthday{recipientName ? `, ${recipientName}` : ''}!
            </h2>
          </div>

          {/* Portrait frame top right */}
          <div className="relative">
            {renderAvatar()}
            {/* Stamp pin on avatar */}
            <div className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-none bg-[#1A1A1A] text-[#FCFAF6] border border-white flex items-center justify-center shadow-xs">
              <span className="text-[7px] font-bold">♥</span>
            </div>
          </div>
        </motion.div>

        {/* 2. Delicate Editorial Divider with scaling line animation */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 text-[#1A1A1A]/30 my-6 origin-center"
        >
          <hr className="w-20 border-t border-[#1A1A1A]/20" />
          <span className="text-[#1A1A1A] text-xs font-serif italic">❦</span>
          <hr className="w-20 border-t border-[#1A1A1A]/20" />
        </motion.div>

        {/* 3. Heartsome Customizable Letter Body with sliding fade entrance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-left px-2 mb-8"
        >
          <p className="font-serif text-[#1A1A1A] leading-relaxed text-sm sm:text-base font-normal whitespace-pre-line">
            {messageText || "Today is yours. A whole little garden of wishes — for every laugh we've shared, every silly moment, and every reason you make the world brighter. Pause for a beat, and let me say it properly."}
          </p>
        </motion.div>

        {/* 4. Beautiful Custom Music-Box Audio Player with reveal animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6">
            <AudioPlayer config={config} />
          </div>

          {/* 5. Cursive press play reminder */}
          <div className="text-center mb-8 border-b border-[#1A1A1A]/10 pb-6">
            <p className="font-serif text-xs text-neutral-500 italic">
              * press play — curated notes specifically selected for your special day.
            </p>
          </div>
        </motion.div>

        {/* 6. Navigation Button block block to Memory scrapbook with delay */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3 items-center"
        >
          <button
            id="see-album-btn"
            onClick={onNavigateToAlbum}
            className={`w-full max-w-sm py-4 px-6 rounded-none font-extrabold uppercase text-[11px] tracking-[0.25em] transition-all hover:bg-[#1A1A1A] hover:text-[#FCFAF6] border border-[#1A1A1A] flex items-center justify-center gap-2 ${colors.accentSolid} focus:ring-1 focus:ring-[#1A1A1A] focus:outline-none`}
          >
            <span>SEE OUR ALBUM</span>
            <span className="text-xs">→</span>
          </button>

          {/* Soft Reset helper button to view envelope again */}
          <button
            id="reseat-envelope-btn"
            onClick={onReset}
            className="text-[9px] font-extrabold font-sans tracking-[0.25em] text-[#1A1A1A] hover:opacity-60 uppercase transition-all pt-2 pointer-events-auto"
          >
            ↩ FOLD BACK INTO ENVELOPE
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
