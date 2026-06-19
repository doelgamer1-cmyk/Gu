export type CharacterType = 'cat' | 'hamster' | 'puppy' | 'bear';
export type MusicTrackType = 'happy_birthday' | 'sweet_piano' | 'lofi_lullaby' | 'none';
export type ThemeColorType = 'pink' | 'lavender' | 'peach' | 'mint';

export interface PolaroidPhoto {
  id: string;
  imageUrl: string;
  caption: string;
  date?: string;
}

export interface SurpriseConfig {
  recipientName: string;
  senderName: string;
  badgeText: string;
  mainHeading: string;
  handwrittenSub: string;
  messageText: string;
  character: CharacterType;
  musicTrack: MusicTrackType;
  themeColor: ThemeColorType;
  polaroids: PolaroidPhoto[];
}

export const COLOR_THEMES: Record<ThemeColorType, {
  name: string;
  background: string; // Tailwind class
  accentLight: string;
  accentSolid: string;
  accentHover: string;
  textDark: string;
  badgeBg: string;
  badgeText: string;
}> = {
  pink: {
    name: 'Crimson Atelier',
    background: 'bg-[#F9F7F2]',
    accentLight: 'bg-[#FDFCF9] border-[#1A1A1A]',
    accentSolid: 'bg-[#892026] text-white',
    accentHover: 'hover:bg-[#1A1A1A]',
    textDark: 'text-[#1A1A1A]',
    badgeBg: 'bg-[#1A1A1A]',
    badgeText: 'text-[#F9F7F2]',
  },
  lavender: {
    name: 'Charcoal Noir',
    background: 'bg-[#F2F1EC]',
    accentLight: 'bg-[#FDFDFA] border-[#1A1A1A]',
    accentSolid: 'bg-[#1A1A1A] text-white',
    accentHover: 'hover:bg-[#333333]',
    textDark: 'text-[#1A1A1A]',
    badgeBg: 'bg-[#1A1A1A]',
    badgeText: 'text-[#F2F1EC]',
  },
  peach: {
    name: 'Terracotta House',
    background: 'bg-[#FBF8F3]',
    accentLight: 'bg-[#FCFAF6] border-[#BC6C55]',
    accentSolid: 'bg-[#BC6C55] text-white',
    accentHover: 'hover:bg-[#1A1A1A]',
    textDark: 'text-[#2D2A26]',
    badgeBg: 'bg-[#BC6C55]/10',
    badgeText: 'text-[#BC6C55]',
  },
  mint: {
    name: 'Sage Atelier',
    background: 'bg-[#EDECE6]',
    accentLight: 'bg-[#F5F4F0] border-[#556250]',
    accentSolid: 'bg-[#556250] text-[#F5F4F0]',
    accentHover: 'hover:bg-[#1A1A1A]',
    textDark: 'text-[#1C241B]',
    badgeBg: 'bg-[#556250]/10',
    badgeText: 'text-[#556250]',
  },
};
