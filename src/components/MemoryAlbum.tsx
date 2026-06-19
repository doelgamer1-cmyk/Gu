import React, { useState } from 'react';
import { Camera, Calendar, Heart, Plus, Trash2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { SurpriseConfig, PolaroidPhoto } from '../types';
import { motion } from 'motion/react';

interface MemoryAlbumProps {
  config: SurpriseConfig;
  onUpdatePolaroids?: (photos: PolaroidPhoto[]) => void;
  onBack: () => void;
}

export default function MemoryAlbum({ config, onUpdatePolaroids, onBack }: MemoryAlbumProps) {
  const { polaroids, recipientName, themeColor } = config;
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);
  const [heartCount, setHeartCount] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Preset quick-placeholder images for cozy memories in case user hasn't uploaded their own
  const sampleImages = [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400', // Cute smiling corgi
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400', // Sweet lying cat
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400', // Couple holding hands / heart shape
    'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=400', // Cozy sunset sky
    'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=400', // Warm coffee with marshmallow hearts
  ];

  const handlePolaroidClick = (photo: PolaroidPhoto, e: React.MouseEvent) => {
    setSelectedPhoto(photo);
    triggerHearts(e);
  };

  const triggerHearts = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add multiple micro-hearts
    const newHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
    }));

    setHeartCount((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHeartCount((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
    }, 1500);
  };

  return (
    <div id="memory-album-page-wrapper" className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Return Head Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1A1A1A]/10">
        <button
          id="back-to-envelope-btn"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#FCFAF6] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#FCFAF6] font-extrabold text-[10px] tracking-[0.2em] uppercase transition-all border border-[#1A1A1A]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO CARD</span>
        </button>
        <span className="font-handwritten text-lg text-neutral-400 select-none">
          shared with love ♡
        </span>
      </div>

      {/* Decorative Scrapbook Header */}
      <div className="text-left mb-12 max-w-2xl">
        <h2 className="font-serif font-normal text-4xl sm:text-5xl text-[#1A1A1A] mb-3 leading-[1.05] tracking-[-0.03em]">
          Our Saved Memories
        </h2>
        <p className="font-serif text-[#1a1a1a]/65 text-sm italic sm:text-base leading-relaxed">
          A little garden of moments, laughs, and adventures spent together.
        </p>
      </div>

      {/* Polaroid Deck Layout */}
      {polaroids.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-none border border-dashed border-[#1A1A1A]/20 p-8 max-w-lg mx-auto">
          <ImageIcon className="w-10 h-10 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest mb-2">No Polaroids Added Yet</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
            Open the "Customize Card" sidebar panel to upload your favorite memories, customize text descriptions, and configure dates.
          </p>
        </div>
      ) : (
        <div id="polaroids-grid-container" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center relative">
          {polaroids.map((item, index) => {
            // Apply randomized gentle tilt styling to make polaroids feel physically laid out on a table
            const tilt = (index % 3 === 0) ? '-rotate-1 translate-y-1' : (index % 3 === 1) ? 'rotate-2 -translate-y-1' : 'rotate-1 translate-y-2';
            
            return (
              <motion.div
                key={item.id}
                id={`polaroid-${item.id}`}
                onClick={(e) => handlePolaroidClick(item, e)}
                className={`w-64 bg-[#FCFAF6] p-4.5 pb-6 rounded-none shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-[#1A1A1A]/25 cursor-pointer hover:shadow-[0_15px_30px_rgba(0,0,0,0.09)] transition-all relative ${tilt} hover:rotate-0 hover:-translate-y-2 hover:scale-[1.01] duration-300 group`}
                whileTap={{ scale: 0.99 }}
              >
                {/* Simulated Washi Tape Sticker At The Top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5.5 bg-[#FAF4E8]/90 border border-dashed border-[#1A1A1A]/10 rotate-1 shadow-xs opacity-90 pointer-events-none" />

                {/* Main Photo block */}
                <div className="w-full aspect-square overflow-hidden bg-white border border-[#1A1A1A]/10 rounded-none relative">
                  <img
                    src={item.imageUrl}
                    alt={item.caption}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-[0%] transition-all duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback elegant sunset/starry color box if image is broken
                      e.currentTarget.src = sampleImages[index % sampleImages.length];
                    }}
                  />
                  {/* Glass shimmer sheet on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Date stamp if configured */}
                {item.date && (
                  <div className="flex items-center gap-1 text-[#1A1A1A]/65 font-mono text-[9px] mt-3 uppercase tracking-[0.2em]">
                    <span>✦ {item.date}</span>
                  </div>
                )}

                {/* Handwritten/Serif Caption section */}
                <div className="pt-3 text-left">
                  <p className="font-serif text-[13.5px] text-[#1A1A1A] leading-relaxed truncate px-1 group-hover:text-[#892026] transition-colors italic">
                    "{item.caption || "A sweet moment..."}"
                  </p>
                </div>

                {/* Minimal chevron icon on card hover */}
                <div className="absolute bottom-2 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#1A1A1A]">
                  <span className="text-[10px] font-mono tracking-widest">[+]</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Interactive Detail Modal Block */}
      {selectedPhoto && (
        <div 
          id="polaroid-detail-modal" 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Heart Particles Animation Generator Canvas overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {heartCount.map((heart) => (
              <span
                key={heart.id}
                className="absolute text-pink-400 font-bold text-2xl select-none animate-ping text-shadow-sm"
                style={{
                  left: heart.x,
                  top: heart.y,
                  transform: 'translate(-50%, -50%)',
                  animation: 'floatAndFadeUp 1.2s forwards'
                }}
              >
                ♥
              </span>
            ))}
          </div>

          <motion.div 
            id="polaroid-modal-card"
            className="w-full max-w-lg bg-[#FCFAF6] p-6 pb-8 rounded-none shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#1A1A1A] relative cursor-default"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              triggerHearts(e);
            }}
          >
            {/* Archival Folder Hanging Clip effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#EAE6DC] rounded-none border border-[#1A1A1A] flex items-center justify-center">
              <span className="text-[10px] font-mono font-bold text-[#1A1A1A]">=</span>
            </div>

            {/* High-def visual of Polaroid memory */}
            <div className="w-full aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-white rounded-none shadow-none relative mt-4 border border-[#1A1A1A]/30">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.caption}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 right-2 bg-[#FCFAF6] border border-[#1A1A1A] px-2.5 py-1 text-[9px] text-[#1A1A1A] flex items-center gap-1 font-mono uppercase tracking-widest">
                <span>✦ tap to release hearts</span>
              </div>
            </div>

            {/* Modal Info description */}
            <div className="pt-6 text-center">
              {selectedPhoto.date && (
                <div className="flex items-center justify-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase tracking-[0.25em] mb-2">
                  <span>✦ {selectedPhoto.date} ✦</span>
                </div>
              )}
              <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] leading-relaxed px-4 italic">
                "{selectedPhoto.caption || "This lovely moment together."}"
              </h3>
            </div>

            {/* Help guidelines */}
            <p className="text-[9px] text-[#1A1A1A]/60 text-center font-mono mt-6 uppercase tracking-[0.25em] select-none">
              TAP OUTSIDE THE PLATE TO CLOSE
            </p>
          </motion.div>
        </div>
      )}

      {/* Styled inline floating animations inside tailwind */}
      <style>{`
        @keyframes floatAndFadeUp {
          0% {
            transform: translate(-50%, -50%) scale(0.6) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4) translateY(-120px) rotate(${(Math.random() - 0.5) * 45}deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
