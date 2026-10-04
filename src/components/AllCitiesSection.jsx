import React, { useState, useMemo } from 'react';
import { MapPin, Search, Star, Compass, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import citiesData from '../data/cities.json';
import zonesData from '../data/zones.json';

export default function AllCitiesSection({ onSelectCity }) {
  const [search, setSearch] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All');
  const [sortBy, setSortBy] = useState('places'); // 'places' | 'rating' | 'name'
  const [visibleCount, setVisibleCount] = useState(24);

  const filteredCities = useMemo(() => {
    return citiesData
      .filter((city) => {
        if (zoneFilter !== 'All' && city.zone !== zoneFilter) return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchCity = city.name.toLowerCase().includes(q);
          const matchState = city.state.toLowerCase().includes(q);
          if (!matchCity && !matchState) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'places') return b.placeCount - a.placeCount || b.avgRating - a.avgRating;
        if (sortBy === 'rating') return b.avgRating - a.avgRating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [search, zoneFilter, sortBy]);

  const displayedCities = filteredCities.slice(0, visibleCount);

  return (
    <section id="cities" className="relative py-24 bg-[#020610] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>National Urban & Pilgrimage Atlas</span>
            </div>
            <h2 className="font-display-royal text-3xl sm:text-5xl font-extrabold tracking-wide uppercase text-white">
              All <span className="text-saffron-gradient">211 Indian Cities</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Every city from the dataset has an interactive gateway. Select any city to dive into its dedicated travel story, attractions, and cultural essence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Showing <span className="text-amber-400 font-bold">{Math.min(visibleCount, filteredCities.length)}</span> of <span className="text-white font-bold">{filteredCities.length}</span> cities
            </span>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 mb-10 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city name (e.g. Amritsar, Leh, Varanasi, Hampi, Mumbai)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 text-white text-xs placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Zones</option>
              {zonesData.map((z) => (
                <option key={z.name} value={z.name}>{z.name} Zone</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none"
            >
              <option value="places">Sort: Most Places</option>
              <option value="rating">Sort: Highest Rating</option>
              <option value="name">Sort: Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Cities Grid with dynamic rich card visuals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayedCities.map((city) => (
            <div
              key={city.name}
              onClick={() => onSelectCity && onSelectCity(city.name)}
              className="group relative glass-card rounded-2xl overflow-hidden border border-slate-800/80 hover:border-amber-400/60 transition-all duration-400 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col"
            >
              {/* Image banner */}
              <div className="relative h-44 w-full overflow-hidden">
                <ImageWithFallback
                  src={city.heroImage}
                  fallbackSrc={city.fallbackHeroImage}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/30" />

                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-amber-300 font-medium">
                  {city.zone}
                </div>

                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{city.avgRating}</span>
                </div>

                <div className="absolute bottom-2 left-3 right-3">
                  <span className="text-[11px] text-slate-300 font-light block">
                    {city.state}
                  </span>
                  <h3 className="font-display-royal text-lg font-bold text-white tracking-wide truncate group-hover:text-amber-300 transition-colors">
                    {city.name}
                  </h3>
                </div>
              </div>

              {/* City Body */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>{city.placeCount} {city.placeCount === 1 ? 'Destination' : 'Destinations'}</span>
                  <span className="text-amber-400 text-[11px]">
                    {city.categories.slice(0, 2).join(' • ')}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 group-hover:text-amber-300 font-medium">
                  <span>Explore City Journey</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredCities.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="px-8 py-3 rounded-full bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Load More Cities ({filteredCities.length - visibleCount} Remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
