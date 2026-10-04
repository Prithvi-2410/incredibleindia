import React from 'react';
import { X, Star, MapPin, Clock, IndianRupee, Camera, Plane, Calendar, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

export default function DestinationQuickViewModal({ place, onClose, onExploreCity }) {
  if (!place) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-slate-950 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md text-slate-300 hover:text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Area */}
        <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
          <ImageWithFallback
            src={place.imageUrl}
            fallbackSrc={place.fallbackImageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
              {place.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{place.rating} / 5</span>
              <span className="text-slate-400">({place.reviewsLakhs} Lakh Reviews)</span>
            </div>
            <h3 className="font-display-royal text-2xl font-bold text-white">
              {place.name}
            </h3>
          </div>
        </div>

        {/* Right Info Details */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{place.city}, {place.state} ({place.zone} Zone)</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {place.description}
            </p>

            {/* Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Visit: {place.timeNeededHrs} Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-emerald-400" />
                <span>Fee: {place.entranceFee}</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-400" />
                <span>DSLR: {place.dslrAllowed ? 'Allowed' : 'Prohibited'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-purple-400" />
                <span>Airport: {place.airportNearby ? '< 50 km' : '> 50 km'}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div>Best Visiting Hour: <strong className="text-amber-300">{place.bestTimeToVisit}</strong></div>
              <div>Weekly Closed Day: <strong className="text-white">{place.weeklyOff}</strong></div>
              <div>Establishment: <strong className="text-white">{place.establishmentYear}</strong></div>
            </div>
          </div>

          {/* Action to explore city */}
          <button
            onClick={() => {
              onClose();
              onExploreCity(place.city);
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg"
          >
            <span>Explore City of {place.city}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
