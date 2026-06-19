import React, { useState } from "react";
import { 
  Building2, 
  Map, 
  ShieldCheck, 
  TrendingUp, 
  Briefcase, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Lock,
  MenuSquare,
  Printer,
  Palette,
  Layers,
  ShoppingBag,
  HelpCircle
} from "lucide-react";
import { CORE_SERVICES } from "../data";

interface ServicesPageProps {
  onOpenBooking: (propertyName?: string, budgetVal?: string) => void;
}

export default function ServicesPage({ onOpenBooking }: ServicesPageProps) {
  const [activeServiceTab, setActiveServiceTab] = useState(CORE_SERVICES[0].id);
  
  // Interactive Project Sourcing Cost Planner states
  const [projectDemand, setProjectDemand] = useState<"Real Estate" | "Creative" | "Printing" | "Merchandise">("Real Estate");
  const [timelineSpeed, setTimelineSpeed] = useState<"Express" | "Standard">("Standard");
  const [volumeLevel, setVolumeLevel] = useState<"Individual" | "Corporate">("Individual");

  const getServiceTabIcon = (iconName: string) => {
    switch (iconName) {
      case "Landmark": return <Building2 className="h-5 w-5 animate-pulse text-[#D4AF37]" />;
      case "ShieldCheck": return <ShieldCheck className="h-5 w-5 text-emerald-500" />;
      case "TrendingUp": return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case "Sparkles": return <Palette className="h-5 w-5 text-fuchsia-500" />;
      case "FileText": return <Printer className="h-5 w-5 text-amber-500" />;
      case "Briefcase": return <ShoppingBag className="h-5 w-5 text-[#D4AF37]" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  };

  const getPlannerOutput = () => {
    switch (projectDemand) {
      case "Real Estate":
        return {
          title: "Strategic Oyo Property Purchase & Management Action Blueprint",
          benefit: "Secure verifiable land or long-term lease. Zero 'Omo-Onile' property disputes with certified Oyo surveyor layout alignment.",
          estimate: "Price depends on site location (Moniya lands starting at ₦8.5M/plot, Bodija listings ₦45M+).",
          process: "Pre-survey chart mapping -> Instant allocation request -> Notarized Deed signing.",
          ctaLabel: "Schedule Property Consultation"
        };
      case "Creative":
        return {
          title: "Corporate Visual Identity Package (Logo & Brand Standard Guidelining)",
          benefit: "Custom vector styling optimized for modern business scale. Highly polished logos and social template formats delivered as raw master vectors.",
          estimate: "Starting from ₦150,000 depending on depth of logo concepts and stationery guides.",
          process: "Moodboarding -> 3 unique logo conceptual paths -> Stationary print exports (PDF/AI/PNG).",
          ctaLabel: "Hire Branding Designer"
        };
      case "Printing":
        return {
          title: "Heavy-Ink Large-Format Printing & Corporate Rollup Run",
          benefit: "Industrial density offset printing. Gold hot-foiled cardstocks, weatherproof exhibition rollup banners, and promotional material bundles.",
          estimate: volumeLevel === "Corporate" ? "Volume-discounted rates. Instant wholesale quotes on 1000+ units." : "Budget flexible retail print slots.",
          process: "Upload PDF mockup designs -> Digital color-proofing -> High-speed offset print run -> Ibadan delivery.",
          ctaLabel: "Request Custom Print Output Quote"
        };
      case "Merchandise":
        return {
          title: "Bulk General Corporate Procurement & Customized Gift Sourcing",
          benefit: "Avoid multi-agency delays. Sourced direct from high-quality suppliers, complete with customized screen-printing and office distribution logistics support.",
          estimate: "Detailed procurement quotations supplied within 12 business hours of booking.",
          process: "Item specifications mapping -> Custom branding rendering -> Quality control vetting -> Shipping.",
          ctaLabel: "Submit Sourcing Manifest"
        };
      default:
        return {
          title: "General Multi-Service Support Consultation",
          benefit: "Coordinate multiple requirements (e.g. print flyers for real estate projects) under one cohesive Geopenny director.",
          estimate: "Flexible service contract bundles available.",
          process: "Direct meeting with Prince Kolawole -> Consolidated service contract assignment.",
          ctaLabel: "Book Custom Sourcing Advisory"
        };
    }
  };

  const activeServiceObj = CORE_SERVICES.find(s => s.id === activeServiceTab) || CORE_SERVICES[0];
  const plannerOutput = getPlannerOutput();

  return (
    <div className="animate-in fade-in duration-300 font-sans text-left">
      
      {/* 1. HERO HEADER BANNER */}
      <section className="bg-[#0B1F3A] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] to-[#040e1b] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-in fade-in duration-500 space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">Service Architecture</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
            Professional Multi-Service Solutions
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            We simplify property acquisitions, handle facility management cycles, and build corporate identities with precision graphic designs and heavy print solutions.
          </p>
        </div>
      </section>

      {/* 2. DYNAMIC SERVICES TABS EXPLORER */}
      <section className="py-16 md:py-24 bg-white" id="services-tabs-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Selection Tab List */}
            <div className="lg:col-span-4 bg-[#0B1F3A] border border-[#D4AF37]/30 rounded-3xl p-5 sm:p-6 text-white space-y-2.5 shadow-xl">
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest block mb-3 pl-2">Corporate Sectors</span>
              {CORE_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveServiceTab(s.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold font-sans transition-all flex items-center justify-between cursor-pointer ${
                    activeServiceTab === s.id 
                      ? "bg-[#D4AF37] border-[#D4AF37] text-slate-950 shadow-md transform scale-[1.01]" 
                      : "bg-[#0B1F3A]/60 border-white/5 hover:border-white/15 text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">{getServiceTabIcon(s.iconName)}</span>
                    <span>{s.title}</span>
                  </div>
                  <ArrowRight className={`h-3 w-3 shrink-0 transition-transform ${activeServiceTab === s.id ? "rotate-90 text-slate-950" : "text-gray-400 group-hover:translate-x-1"}`} />
                </button>
              ))}
            </div>

            {/* Right Detailed Panel */}
            <div className="lg:col-span-8 bg-[#F7F9FC] border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm animate-in fade-in duration-350">
              <span className="text-[9px] uppercase font-mono text-[#D4AF37] font-extrabold tracking-widest block">Geopenny Division Manifest</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1F3A] mt-1.5 mb-4">
                {activeServiceObj.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light mb-6">
                {activeServiceObj.fullDescription}
              </p>

              {/* Standard Checklist box */}
              <div className="bg-white border border-gray-150 rounded-2xl p-5 mb-8 text-left">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-3 font-semibold">What is Included in Outlines</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-[#0B1F3A]">
                  {activeServiceObj.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2.5 items-center font-semibold">
                      <CheckCircle2 className="h-4 w-4 text-[#00A86B] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-[#0B1F3A] text-white p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/30 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-[#D4AF37] font-mono uppercase">Request Division Callback</h4>
                  <p className="text-[10px] text-gray-300 mt-1">Our specialist consultant will analyze your target requirements.</p>
                </div>
                <button
                  onClick={() => onOpenBooking(`Service Request: ${activeServiceObj.title}`)}
                  className="px-4.5 py-2.5 bg-[#D4AF37] hover:bg-white text-slate-950 font-bold text-xs uppercase rounded-xl transition-all shadow cursor-pointer font-mono"
                >
                  Book Advice
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SOURCE PROJECT COST ADVISOR */}
      <section className="py-16 md:py-24 bg-[#071324] text-white border-t border-b border-[#D4AF37]/30 relative overflow-hidden" id="interactive-pricing-planner">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">Instant Pricing & Strategy Sourcing Planner</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
              Multi-Service Project Cost Planner
            </h2>
            <p className="text-xs text-gray-300 mt-2 font-light leading-relaxed">
              Answer 3 quick checkpoints below to generate dynamic planning estimates, production cycles, and streamlined action blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Inputs Box */}
            <div className="lg:col-span-5 bg-slate-900 border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="font-serif text-sm text-[#D4AF37] font-bold flex items-center gap-2">
                  <MenuSquare className="h-4 w-4" /> Configure Project Criteria
                </h3>

                {/* Question 1 */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono text-gray-300 uppercase tracking-widest">1. Primary Service Area</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(["Real Estate", "Creative", "Printing", "Merchandise"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setProjectDemand(opt)}
                        className={`py-2 px-2 text-center font-bold rounded-lg border transition-all cursor-pointer ${
                          projectDemand === opt 
                            ? "bg-[#D4AF37] border-[#D4AF37] text-slate-950 shadow" 
                            : "bg-slate-950/45 border-white/5 text-gray-300 hover:border-white/10"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 2 */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono text-gray-300 uppercase tracking-widest font-semibold">2. Timeline Sourcing Speed</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setTimelineSpeed("Standard")}
                      className={`py-2 text-center font-bold rounded-lg border transition-all cursor-pointer ${
                        timelineSpeed === "Standard" ? "bg-[#D4AF37] border-[#D4AF37] text-slate-950" : "bg-slate-950/45 border-white/5 text-gray-300"
                      }`}
                    >
                      Standard Vetting (Regular)
                    </button>
                    <button
                      onClick={() => setTimelineSpeed("Express")}
                      className={`py-2 text-center font-bold rounded-lg border transition-all cursor-pointer ${
                        timelineSpeed === "Express" ? "bg-[#D4AF37] border-[#D4AF37] text-slate-950 animate-pulse" : "bg-slate-950/45 border-white/5 text-gray-300"
                      }`}
                    >
                      Express Priority (Emergency)
                    </button>
                  </div>
                </div>

                {/* Question 3 */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono text-gray-300 uppercase tracking-widest">3. Order Volume Scope</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setVolumeLevel("Individual")}
                      className={`py-2 text-center font-bold rounded-lg border transition-all cursor-pointer ${
                        volumeLevel === "Individual" ? "bg-[#D4AF37] border-[#D4AF37] text-slate-950" : "bg-slate-950/45 border-white/5 text-gray-300"
                      }`}
                    >
                      Retail (Individual/Micro)
                    </button>
                    <button
                      onClick={() => setVolumeLevel("Corporate")}
                      className={`py-2 text-center font-bold rounded-lg border transition-all cursor-pointer ${
                        volumeLevel === "Corporate" ? "bg-[#D4AF37] border-[#D4AF37] text-slate-950" : "bg-slate-950/45 border-white/5 text-gray-300"
                      }`}
                    >
                      Wholesale (Corporate Scale)
                    </button>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-white/5 mt-5 flex items-center gap-1.5 text-[10px] text-gray-400">
                <Lock className="h-4 w-4 text-[#D4AF37]" /> Estimates generated instant locally. Secure logs.
              </div>
            </div>

            {/* Outputs Box */}
            <div className="lg:col-span-7 bg-[#0c1e33] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              
              <div className="space-y-5 text-left">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-black flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Generated Geopenny Blueprint Result
                </span>

                <h3 className="font-serif text-lg font-bold text-white leading-snug">
                  {plannerOutput.title}
                </h3>

                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  <span className="font-semibold text-white block mb-1">Guaranteed Sourcing Value:</span>
                  {plannerOutput.benefit}
                </p>

                <div className="p-4 bg-slate-900/60 border border-white/5 rounded-2xl text-xs space-y-2">
                  <p className="text-gray-300">
                    <strong className="text-[#D4AF37] font-mono uppercase text-[9px] block">Project Cost / Estimate</strong>
                    {plannerOutput.estimate}
                  </p>
                  
                  <p className="text-gray-350 mt-1">
                    <strong className="text-white font-semibold text-[10px] block mt-1">Sourcing Workflow:</strong>
                    {plannerOutput.process}
                  </p>
                </div>

                {timelineSpeed === "Express" && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-[#D4AF37] flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping shrink-0" />
                    <strong>Express Priority Enabled:</strong> Surcharges apply. Project flags prioritises on planning pipelines.
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                <span className="text-[10px] text-gray-400 leading-normal font-sans">Submit this configuration to Prince Kolawole's partner desk to locks in pricing models.</span>
                <button
                  onClick={() => onOpenBooking(`Sourcing Planner Inquiry: [${projectDemand}] - Volume: [${volumeLevel}] - Speed: [${timelineSpeed}]`)}
                  className="w-full sm:w-auto px-5 py-3 bg-[#D4AF37] text-slate-950 hover:bg-white transition-colors text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  {plannerOutput.ctaLabel}
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
