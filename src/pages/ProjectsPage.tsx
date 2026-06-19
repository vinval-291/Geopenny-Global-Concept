import React, { useState, useEffect } from "react";
import { 
  Building2, 
  MapPin, 
  Tag, 
  Search, 
  Filter, 
  Info, 
  Activity, 
  ShieldCheck, 
  DollarSign, 
  CalendarRange, 
  Compass, 
  Check, 
  X,
  ChevronDown,
  Clock,
  Sparkles,
  Layers
} from "lucide-react";
import { PropertyListing } from "../types";
import { FEATURED_PROPERTIES } from "../data";

interface ProjectsPageProps {
  onOpenBooking: (propertyName?: string, budgetVal?: string) => void;
  initialTypeFilter?: string;
  initialBudgetFilter?: string;
  onViewPropertyDetail?: (propertyId: string) => void;
}

export default function ProjectsPage({ 
  onOpenBooking, 
  initialTypeFilter = "", 
  initialBudgetFilter = "",
  onViewPropertyDetail
}: ProjectsPageProps) {
  
  const [selectedType, setSelectedType] = useState(initialTypeFilter);
  const [selectedBudget, setSelectedBudget] = useState(initialBudgetFilter);
  const [selectedCorridor, setSelectedCorridor] = useState("");
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState<PropertyListing | null>(null);

  // Installment calculator states
  const [calcDeposit, setCalcDeposit] = useState(30); // % deposit
  const [calcMonths, setCalcMonths] = useState(12);

  useEffect(() => {
    if (initialTypeFilter) setSelectedType(initialTypeFilter);
    if (initialBudgetFilter) setSelectedBudget(initialBudgetFilter);
  }, [initialTypeFilter, initialBudgetFilter]);

  const filterProperties = () => {
    return FEATURED_PROPERTIES.filter((p) => {
      // 1. Sector Type filter
      if (selectedType && p.type !== selectedType) return false;

      // 2. Location Corridor filter
      if (selectedCorridor) {
        const locLower = p.location.toLowerCase();
        if (selectedCorridor === "akobo" && !locLower.includes("akobo")) return false;
        if (selectedCorridor === "bodija" && !locLower.includes("bodija")) return false;
        if (selectedCorridor === "ring" && !locLower.includes("akala") && !locLower.includes("ring")) return false;
        if (selectedCorridor === "moniya" && !locLower.includes("moniya")) return false;
      }

      // 3. Price Filter
      if (selectedBudget) {
        if (selectedBudget === "under15m" && p.price >= 15000000) return false;
        if (selectedBudget === "15m-40m" && (p.price < 15000000 || p.price > 40000000)) return false;
        if (selectedBudget === "above40m" && p.price <= 40000000) return false;
      }

      return true;
    });
  };

  const results = filterProperties();

  const formattedValue = (val: number) => {
    return "₦" + val.toLocaleString();
  };

  const getDevelopmentMilestones = (propertyId: string) => {
    switch (propertyId) {
      case "green-valley":
        return [
          { segment: "Boundary Survey & Land Vetting", progress: 100 },
          { segment: "Perimeter Gatehouse Fencing", progress: 100 },
          { segment: "Central Layout Grading", progress: 85 },
          { segment: "Individual Plot Beacons allocation", progress: 95 }
        ];
      case "commercial-hub":
        return [
          { segment: "State Right-of-Way Vetting", progress: 100 },
          { segment: "Plot Leveling & Access Parkway", progress: 80 },
          { segment: "High-Voltage Transformer Substation", progress: 40 }
        ];
      case "heritage-court":
        return [
          { segment: "Structural Concrete Framework", progress: 100 },
          { segment: "Premium Smart Wall Plastering", progress: 90 },
          { segment: "Integrated Kitchen & Hob Sinking", progress: 80 }
        ];
      default:
        return [
          { segment: "Deed Assignment Vetting", progress: 100 },
          { segment: "Survey Blueprint Lodgement", progress: 100 },
          { segment: "Physical Allocation beaconing", progress: 60 }
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

  return (
    <div className="animate-in fade-in duration-300 font-sans text-left">
      
      {/* 1. HEADER HERO */}
      <section className="bg-[#0B1F3A] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0B1F3A]/90 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3 animate-in fade-in duration-500">
          <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">Active Portfolios</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">Ibadan Gated Layouts & Properties</h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Filter our database by expansion corridors, asset category, or target budget parameters. Each listing carries certified documentation clearance.
          </p>
        </div>
      </section>

      {/* 2. FILTERING CONTROL TOOLBAR */}
      <section className="py-6 bg-slate-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <form className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-wrap">
            
            {/* Sector Type */}
            <div className="flex-grow min-w-[160px]">
              <label className="block text-[8px] uppercase tracking-wider font-mono text-gray-400 mb-1 font-bold">Development Sector</label>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full h-11 bg-slate-50 border border-gray-200 rounded-xl text-xs px-3 text-[#0B1F3A] font-semibold outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                >
                  <option value="">All Sectors</option>
                  <option value="Land">Gated Lands Only</option>
                  <option value="Residential">Residential Duplexes</option>
                  <option value="Commercial">Commercial Hub</option>
                  <option value="Rental">Rental Properties</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Price Budget */}
            <div className="flex-grow min-w-[160px]">
              <label className="block text-[8px] uppercase tracking-wider font-mono text-gray-400 mb-1 font-bold">Budget Parameters</label>
              <div className="relative">
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full h-11 bg-slate-50 border border-gray-200 rounded-xl text-xs px-3 text-[#0B1F3A] font-semibold outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                >
                  <option value="">Any Range</option>
                  <option value="under15m">Under ₦15,000,000</option>
                  <option value="15m-40m">₦15,000,000 - ₦40,000,000</option>
                  <option value="above40m">Above ₦40,000,000</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Infrastructure Corridor */}
            <div className="flex-grow min-w-[160px]">
              <label className="block text-[8px] uppercase tracking-wider font-mono text-gray-400 mb-1 font-bold">Infrastructure Corridor</label>
              <div className="relative">
                <select
                  value={selectedCorridor}
                  onChange={(e) => setSelectedCorridor(e.target.value)}
                  className="w-full h-11 bg-slate-50 border border-gray-200 rounded-xl text-xs px-3 text-[#0B1F3A] font-semibold outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                >
                  <option value="">All Regions</option>
                  <option value="akobo">Akobo Ext. Corridor</option>
                  <option value="bodija">Bodija Corridors</option>
                  <option value="ring">Ring Road / Alao-Akala Bypass</option>
                  <option value="moniya">Moniya Rail station Link</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-3 sm:pt-0 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setSelectedType("");
                  setSelectedBudget("");
                  setSelectedCorridor("");
                }}
                className="w-full sm:w-auto h-11 px-5 border border-gray-200 hover:border-red-500 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-gray-650 hover:text-red-500 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>

          </form>

        </div>
      </section>

      {/* 3. CATALOG GRID & SPECIFICATION DRILL-DOWN PANEL */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left side: Results Cards */}
            <div className={selectedPropertyDetail ? "lg:col-span-6 space-y-6" : "lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
              
              {results.length === 0 ? (
                <div className="col-span-12 text-center p-16 bg-slate-50 border border-gray-150 rounded-3xl flex flex-col items-center justify-center space-y-3">
                  <Compass className="h-12 w-12 text-[#D4AF37] animate-pulse" />
                  <h4 className="font-serif font-bold text-base text-[#0B1F3A]">No Vetted Listings Matches</h4>
                  <p className="text-xs text-gray-500 max-w-sm font-light">
                    Our dynamic base has no items matching filters. Consider resetting the toolbar or contacting our consultation desk directly below.
                  </p>
                </div>
              ) : (
                results.map((p) => (
                  <div
                    key={p.id}
                    className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                      selectedPropertyDetail?.id === p.id ? "border-[#D4AF37] ring-1 ring-[#D4AF37]" : "border-gray-200"
                    }`}
                  >
                    <div>
                      {/* Thumbnail Frame */}
                      <div 
                        onClick={() => onViewPropertyDetail ? onViewPropertyDetail(p.id) : setSelectedPropertyDetail(p)}
                        className="relative h-44 bg-slate-900 rounded-xl overflow-hidden mb-4 cursor-pointer group/img"
                      >
                        <img 
                          src={p.imageUrl} 
                          alt={p.name} 
                          className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover/img:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#0B1F3A] border border-[#D4AF37]/50 text-[9px] uppercase font-mono text-[#D4AF37] tracking-widest font-bold rounded">
                          {p.type}
                        </span>
                        <span className="absolute top-3 right-3 px-2 py-0.5 bg-[#00A86B] text-white text-[9px] font-bold uppercase rounded">
                          {p.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-start gap-4 text-left">
                        <div className="cursor-pointer group/title" onClick={() => onViewPropertyDetail ? onViewPropertyDetail(p.id) : setSelectedPropertyDetail(p)}>
                          <h3 className="font-serif font-bold text-base text-[#0B1F3A] group-hover/title:text-[#D4AF37] transition-colors line-clamp-1">{p.name}</h3>
                          <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" /> {p.location}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed font-light mt-3 line-clamp-2 text-left">
                        {p.description}
                      </p>

                      <div className="pt-3.5 mt-3.5 border-t border-gray-100 flex justify-between items-center bg-slate-50 p-2.5 rounded-xl">
                        <span className="text-[9px] text-gray-400 font-mono uppercase font-bold">Standard Price Sheet</span>
                        <span className="text-xs font-bold text-[#D4AF37] font-mono bg-[#0B1F3A]/5 px-2.5 py-0.5 rounded border border-[#D4AF37]/20">
                          {p.priceString.split("per")[0]}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-100 flex gap-2">
                      <button
                        onClick={() => {
                          if (onViewPropertyDetail) {
                            onViewPropertyDetail(p.id);
                          } else {
                            setSelectedPropertyDetail(p);
                          }
                        }}
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-[#D4AF37] text-[#0B1F3A] hover:bg-white text-[10px] font-bold uppercase font-mono rounded-lg cursor-pointer flex-1 text-center"
                      >
                        Vetting Sheet
                      </button>
                      <button
                        onClick={() => onOpenBooking(p.name, String(p.price))}
                        className="px-4 py-2.5 bg-[#D4AF37] text-slate-950 font-bold text-[10px] uppercase font-mono tracking-wider rounded-lg text-center cursor-pointer flex-1"
                      >
                        Request Plot
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Right Side: Specification Drill-Down Box */}
            {selectedPropertyDetail && (
              <div className="lg:col-span-6 bg-slate-950 text-white border border-[#D4AF37]/45 rounded-3xl p-6 sm:p-8 shadow-2xl relative sticky top-24 animate-in slide-in-from-right-12 duration-300" id="vetting-specs-panel">
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPropertyDetail(null)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer"
                  title="Close specs detail panel"
                >
                  <X className="h-4.5 w-4.5" />
                </button>

                <div className="space-y-6 text-left">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-mono text-[#D4AF37] font-extrabold flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" /> Cadet Vetting File • Geopenny Global
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                      {selectedPropertyDetail.name}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-[#D4AF37]" /> {selectedPropertyDetail.location}
                    </p>
                  </div>

                  {/* Pricing metrics */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-white/5 flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-950">
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase font-mono block">Outright Valuation</span>
                      <span className="text-sm sm:text-base font-extrabold text-[#D4AF37] block mt-0.5">{formattedValue(selectedPropertyDetail.price)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-emerald-400 uppercase font-mono block">Appreciation Rate</span>
                      <span className="text-xs font-semibold text-white block mt-0.5">~22% Annual Target CAGR</span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div>
                    <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest mb-2.5 block font-bold">Approved Infrastructure & Survey Plans</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedPropertyDetail.features.map((feat, idx) => (
                        <div key={idx} className="flex gap-2 items-center text-xs text-gray-100 font-light bg-white/5 p-2 rounded-lg border border-white/5">
                          <Check className="h-3.5 w-3.5 text-[#00A86B] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vetting milestones */}
                  <div>
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-3 block flex items-center gap-1.5 font-bold">
                      <Layers className="h-3.5 w-3.5" /> Site Clearance Milestones progress
                    </span>
                    <div className="bg-slate-900 border border-white/5 p-4 rounded-xl space-y-3.5 text-xs text-gray-300 font-light">
                      {getDevelopmentMilestones(selectedPropertyDetail.id).map((step, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-center text-[10px] leading-none mb-1">
                            <span className="font-sans font-semibold text-white">{step.segment}</span>
                            <span className="font-mono text-[#D4AF37] font-semibold">{step.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B08D24]" style={{ width: `${step.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Schedules Modulator */}
                  <div>
                    <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest mb-2.5 block font-bold">12-Month Payment installment calculator</span>
                    <div className="bg-[#0B1F3A]/40 border border-white/10 p-4 rounded-xl space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-400 font-mono block">DOWN PAYMENT: {calcDeposit}%</label>
                          <input 
                            type="range" 
                            min="20" 
                            max="80" 
                            step="10"
                            value={calcDeposit} 
                            onChange={(e) => setCalcDeposit(Number(e.target.value))}
                            className="w-full h-1 select-none cursor-pointer accent-[#D4AF37]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-400 font-mono block">INSTALLMENT MONTHS</label>
                          <select 
                            value={calcMonths} 
                            onChange={(e) => setCalcMonths(Number(e.target.value))}
                            className="w-full h-8 bg-slate-900 border border-white/10 rounded px-2 text-xs text-white"
                          >
                            <option value={3}>3 Months Quick-Plan</option>
                            <option value={6}>6 Monthly installments</option>
                            <option value={12}>12 Monthly payouts</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs">
                        <div>
                          <span className="text-[9px] text-gray-400 block font-mono">Outright Down Payment</span>
                          <span className="font-bold text-white">{formattedValue(calculateMonthsValue(selectedPropertyDetail.price).depositVal)}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-[#D4AF37] block font-mono">Monthly subsequent payout</span>
                          <span className="font-bold text-[#D4AF37]">{formattedValue(calculateMonthsValue(selectedPropertyDetail.price).monthlyVal)} / mo</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => onOpenBooking(`${selectedPropertyDetail.name} (${calcDeposit}% Down-Plan)`, String(selectedPropertyDetail.price))}
                      className="py-3 bg-[#D4AF37] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
                    >
                      Secure Plot Plan
                    </button>
                    <button
                      onClick={() => onOpenBooking(selectedPropertyDetail.name, String(selectedPropertyDetail.price))}
                      className="py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase border border-white/10 rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Process Outright Purchase
                    </button>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
