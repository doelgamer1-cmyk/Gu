import React, { useState, useEffect } from 'react';
import { SurpriseConfig, COLOR_THEMES } from './types';
import CardFront from './components/CardFront';
import CardBack from './components/CardBack';
import MemoryAlbum from './components/MemoryAlbum';
import Customizer from './components/Customizer';
import { Sparkles, Heart, ChevronLeft, RotateCcw, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import newly generated custom Michelle photos
import michelleSepiaCollage from './assets/images/michelle_sepia_collage_1781890838738.jpg';
import michelleDontCare from './assets/images/michelle_dont_care_1781890856711.jpg';
import michellePinkBows from './assets/images/michelle_pink_bows_1781890873795.jpg';
import michelleClassicPortrait from './assets/images/michelle_classic_portrait_1781890894950.jpg';

const DEFAULT_CONFIG: SurpriseConfig = {
  recipientName: 'Michelle',
  senderName: 'Your Friend',
  badgeText: 'A BIRTHDAY SURPRISE',
  mainHeading: 'a little something for you',
  handwrittenSub: 'happy birthday ♡',
  messageText: "Happiest birthday michelle i wish this birthday give you new perspective to live a life ik teri life me bhot problem rahe hai or tune bhot suffer kiya hai but ik that you are a strong girl and you can do everything dekh i love you so so much you know that how much i can try to be a non chalant but tujhe pata hai i am very chalant for you bas i am trying to move on to act karna padta ha baki love you baby hehe🎂",
  character: 'cat',
  musicTrack: 'happy_birthday',
  themeColor: 'pink',
  polaroids: [
    {
      id: 'p1',
      imageUrl: michelleDontCare,
      caption: "I don't care... but actually extremely chalant for you! 😎",
      date: 'June 19, 2026'
    },
    {
      id: 'p2',
      imageUrl: michelleSepiaCollage,
      caption: 'A vintage story in sepia panels of your smile 🎞️',
      date: 'June 19, 2026'
    },
    {
      id: 'p3',
      imageUrl: michellePinkBows,
      caption: 'Coziest laughs, cute bows, and cuteness level 100! 🎀',
      date: 'June 19, 2026'
    },
    {
      id: 'p4',
      imageUrl: michelleClassicPortrait,
      caption: 'An artistic portrait of a very strong and loved girl ✦',
      date: 'June 19, 2026'
    }
  ]
};

export default function App() {
  const [config, setConfig] = useState<SurpriseConfig>(DEFAULT_CONFIG);
  const [activeScene, setActiveScene] = useState<'closed_envelope' | 'greeting_card' | 'album_view'>('closed_envelope');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // URL parsing to render customized shared cards
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cardParam = urlParams.get('card');
    if (cardParam) {
      try {
        // Decode base64 unicode string
        const parsedJson = decodeURIComponent(escape(atob(cardParam)));
        const loadedConfig = JSON.parse(parsedJson) as SurpriseConfig;
        
        // Quick basic validation
        if (loadedConfig && loadedConfig.recipientName) {
          setConfig(loadedConfig);
        }
      } catch (err) {
        console.error('Failed to parse customized URL card payload: ', err);
      }
    }
  }, []);

  const handleUpdateConfig = (newConfig: SurpriseConfig) => {
    setConfig(newConfig);
  };

  const colors = COLOR_THEMES[config.themeColor];

  return (
    <div 
      className={`min-h-screen ${colors.background} transition-all duration-700 relative birthday-dots-bg flex flex-col justify-between`}
    >
      {/* Elegant minimalist floating customize control button */}
      <div className="fixed top-4 right-4 z-40">
        <button
          id="floating-customizer-trigger"
          onClick={() => setIsCustomizerOpen(true)}
          className="px-4 py-2.5 rounded-none bg-[#FCFAF6]/90 backdrop-blur-xs hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#FCFAF6] border border-[#1A1A1A] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all text-[10px] font-extrabold uppercase tracking-[0.2em] flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Customize Card</span>
        </button>
      </div>

      {/* 2. CENTRAL INTERACTIVE Surprises Stage rendering with Framer Motion animations loop */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col justify-center relative py-6">
        <AnimatePresence mode="wait">
          {activeScene === 'closed_envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <CardFront 
                config={config} 
                onOpen={() => setActiveScene('greeting_card')} 
              />
            </motion.div>
          )}

          {activeScene === 'greeting_card' && (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <CardBack 
                config={config} 
                onNavigateToAlbum={() => setActiveScene('album_view')}
                onReset={() => setActiveScene('closed_envelope')}
              />
            </motion.div>
          )}

          {activeScene === 'album_view' && (
            <motion.div
              key="album"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <MemoryAlbum 
                config={config} 
                onBack={() => setActiveScene('greeting_card')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Sliding "Make It Yours" Customization Control Sidebar Panel */}
      <AnimatePresence>
        {isCustomizerOpen && (
          <>
            {/* Background blur overlay panel */}
            <motion.div
              key="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCustomizerOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 pointer-events-auto"
            />
            {/* Actual Form drawer container */}
            <motion.div
              key="sidebar-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="fixed inset-y-0 right-0 z-[60] pointer-events-auto shadow-2xl"
            >
              <Customizer
                config={config}
                onSave={handleUpdateConfig}
                onClose={() => setIsCustomizerOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. Elegant custom watermarks replacement / beautiful developer footer (no watermark noise!) */}
      <footer className="w-full text-center py-4 text-xs text-gray-400 select-none font-medium border-t border-dashed border-pink-100/50">
        <p>Previewing • Designed with love for special occasions</p>
      </footer>
    </div>
  );
}
