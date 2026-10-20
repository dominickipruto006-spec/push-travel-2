import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronRight,
  ChevronLeft,
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
  image: string;
  subtitle: string;
  headline: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onRequestQuoteClick,
  onExplorePackages,
}) => {
  const t = TRANSLATIONS[currentLang];

  // 6 Rotating Scenes featuring the authentic safari photography
  const scenes: SceneItem[] = [
    {
      id: 'elephant-herd',
      image: HERO_ELEPHANT_HERD,
      headline: 'Explore the Roars of\nthe East African\nSafaris',
      subtitle:
        'Witness massive free-ranging elephant families beneath Mount Kilimanjaro and across the great golden plains with our veteran guides.',
    },
    {
      id: 'roaring-lioness',
      image: HERO_ROARING_LIONESS,
      headline: 'Feel the Untamed\nPulse of the\nAfrican Wilderness',
      subtitle:
        'Track pride lions, tree leopards, and cheetah coalitions in custom 4x4 pop-up roof Land Cruisers with KPSGA-certified naturalist guides.',
    },
    {
      id: 'two-lionesses',
      image: HERO_TWO_LIONESSES,
      headline: 'Encounter Majestic\nAfrican Wildlife\nUp Close',
      subtitle:
        'Experience the breathtaking theater of the Great Wildebeest Migration and dramatic predator encounters in East Africa’s prime reserves.',
    },
    {
      id: 'rift-valley-gorge',
      image: HERO_RIFT_GORGE,
      headline: 'Marvel at Ancient\nCanyons & Volcanic\nGorges',
      subtitle:
        'Cycle through Hell’s Gate volcanic towers, hike dramatic water-carved gorges, and marvel at the geological wonder of the Great Rift Valley.',
    },
    {
      id: 'coast-beach',
      image: BEACH_RESORT_IMAGE,
      headline: 'Turquoise Waters &\nPowdery White\nSands',
      subtitle:
        'Seamless bush-to-beach holiday combinations along the warm Indian Ocean coastline with barefoot luxury and private dhow cruises.',
    },
    {
      id: 'luxury-lodge',
      image: LUXURY_RESORT_IMAGE,
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
    <section className="relative w-full h-[600px] sm:h-[660px] lg:h-[740px] flex items-center overflow-hidden bg-black select-none">
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
        </div>
      ))}

      {/* Manual Flipping Arrow Buttons (Left & Right) */}
      <button
        onClick={() => {
          handlePrevScene();
          setIsPlaying(false);
        }}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs border border-white/20 hover:scale-105"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={() => {
          handleNextScene();
          setIsPlaying(false);
        }}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs border border-white/20 hover:scale-105"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Content Layout — Centered on phone/mobile screens as requested */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-center h-full text-center sm:text-left items-center sm:items-start">
        <div className="max-w-2xl mx-auto sm:mx-0">
          {/* Marquee Headline — Centered on mobile */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-lg font-['Outfit',sans-serif] whitespace-pre-line text-balance mx-auto sm:mx-0"
            style={{
              textShadow: '0 3px 20px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.95)',
            }}
          >
            {activeScene.headline}
          </h1>

          {/* Subtitle — Centered on mobile */}
          <p
            className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-100 max-w-xl font-normal leading-relaxed drop-shadow-md mx-auto sm:mx-0 text-center sm:text-left"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}
          >
            {activeScene.subtitle}
          </p>

          {/* Action CTAs — Centered on mobile */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 mx-auto sm:mx-0">
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

      {/* Subtle Slide Indicators at bottom center */}
      <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-2 pointer-events-auto">
        {scenes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentSceneIdx(idx);
              setIsPlaying(false);
            }}
            className={`transition-all rounded-full cursor-pointer ${
              currentSceneIdx === idx
                ? 'w-7 h-2 bg-[#ea580c]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
