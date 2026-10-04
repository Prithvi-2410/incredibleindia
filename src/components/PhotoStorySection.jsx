import React, { useState } from 'react';
import { Sparkles, ChevronRight, Compass, Eye, Heart } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const STORY_STEPS = [
  {
    step: "01",
    tagline: "YOU ARRIVE",
    title: "At The Threshold of the Subcontinent",
    narrative: "The Himalayan mist parts above Leh, or perhaps the tropical breeze of the Malabar Coast greets your arrival. The air smells of wet earth, cardamom, and the murmurs of ten thousand legends waiting to be unraveled.",
    location: "Ladakh & Kashmir Valley",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    quote: "India does not reveal herself all at once; she invites you into her silence."
  },
  {
    step: "02",
    tagline: "YOU EXPLORE",
    title: "Walking Through Ancient Stone & Sand",
    narrative: "You climb the golden sandstone ramparts of Jaisalmer at dusk, run your hands across the intricate filigree of Hampi's Vittala chariot, and marvel at stepwells spiraling endlessly into the cool subterranean earth.",
    location: "Rajasthan & Karnataka",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
    quote: "Every carved stone carries the breath of artists who dreamed in centuries, not days."
  },
  {
    step: "03",
    tagline: "YOU TASTE",
    title: "The Alchemical Tapestry of Spices",
    narrative: "Steaming clay cups of saffron kulhad chai in Varanasi, saffron-infused biryanis in the alleys of Hyderabad, freshly tapped coconut water in Alleppey, and crispy Amritsari kulchas dripping in farm butter.",
    location: "Varanasi, Hyderabad & Punjab",
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1600&auto=format&fit=crop",
    quote: "A culinary journey that awakens senses you never knew were slumbering."
  },
  {
    step: "04",
    tagline: "YOU DISCOVER",
    title: "The Living Soul of Sacred Rites",
    narrative: "Thousands of clay oil lamps float gently down Mother Ganga as dusk descends over Dashashwamedh Ghat. The sound of conch shells and deep temple bells reverberates in your chest, transcending language and time.",
    location: "Varanasi & Haridwar Ghats",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1600&auto=format&fit=crop",
    quote: "Here, time is not measured by watches, but by the flow of eternal devotion."
  },
  {
    step: "05",
    tagline: "YOU REMEMBER",
    title: "The Sunset Over Infinite Horizons",
    narrative: "You stand along the silver shores of the Andaman Islands or the white salt flats of the Rann of Kutch under a full moon. You realize you haven't simply visited a country — you have become part of an eternal odyssey.",
    location: "Andaman Islands & Rann of Kutch",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1600&auto=format&fit=crop",
    quote: "You leave India, but India never leaves you."
  }
];

export default function PhotoStorySection() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STORY_STEPS[activeStep];

  return (
    <section id="photo-story" className="relative py-28 bg-[#02050e] text-slate-100 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cinematic Travelogue</span>
          </div>
          <h2 className="font-display-royal text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-wide">
            The Five Chapters of <span className="text-saffron-gradient">Immersion</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            An episodic journey through the sights, sounds, and transcendental encounters of the Indian subcontinent.
          </p>
        </div>

        {/* Storytelling Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          
          {/* Left Column: Interactive Chapter Navigation & Narrative */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step navigation tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {STORY_STEPS.map((step, idx) => (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                    idx === activeStep
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{step.step}</span>
                  <span className="hidden sm:inline">{step.tagline}</span>
                </button>
              ))}
            </div>

            {/* Active Chapter Details */}
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-bold block">
                Chapter {current.step} • {current.location}
              </span>
              
              <h3 className="font-display-royal text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {current.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {current.narrative}
              </p>

              <blockquote className="p-4 rounded-2xl bg-slate-900/80 border-l-4 border-amber-400 italic text-amber-200/90 text-sm font-serif-luxury">
                "{current.quote}"
              </blockquote>
            </div>

            {/* Next Chapter CTA */}
            <div className="pt-2">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % STORY_STEPS.length)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                <span>Proceed to Chapter {STORY_STEPS[(activeStep + 1) % STORY_STEPS.length].step}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Full-scale Changing Imagery Frame */}
          <div className="lg:col-span-7">
            <div className="relative h-[420px] sm:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl group">
              <ImageWithFallback
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Setting</span>
                  <span className="text-white font-medium">{current.location}</span>
                </div>

                <div className="text-xs font-mono text-amber-300 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10">
                  {activeStep + 1} / {STORY_STEPS.length}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
