import React from 'react';
import { Compass, Sparkles, ChevronRight, Layers } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import zonesData from '../data/zones.json';

const ZONE_DESCRIPTIONS = {
  'Northern': 'Crown of the subcontinent with snow-capped Himalayan ranges, spiritual sanctums of the Ganges, and historic imperial capitals.',
  'Southern': 'Ancient Dravidian temple cities, tranquil palm-shaded backwaters, lush Western Ghats coffee plantations, and Arabian Sea beaches.',
  'Eastern': 'Sacred Buddhist monasteries, serene tea gardens of Darjeeling, terracotta monuments, and vibrant cultural celebrations of Bengal & Odisha.',
  'Western': 'Golden Thar desert palaces, vibrant Kutchi salt expanses, rock-cut Ajanta caves, and pulsating Arabian coastal metropolises.',
  'Central': 'Heartland of tiger reserves, UNESCO Khajuraho temples, prehistoric Bhimbetka caves, and sacred Narmada ghats.',
  'North East': 'Pristine rainforest valleys, living root bridges, mystical monasteries, and untouched tribal biodiversity.'
};

export default function RegionsSection({ onSelectZone }) {
  return (
    <section id="regions" className="relative py-24 bg-[#02050c] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Geographical Quadrants</span>
          </div>
          <h2 className="font-display-royal text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-wide">
            The Six Majestic <span className="text-saffron-gradient">Zones</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Experience the unique geography, climatic wonders, and civilizational depth across India's 6 distinct cultural zones.
          </p>
        </div>

        {/* 6 Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {zonesData.map((zone) => {
            const desc = ZONE_DESCRIPTIONS[zone.name] || 'A realm of boundless beauty and sacred heritage.';

            return (
              <div
                key={zone.name}
                onClick={() => onSelectZone && onSelectZone(zone.name)}
                className="group relative glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-400/80 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden">
                  <ImageWithFallback
                    src={zone.heroImage}
                    fallbackSrc={zone.fallbackHeroImage}
                    alt={zone.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/30" />

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                      {zone.placeCount} Destinations • {zone.cityCount} Cities
                    </span>
                    <h3 className="font-display-royal text-2xl font-bold text-white tracking-wide mt-0.5">
                      {zone.name} India
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {desc}
                  </p>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
                      Encompassing States ({zone.states.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {zone.states.slice(0, 4).map((state) => (
                        <span
                          key={state}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {state}
                        </span>
                      ))}
                      {zone.states.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-amber-300">
                          +{zone.states.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold group-hover:text-amber-300">
                    <span>View All {zone.name} Destinations</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
