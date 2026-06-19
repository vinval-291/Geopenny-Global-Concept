import React, { useState } from "react";
import { ROICalculatorOutput } from "../types";
import { 
  TrendingUp, 
  Coins, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Lock, 
  Briefcase,
  HelpCircle,
  Loader2,
  Percent
} from "lucide-react";

interface RealEstateCalculatorProps {
  onOpenBooking: (propertyName?: string, budgetVal?: string) => void;
}

export default function RealEstateCalculator({ onOpenBooking }: RealEstateCalculatorProps) {
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

  return (
    <section id="investment" className="py-20 md:py-28 bg-[#0a1829] text-white overflow-hidden relative">
      {/* Decorative vectors */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-900/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider font-mono">Guaranteed Yield Analysis</span>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white mt-3">
            Invest in Tomorrow's Communities Today
          </h2>
          <p className="text-xs text-gray-300 mt-4 leading-relaxed font-light">
            Empower your money. Leverage our financial modeling software to project your property returns, capital gains, and yield cashflows in Ibadan real estate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Input Form */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#112437] to-[#0e1d2c] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <h3 className="font-sans text-lg font-bold text-[#D4AF37] mb-6 flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Configure Investment Blueprint
            </h3>

            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase tracking-widest mb-2">
                  Select Project Location
                </label>
                <select
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  className="w-full h-11 bg-slate-900 border border-white/15 rounded-lg text-white font-serif text-sm px-3 focus:outline-none focus:border-[#D4AF37] transition-all"
                  id="calc-property-sec"
                >
                  <option value="Green Valley Estate">Green Valley Estate (Akobo Corridor)</option>
                  <option value="Headstone Commercial Hub">Headstone Commercial Hub (Bodija Bypass)</option>
                  <option value="Heritage Court Residences">Heritage Court Residences (Alao-Akala)</option>
                  <option value="Alverton Park Lands">Alverton Park Lands (Moniya Train Link)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase tracking-widest mb-2 flex justify-between">
                  <span>Investment Capital budget</span>
                  <span className="text-[#D4AF37] font-sans font-bold">₦{budget.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="6500000"
                  max="150000000"
                  step="500000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                  id="calc-budget-slider"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                  <span>₦6.5M</span>
                  <span>₦75M</span>
                  <span>₦150M+</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase tracking-widest mb-2 flex justify-between">
                  <span>Asset Holding Period</span>
                  <span className="text-[#D4AF37] font-bold">{years} Years</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                  id="calc-years-slider"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                  <span>1 Year</span>
                  <span>5 Years</span>
                  <span>10 Years</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-[#D4AF37] to-[#B08D24] text-[#0A2342] hover:bg-white hover:text-[#0A2342] font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-55"
                id="btn-trigger-calculation"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Engineering ROI Projection...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4" />
                    Generate ROI Forecast Statement
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2.5 text-[10px] text-gray-400 leading-normal">
              <Lock className="h-4 w-4 text-[#D4AF37] shrink-0" />
              <span>Yields calculated with regularized statistical models backed by Cocoa House market advisory research.</span>
            </div>
          </div>

          {/* Right Column: Visual Statement Results */}
          <div className="lg:col-span-7" id="calculator-results-panel">
            {results ? (
              <div className="bg-slate-900 border border-[#D4AF37]/35 rounded-2xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-300">
                
                {/* Visual Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                  <div>
                    <h4 className="font-serif text-lg text-white font-bold">{results.propertyName}</h4>
                    <p className="text-xs text-gray-400 mt-1">Investment holding simulation for {results.holdingPeriodYears} years.</p>
                  </div>
                  <div className="bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-center shrink-0">
                    <span className="text-[10px] font-mono text-gray-300 uppercase tracking-wider block">Accrued ROI</span>
                    <span className="text-xl font-bold text-[#D4AF37] flex items-center justify-center gap-0.5">
                      +{results.totalROIPercentage}%
                      <Percent className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                {/* Key Yield Breakdown Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <span className="text-[10px] uppercase font-mono text-gray-400 block">Initial Invested Capital</span>
                    <span className="text-sm font-bold text-white block mt-1">{formattedValue(results.initialInvestment)}</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <span className="text-[10px] uppercase font-mono text-gray-400 block">Capital appreciation value</span>
                    <span className="text-sm font-bold text-[#D4AF37] block mt-1">+{formattedValue(results.capitalGain)}</span>
                    <span className="text-[9px] text-emerald-400 mt-1 block">~{results.annualAppreciationRate}% annual growth</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <span className="text-[10px] uppercase font-mono text-gray-400 block">Rental Inflow Yield</span>
                    <span className="text-sm font-bold text-emerald-400 block mt-1">+{formattedValue(results.accumulatedRentalIncome)}</span>
                    <span className="text-[9px] text-gray-400 mt-1 block">~{results.annualRentalYieldRate}% annual payout</span>
                  </div>
                </div>

                {/* Simulated Chart visual bar using CSS */}
                <div className="mb-6">
                  <h5 className="text-xs font-mono uppercase tracking-widest text-gray-300 mb-3 block">Accrued Return comparison</h5>
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                    {/* Visual compound bar stacked */}
                    <div className="h-8 w-full bg-slate-900 rounded-lg overflow-hidden flex mb-3">
                      <div className="h-full bg-[#11325a] flex items-center justify-center text-[10px] font-bold" style={{ width: `${Math.round((results.initialInvestment / results.estimatedFutureValue) * 100)}%` }} title="Original Budget">
                        Base
                      </div>
                      <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B08D24] text-[#0A2342] flex items-center justify-center text-[10px] font-bold" style={{ width: `${Math.round((results.capitalGain / results.estimatedFutureValue) * 100)}%` }} title="Growth Gains">
                        Gain
                      </div>
                      <div className="h-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold" style={{ width: `${Math.round((results.accumulatedRentalIncome / results.estimatedFutureValue) * 100)}%` }} title="Accrued rents">
                        Rent
                      </div>
                    </div>

                    <div className="flex gap-4 flex-wrap justify-between text-[10px]">
                      <div className="flex items-center gap-1.5 font-mono text-gray-300">
                        <span className="h-2 w-2 bg-[#11325a] rounded" /> Initial: {formattedValue(results.initialInvestment)}
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[#D4AF37]">
                        <span className="h-2 w-2 bg-[#D4AF37] rounded" /> Appreciation: {formattedValue(results.capitalGain)}
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-emerald-400">
                        <span className="h-2 w-2 bg-emerald-500 rounded" /> Accrued Rent: {formattedValue(results.accumulatedRentalIncome)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subhead commentary */}
                <div className="bg-slate-950 p-4 border border-white/5 rounded-xl mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block font-mono">Growth Narrative</span>
                  <p className="text-xs text-gray-300 leading-relaxed mt-1 font-light italic">
                    "{results.narrative}"
                  </p>
                </div>

                {/* Recommended Payment Milestone */}
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-3 block">Suggested Installment Pathway</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {results.paymentStrategy.map((step, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/5 p-3 rounded-lg text-center">
                        <span className="text-[9px] font-mono uppercase text-gray-400 block">{step.step}</span>
                        <span className="text-xs font-bold text-white block mt-1">{step.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action direct mapping */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-[#D4AF37]/10 p-4 rounded-xl border border-[#D4AF37]/40 gap-4">
                  <div className="text-center sm:text-left">
                    <span className="text-xs font-bold text-white block">Ready to secure this projection?</span>
                    <span className="text-[10px] text-gray-300 block">Get our Senior Partners from Cocoa House to finalize documentation.</span>
                  </div>
                  <button
                    onClick={() => onOpenBooking(results.propertyName, String(results.initialInvestment))}
                    className="px-5 py-2.5 bg-[#D4AF37] text-[#0A2342] hover:bg-white hover:text-[#0a1829] font-bold text-xs rounded-lg transition-all cursor-pointer shadow-md"
                    id="btn-calculator-convert"
                  >
                    Lock Investment Plan
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-[#112437] rounded-2xl p-12 text-center text-gray-400 border border-white/10 height-full flex flex-col justify-center items-center">
                <HelpCircle className="h-10 w-10 text-[#D4AF37] mb-3" />
                <p className="font-semibold text-white">Interactive modeling ready.</p>
                <p className="text-xs font-light mt-1">Configure the capital sliders on the left and click calculate to construct your custom projection.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
