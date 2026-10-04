import React, { useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FamousPlacesCarousel from './components/FamousPlacesCarousel';
import InteractiveMap from './components/InteractiveMap';
import DestinationsSection from './components/DestinationsSection';
import AllCitiesSection from './components/AllCitiesSection';
import StatesSection from './components/StatesSection';
import RegionsSection from './components/RegionsSection';
import ExperiencesSection from './components/ExperiencesSection';
import PhotoStorySection from './components/PhotoStorySection';
import Footer from './components/Footer';

// Modals & AI Assistant
import CityDetailPage from './components/CityDetailPage';
import DestinationQuickViewModal from './components/DestinationQuickViewModal';
import GlobalSearchModal from './components/GlobalSearchModal';
import AiChatBot from './components/AiChatBot';

export default function App() {
  const [activeCity, setActiveCity] = useState(null);
  const [quickViewPlace, setQuickViewPlace] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [filterState, setFilterState] = useState(null);

  // Keyboard shortcut listener for '/' to open search
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '/' && !isSearchOpen && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isSearchOpen]);

  const handleSelectCity = (cityName) => {
    setActiveCity(cityName);
  };

  const handleSelectState = (stateName) => {
    setFilterState(stateName);
    const destSec = document.getElementById('destinations');
    if (destSec) {
      destSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectZone = (zoneName) => {
    const destSec = document.getElementById('destinations');
    if (destSec) {
      destSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectExperience = (expId) => {
    const destSec = document.getElementById('destinations');
    if (destSec) {
      destSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-amber-500 selection:text-black">
      
      {/* Global Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        onSelectCity={handleSelectCity}
      />

      {/* Hero Section */}
      <HeroSection
        onSelectCity={handleSelectCity}
      />

      {/* Spotlight Famous Indian Wonders */}
      <FamousPlacesCarousel
        onSelectCity={handleSelectCity}
        onQuickView={(place) => setQuickViewPlace(place)}
      />

      {/* Interactive Real Map of India (28 States & 8 Union Territories) */}
      <InteractiveMap
        onSelectState={handleSelectState}
        onSelectCity={handleSelectCity}
      />

      {/* All 302 Destinations Discovery Catalog */}
      <DestinationsSection
        onSelectCity={handleSelectCity}
        onQuickView={(place) => setQuickViewPlace(place)}
        filterState={filterState}
        setFilterState={setFilterState}
      />

      {/* All 211 Cities Explorer */}
      <AllCitiesSection
        onSelectCity={handleSelectCity}
      />

      {/* 28 States & 8 Union Territories Horizontal Carousel */}
      <StatesSection
        onSelectState={handleSelectState}
      />

      {/* Six Cultural Zones */}
      <RegionsSection
        onSelectZone={handleSelectZone}
      />

      {/* Thematic Travel Experiences */}
      <ExperiencesSection
        onSelectExperience={handleSelectExperience}
      />

      {/* Cinematic Five Chapters Photo Story */}
      <PhotoStorySection />

      {/* Grand Cinematic Footer */}
      <Footer
        onSelectZone={handleSelectZone}
        onSelectCategory={handleSelectExperience}
      />

      {/* Floating AI Trip Guide Trigger Button */}
      {!isAiChatOpen && (
        <button
          onClick={() => setIsAiChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-2xl shadow-amber-500/30 hover:scale-105 transition-all flex items-center gap-2.5 border border-amber-300 group"
          title="Plan your trip with Bharat AI Travel Concierge"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 border border-slate-950 animate-ping" />
          </div>
          <span className="hidden sm:inline">Ask AI Travel Concierge</span>
          <span className="sm:hidden">AI Trip Guide</span>
        </button>
      )}

      {/* Dedicated City Experience Modal / Page */}
      {activeCity && (
        <CityDetailPage
          cityName={activeCity}
          onClose={() => setActiveCity(null)}
          onSelectCity={handleSelectCity}
        />
      )}

      {/* Destination Quick View Dossier Modal */}
      {quickViewPlace && (
        <DestinationQuickViewModal
          place={quickViewPlace}
          onClose={() => setQuickViewPlace(null)}
          onExploreCity={(city) => {
            setQuickViewPlace(null);
            handleSelectCity(city);
          }}
        />
      )}

      {/* Global Instant Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCity={(city) => {
          setIsSearchOpen(false);
          handleSelectCity(city);
        }}
        onSelectPlace={(place) => {
          setIsSearchOpen(false);
          setQuickViewPlace(place);
        }}
      />

      {/* AI Travel Assistant Chatbot */}
      <AiChatBot
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onSelectCity={(city) => {
          setIsAiChatOpen(false);
          handleSelectCity(city);
        }}
      />

    </div>
  );
}
