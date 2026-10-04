import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Star, Building2, ChevronRight, Compass } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import destinationsData from '../data/destinations.json';
import citiesData from '../data/cities.json';

export default function GlobalSearchModal({ isOpen, onClose, onSelectCity, onSelectPlace }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if (e.key === '/' && !isOpen && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        // open search handled by parent or listener
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  // Search in places
  const matchedPlaces = cleanQuery
    ? destinationsData.filter(d => 
        d.name.toLowerCase().includes(cleanQuery) ||
        d.city.toLowerCase().includes(cleanQuery) ||
        d.state.toLowerCase().includes(cleanQuery) ||
        d.category.toLowerCase().includes(cleanQuery) ||
        d.type.toLowerCase().includes(cleanQuery)
      ).slice(0, 10)
    : [];

  // Search in cities
  const matchedCities = cleanQuery
    ? citiesData.filter(c =>
        c.name.toLowerCase().includes(cleanQuery) ||
        c.state.toLowerCase().includes(cleanQuery) ||
        c.zone.toLowerCase().includes(cleanQuery)
      ).slice(0, 6)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all 302 places, 211 cities, 30 states (e.g. Kashmir, Hawa Mahal, Goa, Taj)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white text-sm sm:text-base placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline text-[10px] bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-800">
            ESC
          </kbd>
        </div>

        {/* Quick Suggestion Tags if query is empty */}
        {!cleanQuery && (
          <div className="p-6 space-y-4">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {['Kashmir', 'Amritsar', 'Jaipur', 'Varanasi', 'Goa', 'Leh', 'Kerala', 'Hampi', 'Somnath', 'Taj Mahal'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {cleanQuery && (
          <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Matching Cities */}
            {matchedCities.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block mb-3">
                  Matching Cities ({matchedCities.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {matchedCities.map((c) => (
                    <div
                      key={c.name}
                      onClick={() => {
                        onClose();
                        onSelectCity(c.name);
                      }}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-400 cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-amber-400" />
                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-amber-300">
                            {c.name}
                          </h4>
                          <span className="text-xs text-slate-400">{c.state} • {c.placeCount} places</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Places */}
            {matchedPlaces.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block mb-3">
                  Matching Destinations ({matchedPlaces.length})
                </span>
                <div className="space-y-2">
                  {matchedPlaces.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onClose();
                        onSelectPlace(p);
                      }}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-400 cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={p.imageUrl}
                            fallbackSrc={p.fallbackImageUrl}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-amber-300">
                            {p.name}
                          </h4>
                          <span className="text-xs text-slate-400">
                            {p.city}, {p.state} • {p.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{p.rating}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matchedCities.length === 0 && matchedPlaces.length === 0 && (
              <div className="py-12 text-center text-slate-400">
                <Compass className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-sm">No places or cities found matching "{query}"</p>
                <span className="text-xs text-slate-500">Try searching for a state name, monument, or spiritual shrine.</span>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
