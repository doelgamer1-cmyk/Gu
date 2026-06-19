import React, { useState } from 'react';
import { SurpriseConfig, COLOR_THEMES, CharacterType, MusicTrackType, ThemeColorType, PolaroidPhoto } from '../types';
import { X, Heart, Sparkles, Copy, Check, Camera, Plus, Trash2, Edit3, Music, Palette, User, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface CustomizerProps {
  config: SurpriseConfig;
  onSave: (newConfig: SurpriseConfig) => void;
  onClose: () => void;
}

export default function Customizer({ config, onSave, onClose }: CustomizerProps) {
  const [recipient, setRecipient] = useState(config.recipientName);
  const [badgeText, setBadgeText] = useState(config.badgeText);
  const [mainHeading, setMainHeading] = useState(config.mainHeading);
  const [handwrittenSub, setHandwrittenSub] = useState(config.handwrittenSub);
  const [message, setMessage] = useState(config.messageText);
  const [character, setCharacter] = useState<CharacterType>(config.character);
  const [musicTrack, setMusicTrack] = useState<MusicTrackType>(config.musicTrack);
  const [themeColor, setThemeColor] = useState<ThemeColorType>(config.themeColor);
  const [polaroids, setPolaroids] = useState<PolaroidPhoto[]>([...config.polaroids]);
  
  // URL copy alert states
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Active inputs / tabs inside Customizer
  const [activeSegment, setActiveSegment] = useState<'basics' | 'letter' | 'character' | 'polaroids'>('basics');

  // Form helpers for Polaroids
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('');

  const colors = COLOR_THEMES[themeColor];

  // Quick Beautiful Memory images presets
  const stockImages = [
    { name: 'Warm Sunset', url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=400' },
    { name: 'Cozy Coffee', url: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=400' },
    { name: 'Cute Doggy', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400' },
    { name: 'Warm Tea', url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400' },
    { name: 'Lovely Cat', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400' },
    { name: 'Wild Flower Meadow', url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400' }
  ];

  const handleAddPolaroid = () => {
    if (!newImgUrl && !newCaption) return;
    const item: PolaroidPhoto = {
      id: Date.now().toString(),
      imageUrl: newImgUrl || stockImages[Math.floor(Math.random() * stockImages.length)].url,
      caption: newCaption || 'Beautiful adventure together...',
      date: newDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setPolaroids([...polaroids, item]);
    setNewImgUrl('');
    setNewCaption('');
    setNewDate('');
  };

  const handleRemovePolaroid = (id: string) => {
    setPolaroids(polaroids.filter(p => p.id !== id));
  };

  const generateShareLink = () => {
    const payload: SurpriseConfig = {
      recipientName: recipient.trim() || 'Bestie',
      senderName: 'Friend',
      badgeText: badgeText.trim() || 'A BIRTHDAY SURPRISE',
      mainHeading: mainHeading.trim() || 'a little something for you',
      handwrittenSub: handwrittenSub.trim() || 'happy birthday ♡',
      messageText: message.trim() || 'Today is yours. Wishing you beautiful paths.',
      character,
      musicTrack,
      themeColor,
      polaroids
    };

    // Base64 serialize string safely
    const jsonStr = JSON.stringify(payload);
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
    const origin = window.location.origin + window.location.pathname;
    const fullLink = `${origin}?card=${encoded}`;
    
    setShareUrl(fullLink);
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    
    // Save updated configuration in current state
    onSave(payload);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleApplyNow = () => {
    const payload: SurpriseConfig = {
      recipientName: recipient.trim() || 'Bestie',
      senderName: 'Friend',
      badgeText: badgeText.trim() || 'A BIRTHDAY SURPRISE',
      mainHeading: mainHeading.trim() || 'a little something for you',
      handwrittenSub: handwrittenSub.trim() || 'happy birthday ♡',
      messageText: message.trim() || 'Today is yours. Wishing you beautiful paths.',
      character,
      musicTrack,
      themeColor,
      polaroids
    };
    onSave(payload);
    onClose();
  };

  return (
    <div id="customizer-panel-drawer" className="fixed inset-y-0 right-0 w-full sm:w-115 bg-[#FCFAF6] shadow-xl z-[60] border-l border-[#1A1A1A] flex flex-col justify-between overflow-hidden">
      {/* Drawer Head */}
      <div className="p-4 border-b border-[#1A1A1A] flex items-center justify-between bg-[#EAE6DC]/30 rounded-none">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4.5 h-4.5 text-[#1A1A1A]" />
          <h3 className="text-[11px] font-extrabold text-[#1A1A1A] uppercase tracking-[0.25em]">
            SURPRISE EDITOR
          </h3>
        </div>
        <button
          id="customizer-close-btn"
          onClick={onClose}
          className="w-8 h-8 rounded-none bg-white flex items-center justify-center border border-[#1A1A1A] hover:bg-[#1A1A1A]/10 text-[#1A1A1A] transition-all"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation segments */}
      <div className="flex gap-1 p-2 bg-[#EAE6DC]/20 border-b border-[#1A1A1A] text-[9px] font-extrabold uppercase tracking-[0.2em] font-mono">
        <button
          onClick={() => setActiveSegment('basics')}
          className={`flex-1 py-1.5 rounded-none transition-all ${activeSegment === 'basics' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'}`}
        >
          Basics
        </button>
        <button
          onClick={() => setActiveSegment('letter')}
          className={`flex-1 py-1.5 rounded-none transition-all ${activeSegment === 'letter' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'}`}
        >
          Letter
        </button>
        <button
          onClick={() => setActiveSegment('character')}
          className={`flex-1 py-1.5 rounded-none transition-all ${activeSegment === 'character' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'}`}
        >
          Curate
        </button>
        <button
          onClick={() => setActiveSegment('polaroids')}
          className={`flex-1 py-1.5 rounded-none transition-all ${activeSegment === 'polaroids' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'}`}
        >
          Album ({polaroids.length})
        </button>
      </div>

      {/* Drawer central scroll form */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {activeSegment === 'basics' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-[#EAE6DC]/30 rounded-none border border-[#1A1A1A]/10 text-[10.5px] text-gray-600 leading-relaxed font-serif italic">
              Customize the titles shown on your sealed envelope front page. Make it professional, tailored, or beautiful to open.
            </div>
            
            {/* Recipient Name input */}
            <div>
              <label className="text-[10px] font-extrabold text-[#1A1A1A] flex items-center gap-1.5 mb-1.5 uppercase tracking-widest">
                <span>✦</span> Recipient Name
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Luna"
                className="w-full text-xs py-2 px-3 rounded-none border border-[#1A1A1A]/30 focus:border-[#1A1A1A] focus:outline-none bg-white font-serif"
              />
            </div>

            {/* Top Badge text input */}
            <div>
              <label className="text-[10px] font-extrabold text-[#1A1A1A] flex items-center gap-1.5 mb-1.5 uppercase tracking-widest">
                <span>✦</span> Envelope Badge Text
              </label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                placeholder="e.g. A BIRTHDAY SURPRISE"
                className="w-full text-xs py-2 px-3 rounded-none border border-[#1A1A1A]/30 focus:border-[#1A1A1A] focus:outline-none bg-white font-serif"
              />
            </div>

            {/* Main Greeting title */}
            <div>
              <label className="text-[10px] font-extrabold text-[#1A1A1A] flex items-center gap-1.5 mb-1.5 uppercase tracking-widest">
                <span>✦</span> Main Greeting Title
              </label>
              <input
                type="text"
                value={mainHeading}
                onChange={(e) => setMainHeading(e.target.value)}
                placeholder="e.g. a little something for you"
                className="w-full text-xs py-2 px-3 rounded-none border border-[#1A1A1A]/30 focus:border-[#1A1A1A] focus:outline-none bg-white font-serif"
              />
            </div>

            {/* Cursive text subtitles */}
            <div>
              <label className="text-[10px] font-extrabold text-[#1A1A1A] flex items-center gap-1.5 mb-1.5 uppercase tracking-widest">
                <span>✦</span> Handwritten Subtitle
              </label>
              <input
                type="text"
                value={handwrittenSub}
                onChange={(e) => setHandwrittenSub(e.target.value)}
                placeholder="e.g. happy birthday ♡"
                className="w-full text-xs py-2 px-3 rounded-none border border-[#1A1A1A]/30 focus:border-[#1A1A1A] focus:outline-none bg-white font-serif"
              />
            </div>
          </div>
        )}

        {activeSegment === 'letter' && (
          <div className="space-y-4">
            {/* Heartfelt card message */}
            <div>
              <label className="text-[10px] font-extrabold text-[#1A1A1A] flex items-center gap-1.5 mb-1.5 uppercase tracking-widest">
                <span>✦</span> Main Card Message Letter
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Write your beautiful birthday wishes here..."
                className="w-full text-xs py-2.5 px-3 rounded-none border border-[#1A1A1A]/30 focus:border-[#1A1A1A] focus:outline-none bg-white resize-none leading-relaxed font-serif"
              />
            </div>
          </div>
        )}

        {activeSegment === 'character' && (
          <div className="space-y-5">
            {/* Color Palette customization theme picker */}
            <div>
              <label className="text-[10px] font-extrabold text-[#1A1A1A] flex items-center gap-1.5 mb-2.5 uppercase tracking-widest">
                <span>✦</span> Color Aesthetics Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(COLOR_THEMES) as ThemeColorType[]).map((themeKey) => {
                  const t = COLOR_THEMES[themeKey];
                  const isSel = themeColor === themeKey;
                  return (
                    <button
                      key={themeKey}
                      onClick={() => setThemeColor(themeKey)}
                      className={`p-3 rounded-none border flex items-center gap-2 text-[11px] font-bold transition-all text-left truncate cursor-pointer ${isSel ? 'border-[#1A1A1A] bg-[#EAE6DC]/30 text-black' : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-500'}`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-none border border-neutral-300 ${t.background}`} />
                      <span>{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Animal companion selector */}
            <div>
              <label className="text-[10px] font-extrabold text-[#1A1A1A] flex items-center gap-1.5 mb-2.5 uppercase tracking-widest">
                <span>✦</span> Compact Companion
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'cat', emoji: '🐱', name: 'Kitten' },
                  { id: 'hamster', emoji: '🐹', name: 'Hamsty' },
                  { id: 'puppy', emoji: '🐶', name: 'Puppy' },
                  { id: 'bear', emoji: '🧸', name: 'Chibi' }
                ].map((item) => {
                  const isSel = character === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCharacter(item.id as CharacterType)}
                      className={`p-2.5 rounded-none border flex flex-col items-center gap-1 transition-all cursor-pointer ${isSel ? 'border-[#1A1A1A] bg-[#EAE6DC]/30 font-bold text-black border-2 scale-[1.01]' : 'border-neutral-200 bg-white text-neutral-500 text-[10px]'}`}
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <span className="text-[10px] uppercase font-mono tracking-wider">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Music choice selector */}
            <div>
              <label className="text-[10px] font-extrabold text-[#1A1A1A] flex items-center gap-1.5 mb-2.5 uppercase tracking-widest">
                <span>✦</span> Music-box Track
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'happy_birthday', title: 'Happy Birthday (Bells)', sub: 'Classic birthday chimes' },
                  { id: 'sweet_piano', title: 'Sweet Lullaby (Music Box)', sub: 'Pentatonic relaxing arpeggio' },
                  { id: 'lofi_lullaby', title: 'Lofi Dreamland (8-bit)', sub: 'Slow peaceful retro track' },
                  { id: 'none', title: 'Silent (No Music-box)', sub: 'Turn off the synthesiser' }
                ].map((item) => {
                  const isSel = musicTrack === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setMusicTrack(item.id as MusicTrackType)}
                      className={`w-full p-2.5 rounded-none border transition-all text-left flex items-center justify-between cursor-pointer ${isSel ? 'border-[#1A1A1A] bg-[#EAE6DC]/30 font-bold text-black border-2' : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700'}`}
                    >
                      <div>
                        <div className="text-xs font-bold">{item.title}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{item.sub}</div>
                      </div>
                      {isSel && <div className="text-black text-xs font-mono">[✓]</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeSegment === 'polaroids' && (
          <div className="space-y-4">
            <h4 className="text-[10px] font-extrabold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1.5">
              <span>✦</span> Polaroid memory scrapbook ({polaroids.length})
            </h4>

            {/* Quick adding form block */}
            <div className="p-3.5 bg-[#EAE6DC]/20 rounded-none border border-[#1A1A1A] flex flex-col gap-3">
              <div className="text-[10px] font-extrabold text-[#1A1A1A] uppercase tracking-widest">
                + Add New Polaroid Photo
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Paste direct Image URL..."
                  value={newImgUrl}
                  onChange={(e) => setNewImgUrl(e.target.value)}
                  className="w-full text-xs py-1.5 px-2.5 rounded-none border border-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A] bg-white font-serif"
                />
                
                {/* Instant select demo images */}
                <div className="flex gap-2 items-center mt-1.5">
                  <span className="text-[8px] text-gray-500 uppercase font-mono font-bold tracking-wider">Use Preset:</span>
                  <div className="flex gap-1.5">
                    {stockImages.map((stock, idx) => (
                      <button
                        key={idx}
                        title={stock.name}
                        onClick={() => setNewImgUrl(stock.url)}
                        className="w-5 h-5 rounded-none overflow-hidden border border-[#1A1A1A]/30 transition-all hover:scale-110 cursor-pointer"
                      >
                        <img src={stock.url} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Caption... (e.g. Sunset)"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full text-xs py-1.5 px-2.5 rounded-none border border-[#1A1A1A]/30 bg-white font-serif"
                />
                <input
                  type="text"
                  placeholder="Date... (e.g. Dec 25)"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full text-xs py-1.5 px-2.5 rounded-none border border-[#1A1A1A]/30 bg-white font-serif"
                />
              </div>

              <button
                type="button"
                onClick={handleAddPolaroid}
                className="py-2 bg-[#1A1A1A] hover:bg-neutral-800 text-white font-extrabold uppercase text-[9px] tracking-[0.2em] rounded-none flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Polaroid to Album</span>
              </button>
            </div>

            {/* List and manage Polaroid deck */}
            <div className="space-y-2 mt-4">
              <div className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest font-mono">
                Active Polaroid List (Trash to remove)
              </div>
              {polaroids.map((item, index) => (
                <div key={item.id} className="flex gap-3 items-center p-2 rounded-none bg-white border border-[#1A1A1A]/10 group">
                  <div className="w-10 h-10 rounded-none overflow-hidden bg-white border border-neutral-200">
                    <img src={item.imageUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-neutral-800 truncate">"{item.caption}"</div>
                    <div className="text-[9px] text-[#1A1A1A]/60 font-mono">{item.date || 'No Date'}</div>
                  </div>
                  <button
                    onClick={() => handleRemovePolaroid(item.id)}
                    className="w-7 h-7 rounded-none hover:bg-red-50 text-neutral-400 hover:text-red-500 border border-transparent hover:border-red-200 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 md:opacity-100 cursor-pointer"
                    aria-label="Delete polaroid memory"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Drawer Action footers */}
      <div className="p-4 bg-[#EAE6DC]/30 border-t border-[#1A1A1A] space-y-2.5">
        {/* Copy shareable link block */}
        <button
          id="copy-share-payload-link"
          onClick={generateShareLink}
          className="w-full py-3 px-4 rounded-none font-extrabold uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 border border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-neutral-50 active:scale-97 transition-all select-none cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-3" />
              <span className="text-emerald-700">Copied Link! Share with your friend!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Direct Shareable Link 🔗</span>
            </>
          )}
        </button>

        {/* Regular Apply and Close */}
        <button
          id="apply-and-render-card"
          onClick={handleApplyNow}
          className="w-full py-3.5 rounded-none font-extrabold text-[#FCFAF6] uppercase text-[10px] tracking-[0.25em] bg-[#1a1a1a] hover:bg-neutral-800 active:scale-97 transition-all flex items-center justify-center gap-1 text-center cursor-pointer"
        >
          <span>APPLY CHANGES & PREVIEW</span>
        </button>

        <p className="text-[8.5px] text-gray-500 font-mono text-center select-none uppercase tracking-[0.15em] pt-1 pt-b">
          - shared as lightweight, zero-database direct URLs -
        </p>
      </div>
    </div>
  );
}
