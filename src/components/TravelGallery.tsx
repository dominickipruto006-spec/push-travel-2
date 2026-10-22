import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { GalleryImage, GALLERY_CATEGORIES, GalleryCategory } from '../types/gallery';
import { galleryService, INITIAL_DEFAULT_GALLERY_IMAGES } from '../services/galleryService';

export const TravelGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>(INITIAL_DEFAULT_GALLERY_IMAGES);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const fetchPublishedGallery = useCallback(async () => {
    setLoading(true);
    try {
      const data = await galleryService.getPublishedImages();
      if (Array.isArray(data) && data.length > 0) {
        setImages(data);
      }
    } catch (err) {
      console.warn('Could not load dynamic gallery, using default images:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublishedGallery();
  }, [fetchPublishedGallery]);

  const categories = ['All', ...GALLERY_CATEGORIES];

  const filteredItems = images.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedImageIndex !== null && filteredItems.length > 0) {
        setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
      }
    },
    [selectedImageIndex, filteredItems.length]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedImageIndex !== null && filteredItems.length > 0) {
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
        {/* Title and Category Navigation Bar */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest block mb-1">
            Push World Travel
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a2265] tracking-tight font-['Outfit',sans-serif]">
            Photo Gallery
          </h1>
          <div className="w-14 h-1 bg-gradient-to-r from-[#ea580c] to-[#ff7700] mx-auto mt-2 mb-6 rounded-full" />

          {/* Dynamic Category Switcher with Horizontal Scroll on Mobile */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-[#0a2265] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State Skeleton */}
        {loading && images.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-72 sm:h-80 bg-slate-200 rounded-2xl" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty Gallery State */
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No images in this category</h3>
            <p className="text-xs text-slate-500 mt-1">
              Select another category above or check back shortly as our team publishes new safari photos.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-4 py-2 bg-[#0a2265] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#07194a]"
            >
              View All Photos
            </button>
          </div>
        ) : (
          /* Pure Photographic Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Subtle bottom info gradient with title and category tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs w-max mb-1.5">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base leading-snug drop-shadow-xs">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-slate-200 line-clamp-2 mt-1 drop-shadow-xs">
                      {item.caption}
                    </p>
                  )}
                </div>

                {/* Minimalist Hover Zoom Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Full-Screen Minimalist Lightbox Viewer */}
        {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
          <div
            onClick={() => setSelectedImageIndex(null)}
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const diff = touchStartX - e.changedTouches[0].clientX;
              if (diff > 45) {
                handleNext();
              } else if (diff < -45) {
                handlePrev();
              }
              setTouchStartX(null);
            }}
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
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              </>
            )}

            {/* Full High-Resolution Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[88vh] flex flex-col items-center select-none"
            >
              <img
                src={filteredItems[selectedImageIndex].imageUrl}
                alt={filteredItems[selectedImageIndex].title}
                className="max-w-full max-h-[76vh] object-contain rounded-xl shadow-2xl transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              {/* Photo Title & Details */}
              <div className="mt-3 text-center px-4 max-w-2xl">
                <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                  {filteredItems[selectedImageIndex].category}
                </span>
                <h3 className="text-white font-bold text-sm sm:text-base mt-0.5">
                  {filteredItems[selectedImageIndex].title}
                </h3>
                {filteredItems[selectedImageIndex].caption && (
                  <p className="text-slate-300 text-xs mt-1">
                    {filteredItems[selectedImageIndex].caption}
                  </p>
                )}
                <div className="flex items-center justify-center gap-2 mt-2">
                  {filteredItems[selectedImageIndex].location && (
                    <>
                      <span className="text-slate-400 text-xs font-medium">
                        {filteredItems[selectedImageIndex].location}
                      </span>
                      <span className="text-white/40 text-xs">•</span>
                    </>
                  )}
                  <span className="text-white/60 text-xs tracking-wider uppercase font-medium">
                    {selectedImageIndex + 1} / {filteredItems.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
