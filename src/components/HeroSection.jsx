import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Sparkles, Compass, ArrowDown } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const HERO_DESTINATIONS = [
  {
    title: "KASHMIR & LADAKH",
    subtitle: "Crown of the Himalayas",
    description: "Towering glaciers, azure alpine lakes, and ancient Buddhist monasteries suspended between heaven and earth.",
    tag: "Northern Majesty",
    place: "Pangong Tso & Dal Lake",
    state: "Ladakh & J&K",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1600&auto=format&fit=crop",
    color: "#38bdf8"
  },
  {
    title: "RAJASTHAN",
    subtitle: "The Realm of Maharajas",
    description: "Golden desert bastions, amber palaces, and timeless royal legends echoing across the Thar sands.",
    tag: "Royal Heritage",
    place: "Hawa Mahal & Amber Fort",
    state: "Rajasthan",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
    color: "#f59e0b"
  },
  {
    title: "VARANASI & GANGES",
    subtitle: "The Eternal City of Light",
    description: "One of the oldest living cities on Earth, where sacred aartis, chants, and timeless mysticism dance upon the holy waters.",
    tag: "Spiritual Heart",
    place: "Dashashwamedh Ghat",
    state: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1600&auto=format&fit=crop",
    color: "#fb923c"
  },
  {
    title: "KERALA BACKWATERS",
    subtitle: "God's Own Country",
    description: "Lush palm-fringed lagoons, emerald tea terraces of Munnar, and tranquil traditional houseboats gliding in peace.",
    tag: "Emerald Serenity",
    place: "Alleppey & Munnar",
    state: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop",
    color: "#34d399"
  },
  {
    title: "HAMPI & SOUTH TEMPLES",
    subtitle: "Carved In Golden Stone",
    description: "Surreal boulder landscapes, UNESCO architectural wonders, and magnificent Dravidian gopurams of the Vijayanagara Empire.",
    tag: "Timeless Architecture",
    place: "Virupaksha & Vittala Temple",
    state: "Karnataka",
    image: "https://images.unsplash.com/photo-1600100397608-f010f443b740?q=80&w=1600&auto=format&fit=crop",
    color: "#fbbf24"
  },
  {
    title: "RANN OF KUTCH",
    subtitle: "The White Salt Desert",
    description: "An infinite expanse of moonlit salt, vibrant folk festivities, and kaleidoscopic Kutchi textiles.",
    tag: "Cultural Wonder",
    place: "Rann Utsav",
    state: "Gujarat",
    image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1600&auto=format&fit=crop",
    color: "#e2e8f0"
  }
];

export default function HeroSection({ onExploreClick, onSelectCity }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_DESTINATIONS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const current = HERO_DESTINATIONS[currentIdx];

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIdx((prev) => (prev + 1) % HERO_DESTINATIONS.length);
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIdx((prev) => (prev - 1 + HERO_DESTINATIONS.length) % HERO_DESTINATIONS.length);
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Slides with Ken Burns Crossfade */}
      {HERO_DESTINATIONS.map((dest, idx) => (
        <div
          key={dest.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIdx ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
          }`}
        >
          <div className="w-full h-full transform scale-105 animate-kenburns origin-center">
            <ImageWithFallback
              src={dest.image}
              alt={dest.title}
              className="w-full h-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
            />
          </div>
          {/* Subtle multi-layer cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-black/60" />
          <div className="absolute inset-0 bg-radial-vignette opacity-70" />
        </div>
      ))}

      {/* Floating Ambient Atmosphere Overlays */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow delay-1000" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center mt-12">
        
        {/* Destination Category Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/40 backdrop-blur-md mb-6 shadow-xl shadow-black/40 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-amber-200 font-medium">
            {current.tag} • {current.place}
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-xs tracking-wider text-slate-300 font-light">
            {current.state}
          </span>
        </div>

        {/* Cinematic Main Title */}
        <div className="space-y-2 mb-6">
          <div className="overflow-hidden">
            <h2 className="text-xs sm:text-sm md:text-base tracking-[0.4em] uppercase text-amber-300/90 font-medium transition-all duration-700">
              DISCOVER THE SOUL OF
            </h2>
          </div>
          <h1 className="font-display-royal text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-[0.12em] font-extrabold uppercase text-white leading-none drop-shadow-2xl">
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
              INCREDIBLE
            </span>{" "}
            <span className="text-saffron-gradient inline-block transform hover:scale-105 transition-transform duration-300">
              INDIA
            </span>
          </h1>
          <p className="font-serif-luxury text-lg sm:text-2xl md:text-3xl italic text-amber-100/90 tracking-wide font-normal pt-2">
            "{current.subtitle}"
          </p>
        </div>

        {/* Narrative Description */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-200/90 font-light leading-relaxed mb-8 drop-shadow">
          {current.description}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-10">
          <a
            href="#destinations"
            className="group relative px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-bold text-xs sm:text-sm tracking-[0.15em] uppercase shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-2 overflow-hidden"
          >
            <Compass className="w-4 h-4 text-slate-950 group-hover:rotate-45 transition-transform duration-300" />
            <span>Begin Odyssey</span>
            <ChevronRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </a>

          <a
            href="#cities"
            className="px-6 py-3.5 rounded-full bg-slate-900/80 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-white font-medium text-xs sm:text-sm tracking-[0.15em] uppercase backdrop-blur-md hover:bg-slate-800/80 transition-all duration-300 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>All 211 Cities</span>
          </a>

          <a
            href="#interactive-map"
            className="px-5 py-3.5 rounded-full bg-slate-950/60 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-amber-300 font-medium text-xs sm:text-sm tracking-wider backdrop-blur-md transition-all duration-200"
          >
            Interactive Map
          </a>
        </div>

        {/* Slide Indicators & Navigation Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-white transition-colors backdrop-blur-sm"
            aria-label="Previous destination"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {HERO_DESTINATIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentIdx(i);
                }}
                className={`transition-all duration-500 rounded-full ${
                  i === currentIdx
                    ? 'w-8 h-2 bg-gradient-to-r from-amber-400 to-orange-500 shadow-md shadow-amber-500/30'
                    : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Jump to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-white transition-colors backdrop-blur-sm"
            aria-label="Next destination"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Bottom Quick Stat Bar */}
      <div className="absolute bottom-4 left-0 right-0 z-20 hidden md:flex items-center justify-between max-w-7xl mx-auto px-8 py-3 rounded-2xl bg-slate-950/50 border border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-8 text-xs text-slate-400">
          <div>
            <span className="text-white font-bold text-sm tracking-wider">302</span> Destinations Cataloged
          </div>
          <div className="w-px h-3 bg-slate-800" />
          <div>
            <span className="text-white font-bold text-sm tracking-wider">211</span> Cities Represented
          </div>
          <div className="w-px h-3 bg-slate-800" />
          <div>
            <span className="text-white font-bold text-sm tracking-wider">28 States & 8 UTs</span>
          </div>
          <div className="w-px h-3 bg-slate-800" />
          <div>
            <span className="text-amber-400 font-bold text-sm tracking-wider">6</span> Cultural Zones
          </div>
        </div>

        <a
          href="#destinations"
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 hover:text-amber-200 transition-colors animate-bounce"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
