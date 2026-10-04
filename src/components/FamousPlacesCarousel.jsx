import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, Sparkles, Clock, IndianRupee, Eye } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import destinationsData from '../data/destinations.json';

export default function FamousPlacesCarousel({ onSelectCity, onQuickView }) {
  // Explicitly curated national wonders requested by user + top rated dataset places
  const priorityIds = [
    'dest-029', // Kedarnath Temple
    'dest-034', // Dwarkadhish Temple
    'dest-039', // Shirdi Sai Baba Temple
    'dest-206', // Kalighat Kali Temple
    'dest-005', // Somnath Temple
    'dest-009', // Mahakaleshwar Jyotirlinga
    'dest-111', // Taj Mahal
    'dest-007', // Wagah Border
    'dest-016', // Tungnath Temple
    'dest-032', // Dakshineswar Kali Temple
    'dest-022', // Prem Mandir
    'dest-138', // Qutub Minar
  ];

  const iconicPlaces = priorityIds
    .map(id => destinationsData.find(d => d.id === id))
    .filter(Boolean);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % iconicPlaces.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + iconicPlaces.length) % iconicPlaces.length);
  };

  const current = iconicPlaces[currentIndex] || destinationsData[0];

  return (
    <section className="relative py-24 bg-[#030612] text-slate-100 overflow-hidden">
      
      {/* Background ambient lighting from active destination */}
      <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>National Crown Jewels</span>
            </div>
            <h2 className="font-display-royal text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-wide">
              Famous <span className="text-saffron-gradient">Indian Wonders</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              The highest-rated pilgrimage sites, royal fortresses, and architectural masterworks from the national dataset.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-white transition-colors"
              aria-label="Previous wonder"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-amber-300">
              {currentIndex + 1} / {iconicPlaces.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-white transition-colors"
              aria-label="Next wonder"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Stage Card with Depth Layers */}
        <div className="relative glass-card rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            
            {/* Left Image Area */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full overflow-hidden">
              <ImageWithFallback
                src={current.imageUrl}
                fallbackSrc={current.fallbackImageUrl}
                alt={current.name}
                className="w-full h-full object-cover transition-transform duration-1000 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                  {current.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/70 backdrop-blur-md text-white border border-white/10 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{current.rating}</span>
                </span>
              </div>
            </div>

            {/* Right Information Area */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-amber-400 tracking-widest uppercase font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>{current.city}, {current.state}</span>
                </div>

                <h3 className="font-display-royal text-3xl sm:text-4xl font-extrabold text-white tracking-wide leading-tight">
                  {current.name}
                </h3>

                <span className="text-xs text-amber-200/80 font-serif-luxury italic block">
                  {current.significance} Significance • Established: {current.establishmentYear}
                </span>

                <p className="text-slate-300 text-sm leading-relaxed pt-2">
                  {current.description}
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Recommended: {current.timeNeededHrs}h</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                  <span>Admission: {current.entranceFee}</span>
                </div>
                <div className="col-span-2 text-slate-400">
                  Best Visited During: <strong className="text-white">{current.bestTimeToVisit}</strong>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => onSelectCity && onSelectCity(current.city)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all text-center"
                >
                  Explore {current.city}
                </button>
                <button
                  onClick={() => onQuickView && onQuickView(current)}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white transition-colors"
                  title="Full Dossier"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
