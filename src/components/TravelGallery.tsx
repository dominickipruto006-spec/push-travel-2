import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { INITIAL_GALLERY_ITEMS } from '../data/travelData';

export const TravelGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Wildlife' | 'Coastal & Beach'>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredItems = INITIAL_GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Wildlife') return item.category === 'Wildlife & Safaris';
    if (activeCategory === 'Coastal & Beach') return item.category === 'Beaches & Coast';
    return true;
  });

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedImageIndex !== null) {
        setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
      }
    },
    [selectedImageIndex, filteredItems.length]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedImageIndex !== null) {
        setSelectedImageIndex(
          (selectedImageIndex - 1 + filteredItems.length) % filteredItems.length
        );
      }
    },
    [selectedImageIndex, filteredItems.length]
  );

  // Keyboard navigation for full-screen viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handleNext, handlePrev]);

  return (
    <div className="py-10 sm:py-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean, Visual Title and Filter Bar - No clutter or extra text */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1">
            Push World Travel
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a2265] tracking-tight font-['Outfit',sans-serif]">
            Gallery
          </h1>
          <div className="w-14 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-2 mb-6 rounded-full" />

          {/* Minimal Category Switcher */}
          <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl">
            {(['All', 'Wildlife', 'Coastal & Beach'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeCategory === tab
                    ? 'bg-white text-[#0a2265] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Pure Photographic Grid - No text badges, no descriptions, strictly high-res images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt="Push World Travel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Minimalist Hover Indicator - Pure visual, no text clutter */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full-Screen Minimalist Lightbox Viewer */}
        {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
          <div
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Full High-Resolution Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center select-none"
            >
              <img
                src={filteredItems[selectedImageIndex].imageUrl}
                alt="Push World Travel Photography"
                className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              {/* Minimal Counter */}
              <span className="mt-3 text-xs tracking-widest uppercase text-white/60 font-medium">
                {selectedImageIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
