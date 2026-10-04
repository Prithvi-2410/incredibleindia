import React, { useState, useMemo } from 'react';
import { Star, MapPin, Clock, IndianRupee, Camera, Plane, Compass, Sparkles, Filter, ChevronRight, X, Eye } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import destinationsData from '../data/destinations.json';
import zonesData from '../data/zones.json';
import categoriesData from '../data/categories.json';

export default function DestinationsSection({ 
  onSelectCity, 
  onQuickView, 
  filterState, 
  setFilterState 
}) {
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [onlyFree, setOnlyFree] = useState(false);
  const [onlyDslr, setOnlyDslr] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [visibleCount, setVisibleCount] = useState(18);

  // Filter pipeline across all 302 dataset items
  const filteredDestinations = useMemo(() => {
    return destinationsData.filter((dest) => {
      if (selectedZone !== 'All' && dest.zone !== selectedZone) return false;
      if (filterState && filterState !== 'All' && dest.state.toLowerCase() !== filterState.toLowerCase()) return false;
      if (selectedCategory !== 'All' && dest.category !== selectedCategory) return false;
      if (selectedRating === '4.5+' && dest.rating < 4.5) return false;
      if (selectedRating === '4.7+' && dest.rating < 4.7) return false;
      if (onlyFree && dest.entranceFeeNum > 0) return false;
      if (onlyDslr && !dest.dslrAllowed) return false;

      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        const matchName = dest.name.toLowerCase().includes(q);
        const matchCity = dest.city.toLowerCase().includes(q);
        const matchState = dest.state.toLowerCase().includes(q);
        const matchType = dest.type.toLowerCase().includes(q);
        if (!matchName && !matchCity && !matchState && !matchType) return false;
      }

      return true;
    });
  }, [selectedZone, filterState, selectedCategory, selectedRating, onlyFree, onlyDslr, searchKeyword]);

  const displayedDestinations = filteredDestinations.slice(0, visibleCount);

  const resetFilters = () => {
    setSelectedZone('All');
    if (setFilterState) setFilterState(null);
    setSelectedCategory('All');
    setSelectedRating('All');
    setOnlyFree(false);
    setOnlyDslr(false);
    setSearchKeyword('');
    setVisibleCount(18);
  };

  return (
    <section id="destinations" className="relative py-24 bg-[#040812] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete National Directory</span>
            </div>
            <h2 className="font-display-royal text-3xl sm:text-5xl font-extrabold tracking-wide uppercase text-white">
              Discover All <span className="text-saffron-gradient">302 Places</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              From ancient rock-cut caves to majestic Himalayan peaks and pristine coastal shores. Every destination in the national database is rendered below.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Showing <span className="text-amber-400 font-bold">{Math.min(visibleCount, filteredDestinations.length)}</span> of <span className="text-white font-bold">{filteredDestinations.length}</span> results
            </span>
            {(selectedZone !== 'All' || filterState || selectedCategory !== 'All' || onlyFree || onlyDslr || searchKeyword) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-800 text-amber-300 hover:bg-slate-700 transition-colors"
              >
                <X className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-card rounded-2xl p-5 mb-12 border border-slate-800 space-y-4">
          
          {/* Row 1: Search & Zone */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="Filter by place name, city, state, or temple/beach/fort..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 text-white text-xs placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            {/* Zone Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 mr-1 font-medium">Zone:</span>
              <button
                onClick={() => setSelectedZone('All')}
                className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                  selectedZone === 'All'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                All
              </button>
              {zonesData.map((z) => (
                <button
                  key={z.name}
                  onClick={() => setSelectedZone(z.name)}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                    selectedZone === z.name
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {z.name}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Category & Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 mr-1 font-medium">Type:</span>
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              {categoriesData.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                    selectedCategory === cat.name
                      ? 'bg-amber-400 text-black font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            {/* Special Toggles: DSLR, Free Entry, Rating */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyFree}
                  onChange={(e) => setOnlyFree(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                />
                <span className="flex items-center gap-1">
                  <IndianRupee className="w-3 h-3 text-emerald-400" />
                  Free Entry
                </span>
              </label>

              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyDslr}
                  onChange={(e) => setOnlyDslr(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                />
                <span className="flex items-center gap-1">
                  <Camera className="w-3 h-3 text-amber-400" />
                  DSLR Allowed
                </span>
              </label>

              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none"
              >
                <option value="All">All Ratings</option>
                <option value="4.5+">★ 4.5 & above</option>
                <option value="4.7+">★ 4.7 & above</option>
              </select>
            </div>
          </div>

          {filterState && (
            <div className="flex items-center gap-2 pt-2 text-xs text-amber-300">
              <span>Filtered by State: <strong className="text-white">{filterState}</strong></span>
              <button
                onClick={() => setFilterState && setFilterState(null)}
                className="text-slate-400 hover:text-white underline ml-2"
              >
                Clear state filter
              </button>
            </div>
          )}

        </div>

        {/* Dynamic Destination Grid with Asymmetric Card Styling */}
        {displayedDestinations.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center border border-slate-800">
            <Compass className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Destinations Found</h3>
            <p className="text-slate-400 text-sm mb-6">No records match your selected combination of filters.</p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedDestinations.map((dest, idx) => {
              // Asymmetric variation: highlight every 7th item with larger frame
              const isFeatured = idx % 7 === 0;

              return (
                <div
                  key={dest.id}
                  className={`group relative glass-card rounded-3xl overflow-hidden border border-slate-800/80 hover:border-amber-500/50 transition-all duration-500 flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 ${
                    isFeatured ? 'md:col-span-2 lg:col-span-1 border-amber-500/20' : ''
                  }`}
                >
                  {/* Card Image Area with Zoom & Badges */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <ImageWithFallback
                      src={dest.imageUrl}
                      fallbackSrc={dest.fallbackImageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                        {dest.category}
                      </span>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{dest.rating}</span>
                        <span className="text-[10px] text-slate-400">({dest.reviewsLakhs}L)</span>
                      </div>
                    </div>

                    {/* Bottom overlay in image */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="flex items-center gap-1.5 text-xs text-amber-200/90 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <button
                          onClick={() => onSelectCity && onSelectCity(dest.city)}
                          className="hover:underline hover:text-white"
                        >
                          {dest.city}
                        </button>
                        <span>, {dest.state}</span>
                      </div>
                      <h3 className="font-display-royal text-xl sm:text-2xl font-bold text-white tracking-wide mt-1 group-hover:text-amber-300 transition-colors">
                        {dest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Metadata Pill Grid */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400/80" />
                        <span>{dest.timeNeededHrs}h Visit</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <IndianRupee className="w-3.5 h-3.5 text-emerald-400/80" />
                        <span>{dest.entranceFee}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-blue-400/80" />
                        <span>{dest.dslrAllowed ? 'DSLR Allowed' : 'No DSLR'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-purple-400/80" />
                        <span>{dest.airportNearby ? 'Airport < 50km' : 'Distant Airport'}</span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectCity && onSelectCity(dest.city)}
                        className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400 text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Explore {dest.city}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onQuickView && onQuickView(dest)}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-colors"
                        title="Quick View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button if more destinations exist */}
        {visibleCount < filteredDestinations.length && (
          <div className="text-center mt-14">
            <button
              onClick={() => setVisibleCount((prev) => prev + 18)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:scale-105 transition-transform"
            >
              Load Next 18 Destinations ({filteredDestinations.length - visibleCount} Remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
