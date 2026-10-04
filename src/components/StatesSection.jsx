import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Sparkles, Compass, Play, Pause } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import statesData from '../data/states.json';

export default function StatesSection({ onSelectState }) {
  const scrollContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isHoveredRef = useRef(false);

  // Smooth continuous auto-gliding motion
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animId;
    let speed = 1.0; // pixels per frame

    const step = () => {
      if (isPlaying && !isHoveredRef.current && container) {
        container.scrollLeft += speed;
        // Seamless loop wrap
        if (container.scrollLeft >= (container.scrollWidth - container.clientWidth - 10)) {
          container.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Double list for seamless continuous infinite motion
  const doubledStates = [...statesData, ...statesData];

  return (
    <section id="states" className="relative py-24 bg-[#030712] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Federal Diversity</span>
            </div>
            <h2 className="font-display-royal text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-wide">
              Explore India <span className="text-saffron-gradient">By State</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              India features 28 States and 8 Union Territories, each carrying its own culinary soul, dialects, and architectural monuments.
            </p>
          </div>

          {/* Controls: Play/Pause animation & Manual Arrows */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all ${
                isPlaying
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title={isPlaying ? "Pause auto-motion" : "Resume auto-motion"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              <span className="hidden sm:inline">{isPlaying ? "Auto Moving" : "Paused"}</span>
            </button>

            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Continuously Moving Cards Carousel Track */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        onTouchStart={() => { isHoveredRef.current = true; }}
        onTouchEnd={() => { isHoveredRef.current = false; }}
        className="flex items-stretch gap-6 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-12 pb-6 pt-2 scroll-smooth cursor-grab active:cursor-grabbing"
      >
        {doubledStates.map((state, idx) => (
          <div
            key={`${state.name}-${idx}`}
            onClick={() => onSelectState && onSelectState(state.name)}
            className="flex-shrink-0 w-80 sm:w-96 glass-card rounded-3xl overflow-hidden border border-slate-800/90 hover:border-amber-400/90 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 group select-none"
          >
            {/* Image Banner */}
            <div className="relative h-64 w-full overflow-hidden">
              <ImageWithFallback
                src={state.heroImage}
                fallbackSrc={state.fallbackHeroImage}
                alt={state.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/30" />

              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold text-amber-300">
                {state.zone} India • {state.entityType || (state.isUnionTerritory ? 'UT' : 'State')}
              </div>

              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-xs text-amber-200/90 font-medium">
                  {state.cityCount} Cities • {state.placesCount} Key Destinations
                </span>
                <h3 className="font-display-royal text-2xl font-bold text-white tracking-wide mt-0.5 group-hover:text-amber-300 transition-colors">
                  {state.name}
                </h3>
              </div>
            </div>

            {/* State Card Body */}
            <div className="p-5 flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {state.description}
              </p>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-semibold">
                  Featured Highlights
                </span>
                <div className="flex flex-wrap gap-1">
                  {state.topPlaces.slice(0, 3).map((place) => (
                    <span
                      key={place}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {place}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold group-hover:text-amber-300">
                <span>Explore {state.name} Places</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
