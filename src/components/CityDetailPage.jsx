import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Star, MapPin, Clock, IndianRupee, Camera, Plane, Calendar, 
  Volume2, VolumeX, Sparkles, Compass, Share2, Play, Pause, ChevronRight, Eye 
} from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import citiesData from '../data/cities.json';
import destinationsData from '../data/destinations.json';

export default function CityDetailPage({ cityName, onClose, onSelectCity }) {
  // Find city object
  const city = citiesData.find(c => c.name.toLowerCase() === cityName.toLowerCase()) || citiesData[0];
  
  // Find all destinations for this city from destinations.json
  const cityPlaces = destinationsData.filter(d => d.city.toLowerCase() === city.name.toLowerCase());

  // Carousel / Changing image state
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Other cities in the same state or zone for the "Explore Other Cities" section
  const relatedCities = citiesData
    .filter(c => c.name !== city.name && (c.state === city.state || c.zone === city.zone))
    .slice(0, 6);

  // Scroll to top on city change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIdx(0);
  }, [cityName]);

  const imagesList = cityPlaces.map(p => ({
    url: p.imageUrl,
    fallback: p.fallbackImageUrl,
    caption: p.name,
    type: p.type
  }));

  // Auto-change image every 5 seconds if multiple images exist
  useEffect(() => {
    if (imagesList.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIdx(prev => (prev + 1) % imagesList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imagesList.length]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#030712] text-slate-100 animate-fadeIn">
      
      {/* Top Floating Action Bar */}
      <div className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-none">
        <button
          onClick={onClose}
          className="pointer-events-auto px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-xs tracking-wider uppercase backdrop-blur-xl shadow-2xl flex items-center gap-2 hover:border-amber-400 transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Back to All Places</span>
        </button>

        <div className="pointer-events-auto flex items-center gap-2">
          <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs text-amber-300 font-semibold tracking-wider uppercase">
            {city.state} • {city.zone} India
          </span>
        </div>
      </div>

      {/* 1. CINEMATIC CITY HERO */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-end justify-start overflow-hidden">
        {/* Dynamic Changing Hero Background */}
        {imagesList.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === activeImageIdx ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <div className="w-full h-full transform scale-105 animate-kenburns origin-center">
              <ImageWithFallback
                src={img.url}
                fallbackSrc={img.fallback}
                alt={img.caption}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Cinematic layered gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-black/40" />
          </div>
        ))}

        {/* Hero Details */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pb-16 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/40 text-amber-300 text-xs uppercase tracking-widest backdrop-blur-md mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Destination Dossier</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300 text-sm tracking-widest uppercase mb-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{city.state}, {city.zone} Zone</span>
            </div>

            <h1 className="font-display-royal text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-wide leading-none mb-4 drop-shadow-2xl">
              {city.name}
            </h1>

            <p className="font-serif-luxury text-xl sm:text-2xl italic text-amber-100/90 mb-6 drop-shadow">
              "{city.description}"
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <div className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-white">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{city.avgRating} Average Rating</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-amber-300">
                {city.placeCount} Primary Attractions
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-slate-200">
                {city.totalReviewsLakhs} Lakh Reviews Aggregated
              </div>
            </div>
          </div>
        </div>

        {/* Image pagination indicator on bottom right */}
        {imagesList.length > 1 && (
          <div className="absolute bottom-6 right-8 z-20 hidden md:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-slate-300">
            <span>Photo {activeImageIdx + 1} of {imagesList.length}:</span>
            <span className="text-amber-300 font-medium">{imagesList[activeImageIdx]?.caption}</span>
          </div>
        )}
      </section>

      {/* 2. TOP ATTRACTIONS IN THIS CITY */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Curated Places in {city.name}
          </div>
          <h2 className="font-display-royal text-3xl sm:text-4xl font-extrabold text-white tracking-wide uppercase">
            Top Attractions ({cityPlaces.length})
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Verified tourist spots, monuments, shrines, and nature sites documented in the national dataset for {city.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cityPlaces.map((place) => (
            <div
              key={place.id}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <ImageWithFallback
                  src={place.imageUrl}
                  fallbackSrc={place.fallbackImageUrl}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-amber-300 font-semibold uppercase tracking-wider border border-white/10">
                  {place.type}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-white border border-white/10">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{place.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display-royal text-xl font-bold text-white tracking-wide">
                    {place.name}
                  </h3>
                  <span className="text-xs text-amber-200/80 font-light">
                    {place.significance} Significance
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {place.description}
                </p>

                {/* Practical Information Matrix */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Duration: {place.timeNeededHrs}h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Fee: {place.entranceFee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>Off: {place.weeklyOff}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    <span>DSLR: {place.dslrAllowed ? 'Permitted' : 'Restricted'}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Best Time: <strong className="text-amber-300">{place.bestTimeToVisit}</strong></span>
                  <span>Est: <strong className="text-white">{place.establishmentYear}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. "FEEL THE CITY" CINEMATIC AMBIENCE & VIDEO ARCHITECTURE */}
      <section className="py-16 bg-slate-950/80 border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>Atmospheric Immersion</span>
              </div>
              <h2 className="font-display-royal text-3xl sm:text-4xl font-extrabold text-white uppercase">
                Feel <span className="text-saffron-gradient">{city.name}</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Step beyond the monuments into the living rhythm of {city.name}. Hear the morning bells, witness the golden dawn over sacred rivers, and immerse yourself in the culinary warmth and living crafts that define this heritage enclave.
              </p>
              
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Airport Proximity:</span>
                  <span className="text-amber-300 font-semibold">{cityPlaces[0]?.airportNearby ? "Within 50 km" : "Over 50 km (Scenic road connection)"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Peak Season:</span>
                  <span className="text-white font-semibold">{city.bestTimes.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Primary Categories:</span>
                  <span className="text-amber-400 font-semibold">{city.categories.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Video player simulation / Cinemagraph frame */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-black aspect-video flex items-center justify-center group">
                <ImageWithFallback
                  src={city.heroImage}
                  fallbackSrc={city.fallbackHeroImage}
                  alt={city.name}
                  className={`w-full h-full object-cover transition-transform duration-1000 ${
                    isPlayingVideo ? 'scale-110 blur-sm' : 'group-hover:scale-105'
                  }`}
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                {/* Animated video overlay controls */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  <button
                    onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                    className="w-16 h-16 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform mb-4"
                    aria-label="Play Cinemagraph"
                  >
                    {isPlayingVideo ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                  </button>

                  <h4 className="font-display-royal text-xl sm:text-2xl font-bold text-white tracking-wider uppercase mb-1">
                    {isPlayingVideo ? `Playing ${city.name} Visual Reverie` : `Experience ${city.name} In Motion`}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md">
                    Cinematic 4K visuals curated from Incredible India Content Hub archives with synchronized ambient audio.
                  </p>
                </div>

                {isPlayingVideo && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-amber-300 font-mono bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md">
                    <span>LIVE AMBIENCE: ACTIVE</span>
                    <span className="animate-pulse">● 4K HIGH DEFINITION</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. EXPLORE OTHER CITIES (Dynamic dataset recommendations) */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Continue The Odyssey
            </div>
            <h3 className="font-display-royal text-2xl sm:text-3xl font-bold text-white uppercase">
              Explore Related Cities in {city.state} & {city.zone}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {relatedCities.map((relCity) => (
            <div
              key={relCity.name}
              onClick={() => onSelectCity(relCity.name)}
              className="group glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-400 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-28 w-full overflow-hidden">
                <ImageWithFallback
                  src={relCity.heroImage}
                  fallbackSrc={relCity.fallbackHeroImage}
                  alt={relCity.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                <div className="absolute bottom-1.5 left-2 right-2">
                  <span className="text-[10px] text-slate-400 block truncate">{relCity.state}</span>
                  <span className="font-display-royal text-xs font-bold text-white truncate block">
                    {relCity.name}
                  </span>
                </div>
              </div>
              <div className="p-2 text-center text-[11px] text-amber-400 group-hover:underline">
                {relCity.placeCount} places →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer in City Page */}
      <div className="py-8 text-center border-t border-slate-800/80 bg-slate-950">
        <button
          onClick={onClose}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
        >
          Close & Return To Main Journey
        </button>
      </div>

    </div>
  );
}
