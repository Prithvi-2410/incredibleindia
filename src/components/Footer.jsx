import React from 'react';
import { ArrowUp, Compass, Heart, Sparkles, MapPin, Shield, Layers } from 'lucide-react';
import zonesData from '../data/zones.json';

export default function Footer({ onSelectZone, onSelectCategory }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020409] text-slate-300 pt-24 pb-12 border-t border-slate-800/80 overflow-hidden">
      
      {/* Background radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Massive Animated Typography Banner */}
        <div className="text-center mb-20 overflow-hidden">
          <span className="text-xs uppercase tracking-[0.4em] text-amber-400 font-semibold block mb-2">
            THE ETERNAL SUB-CONTINENT
          </span>
          <h2 className="font-display-royal text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-[0.08em] text-white/90 select-none">
            EXPLORE <span className="text-saffron-gradient">INDIA</span>
          </h2>
          <p className="font-serif-luxury italic text-slate-400 text-base sm:text-xl mt-3 max-w-xl mx-auto">
            "Athiti Devo Bhava — The Guest is Truly Divine"
          </p>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16 text-xs">
          
          {/* Col 1: Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-amber-400/80 flex items-center justify-center bg-slate-900">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <span className="font-display-royal text-lg font-bold text-white tracking-widest">
                INCREDIBLE INDIA
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An immersive digital journey cataloging 302 tourist attractions, 211 cities, 30 states, and 6 cultural zones. Designed to inspire your next pilgrimage and expedition across the subcontinent.
            </p>
            <div className="text-[11px] text-amber-400/90 font-mono">
              Dataset Source: Kaggle Famous Indian Tourist Places
            </div>
          </div>

          {/* Col 2: Six Zones */}
          <div className="space-y-3">
            <h4 className="font-display-royal text-sm font-bold text-white uppercase tracking-wider">
              Cultural Zones
            </h4>
            <ul className="space-y-2">
              {zonesData.map((z) => (
                <li key={z.name}>
                  <a
                    href="#regions"
                    onClick={() => onSelectZone && onSelectZone(z.name)}
                    className="hover:text-amber-300 transition-colors"
                  >
                    {z.name} India ({z.placeCount})
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-display-royal text-sm font-bold text-white uppercase tracking-wider">
              Exploration
            </h4>
            <ul className="space-y-2">
              <li><a href="#destinations" className="hover:text-amber-300 transition-colors">All 302 Destinations</a></li>
              <li><a href="#cities" className="hover:text-amber-300 transition-colors">All 211 Cities</a></li>
              <li><a href="#states" className="hover:text-amber-300 transition-colors">30 States Directory</a></li>
              <li><a href="#interactive-map" className="hover:text-amber-300 transition-colors">Interactive India Map</a></li>
              <li><a href="#photo-story" className="hover:text-amber-300 transition-colors">Five Chapters Journey</a></li>
            </ul>
          </div>

          {/* Col 4: Thematic Journeys */}
          <div className="space-y-3">
            <h4 className="font-display-royal text-sm font-bold text-white uppercase tracking-wider">
              Experiences
            </h4>
            <ul className="space-y-2">
              <li><a href="#experiences" className="hover:text-amber-300 transition-colors">Royal Heritage Forts</a></li>
              <li><a href="#experiences" className="hover:text-amber-300 transition-colors">Sacred Ganges Ghats</a></li>
              <li><a href="#experiences" className="hover:text-amber-300 transition-colors">Himalayan Valleys</a></li>
              <li><a href="#experiences" className="hover:text-amber-300 transition-colors">Sun-Kissed Coasts</a></li>
              <li><a href="#experiences" className="hover:text-amber-300 transition-colors">Bengal Tiger Reserves</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Incredible India Digital Odyssey. Crafted with reverence for Indian heritage.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

      </div>
    </footer>
  );
}
