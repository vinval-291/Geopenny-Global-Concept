import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  MapPin, 
  Building2, 
  Sparkles, 
  Star, 
  Quote, 
  Clock, 
  FileText, 
  Briefcase,
  Printer,
  Palette,
  CheckCircle2,
  Phone,
  Layers,
  Users,
  Building,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Calculator
} from "lucide-react";
import { FEATURED_PROPERTIES, CORE_SERVICES, CUSTOMER_TESTIMONIALS, PORTFOLIO_ITEMS } from "../data";
import { PropertyListing } from "../types";

interface HomeProps {
  onSetPage: (page: string) => void;
  onOpenBooking: (propertyName?: string, budgetVal?: string) => void;
  onOpenAdvisor: () => void;
  searchFilters: { type: string; budget: string };
  setSearchFilters: React.Dispatch<React.SetStateAction<{ type: string; budget: string; status: string }>>;
  activeTestimonialIdx: number;
  setActiveTestimonialIdx: React.Dispatch<React.SetStateAction<number>>;
  onViewPropertyDetail?: (propertyId: string) => void;
}

export default function Home({ 
  onSetPage, 
  onOpenBooking, 
  onOpenAdvisor, 
  searchFilters, 
  setSearchFilters,
  activeTestimonialIdx,
  setActiveTestimonialIdx,
  onViewPropertyDetail
}: HomeProps) {

  // Hero Carousel State
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=1400&q=80",
      title: "Real Estate Strategy & Land Banking",
      desc: "Acquire pre-vetted, dispute-free lands and premium rental properties across Ibadan's major growth corridors."
    },
    {
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80",
      title: "Premium Graphic Design & Branding Solutions",
      desc: "Transform your company outlook with professional corporate identities, logos, brochures, and exhibition materials."
    },
    {
      image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=1400&q=80",
      title: "High-Grade Express Printing Services",
      desc: "Flawless rendering and prompt delivery of business cards, banners, literature, and corporate stationeries."
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
      title: "Professional Property & Facility Management",
      desc: "Assuring passive income stream for landlords with rigorous vetting, maintenance, and 100% transparent reporting."
    }
  ];

  // Property filtering state
  const [selectedPropertyCat, setSelectedPropertyCat] = useState<"All" | "Residential" | "Commercial" | "Land" | "Rental">("All");

  // Filter properties based on type
  const activeProperties = selectedPropertyCat === "All"
    ? FEATURED_PROPERTIES
    : FEATURED_PROPERTIES.filter(p => p.type === selectedPropertyCat);

  // Active Portfolio mini preview category
  const [miniPortfolioCat, setMiniPortfolioCat] = useState<"All" | "Logo" | "Branding" | "Flyer" | "Banner">("All");
  const filteredMiniPortfolio = miniPortfolioCat === "All"
    ? PORTFOLIO_ITEMS.slice(0, 3)
    : PORTFOLIO_ITEMS.filter(it => it.category === miniPortfolioCat).slice(0, 3);

  // Auto transition hero slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Form submission state
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "Real Estate Consulting",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.fullName && contactForm.phone) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setContactForm({
          fullName: "",
          email: "",
          phone: "",
          service: "Real Estate Consulting",
          message: ""
        });
      }, 4000);
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % CUSTOMER_TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + CUSTOMER_TESTIMONIALS.length) % CUSTOMER_TESTIMONIALS.length);
  };

  return (
    <div className="animate-in fade-in duration-300 font-sans">
      
      {/* 1. HERO SECTION WITH ROTATING VISUALS */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#071324] text-white overflow-hidden py-20 sm:py-28" id="hero-sec">
        {/* Background Visual Fade */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroSlides[activeHeroIdx].image} 
            alt={heroSlides[activeHeroIdx].title} 
            className="w-full h-full object-cover opacity-20 transition-all duration-1000 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/80 to-[#071324]/90" />
        </div>

        <div className="absolute top-1/2 left-4 z-20 -translate-y-1/2 hidden md:flex flex-col gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveHeroIdx(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                activeHeroIdx === idx ? "w-8 bg-[#D4AF37]" : "w-2.5 bg-white/30 hover:bg-white/60"
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative Frame */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/40 py-1.5 px-3.5 rounded-full">
                <Sparkles className="h-4 w-4 text-[#D4AF37] shrink-0 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono text-gray-200 tracking-wider uppercase font-semibold">
                  Multi-Service Corporate Excellence • Ibadan, Nigeria
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                Your Trusted Partner for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F1D26E]">Real Estate, Branding</span> & Business Solutions
              </h1>

              <p className="text-xs sm:text-base text-gray-300 max-w-2xl font-light leading-relaxed">
                Geopenny Global Concept delivers professional real estate services, property management solutions, graphic design, printing, and business support services tailored to individuals, businesses, and investors across Nigeria.
              </p>

              {/* Slider Meta feedback */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl max-w-xl flex items-start gap-3 backdrop-blur-sm">
                <CheckCircle2 className="h-5 w-5 text-[#00A86B] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#D4AF37] font-mono uppercase tracking-wide">Currently Showcasing:</h4>
                  <p className="text-xs text-white font-medium mt-0.5">{heroSlides[activeHeroIdx].title}</p>
                  <p className="text-[11px] text-gray-300 font-light mt-0.5">{heroSlides[activeHeroIdx].desc}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  onClick={() => onSetPage("services")}
                  className="px-6 py-3.5 bg-[#D4AF37] hover:bg-white text-slate-950 font-bold text-xs tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/25 font-mono uppercase"
                >
                  Explore Our Services
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onOpenBooking("General Consultation Booking")}
                  className="px-6 py-3.5 bg-[#0B1F3A] hover:bg-slate-900 border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-xs tracking-widest rounded-xl transition-all cursor-pointer font-mono uppercase"
                >
                  Book Consultation
                </button>
              </div>
            </div>

            {/* Right Interactive Counter Indicator Map Desk */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl backdrop-blur-md hidden lg:block">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] font-semibold block">Live Security clearance</span>
              <h3 className="font-serif text-lg font-bold text-white">Verified Ibadan Topography</h3>
              <p className="text-xs text-gray-400 font-light">Every land or rental unit allocated via Geopenny registers directly under state regularizations.</p>
              
              <div className="space-y-3.5 pt-2">
                <div className="flex gap-3 items-center text-xs text-gray-300">
                  <div className="h-7 w-7 bg-emerald-500/10 border border-emerald-500/20 text-[#00A86B] rounded-lg flex items-center justify-center font-bold">✓</div>
                  <span>100% dispute-free guarantee.</span>
                </div>
                <div className="flex gap-3 items-center text-xs text-gray-300">
                  <div className="h-7 w-7 bg-emerald-500/10 border border-emerald-500/20 text-[#00A86B] rounded-lg flex items-center justify-center font-bold">✓</div>
                  <span>Expert visual designers on site.</span>
                </div>
                <div className="flex gap-3 items-center text-xs text-gray-300">
                  <div className="h-7 w-7 bg-emerald-500/10 border border-emerald-500/20 text-[#00A86B] rounded-lg flex items-center justify-center font-bold">✓</div>
                  <span>Gold foil heavy print stationeries.</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <button 
                  onClick={onOpenAdvisor}
                  className="w-full py-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] rounded-xl text-xs font-mono font-bold uppercase border border-[#D4AF37]/40 tracking-wider flex items-center justify-center gap-2"
                >
                  Consult Geopenny AI Partner
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. COMPANY OVERVIEW SECTION */}
      <section className="py-16 md:py-24 bg-white text-left overflow-hidden" id="about-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Imagery panel */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#D4AF37]/30 to-transparent rounded-3xl -rotate-2" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 aspect-square sm:aspect-video lg:aspect-square bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80" 
                  alt="Geopenny Ibadan Corporate Office" 
                  className="w-full h-full object-cover opacity-85 hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#0B1F3A] border border-[#D4AF37]/30 p-5 rounded-2xl text-white shadow-xl hidden sm:block max-w-[200px]">
                <span className="text-3xl font-extrabold text-[#D4AF37] block font-mono">100%</span>
                <span className="text-[10px] text-gray-300 uppercase tracking-wide block font-mono mt-1">Satisfaction & Delivery Record</span>
              </div>
            </div>

            {/* Content panel */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block font-mono">
                Corporate Foundations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                Excellence Across Multiple Industries
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                Geopenny Global Concept is a dynamic service company providing comprehensive real estate solutions alongside professional graphic design, printing, and general merchandise services. Our mission is to simplify property transactions, strengthen brands, and provide exceptional customer experiences through innovative and reliable service delivery.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-150 text-left">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#0B1F3A] flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#00A86B]" /> Our Core Vision
                  </h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed pl-4">
                    To be the leading one-stop hub for corporate graphics, rapid printing, secure property consulting, and reliable supplies in Oyo State.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#0B1F3A] flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Core Philosophy
                  </h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed pl-4">
                    Strict adherence to transparency, high aesthetic precision, and reliable timelines in both land deed issuances and printing jobs.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSetPage("about")}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] hover:text-[#D4AF37] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Explore Our Values & History
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES GRID Display */}
      <section className="py-16 md:py-24 bg-[#F7F9FC] text-left" id="our-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block font-mono">
              Value Divisions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight mt-1">
              Diverse Service Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed mt-2.5">
              We merge the legal meticulousness of land advisory with the creative ingenuity of visual branding. Click any card below to secure expert sessions.
            </p>
          </div>

          {/* Grid of the 6 core business segments of Geopenny */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_SERVICES.map((serv) => {
              return (
                <div 
                  key={serv.id}
                  className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Unique Icon Box */}
                    <div className="h-12 w-12 bg-[#0B1F3A]/5 border border-slate-200 text-[#D4AF37] rounded-xl flex items-center justify-center">
                      {serv.iconName === "Landmark" && <Building className="h-6 w-6" />}
                      {serv.iconName === "ShieldCheck" && <ShieldCheck className="h-6 w-6" />}
                      {serv.iconName === "TrendingUp" && <TrendingUp className="h-6 w-6" />}
                      {serv.iconName === "Sparkles" && <Palette className="h-6 w-6" />}
                      {serv.iconName === "FileText" && <Printer className="h-6 w-6" />}
                      {serv.iconName === "Briefcase" && <Briefcase className="h-6 w-6" />}
                    </div>

                    <div className="space-y-1.5 text-left">
                      <span className="text-[9px] font-mono tracking-wider font-bold text-gray-400 uppercase">{serv.category}</span>
                      <h3 className="font-serif text-lg font-bold text-[#0B1F3A] leading-tight">{serv.title}</h3>
                      <p className="text-xs text-gray-600 font-light leading-relaxed">{serv.shortDescription}</p>
                    </div>

                    {/* Features checklist inside service card */}
                    <ul className="space-y-2 pt-2 border-t border-gray-100 text-[11px] text-gray-500 font-sans text-left">
                      {serv.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 font-light">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#00A86B] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100">
                    <button
                      onClick={() => onOpenBooking(`Consultation: ${serv.title}`)}
                      className="w-full py-2.5 bg-[#0B1F3A] hover:bg-slate-900 text-white font-semibold text-xs rounded-xl tracking-wider uppercase font-mono transition-colors cursor-pointer"
                    >
                      Instant Inquiry
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE GEOPENNY */}
      <section className="py-16 md:py-24 bg-white text-left" id="why-geopenny">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left pitch col */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block font-mono">Our Edge</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">Why Clients Choose Geopenny</h2>
              <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                We combine technical business reliability, high corporate integrity, and premium output delivery. No multiple agency loops — just professional answers.
              </p>
              
              <div className="pt-3">
                <button
                  onClick={() => onOpenBooking("Property Acquisition Consultation")}
                  className="px-5 py-3 bg-[#0B1F3A] hover:bg-[#D4AF37] hover:text-[#0B1F3A] text-white text-xs font-bold uppercase font-mono rounded-xl tracking-wider transition-all cursor-pointer"
                >
                  Partner With Us Today
                </button>
              </div>
            </div>

            {/* Right grid col */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="p-5 border border-gray-200 rounded-2xl bg-slate-50 space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#0B1F3A]">Trusted Expertise</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">Experienced multi-field professionals prioritizing top tier quality executions on design parameters, supply orders and land layout validations.</p>
              </div>

              <div className="p-5 border border-gray-200 rounded-2xl bg-slate-50 space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#0B1F3A]">Customer-Focused Approach</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">Whether seeking short-let leasing options, land, custom rollup banners or supply procurement, we cater to your individual budget.</p>
              </div>

              <div className="p-5 border border-gray-200 rounded-2xl bg-slate-50 space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#0B1F3A]">Reliable Service Delivery</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">No broken schedules. We deliver design flyers, custom corporate templates and real estate documentation inside the exact agreed timelines.</p>
              </div>

              <div className="p-5 border border-gray-200 rounded-2xl bg-slate-50 space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#0B1F3A]">Multiple Services, One Roof</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">Complete convenience. Manage your property acquisitions, print corporate identity cards, and order office merchandise in one unified contract.</p>
              </div>

              <div className="p-5 border border-gray-200 rounded-2xl bg-slate-50 space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#0B1F3A]">Transparent Transactions</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">Absolute honesty. We offer clear pricing structures with zero hidden land-grabbing fees, regular progress digests and legal vetting access.</p>
              </div>

              <div className="p-5 border border-gray-200 rounded-2xl bg-slate-50 space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#0B1F3A]">Proven Local Market Knowledge</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">In-depth familiarity of Ibadan markets: Akobo, Bodija, Ring Road, Samonda, and Moniya rail transport hubs, directing safe investments.</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. FEATURED PROPERTIES SHOWCASE */}
      <section className="py-16 md:py-24 bg-[#F7F9FC] text-left" id="featured-properties">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block font-mono">Premium Listings</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mt-1">Our Featured Properties</h2>
              <p className="text-xs text-gray-500 font-light leading-relaxed mt-1">
                Explore fully checked residential, commercial and land listings. Verified titles and dispute-free.
              </p>
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {(["All", "Residential", "Commercial", "Land", "Rental"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedPropertyCat(cat)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer border ${
                    selectedPropertyCat === cat
                      ? "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]"
                  }`}
                >
                  {cat === "All" ? "All types" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeProperties.map((p) => {
              return (
                <div 
                  key={p.id}
                  className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300"
                >
                  <div>
                    {/* Image frame */}
                    <div 
                      onClick={() => onViewPropertyDetail?.(p.id)}
                      className="relative h-48 bg-slate-900 overflow-hidden cursor-pointer group"
                    >
                      <img 
                        src={p.imageUrl} 
                        alt={p.name} 
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-[#0B1F3A] border border-[#D4AF37]/50 px-2.5 py-0.5 text-[9px] font-mono font-bold text-[#D4AF37] tracking-widest uppercase rounded">
                        {p.type}
                      </span>
                      <span className={`absolute top-3 right-3 px-2 py-0.5 text-white text-[9px] font-extrabold uppercase rounded shadow ${
                        p.status === "Selling" || p.status === "Hot Deal" ? "bg-[#00A86B]" : "bg-[#D4AF37] text-slate-950"
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    {/* Content text */}
                    <div className="p-5 text-left space-y-3">
                      <div className="cursor-pointer group/title" onClick={() => onViewPropertyDetail?.(p.id)}>
                        <h3 className="font-serif font-bold text-[#0B1F3A] group-hover/title:text-[#D4AF37] transition-colors leading-snug text-base line-clamp-1">
                          {p.name}
                        </h3>
                        <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5 mt-0.5 font-light">
                          <MapPin className="h-3 w-3 text-[#D4AF37]" /> {p.location}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-2">
                        {p.description}
                      </p>

                      <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-[9px] text-gray-400 uppercase font-mono">Pricing Sheet</span>
                        <span className="text-xs font-bold text-[#D4AF37] font-mono bg-[#0B1F3A]/5 px-2 py-0.5 rounded border border-[#D4AF37]/15">
                          {p.priceString.split("per")[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onViewPropertyDetail?.(p.id)}
                      className="py-2.5 bg-slate-50 border border-slate-200 hover:border-[#D4AF37] text-slate-700 hover:text-slate-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center text-[10px] uppercase font-mono font-bold tracking-wider"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => onOpenBooking(p.name, String(p.price))}
                      className="py-2.5 bg-[#D4AF37] text-slate-950 text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer text-center text-[10px] font-mono tracking-wider shadow-sm"
                    >
                      Allocate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-10 text-center">
            <button
              onClick={() => onSetPage("projects")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3A] hover:bg-[#D4AF37] text-white hover:text-slate-950 font-bold text-xs uppercase tracking-widest font-mono rounded-xl transition-all shadow cursor-pointer"
            >
              View All Properties
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. PROPERTY MANAGEMENT SOLUTIONS & WORKFLOW */}
      <section className="py-16 md:py-24 bg-white text-left" id="property-management-sec">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block font-mono">Custodian Excellence</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] leading-tight tracking-tight">
                Complete Property & Facility Management
              </h2>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                We remove the administrative stress from landlords. From renting and maintenance schedules to legal vetting, Geopenny manages your assets in Oyo State to safeguard continuous passive cash streams.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B1F3A]">Landlord Legal Protection</h4>
                    <p className="text-xs text-gray-500 font-light mt-0.5">Custom watertight lease papers drafted by legal partners to prevent default litigation.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B1F3A]">Screened Occupancy Only</h4>
                    <p className="text-xs text-gray-500 font-light mt-0.5">Rigorous identity checking, employment verification logs, and background checks.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B1F3A]">Facility Maintenance Coordination</h4>
                    <p className="text-xs text-gray-500 font-light mt-0.5">On-demand rapid electrical and structural repair technicians to protect structural lifespans.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenBooking("Property Management Management Enrollment")}
                  className="px-5 py-3.5 bg-[#0B1F3A] text-white hover:bg-[#D4AF37] hover:text-slate-950 font-bold text-xs uppercase font-mono tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Register My Property
                </button>
              </div>
            </div>

            {/* Right: Visual management Workflow Diagram */}
            <div className="lg:col-span-7 bg-slate-50 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-lg font-bold text-[#0B1F3A] border-b border-gray-150 pb-3 block">
                Occupancy Administration Workflow
              </h3>

              <div className="space-y-6 relative before:absolute before:left-4.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                
                {/* Step 1 */}
                <div className="flex gap-4 relative z-10 shrink-0">
                  <div className="h-9 w-9 bg-[#0B1F3A] text-white rounded-full flex items-center justify-center font-bold text-xs border-4 border-white shadow-md">1</div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-[#0B1F3A]">Asset Inspection & Vetting</h4>
                    <p className="text-[11px] text-gray-500 font-light mt-0.5">Detailed cataloging of structural state, utilities and valuation mapping prior to boarding.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 relative z-10 shrink-0">
                  <div className="h-9 w-9 bg-[#D4AF37] text-slate-950 rounded-full flex items-center justify-center font-bold text-xs border-4 border-white shadow-md">2</div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-[#0B1F3A]">Marketing & Tenant Screening</h4>
                    <p className="text-[11px] text-gray-500 font-light mt-0.5">Showcase on verified lists, screen credit and background records to isolate reliable tenants.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 relative z-10 shrink-0">
                  <div className="h-9 w-9 bg-[#0B1F3A] text-white rounded-full flex items-center justify-center font-bold text-xs border-4 border-white shadow-md">3</div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-[#0B1F3A]">Deed Signing & Rent Escrow</h4>
                    <p className="text-[11px] text-gray-500 font-light mt-0.5">Establish physical and digital contracts, and secure the advance rentals in reliable custody accounts.</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4 relative z-10 shrink-0">
                  <div className="h-9 w-9 bg-[#00A86B] text-white rounded-full flex items-center justify-center font-bold text-xs border-4 border-white shadow-md">4</div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-[#0B1F3A]">Continuous Administration</h4>
                    <p className="text-[11px] text-gray-500 font-light mt-0.5">Process maintenance requests, legal oversight and provide frequent statements to the landlord.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. MINI DESIGN & PRINT PORTFOLIO GALLERY */}
      <section className="py-16 md:py-24 bg-[#F7F9FC] text-left" id="mini-portfolio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block font-mono">Creative Wing</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mt-1">Branding & Printing Showcase</h2>
              <p className="text-xs text-gray-500 font-light leading-relaxed mt-1">
                A brief preview of corporate identities, logos, brochures, and catalogs crafted for companies in Ibadan and around Nigeria.
              </p>
            </div>

            {/* Portfolio quick filter toggle */}
            <div className="flex flex-wrap gap-2">
              {(["All", "Logo", "Branding", "Flyer", "Banner"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setMiniPortfolioCat(cat)}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                    miniPortfolioCat === cat
                      ? "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Render Preview Grids */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredMiniPortfolio.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#0B1F3A] text-[#D4AF37] text-[8px] font-mono uppercase font-bold rounded">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 text-left">
                  <span className="text-[9px] text-gray-400 font-mono">CLIENT: {item.client}</span>
                  <h4 className="font-serif font-bold text-[#0B1F3A] text-sm mt-0.5">{item.title}</h4>
                  <p className="text-[11px] text-gray-500 font-light mt-1.5 line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-10 text-center">
            <button
              onClick={() => onSetPage("portfolio")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3A] hover:bg-[#D4AF37] text-white hover:text-slate-950 font-bold text-xs uppercase tracking-widest font-mono rounded-xl transition-all shadow cursor-pointer animate-pulse"
            >
              View Full Portfolio
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 8. CLIENT TESTIMONIALS CAROUSEL */}
      <section className="py-16 md:py-24 bg-white text-left" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block font-mono">Endorsements</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mt-1">
              Client Testimonials
            </h2>
            <p className="text-xs text-gray-500 font-light mt-1">
              Read real feedback from property buyers, landlords, creative clients, and merchants who trust Geopenny.
            </p>
          </div>

          {/* Testimonial Active Display Card */}
          <div className="bg-slate-50 border border-gray-200 rounded-3xl p-6 sm:p-10 relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute top-6 right-8 text-slate-200 pointer-events-none">
              <Quote className="h-20 w-20 opacity-30" />
            </div>

            <div className="space-y-6 relative z-10 text-left">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(CUSTOMER_TESTIMONIALS[activeTestimonialIdx].rating)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-sm sm:text-lg text-slate-700 italic font-medium leading-relaxed">
                "{CUSTOMER_TESTIMONIALS[activeTestimonialIdx].text}"
              </p>

              {/* Client Profile */}
              <div className="flex items-center gap-3 pt-2">
                <div className={`h-11 w-11 rounded-full ${CUSTOMER_TESTIMONIALS[activeTestimonialIdx].avatarColor} flex items-center justify-center text-xs font-bold`}>
                  {CUSTOMER_TESTIMONIALS[activeTestimonialIdx].name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B1F3A]">{CUSTOMER_TESTIMONIALS[activeTestimonialIdx].name}</h4>
                  <span className="text-[10px] text-gray-500 block font-light">
                    {CUSTOMER_TESTIMONIALS[activeTestimonialIdx].role} • {CUSTOMER_TESTIMONIALS[activeTestimonialIdx].company}
                  </span>
                  <span className="bg-[#D4AF37]/10 text-slate-755 border border-[#D4AF37]/30 text-[9px] font-mono px-2 py-0.5 rounded uppercase mt-1 inline-block">
                    {CUSTOMER_TESTIMONIALS[activeTestimonialIdx].type || "Verified Client"}
                  </span>
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex gap-2 pt-4 justify-end border-t border-gray-200">
                <button
                  onClick={prevTestimonial}
                  className="h-9 w-9 bg-white border border-gray-200 rounded-full hover:border-[#D4AF37] hover:text-[#0B1F3A] flex items-center justify-center transition-all cursor-pointer"
                  title="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="h-9 w-9 bg-white border border-gray-200 rounded-full hover:border-[#D4AF37] hover:text-[#0B1F3A] flex items-center justify-center transition-all cursor-pointer"
                  title="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. BUSINESS IMPACT SECTION / NUMERIC STATS */}
      <section className="py-16 bg-[#0B1F3A] text-white relative overflow-hidden" id="business-stats">
        <div className="absolute inset-0 bg-[#0B1F3A]/95" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            
            <div className="space-y-1">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#D4AF37] block font-mono">150+</span>
              <span className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-widest font-mono block">Premium Plots Managed</span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#D4AF37] block font-mono">420+</span>
              <span className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-widest font-mono block">Successful Transactions</span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#D4AF37] block font-mono">1,800+</span>
              <span className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-widest font-mono block">Design Projects Completed</span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#D4AF37] block font-mono">15,000+</span>
              <span className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-widest font-mono block">Printing Orders Delivered</span>
            </div>

            <div className="space-y-1 col-span-2 md:col-span-1">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#00A86B] block font-mono">100%</span>
              <span className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-widest font-mono block">Client Satisfaction Rate</span>
            </div>

          </div>
        </div>
      </section>

      {/* 10. CALL TO ACTION SECTION */}
      <section className="py-16 md:py-20 bg-white" id="cta-achieve">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0B1F3A] to-[#040e1b] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl mx-auto space-y-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] font-semibold block">Create Future Value</span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">Let's Help You Achieve Your Goals</h2>
              <p className="text-xs sm:text-base text-gray-300 font-light leading-relaxed">
                Whether you're buying premium land, registering assets, looking to audit local tenancy, building a professional corporate layout, or seeking customization supplies, Geopenny has the experience to deliver.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-center">
                <button
                  onClick={() => onOpenBooking(`Custom Strategy Session request`)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#D4AF37] hover:bg-white text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                >
                  Request Consultation
                </button>
                <button
                  onClick={() => onSetPage("contact")}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest border border-white/10 rounded-xl transition-all cursor-pointer"
                >
                  Contact Us Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. CONTACT SECTION WITH FORM & MAPS & WHATSAPP */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-gray-200 text-left" id="contact-sec">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Address Details & Meta */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block font-mono font-bold">Office Head Office</span>
              <h2 className="font-serif text-3xl font-extrabold text-[#0B1F3A] tracking-tight">Geopenny Headquarters</h2>
              
              <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                We believe in physical transparency. Visit our physical center or leverage direct secure channels for all payments. Our staff handles diaspora verification processes directly.
              </p>

              <div className="space-y-4 text-xs">
                
                {/* Contact Box 1 */}
                <div className="p-4 bg-white border border-gray-200 rounded-2xl flex items-start gap-3.5 shadow-sm">
                  <MapPin className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#0B1F3A]">Office Address</h4>
                    <p className="text-gray-500 font-light leading-relaxed mt-0.5">Ibadan, Oyo State, Nigeria.</p>
                  </div>
                </div>

                {/* Contact Box 2 */}
                <div className="p-4 bg-white border border-gray-200 rounded-2xl flex items-start gap-3.5 shadow-sm">
                  <Phone className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#0B1F3A]">Hotline Support Lines</h4>
                    <p className="text-gray-500 font-light leading-relaxed mt-0.5">+234 81 2987 6543, +234 80 3123 4567</p>
                  </div>
                </div>

                {/* Contact Box 3 */}
                <div className="p-4 bg-white border border-gray-200 rounded-2xl flex items-start gap-3.5 shadow-sm">
                  <Clock className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#0B1F3A]">Business Hours</h4>
                    <p className="text-gray-500 font-light leading-relaxed mt-0.5">Mon – Friday: 9:00 AM – 5:00 PM (Oyo Time)</p>
                  </div>
                </div>

              </div>

              {/* WhatsApp Integration button */}
              <div className="pt-2 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Instant WhatsApp Desk
                </h4>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed mt-1">
                  Connect instantly with our managing partner desk for inquiries about site surveys, pricing sheets, or brand designs.
                </p>
                <a 
                  href="https://wa.me/2348129876543?text=Hello%20Geopenny%20Global%20Concept%2C%20I%20am%20inquiring%20about%20your%20services." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-[#00A86B] font-mono uppercase bg-white border border-emerald-300 hover:border-emerald-500 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Chat with Partner desk
                  <Phone className="h-3 w-3 inline" />
                </a>
              </div>

            </div>

            {/* Live Contact Form Panel */}
            <div className="lg:col-span-7 bg-white border border-gray-200 p-6 sm:p-8 rounded-3xl shadow-sm text-left">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-semibold uppercase block">Communications Desk</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1F3A]">Submit Consultation Form</h3>
              <p className="text-xs text-gray-400 font-light mt-0.5 leading-normal">Our team replies within 12 business hours. Leave your project specifications below.</p>

              {isSubmitted ? (
                <div className="mt-6 bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex flex-col items-center text-center space-y-2 animate-in fade-in duration-300">
                  <CheckCircle2 className="h-10 w-10 text-[#00A86B]" />
                  <h4 className="font-bold text-emerald-950 font-serif text-lg">Message Logged Successfully</h4>
                  <p className="text-xs text-gray-600 max-w-sm">
                    Thank you, {contactForm.fullName}! Our designated officer in charge has secured your lead profile. A Geopenny consultant will call you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 pt-6 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-gray-700 font-semibold block">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Kolawole Alao"
                        value={contactForm.fullName}
                        onChange={(e) => setContactForm(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full h-10 border border-gray-200 rounded-lg px-3 focus:outline-none focus:border-[#D4AF37] outline-none text-gray-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-gray-700 font-semibold block">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g. +234 81 2345 6789"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full h-10 border border-gray-200 rounded-lg px-3 focus:outline-none focus:border-[#D4AF37] outline-none text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-gray-700 font-semibold block">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="yourname@gmail.com (Optional)"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full h-10 border border-gray-200 rounded-lg px-3 focus:outline-none focus:border-[#D4AF37] outline-none text-gray-800"
                      />
                    </div>
                    
                    <div className="space-y-1.5 flex-col">
                      <label className="text-gray-700 font-semibold block">Requested Service Required</label>
                      <select 
                        value={contactForm.service}
                        onChange={(e) => setContactForm(prev => ({ ...prev, service: e.target.value }))}
                        className="w-full h-10 border border-gray-200 bg-white rounded-lg px-3 focus:outline-none focus:border-[#D4AF37] outline-none text-gray-800"
                      >
                        <option value="Real Estate Services">Real Estate Sales & Letting</option>
                        <option value="Property Management">Property Management Solutions</option>
                        <option value="Real Estate Consulting">Real Estate Advisory Consultation</option>
                        <option value="Graphic Design">Graphic Design & Logo Branding</option>
                        <option value="Printing Services">Corporate Stations & Banner Printing</option>
                        <option value="General Merchandise">Corporate Merchandise Sourcing</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-700 font-semibold block">Design Details or Property Budget</label>
                    <textarea 
                      rows={4}
                      placeholder="Please explicitly state your desired property location, brand colors, print specifications or bulk procurement demands..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#D4AF37] outline-none text-gray-800 leading-normal"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0B1F3A] hover:bg-[#D4AF37] hover:text-[#0B1F3A] font-bold text-xs uppercase tracking-widest text-white rounded-xl transition-all font-mono cursor-pointer"
                  >
                    Submit Secure Query
                  </button>

                </form>
              )}

              {/* Inline Static map preview simulation */}
              <div className="mt-8 border border-gray-200 rounded-2xl bg-slate-50 p-4">
                <h4 className="font-mono text-[9px] font-bold uppercase text-[#D4AF37] tracking-wider mb-2">Google Map Locator</h4>
                <div className="h-44 bg-slate-200 border border-gray-200 rounded-xl relative overflow-hidden text-center flex flex-col items-center justify-center">
                  <div className="absolute inset-0 opacity-15">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="road-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                          <circle cx="15" cy="15" r="3" fill="#D4AF37" />
                          <line x1="0" y1="15" x2="30" y2="15" stroke="black" strokeWidth="0.5" />
                          <line x1="15" y1="0" x2="15" y2="30" stroke="black" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#road-grid)" />
                    </svg>
                  </div>
                  <MapPin className="h-6 w-6 text-[#0B1F3A] animate-bounce mb-1 relative z-10" />
                  <span className="text-[10px] font-bold text-[#0B1F3A] z-10 block font-mono">IBADAN, OYO STATE, NIGERIA</span>
                  <span className="text-[9px] text-gray-400 z-10 block leading-none">Ring Road Expressway / Bodija Corridors Mapping</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
