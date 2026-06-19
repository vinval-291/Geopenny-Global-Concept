import React, { useState } from "react";
import { 
  TrendingUp, 
  Coins, 
  Sparkles, 
  Percent, 
  HelpCircle, 
  Lock, 
  Loader2, 
  CheckCircle,
  FileText,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { ROICalculatorOutput } from "../types";

interface InvestmentsPageProps {
  onOpenBooking: (propertyName?: string, budgetVal?: string) => void;
}

export default function InvestmentsPage({ onOpenBooking }: InvestmentsPageProps) {
  const [property, setProperty] = useState("Green Valley Estate");
  const [budget, setBudget] = useState(15000000);
  const [years, setYears] = useState(5);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ROICalculatorOutput | null>({
    propertyName: "Green Valley Estate",
    initialInvestment: 15000000,
    holdingPeriodYears: 5,
    annualAppreciationRate: 22,
    annualRentalYieldRate: 5,
    estimatedFutureValue: 40538000,
    accumulatedRentalIncome: 4578000,
    capitalGain: 25538000,
    netTotalReturn: 30116000,
    totalROIPercentage: 201,
    narrative: "Green Valley Estate enjoys strong capital gains driven by high demand for master-planned secure communities in Ibadan's premium growth corridor.",
    paymentStrategy: [
      { step: "Initial Commitment", value: "₦3,000,000 (20% Outright Deposit)" },
      { step: "Quarterly Installments", value: "₦3,000,000 over 4 quarters" },
      { step: "Expected Year 1 Appreciation", value: "+₦3,300,000" }
    ]
  });

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/advisor/calculate-roi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyName: property,
          budgetAmount: budget,
          years: years
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error("Failed to compile ROI forecast.");
      }
    } catch (err) {
      console.error("Error calling ROI calculator API: ", err);
    } finally {
      setLoading(false);
    }
  };

  const formattedValue = (val: number) => {
    return "₦" + val.toLocaleString();
  };

  const competitiveYields = [
    { type: "Commercial Bank Savings", rate: "4.5%", risk: "Nil", yieldText: "Severely loses capital value to double digit inflation." },
    { type: "Treasury Bills (T-Bills)", rate: "16.5%", risk: "Sovereign Low", yieldText: "Presents steady returns, but falls below rapid consumer currency devaluation." },
    { type: "Geopenny Strategic Gated Lands", rate: "32% - 44%", risk: "Secured physical", yieldText: "Protected by tangible titles, accelerating with regional infrastructure corridors." }
  ];

  return (
    <div className="animate-in fade-in duration-300 font-sans text-left">
      
      {/* 1. HERO HEADER */}
      <section className="bg-[#0B1F3A] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-900/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">Investor Prospectus</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">Financial Appreciation Modeling</h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Leverage our advanced financial simulations built directly from Oyo State transaction histories to secure durable returns.
          </p>
        </div>
      </section>

      {/* 2. MAIN SIMULATOR MODULE */}
      <section className="py-16 md:py-24 bg-[#071324] text-white relative" id="roi-simulator-sec">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Input Form */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] mb-6 flex items-center gap-2 uppercase tracking-wider">
                <Coins className="h-5 w-5 text-[#D4AF37]" /> Configure Capital Allocation
              </h3>

              <form onSubmit={handleCalculate} className="space-y-6 text-xs">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-gray-300 uppercase tracking-widest font-bold">Asset Destination</label>
                  <select
                    value={property}
                    onChange={(e) => setProperty(e.target.value)}
                    className="w-full h-11 bg-slate-950 border border-white/15 rounded-lg text-white font-semibold text-xs px-3 focus:outline-none focus:border-[#D4AF37]"
                    id="invest-property-select"
                  >
                    <option value="Green Valley Estate">Green Valley Estate (Akobo Corridor)</option>
                    <option value="Geopenny Commercial Hub">Geopenny Commercial Hub (Bodija bypass)</option>
                    <option value="Heritage Court Residences">Heritage Court Residences (Alao-Akala)</option>
                    <option value="Alverton Park Lands">Alverton Park Lands (Moniya Train link)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-gray-300 uppercase tracking-widest mb-1.5 flex justify-between font-bold">
                    <span>Investment Budget</span>
                    <span className="text-[#D4AF37] font-sans font-bold">₦{budget.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="6500000"
                    max="150000000"
                    step="500000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-1 select-none accent-[#D4AF37] cursor-pointer"
                    id="invest-budget-slider"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono pr-1">
                    <span>₦6.5M</span>
                    <span>₦75M</span>
                    <span>₦150M+</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-gray-300 uppercase tracking-widest mb-1.5 flex justify-between font-bold">
                    <span>Asset Holding Duration</span>
                    <span className="text-[#D4AF37] font-bold">{years} Years</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-1 select-none accent-[#D4AF37] cursor-pointer"
                    id="invest-years-slider"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono pr-1">
                    <span>1 Year</span>
                    <span>5 Years</span>
                    <span>10 Years</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-gradient-to-r from-[#D4AF37] to-[#B08D24] text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  id="btn-invest-trigger"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      CALCULATING COMPOUNDS...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-4 w-4" /> GENERATE INVESTMENT BLUEPRINT
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-white/5 flex gap-2 text-[10px] text-gray-400 leading-normal font-light">
                <Lock className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
                <span>Yield structures correspond perfectly with verified cadastral boundaries registered in Oyo blocks libraries.</span>
              </div>
            </div>

            {/* Results prospectus */}
            <div className="lg:col-span-7">
              {results ? (
                <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                  
                  {/* Results Title header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                    <div>
                      <h4 className="font-serif text-lg text-white font-bold">{results.propertyName}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5 font-light">Compound projection modeled over {results.holdingPeriodYears} years.</p>
                    </div>
                    <div className="bg-[#D4AF37]/15 border border-[#D4AF37]/30 py-2 px-3.5 rounded-xl text-center shrink-0">
                      <span className="text-[9px] font-mono text-gray-300 block uppercase">Compound Return Index</span>
                      <span className="text-base sm:text-lg font-bold text-[#D4AF37] block mt-0.5 font-mono">+{results.totalROIPercentage}% ROI</span>
                    </div>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-4 border border-white/5 rounded-2xl">
                      <span className="text-[9px] uppercase font-mono text-gray-450 block font-bold leading-none">Total Outlay</span>
                      <span className="text-xs sm:text-sm font-extrabold text-white block mt-2 font-mono">{formattedValue(results.initialInvestment)}</span>
                    </div>

                    <div className="bg-slate-950 p-4 border border-white/5 rounded-2xl">
                      <span className="text-[9px] uppercase font-mono text-gray-450 block font-bold leading-none">Capital Gains</span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#D4AF37] block mt-2 font-mono">+{formattedValue(results.capitalGain)}</span>
                    </div>

                    <div className="bg-slate-950 p-4 border border-white/5 rounded-2xl">
                      <span className="text-[9px] uppercase font-mono text-gray-450 block font-bold leading-none">Rental / Lease yield</span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#00A86B] block mt-2 font-mono">+{formattedValue(results.accumulatedRentalIncome)}</span>
                    </div>
                  </div>

                  {/* Stacked visually returning comparison */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">Accrued return comparisons</span>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-white/5">
                      <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden flex mb-3">
                        <div className="h-full bg-slate-700 flex items-center justify-center text-[9px] font-bold text-white" style={{ width: `${Math.round((results.initialInvestment / results.estimatedFutureValue) * 100)}%` }}>Base</div>
                        <div className="h-full bg-[#D4AF37] text-slate-950 flex items-center justify-center text-[9px] font-bold" style={{ width: `${Math.round((results.capitalGain / results.estimatedFutureValue) * 100)}%` }}>Gains</div>
                        <div className="h-full bg-[#00A86B] text-white flex items-center justify-center text-[9px] font-bold" style={{ width: `${Math.round((results.accumulatedRentalIncome / results.estimatedFutureValue) * 100)}%` }}>Lease</div>
                      </div>

                      <div className="flex gap-4 flex-wrap justify-between text-[10px] font-mono font-semibold">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 bg-slate-700 rounded-sm" /> Capital: {formattedValue(results.initialInvestment)}
                        </div>
                        <div className="flex items-center gap-1.5 text-[#D4AF37]">
                          <span className="h-2.5 w-2.5 bg-[#D4AF37] rounded-sm" /> Gains: {formattedValue(results.capitalGain)}
                        </div>
                        <div className="flex items-center gap-1.5 text-[#00A86B]">
                          <span className="h-2.5 w-2.5 bg-[#00A86B] rounded-sm" /> Lease: {formattedValue(results.accumulatedRentalIncome)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Narrative explanation */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5 leading-relaxed text-xs text-gray-300 font-light italic text-left">
                    "{results.narrative}"
                  </div>

                  {/* Actions lock and proceed */}
                  <div className="bg-[#D4AF37]/10 p-5 border border-[#D4AF37]/35 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left">
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono uppercase">Lock This Pro-Forma Modeling?</h4>
                      <p className="text-[10px] text-gray-300 mt-0.5 leading-normal">Submit this ledger to register your interest with a Senior Coordinator.</p>
                    </div>
                    <button
                      onClick={() => onOpenBooking(results.propertyName, String(results.initialInvestment))}
                      className="px-5 py-2.5 bg-[#D4AF37] text-slate-950 font-bold hover:bg-white transition-all rounded-xl text-xs uppercase cursor-pointer block font-mono tracking-wider text-center shrink-0"
                    >
                      Process Ledger Lock
                    </button>
                  </div>

                </div>
              ) : (
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-16 text-center text-gray-400">
                  <HelpCircle className="h-10 w-10 text-[#D4AF37] mx-auto mb-3" />
                  <p className="font-semibold text-white">Compound generator initialized.</p>
                  <p className="text-xs mt-1">Refine sliders on left to process Oyo development portfolios.</p>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 3. ASSETS CLASSES COMPASS TABLE */}
      <section className="py-16 md:py-24 bg-white text-left">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-bold">Competitive Appraisal</span>
            <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-[#0B1F3A] mt-1">Asset Hedging Comparison</h2>
          </div>

          <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-[#0B1F3A] text-white p-4 font-mono text-[10px] uppercase font-bold tracking-widest grid grid-cols-12 gap-4">
              <span className="col-span-4">Asset Class Types</span>
              <span className="col-span-3 text-center">Appraisal Yield</span>
              <span className="col-span-5">Risk Matrix Summary</span>
            </div>

            <div className="divide-y divide-gray-150">
              {competitiveYields.map((cy, idx) => (
                <div key={idx} className="p-4 grid grid-cols-12 gap-4 items-center text-xs text-gray-600">
                  <span className="col-span-4 font-bold text-[#0B1F3A]">{cy.type}</span>
                  <span className="col-span-3 text-center font-extrabold text-[#D4AF37] bg-slate-50 border border-gray-150 px-3 py-1.5 rounded-xl block w-fit mx-auto font-mono">{cy.rate}</span>
                  <p className="col-span-5 font-light text-[11px] leading-relaxed">{cy.yieldText}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
