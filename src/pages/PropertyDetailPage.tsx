import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  Check, 
  Sparkles, 
  Layers, 
  Coins, 
  Clock, 
  CalendarRange, 
  ShieldCheck, 
  TrendingUp, 
  Compass, 
  Info,
  ChevronDown,
  Eye,
  Building2,
  ArrowRight,
  Phone
} from "lucide-react";
import { PropertyListing } from "../types";
import { FEATURED_PROPERTIES } from "../data";

interface PropertyDetailPageProps {
  propertyId: string;
  onSetPage: (page: string) => void;
  onOpenBooking: (propertyName?: string, budgetVal?: string) => void;
  onSelectProperty: (id: string) => void;
}

export default function PropertyDetailPage({ 
  propertyId, 
  onSetPage, 
  onOpenBooking,
  onSelectProperty 
}: PropertyDetailPageProps) {
  const [calcDeposit, setCalcDeposit] = useState(30); // % deposit
  const [calcMonths, setCalcMonths] = useState(12);
  const [activeTab, setActiveTab] = useState<"milestones" | "specifications" | "cadastre">("milestones");

  // Retrieve selected property from database
  const property = FEATURED_PROPERTIES.find((p) => p.id === propertyId) || FEATURED_PROPERTIES[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setCalcDeposit(30);
    setCalcMonths(12);
    setActiveTab("milestones");
  }, [propertyId]);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-xl font-serif font-bold text-[#0B1F3A]">Property Entry Not Registered</h2>
        <p className="text-xs text-gray-500 mt-2">The selected property records are offline.</p>
        <button 
          onClick={() => onSetPage("projects")} 
          className="mt-6 px-4 py-2 bg-[#0B1F3A] text-white rounded-lg text-xs font-mono font-bold uppercase cursor-pointer"
        >
          Return to Portfolios
        </button>
      </div>
    );
  }

  // Related Properties logic: fetch other properties of the identical category/type, excluding current
  const relatedProperties = FEATURED_PROPERTIES.filter(
    (p) => p.type === property.type && p.id !== property.id
  );

  // Fallback related properties if there are no other listings in same type
  const recommendationsList = relatedProperties.length > 0 
    ? relatedProperties 
    : FEATURED_PROPERTIES.filter((p) => p.id !== property.id);

  const formattedValue = (val: number) => {
    return "₦" + val.toLocaleString();
  };

  const getDevelopmentMilestones = (id: string) => {
    switch (id) {
      case "green-valley":
        return [
          { segment: "Boundary Survey & Land Vetting", progress: 100, status: "Done" },
          { segment: "Perimeter Gatehouse Fencing", progress: 100, status: "Done" },
          { segment: "Central Layout Grading", progress: 85, status: "Active" },
          { segment: "Individual Plot Beacons allocation", progress: 95, status: "Active" }
        ];
      case "commercial-hub":
        return [
          { segment: "State Right-of-Way Vetting", progress: 100, status: "Done" },
          { segment: "Plot Leveling & Access Parkway", progress: 80, status: "Active" },
          { segment: "High-Voltage Transformer Substation", progress: 40, status: "Active" }
        ];
      case "heritage-court":
        return [
          { segment: "Structural Concrete Framework", progress: 100, status: "Done" },
          { segment: "Premium Smart Wall Plastering", progress: 90, status: "Active" },
          { segment: "Integrated Kitchen & Hob Sinking", progress: 80, status: "Active" }
        ];
      default:
        return [
          { segment: "Deed Assignment Vetting", progress: 100, status: "Done" },
          { segment: "Survey Blueprint Lodgement", progress: 100, status: "Done" },
          { segment: "Physical Allocation beaconing", progress: 60, status: "Active" }
        ];
    }
  };

  const calculateMonthsValue = (totalPrice: number) => {
    const depVal = totalPrice * (calcDeposit / 100);
    const remainder = totalPrice - depVal;
    const monthlyPayout = remainder / calcMonths;
    return {
      depositVal: depVal,
      monthlyVal: monthlyPayout
    };
  };

  const currentMilestones = getDevelopmentMilestones(property.id);

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans pb-24 animate-in fade-in duration-500 text-left">
      
      {/* 1. NAVIGATION NAV ANCHOR */}
      <nav className="bg-slate-50 border-b border-gray-150 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => onSetPage("projects")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B1F3A] hover:text-[#D4AF37] transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 bg-white border border-gray-200 rounded-full p-0.5" />
            Back to Active Portfolios
          </button>
          
          <div className="hidden sm:flex items-center gap-2.5 text-[10px] text-gray-500 font-mono">
            <span>Portfolio Code: GEOP-{property.id.substring(0, 4).toUpperCase()}</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Cleared for Conveyance
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Main Grid: Left details, Right payment card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SIDE: Media Image frame and Tab details */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Elegant Hero Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-150 shadow-lg group">
              <div className="h-[280px] sm:h-[420px] w-full bg-slate-900">
                <img 
                  src={property.imageUrl} 
                  alt={property.name} 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-[6000ms]"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-[#0B1F3A] border border-[#D4AF37]/50 text-[10px] uppercase font-mono tracking-wider font-bold text-[#D4AF37] rounded-md shadow">
                  {property.type}
                </span>
                <span className="px-3 py-1 bg-[#D4AF37] text-slate-950 text-[10px] font-extrabold uppercase rounded-md shadow">
                  {property.status}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-1 drop-shadow">
                  <MapPin className="h-4 w-4 text-[#D4AF37]" />
                  <span>{property.location}</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-4xl font-extrabold drop-shadow tracking-tight">
                  {property.name}
                </h1>
              </div>
            </div>

            {/* General Description */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm text-left">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block font-mono">
                Asset Narrative & Clearances
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                Detailed Property Index
              </h2>
              <p className="text-sm font-sans text-gray-650 leading-relaxed font-light">
                {property.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-slate-50 border border-gray-200 rounded-lg flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B1F3A]">Dispute-Free Registry</h4>
                    <span className="text-[10px] text-gray-500 font-light block leading-relaxed mt-0.5">
                      Fully registered layout surveys and global Certificate of Occupancy checked parameters.
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-slate-50 border border-gray-200 rounded-lg flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B1F3A]">Appreciation Trajectory</h4>
                    <span className="text-[10px] text-gray-500 font-light block leading-relaxed mt-0.5">
                      Positioned exactly within Oyo state expansion corridors with strong commercial demands.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications lists */}
            <div className="bg-slate-50 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block font-mono">Approved specifications</span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B1F3A] mt-0.5">Physical Development Specs</h3>
                <p className="text-xs text-gray-400 mt-1 font-light">
                  Every property has been cleared with the physical engineering guidelines detailed inside local layouts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feat, idx) => (
                  <div key={idx} className="flex gap-3 items-center text-xs text-gray-700 font-light bg-white border border-gray-150 p-3 rounded-xl shadow-sm">
                    <div className="h-5 w-5 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-[#00A86B] shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabbed Milestones or GPS map */}
            <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="flex border-b border-gray-150 bg-slate-50 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("milestones")}
                  className={`flex-grow px-4 py-3 text-xs font-bold uppercase tracking-wider text-center border-r border-gray-150 whitespace-nowrap cursor-pointer ${
                    activeTab === "milestones" ? "bg-white text-[#0B1F3A] border-b-2 border-b-[#D4AF37]" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-[#D4AF37]" />
                    Development Milestones
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("cadastre")}
                  className={`flex-grow px-4 py-3 text-xs font-bold uppercase tracking-wider text-center whitespace-nowrap cursor-pointer ${
                    activeTab === "cadastre" ? "bg-white text-[#0B1F3A] border-b-2 border-b-[#D4AF37]" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Compass className="h-3.5 w-3.5 text-[#D4AF37]" />
                    Cadastre Platting Map
                  </span>
                </button>
              </div>

              <div className="p-6 bg-white">
                {activeTab === "milestones" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <p className="text-xs text-gray-500 font-light">
                      Real-time tracker of clearances, engineering milestones, and physical site construction. Updates audited by Geopenny senior coordinators.
                    </p>
                    <div className="space-y-3.5 bg-slate-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                      {currentMilestones.map((step, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-center text-[10px] leading-none mb-1">
                            <span className="font-sans font-bold text-[#0B1F3A]">{step.segment}</span>
                            <span className="font-mono text-[#D4AF37] font-semibold">{step.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B08D24]" style={{ width: `${step.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "cadastre" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-[#0B1F3A]">GPS Coordinates & Registry Chart</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">Registry Zone Sector B47 / Oyo State Geoinformative Block</p>
                      </div>
                      <span className="bg-[#0B1F3A]/5 border border-[#D4AF37]/35 text-[9px] font-mono text-[#D4AF37] px-2.5 py-1 rounded font-bold">
                        GPS: {property.mapCoordinates.lat}° N, {property.mapCoordinates.lng}° E
                      </span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-white flex flex-col items-center justify-center min-h-[180px] relative overflow-hidden">
                      <div className="absolute inset-0 opacity-15">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id="detail-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#detail-grid)" />
                        </svg>
                      </div>

                      <Compass className="h-8 w-8 text-[#D4AF37] mb-2 z-10 animate-spin" style={{ animationDuration: "12s" }} />
                      <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] z-10 uppercase font-bold">
                        SURVEY CADASTRAL GRID MATRIX
                      </span>

                      <div className="grid grid-cols-4 gap-2 mt-4 w-full max-w-sm z-10">
                        <div className="p-2 border border-white/10 bg-white/5 rounded text-[9px] font-mono">PLOT A-1 - Sold</div>
                        <div className="p-2 border border-[#D4AF37]/50 bg-[#D4AF37]/10 rounded text-[9px] font-mono text-[#D4AF37]">PLOT A-2 - Free</div>
                        <div className="p-2 border border-white/10 bg-white/5 rounded text-[9px] font-mono">PLOT A-3 - Sold</div>
                        <div className="p-2 border border-[#D4AF37]/50 bg-[#D4AF37]/10 rounded text-[9px] font-mono text-[#D4AF37]">PLOT A-4 - Free</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Payment Modulator Card sticky */}
          <div className="lg:col-span-5 sticky top-24 space-y-6 text-left">
            
            <div className="bg-slate-950 text-white border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />
              
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Geopenny Investment Ledger
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">Valuation & Installments</h3>
                <p className="text-xs text-gray-400 font-light mt-0.5 font-sans">Flexible repayment plans tailored for steady capital growth.</p>
              </div>

              {/* Price Outright box */}
              <div className="bg-slate-900 border border-white/5 p-4 rounded-2xl flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-gray-400 uppercase font-mono block">Outright Valuation</span>
                  <span className="text-lg sm:text-xl font-extrabold text-[#D4AF37] block mt-0.5 font-mono">{formattedValue(property.price)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#00A86B] font-mono font-semibold block">C of O Cleared</span>
                  <span className="text-[9px] text-gray-400 block mt-0.5">Includes deed drafting</span>
                </div>
              </div>

              {/* Installments interactive slider */}
              <div className="bg-slate-900/60 border border-white/5 p-4 sm:p-5 rounded-2xl space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-semibold text-gray-300 block uppercase tracking-wide">
                    Installment plan simulator
                  </span>
                  <p className="text-[9px] text-gray-400 leading-normal">
                    Adjust configurations to view outright down payment values and ongoing monthly payouts.
                  </p>
                </div>

                <div className="space-y-4 pt-1">
                  {/* Commited initial Deposit slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-gray-300 uppercase">Commitment deposit</span>
                      <span className="text-[#D4AF37] font-bold">{calcDeposit}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="80" 
                      step="10"
                      value={calcDeposit} 
                      onChange={(e) => setCalcDeposit(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                  </div>

                  {/* Holding duration dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-300 font-mono uppercase block">payout period limits</label>
                    <div className="relative">
                      <select 
                        value={calcMonths} 
                        onChange={(e) => setCalcMonths(Number(e.target.value))}
                        className="w-full h-10 bg-slate-950 border border-white/10 rounded-xl px-3 text-xs text-white uppercase font-bold outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                      >
                        <option value={3}>3 Months Quick-Plan</option>
                        <option value={6}>6 Months Installments</option>
                        <option value={12}>12 Months Installments</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Simulated payment breakdown */}
                <div className="flex justify-between items-center pt-3 border-t border-white/5 text-xs text-left">
                  <div>
                    <span className="text-[9px] text-gray-400 block font-mono uppercase">Down payment</span>
                    <span className="font-bold text-white text-sm mt-0.5 block font-mono">{formattedValue(calculateMonthsValue(property.price).depositVal)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-[#D4AF37] block font-mono uppercase">Subsequent Monthly</span>
                    <span className="font-bold text-[#D4AF37] text-sm mt-0.5 block font-mono">{formattedValue(calculateMonthsValue(property.price).monthlyVal)} <span className="text-[9px] font-normal">/ mo</span></span>
                  </div>
                </div>
              </div>

              {/* Action secure reservation buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => onOpenBooking(`${property.name} (${calcDeposit}% Down Installments)`, String(property.price))}
                  className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B08D24] text-slate-950 hover:bg-white transition-all font-bold text-xs uppercase tracking-widest rounded-xl text-center shadow-lg cursor-pointer"
                >
                  Secure Plot on installment
                </button>
                <button
                  onClick={() => onOpenBooking(`${property.name} (Outright purchase)`, String(property.price))}
                  className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase border border-white/10 rounded-xl transition-all cursor-pointer text-center"
                >
                  Outright Cash reservation
                </button>
              </div>

              <p className="text-[9px] text-gray-400 leading-normal text-center pt-1 font-light">
                Prices are fully pre-vetted by our physical planning desk. Complete Deed papers are issued within 14 business days of cleared starting book deposit.
              </p>
            </div>

            {/* Verification Card */}
            <div className="bg-[#0B1F3A]/5 border border-dashed border-[#D4AF37] p-5 sm:p-6 rounded-3xl space-y-3.5">
              <span className="text-[9px] font-mono font-bold text-[#D4AF37] uppercase tracking-wide block font-semibold">Offline Verification</span>
              <h4 className="font-serif text-sm font-bold text-[#0B1F3A]">Physical site inspection booking</h4>
              <p className="text-xs text-gray-650 font-light leading-relaxed">
                Connect directly with our coordinating officer to book inspection schedules for this property.
              </p>
              
              <div className="pt-1 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onOpenBooking(`Site Inspection - ${property.name}`)}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#0B1F3A] hover:text-[#D4AF37] transition-all cursor-pointer uppercase font-mono border border-gray-300 bg-white px-3 py-2 rounded-xl"
                >
                  Book site tour
                  <CalendarRange className="h-4 w-4" />
                </button>

                <a 
                  href={`https://wa.me/2348129876543?text=Hello%20Geopenny%2C%20I%20am%20interested%20in%20inspecting%20the%20property%3A%20${encodeURIComponent(property.name)}.`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#00A86B] font-mono uppercase bg-emerald-50 border border-emerald-300 hover:border-emerald-500 px-3 py-2 rounded-xl transition-colors"
                >
                  WhatsApp Agent
                  <Phone className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: VIEWERS ALSO CHECKED OUT THESE PROPERTIES */}
        <section className="mt-20 border-t border-gray-200 pt-16">
          <div className="text-left max-w-xl mb-10 space-y-2">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-[#D4AF37]" /> Related Investment Portfolios
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
              Viewers Also Checked Out
            </h2>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              We recommend matching {property.type} development catalogs backed by similar asset appreciations and title structures under Geopenny.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendationsList.map((rec) => (
              <div 
                key={rec.id}
                onClick={() => onSelectProperty(rec.id)}
                className="group bg-white border border-gray-150 p-4 rounded-3xl hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left cursor-pointer"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-44 sm:h-48 bg-slate-900 rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={rec.imageUrl} 
                      alt={rec.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#0B1F3A] border border-[#D4AF37]/50 text-[9px] uppercase font-mono text-[#D4AF37] rounded">
                      {rec.type}
                    </span>
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-[#00A86B] text-white text-[9px] font-bold uppercase rounded">
                      {rec.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#0B1F3A] group-hover:text-[#D4AF37] transition-all line-clamp-1">{rec.name}</h3>
                      <span className="text-[9px] text-gray-400 font-mono mt-0.5 block leading-none">{rec.location}</span>
                    </div>
                    <span className="text-xs font-bold text-[#D4AF37] font-mono whitespace-nowrap bg-[#0B1F3A]/5 border border-[#D4AF37]/20 px-2 py-0.5 rounded leading-none flex items-center h-fit">
                      {rec.priceString.split("per")[0]}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed font-light mt-2.5 line-clamp-2">
                    {rec.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="text-[10px] font-mono font-semibold flex items-center gap-1 font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Vetted Paperwork
                  </span>
                  <span className="font-bold text-[#0B1F3A] group-hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1 font-mono uppercase text-[10px]">
                    Detailed page <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
