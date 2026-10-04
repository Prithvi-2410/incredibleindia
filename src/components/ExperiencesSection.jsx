import React, { useState } from 'react';
import { Sparkles, Compass, Shield, Mountain, Flame, Waves, Heart, Trees, ChevronRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const EXPERIENCES = [
  {
    id: "Heritage",
    title: "ROYAL HERITAGE & FORTS",
    subtitle: "Echoes of Emperors & Empires",
    description: "Centuries-old hill fort bastions, marble mausoleums, stepwells, and UNESCO world heritage monuments spanning five thousand years.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop",
    placesCount: "94 Places",
    interactionStyle: "Antique Gold Reveal",
    icon: Shield,
    accent: "from-amber-500/20 to-yellow-600/10"
  },
  {
    id: "Spiritual",
    title: "SACRED & SPIRITUAL",
    subtitle: "Temples, Ghats & Sacred Chant",
    description: "From morning Ganga aartis in Varanasi to Himalayan monasteries, Golden Temple langars, and towering Dravidian sanctums.",
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1000&auto=format&fit=crop",
    placesCount: "82 Places",
    interactionStyle: "Mystical Incense Glow",
    icon: Flame,
    accent: "from-orange-500/20 to-amber-600/10"
  },
  {
    id: "Nature",
    title: "MISTY VALLEYS & PEAKS",
    subtitle: "Pristine Wilderness & Waterfalls",
    description: "The emerald heights of Munnar, thunderous waterfalls of Meghalaya, snowbound passes of Spiti, and tranquil high-altitude lakes.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
    placesCount: "48 Places",
    interactionStyle: "Parallax Canopy Flow",
    icon: Mountain,
    accent: "from-emerald-500/20 to-teal-600/10"
  },
  {
    id: "Wildlife",
    title: "WILDLIFE & SANCTUARIES",
    subtitle: "Roar of the Royal Bengal Tiger",
    description: "Dense teak forests of Madhya Pradesh, one-horned rhinos of Kaziranga, and desert bird reserves under golden sunrises.",
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1000&auto=format&fit=crop",
    placesCount: "26 Places",
    interactionStyle: "Zoom Lens Tracking",
    icon: Trees,
    accent: "from-green-500/20 to-emerald-700/10"
  },
  {
    id: "Beaches",
    title: "SUN-KISSED COASTS & ISLANDS",
    subtitle: "Golden Sands & Palm Groves",
    description: "Pristine white coral beaches of the Andaman Islands, bohemian shores of Goa, and serene French colonial promenades of Puducherry.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop",
    placesCount: "27 Places",
    interactionStyle: "Aquatic Tide Shimmer",
    icon: Waves,
    accent: "from-cyan-500/20 to-blue-600/10"
  },
  {
    id: "Culture",
    title: "LIVING CULTURE & FESTIVALS",
    subtitle: "Colors, Cuisines & Traditions",
    description: "The kaleidoscope of Rann Utsav tents, Varanasi silk weavers, Kathakali recitals, and sensory spice bazaars.",
    image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1000&auto=format&fit=crop",
    placesCount: "25 Places",
    interactionStyle: "Prismatic Tilt",
    icon: Sparkles,
    accent: "from-purple-500/20 to-rose-600/10"
  }
];

export default function ExperiencesSection({ onSelectExperience }) {
  const [hoveredExp, setHoveredExp] = useState(null);

  return (
    <section id="experiences" className="relative py-24 bg-[#030611] text-slate-100 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Thematic Journeys</span>
          </div>
          <h2 className="font-display-royal text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-wide">
            Curated Travel <span className="text-saffron-gradient">Experiences</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Every traveler seeks a different rhythm. Explore India tailored by your deepest passions — from ancient sacred shrines to high-octane Himalayan wilderness.
          </p>
        </div>

        {/* 6 Thematic Experience Cards with distinct interaction styles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp) => {
            const IconComponent = exp.icon;

            return (
              <div
                key={exp.id}
                onClick={() => onSelectExperience && onSelectExperience(exp.id)}
                onMouseEnter={() => setHoveredExp(exp.id)}
                onMouseLeave={() => setHoveredExp(null)}
                className="group relative glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-400/80 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
              >
                {/* Background image container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <ImageWithFallback
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />

                  {/* Icon & Count Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-amber-400 shadow-lg group-hover:scale-110 group-hover:text-amber-300 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md border border-white/10 text-slate-200">
                      {exp.placesCount}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-serif-luxury italic text-amber-200/90 block">
                      {exp.subtitle}
                    </span>
                    <h3 className="font-display-royal text-xl sm:text-2xl font-bold text-white tracking-wide mt-0.5">
                      {exp.title}
                    </h3>
                  </div>
                </div>

                {/* Experience Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                    <span>Explore All {exp.id}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Distinct ambient bottom glow on hover */}
                <div className={`absolute -bottom-8 left-0 right-0 h-16 bg-gradient-to-t ${exp.accent} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
