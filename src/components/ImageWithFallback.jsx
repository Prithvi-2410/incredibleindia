import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

export default function ImageWithFallback({ 
  src, 
  fallbackSrc, 
  alt, 
  className = "", 
  loading = "lazy" 
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const finalSrc = error ? (fallbackSrc || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop") : (src || fallbackSrc);

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      {/* Skeleton loader while loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
        </div>
      )}

      <img
        src={finalSrc}
        alt={alt || "Incredible India Destination"}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!error && fallbackSrc && fallbackSrc !== src) {
            setError(true);
          } else {
            setLoaded(true);
          }
        }}
        className={`w-full h-full object-cover transition-all duration-700 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      />
    </div>
  );
}
