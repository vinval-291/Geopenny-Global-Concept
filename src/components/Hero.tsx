import React, { useState, useEffect } from "react";
import { Search, Home, MapPin, DollarSign, ArrowRight, ShieldCheck, Award, ThumbsUp } from "lucide-react";

interface HeroProps {
  onSearch: (filters: { type: string; budget: string; status: string }) => void;
  onOpenBooking: () => void;
}

export default function Hero({ onSearch, onOpenBooking }: HeroProps) {
  const [propertyType, setPropertyType] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [currentBg, setCurrentBg] = useState(0);

  const heroBgs = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80", // modern estate at dusk
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80", // premium sunny modern villa
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80", // modern skyscrapers & commercial Hub
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBgs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroBgs.length]);

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      type: propertyType,
      budget: budgetRange,
      status: ""
    });
    // Scroll to the projects section
    const target = document.querySelector("#projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToProjects = () => {
    const target = document.querySelector("#projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Background Image Carousel with zoom and cross-fade */}
      <div className="absolute inset-0 z-0">
        {heroBgs.map((bg, idx) => (
          <div
            key={bg}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1500 transform ${
              idx === currentBg ? "opacity-40 scale-100" : "opacity-0 scale-110"
            }`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
        {/* Navy & Gold Gradient Masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342] via-[#0A2342]/80 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent z-1" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col justify-center h-full">
        {/* Tagline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-full w-fit mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
            Ibadan's Premier Real Estate Developers
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6 animate-in fade-in duration-700">
          Building Communities. <br />
          <span className="bg-gradient-to-r from-white via-white to-[#D4AF37] bg-clip-text text-transparent">
            Creating Lasting Value.
          </span>
        </h1>

        {/* Subhead */}
        <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mb-10 leading-relaxed font-light">
          Headstone Realty develops premium residential and commercial properties that transform communities and create sustainable investment opportunities across Ibadan and beyond. Experience integrity and guaranteed high ROI.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
          <button
            onClick={scrollToProjects}
            className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B08D24] text-[#0A2342] hover:from-white hover:to-white font-bold tracking-wide rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            id="hero-explore-btn"
          >
            Explore Properties
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 border-2 border-white hover:border-[#D4AF37] hover:text-[#D4AF37] text-white font-bold tracking-wide rounded-xl transition-all bg-transparent cursor-pointer flex items-center justify-center gap-2"
            id="hero-consult-btn"
          >
            Book Consultation
          </button>
        </div>

        {/* Search Bar Widget */}
        <div className="w-full max-w-4xl bg-[#0A2342]/90 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-6 shadow-2xl mb-16">
          <form onSubmit={handleSearchClick} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Home className="h-3 w-3 text-[#D4AF37]" /> Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full h-12 bg-slate-900 border border-white/20 rounded-lg text-white font-serif text-sm px-3 focus:outline-none focus:border-[#D4AF37] transition-all"
                id="search-property-type"
              >
                <option value="">All Properties</option>
                <option value="Land">Strategic Lands/Plots</option>
                <option value="Residential">Premium Residential</option>
                <option value="Commercial">Commercial Hub Hubs</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <DollarSign className="h-3 w-3 text-[#D4AF37]" /> Target Budget
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full h-12 bg-slate-900 border border-white/20 rounded-lg text-white font-serif text-sm px-3 focus:outline-none focus:border-[#D4AF37] transition-all"
                id="search-budget"
              >
                <option value="">Any Premium Budget</option>
                <option value="under20m">Below ₦20,000,000</option>
                <option value="20m-50m">₦20,000,000 - ₦50,000,000</option>
                <option value="above50m">Above ₦50,000,000</option>
              </select>
            </div>

            <button
              type="submit"
              className="h-12 w-full bg-gradient-to-r from-[#D4AF37] to-[#B08D24] text-[#0A2342] hover:bg-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="search-trigger-btn"
            >
              <Search className="h-4 w-4" /> Find Investment
            </button>
          </form>
        </div>

        {/* Trust Stats Indicators (Animated appearance) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10" id="trust-indicators">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37]">500+</span>
            </div>
            <span className="text-xs text-gray-300 uppercase tracking-wider font-mono mt-1">Happy Clients</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37]">100+</span>
            </div>
            <span className="text-xs text-gray-300 uppercase tracking-wider font-mono mt-1">Properties Developed</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37]">20+</span>
            </div>
            <span className="text-xs text-gray-300 uppercase tracking-wider font-mono mt-1">Investment Projects</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37]">98%</span>
            </div>
            <span className="text-xs text-gray-300 uppercase tracking-wider font-mono mt-1">Success & Trust Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
