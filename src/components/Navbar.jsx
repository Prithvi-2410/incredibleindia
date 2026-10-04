import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Compass, MapPin, Sparkles, SlidersHorizontal, Bot } from 'lucide-react';

export default function Navbar({ 
  onOpenSearch, 
  onOpenAiChat, 
  onSelectCity 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Destinations", href: "#destinations", count: "302" },
    { name: "Cities", href: "#cities", count: "211" },
    { name: "States & UTs", href: "#states", count: "28+8" },
    { name: "Interactive Map", href: "#interactive-map" },
    { name: "Regions", href: "#regions", count: "6" },
    { name: "Experiences", href: "#experiences" },
    { name: "Photo Story", href: "#photo-story" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-nav py-3 shadow-2xl backdrop-blur-xl' 
        : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Royal Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full border border-amber-500/40 p-1 flex items-center justify-center bg-slate-950/60 backdrop-blur-md group-hover:border-amber-400 transition-colors shadow-lg shadow-amber-500/10">
              <div className="w-7 h-7 rounded-full border border-dashed border-amber-400/80 animate-spin-slow flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display-royal text-lg tracking-[0.25em] text-white font-bold leading-none flex items-center gap-1.5">
                INCREDIBLE <span className="text-saffron-gradient">INDIA</span>
              </span>
              <span className="text-[10px] tracking-[0.35em] text-amber-200/60 uppercase font-sans mt-0.5">
                The Eternal Odyssey
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3 py-1.5 text-xs tracking-wider uppercase text-slate-300 hover:text-amber-300 transition-colors duration-200 group font-medium"
              >
                <span>{link.name}</span>
                {link.count && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-slate-800 text-amber-400/90 border border-slate-700/60 group-hover:border-amber-500/40">
                    {link.count}
                  </span>
                )}
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-amber-400 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Controls: Search & AI Chatbot Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/70 hover:border-amber-500/60 text-slate-300 hover:text-white text-xs transition-all duration-200 shadow-sm backdrop-blur-md group"
              title="Search all 302 tourist places and 211 cities (Press /)"
            >
              <Search className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Search places...</span>
              <kbd className="hidden md:inline text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
                /
              </kbd>
            </button>

            {/* AI Travel Assistant Trigger */}
            <button
              onClick={onOpenAiChat}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500 hover:to-orange-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 hover:border-amber-400 text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md shadow-amber-500/10 group"
              title="Chat with AI Travel Guide for itinerary & city advice"
            >
              <Bot className="w-4 h-4 text-amber-400 group-hover:text-slate-950 transition-colors" />
              <span>AI Trip Guide</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav mt-3 border-t border-slate-800 px-6 py-5 flex flex-col gap-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-sm uppercase tracking-wider text-slate-200 hover:text-amber-400 border-b border-slate-800/60"
            >
              <span>{link.name}</span>
              {link.count && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-amber-400">
                  {link.count}
                </span>
              )}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAiChat();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold text-xs uppercase tracking-wider shadow-lg"
          >
            <Bot className="w-4 h-4" />
            <span>Open AI Trip Planner</span>
          </button>
        </div>
      )}
    </header>
  );
}
