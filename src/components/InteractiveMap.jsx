import React, { useState } from 'react';
import { MapPin, Compass, Sparkles, ChevronRight, Check, Layers, Building } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import statesData from '../data/states.json';
import zonesData from '../data/zones.json';

// Geographic Coordinates for States & Union Territories on the 800x800 Real India Map
const REAL_MAP_PINS = [
  // Northern
  { id: 'Ladakh', name: 'Ladakh', x: 44, y: 13, zone: 'Northern', isUT: true },
  { id: 'Jammu and Kashmir', name: 'Jammu & Kashmir', x: 34, y: 16, zone: 'Northern', isUT: true },
  { id: 'Himachal Pradesh', name: 'Himachal Pradesh', x: 40, y: 22, zone: 'Northern', isUT: false },
  { id: 'Punjab', name: 'Punjab', x: 34, y: 24, zone: 'Northern', isUT: false },
  { id: 'Uttarakhand', name: 'Uttarakhand', x: 44, y: 26, zone: 'Northern', isUT: false },
  { id: 'Haryana', name: 'Haryana', x: 37, y: 29, zone: 'Northern', isUT: false },
  { id: 'Delhi', name: 'Delhi', x: 39, y: 31, zone: 'Northern', isUT: true },
  { id: 'Uttar Pradesh', name: 'Uttar Pradesh', x: 50, y: 37, zone: 'Northern', isUT: false },
  // Western
  { id: 'Rajasthan', name: 'Rajasthan', x: 26, y: 36, zone: 'Western', isUT: false },
  { id: 'Gujarat', name: 'Gujarat', x: 19, y: 47, zone: 'Western', isUT: false },
  { id: 'Maharashtra', name: 'Maharashtra', x: 33, y: 58, zone: 'Western', isUT: false },
  { id: 'Goa', name: 'Goa', x: 28, y: 70, zone: 'Western', isUT: false },
  { id: 'Daman and Diu', name: 'Daman & Diu', x: 24, y: 53, zone: 'Western', isUT: true },
  // Central
  { id: 'Madhya Pradesh', name: 'Madhya Pradesh', x: 42, y: 47, zone: 'Central', isUT: false },
  { id: 'Chhattisgarh', name: 'Chhattisgarh', x: 53, y: 52, zone: 'Central', isUT: false },
  // Eastern
  { id: 'Bihar', name: 'Bihar', x: 63, y: 39, zone: 'Eastern', isUT: false },
  { id: 'Jharkhand', name: 'Jharkhand', x: 62, y: 47, zone: 'Eastern', isUT: false },
  { id: 'West Bengal', name: 'West Bengal', x: 68, y: 48, zone: 'Eastern', isUT: false },
  { id: 'Odisha', name: 'Odisha', x: 58, y: 57, zone: 'Eastern', isUT: false },
  // North Eastern
  { id: 'Sikkim', name: 'Sikkim', x: 69, y: 33, zone: 'North East', isUT: false },
  { id: 'Assam', name: 'Assam', x: 81, y: 36, zone: 'North East', isUT: false },
  { id: 'Arunachal Pradesh', name: 'Arunachal', x: 88, y: 28, zone: 'North East', isUT: false },
  { id: 'Tripura', name: 'Tripura', x: 79, y: 45, zone: 'North East', isUT: false },
  // Southern
  { id: 'Telangana', name: 'Telangana', x: 44, y: 62, zone: 'Southern', isUT: false },
  { id: 'Andhra Pradesh', name: 'Andhra Pradesh', x: 46, y: 69, zone: 'Southern', isUT: false },
  { id: 'Karnataka', name: 'Karnataka', x: 34, y: 71, zone: 'Southern', isUT: false },
  { id: 'Tamil Nadu', name: 'Tamil Nadu', x: 41, y: 83, zone: 'Southern', isUT: false },
  { id: 'Kerala', name: 'Kerala', x: 35, y: 84, zone: 'Southern', isUT: false },
  { id: 'Puducherry', name: 'Puducherry', x: 46, y: 79, zone: 'Southern', isUT: true },
  { id: 'Andaman and Nicobar Islands', name: 'Andaman & Nicobar', x: 86, y: 78, zone: 'Southern', isUT: true },
];

export default function InteractiveMap({ onSelectState, onSelectCity }) {
  const [filterType, setFilterType] = useState('All'); // 'All' | 'States' | 'UTs'
  const [activeZone, setActiveZone] = useState('All');
  const [hoveredPin, setHoveredPin] = useState(null);
  const [selectedPin, setSelectedPin] = useState(REAL_MAP_PINS.find(p => p.id === 'Uttar Pradesh') || REAL_MAP_PINS[0]);

  // Find dataset info for selected state
  const selectedStateData = statesData.find(
    (s) => s.name.toLowerCase() === (selectedPin?.id || '').toLowerCase()
  ) || statesData[0];

  const filteredPins = REAL_MAP_PINS.filter((p) => {
    if (filterType === 'States' && p.isUT) return false;
    if (filterType === 'UTs' && !p.isUT) return false;
    if (activeZone !== 'All' && p.zone !== activeZone) return false;
    return true;
  });

  return (
    <section id="interactive-map" className="relative py-24 bg-[#030712] overflow-hidden">
      
      {/* Subtle ambient lighting without lines or moving boxes */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Official Geographic Atlas</span>
          </div>
          <h2 className="font-display-royal text-3xl sm:text-5xl font-extrabold text-white tracking-wide uppercase mb-3">
            Interactive Real Map of <span className="text-saffron-gradient">India</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            India comprises <strong>28 States</strong> and <strong>8 Union Territories</strong>. Explore them directly on the authentic map below — click any territory pin to inspect its cultural treasures.
          </p>

          {/* Classification Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => { setFilterType('All'); setActiveZone('All'); }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                filterType === 'All' && activeZone === 'All'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              All Territories (36)
            </button>
            <button
              onClick={() => { setFilterType('States'); setActiveZone('All'); }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                filterType === 'States'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              28 States
            </button>
            <button
              onClick={() => { setFilterType('UTs'); setActiveZone('All'); }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                filterType === 'UTs'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              8 Union Territories
            </button>

            {/* Zone pills */}
            {zonesData.map((z) => (
              <button
                key={z.name}
                onClick={() => { setActiveZone(z.name); setFilterType('All'); }}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  activeZone === z.name
                    ? 'bg-amber-400 text-black font-bold shadow'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {z.name}
              </button>
            ))}
          </div>
        </div>

        {/* Real Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* REAL MAP OF INDIA CANVAS */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800/90 rounded-3xl p-4 sm:p-6 shadow-2xl relative flex items-center justify-center overflow-hidden">
            
            {/* Top legend */}
            <div className="absolute top-4 left-4 z-30 flex items-center gap-3 text-xs bg-black/75 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Selected: {selectedPin.name}</span>
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 text-[11px]">{selectedPin.isUT ? 'Union Territory' : 'State'}</span>
            </div>

            {/* Real India Map Image with Interactive Hotspot Pins */}
            <div className="relative w-full max-w-[560px] aspect-square rounded-2xl overflow-hidden shadow-inner border border-slate-800/60 bg-[#060c18]">
              
              {/* REAL MAP OF INDIA PROVIDED BY USER */}
              <img
                src="/india map.webp"
                alt="Real Map of India"
                className="w-full h-full object-contain select-none pointer-events-none filter brightness-95 contrast-105"
              />

              {/* Real Hotspot Pins placed accurately over the map */}
              {filteredPins.map((pin) => {
                const isSelected = selectedPin?.id === pin.id;
                const isHovered = hoveredPin?.id === pin.id;
                const stateMeta = statesData.find((s) => s.name.toLowerCase() === pin.id.toLowerCase());
                const placeCount = stateMeta ? stateMeta.placesCount : 0;

                return (
                  <button
                    key={pin.id}
                    onClick={() => {
                      setSelectedPin(pin);
                      if (onSelectState) onSelectState(pin.id);
                    }}
                    onMouseEnter={() => setHoveredPin(pin)}
                    onMouseLeave={() => setHoveredPin(null)}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none transition-all duration-300 ${
                      isSelected ? 'scale-125 z-40' : 'hover:scale-115'
                    }`}
                    title={`${pin.name} (${pin.isUT ? 'Union Territory' : 'State'})`}
                  >
                    {/* Ripple on active marker */}
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full bg-amber-400/50 animate-ping -m-1 pointer-events-none" />
                    )}

                    {/* Marker badge */}
                    <div className={`relative px-2 py-0.5 rounded-full flex items-center gap-1 border shadow-xl transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 border-amber-200 font-bold shadow-amber-500/40'
                        : isHovered
                        ? 'bg-slate-900 text-amber-300 border-amber-400 scale-105'
                        : 'bg-black/85 text-slate-200 border-slate-700 hover:border-amber-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-black' : pin.isUT ? 'bg-cyan-400' : 'bg-amber-400'
                      }`} />
                      <span className="text-[10px] tracking-tight whitespace-nowrap font-medium">
                        {pin.name}
                      </span>
                      {placeCount > 0 && (
                        <span className={`text-[9px] px-1 rounded-full font-bold ${
                          isSelected ? 'bg-black/20 text-black' : 'bg-slate-800 text-amber-400'
                        }`}>
                          {placeCount}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column: State / UT Live Inspector */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {selectedStateData ? (
              <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-amber-500/30 shadow-2xl">
                
                {/* State Hero Image */}
                <div className="relative h-56 rounded-2xl overflow-hidden mb-6 group">
                  <ImageWithFallback
                    src={selectedStateData.heroImage}
                    fallbackSrc={selectedStateData.fallbackHeroImage}
                    alt={selectedStateData.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-300 uppercase tracking-wider">
                      {selectedStateData.zone} Zone
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-medium text-slate-300">
                      {selectedStateData.entityType}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-display-royal text-2xl sm:text-3xl font-bold text-white tracking-wide">
                      {selectedStateData.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {selectedStateData.cityCount} Cities • {selectedStateData.placesCount} Key Destinations in Database
                    </p>
                  </div>
                </div>

                {/* State Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {selectedStateData.description}
                </p>

                {/* Top places */}
                <div className="mb-6">
                  <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">
                    Key Tourist Attractions
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStateData.topPlaces.map((placeName) => (
                      <span
                        key={placeName}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200"
                      >
                        {placeName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cities in this state */}
                <div className="mb-6">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Cities Cataloged ({selectedStateData.cities.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {selectedStateData.cities.map((cityName) => (
                      <button
                        key={cityName}
                        onClick={() => onSelectCity && onSelectCity(cityName)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400 hover:text-amber-300 text-slate-300 transition-colors flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{cityName}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter CTA */}
                <a
                  href="#destinations"
                  onClick={() => onSelectState && onSelectState(selectedStateData.name)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-widest text-center shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <span>Filter Destinations by {selectedStateData.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

              </div>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
}
