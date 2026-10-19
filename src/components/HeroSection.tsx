import React, { useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Building2,
  Compass,
  Waves,
  Trees,
  Mountain,
  Sparkles,
} from 'lucide-react';
import {
  HERO_ELEPHANT_HERD,
  HERO_ROARING_LIONESS,
  HERO_TWO_LIONESSES,
  HERO_RIFT_GORGE,
  BEACH_RESORT_IMAGE,
  LUXURY_RESORT_IMAGE,
} from '../data/travelData';
import { SupportedLanguage } from '../types/travel';
import { TRANSLATIONS } from '../data/translations';

interface HeroSectionProps {
  currentLang: SupportedLanguage;
  onRequestQuoteClick: () => void;
  onExplorePackages: () => void;
}

interface SceneItem {
  id: string;
  label: string;
  image: string;
  badge: string;
  subtitle: string;
  headline: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onRequestQuoteClick,
  onExplorePackages,
}) => {
  const t = TRANSLATIONS[currentLang];

  // 6 Rotating Scenes featuring the user's newly uploaded authentic safari photos
  const scenes: SceneItem[] = [
    {
      id: 'elephant-herd',
      label: 'Elephant Herds',
      image: HERO_ELEPHANT_HERD,
      badge: 'Amboseli & Maasai Mara Herds',
      headline: 'Explore the Roars of\nthe East African\nSafaris',
      subtitle:
        'Witness massive free-ranging elephant families beneath Mount Kilimanjaro and across the great golden plains with our veteran guides.',
    },
    {
      id: 'roaring-lioness',
      label: 'Savannah Roars',
      image: HERO_ROARING_LIONESS,
      badge: 'Apex Predator Territory',
      headline: 'Feel the Untamed\nPulse of the\nAfrican Wilderness',
      subtitle:
        'Track pride lions, tree leopards, and cheetah coalitions in custom 4x4 pop-up roof Land Cruisers with KPSGA-certified naturalist guides.',
    },
    {
      id: 'two-lionesses',
      label: 'Big Cat Safaris',
      image: HERO_TWO_LIONESSES,
      badge: 'Maasai Mara & Serengeti Plains',
      headline: 'Encounter Majestic\nAfrican Wildlife\nUp Close',
      subtitle:
        'Experience the breathtaking theater of the Great Wildebeest Migration and dramatic predator encounters in East Africa’s prime reserves.',
    },
    {
      id: 'rift-valley-gorge',
      label: 'Rift Valley Gorge',
      image: HERO_RIFT_GORGE,
      badge: 'Hell’s Gate & Great Rift Valley',
      headline: 'Marvel at Ancient\nCanyons & Volcanic\nGorges',
      subtitle:
        'Cycle through Hell’s Gate volcanic towers, hike dramatic water-carved gorges, and marvel at the geological wonder of the Great Rift Valley.',
    },
    {
      id: 'coast-beach',
      label: 'Tropical Coast',
      image: BEACH_RESORT_IMAGE,
      badge: 'Diani Beach & Ocean Escapes',
      headline: 'Turquoise Waters &\nPowdery White\nSands',
      subtitle:
        'Seamless bush-to-beach holiday combinations along the warm Indian Ocean coastline with barefoot luxury and private dhow cruises.',
    },
    {
      id: 'luxury-lodge',
      label: 'Luxury Lodges',
      image: LUXURY_RESORT_IMAGE,
      badge: 'Exclusive Safari Hospitality',
      headline: 'Handpicked\nLuxury Lodges &\nTented Escapes',
      subtitle:
        'Wake up to wildlife horizon waterholes, private infinity decks, and bespoke safari dining beneath starry African skies.',
    },
  ];

  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleNextScene = useCallback(() => {
    setCurrentSceneIdx((prev) => (prev + 1) % scenes.length);
  }, [scenes.length]);

  const handlePrevScene = useCallback(() => {
    setCurrentSceneIdx((prev) => (prev - 1 + scenes.length) % scenes.length);
  }, [scenes.length]);

  // Smooth auto-rotation for cinematic hero experience
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNextScene();
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, handleNextScene]);

  const activeScene = scenes[currentSceneIdx];

  return (
    <section className="relative w-full h-[620px] sm:h-[680px] lg:h-[760px] flex items-center overflow-hidden bg-black select-none">
      {/* Background Image Slides with Smooth Cross-Fade Flipping Transition */}
      {scenes.map((scene, idx) => (
        <div
          key={scene.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSceneIdx
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={scene.image}
            alt={scene.headline}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Subtle cinematic gradient vignette for crisp typography readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>
      ))}

      {/* Manual Flipping Arrow Buttons (Left & Right) */}
      <button
        onClick={() => {
          handlePrevScene();
          setIsPlaying(false);
        }}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs border border-white/20 hover:scale-105"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => {
          handleNextScene();
          setIsPlaying(false);
        }}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs border border-white/20 hover:scale-105"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-center h-full">
        <div className="max-w-2xl text-left">
          {/* Active Scene Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 animate-in fade-in duration-300">
            <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse"></span>
            <span>{activeScene.badge}</span>
          </div>

          {/* Marquee Headline */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-lg font-['Outfit',sans-serif] whitespace-pre-line text-balance"
            style={{
              textShadow: '0 3px 20px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)',
            }}
          >
            {activeScene.headline}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-4 sm:mt-5 text-xs sm:text-base md:text-lg text-slate-100 max-w-xl font-normal leading-relaxed drop-shadow-md"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}
          >
            {activeScene.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onRequestQuoteClick}
              className="px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wide text-white bg-[#801416] hover:bg-[#991b1b] rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95 flex items-center gap-2"
            >
              <span>Request A Quote</span>
              <ChevronRight className="w-4 h-4 text-amber-300" />
            </button>

            <button
              onClick={onExplorePackages}
              className="px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wide text-white bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 rounded-lg shadow-md transition-all cursor-pointer"
            >
              Explore Packages
            </button>
          </div>
        </div>
      </div>

      {/* Cinematic Flipping Controller Bar at Bottom */}
      <div className="absolute bottom-5 left-5 right-5 sm:left-10 sm:right-10 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-auto">
        {/* Thumbnails / Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/20 max-w-full overflow-x-auto">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => {
                setCurrentSceneIdx(idx);
                setIsPlaying(false);
              }}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                currentSceneIdx === idx
                  ? 'bg-[#ea580c] text-white shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {scene.id === 'elephant-herd' && <Compass className="w-3.5 h-3.5" />}
              {scene.id === 'roaring-lioness' && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
              {scene.id === 'two-lionesses' && <Compass className="w-3.5 h-3.5" />}
              {scene.id === 'rift-valley-gorge' && <Mountain className="w-3.5 h-3.5" />}
              {scene.id === 'coast-beach' && <Waves className="w-3.5 h-3.5" />}
              {scene.id === 'luxury-lodge' && <Trees className="w-3.5 h-3.5" />}
              <span>{scene.label}</span>
            </button>
          ))}

          {/* Play / Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-1 cursor-pointer"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Location Trust Tag */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15">
          <Building2 className="w-3.5 h-3.5 text-[#ff7700]" />
          <span>Headquarters: Northern By-Pass, Nairobi, Kenya</span>
        </div>
      </div>
    </section>
  );
};
