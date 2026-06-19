import React, { useState } from "react";
import { CheckCircle2, ChevronRight, Milestone, Sparkles, Building, Quote } from "lucide-react";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"vision" | "history" | "safety">("vision");

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage and Quote */}
          <div className="lg:col-span-5 relative" id="about-visuals">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                alt="Headstone Real Estate Developers"
                className="w-full h-[320px] sm:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Cocoa House Submask badge */}
              <div className="absolute top-4 left-4 bg-[#0A2342] text-white text-xs px-3.5 py-2 rounded-lg border border-[#D4AF37]/50 shadow-lg font-mono">
                COCOA HOUSE, IBADAN
              </div>
            </div>

            {/* Float badge detail */}
            <div className="absolute -bottom-6 -right-4 md:right-4 bg-[#0A2342] border border-[#D4AF37] rounded-xl p-5 shadow-2xl max-w-[280px] hidden sm:block">
              <div className="flex gap-3">
                <div className="p-2.5 bg-[#D4AF37]/15 rounded-lg h-fit">
                  <Building className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-sm">Corporate Core</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-snug">
                    Nigeria's first skyscraper, Cocoa House, is our executive anchor of transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Pitch and Tabbed Interactive Values */}
          <div className="lg:col-span-7 flex flex-col justify-center" id="about-content">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A2342]/5 border border-[#0A2342]/10 rounded-full w-fit mb-4">
              <Sparkles className="h-3 w-3 text-[#D4AF37]" />
              <span className="text-xs font-bold text-[#0A2342] uppercase tracking-wider">Our Heritage</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#0A2342] mb-6 leading-tight">
              Transforming Real Estate Through <br />
              <span className="text-[#D4AF37]">Innovation and Corporate Trust</span>
            </h2>

            <p className="font-sans text-sm text-[#333333] leading-relaxed mb-6 font-light">
              Headstone Realty is a leading real estate development company headquartered in the iconic **Cocoa House, Ibadan**. We specialize in developing premium residential communities, smart commercial hubs, and investment-driven property projects designed to improve lifestyles and safeguard capital.
            </p>

            <p className="font-sans text-sm text-[#333333] leading-relaxed mb-8 font-light">
              Our ultimate commitment to quality construction, rigorous land tiling, sustainable planning, and absolute client transparency has positioned us as the most trusted development partner for homeowners and smart investors across Oyo State and in the Nigerian diaspora market.
            </p>

            {/* Interactive Tabs */}
            <div className="border-b border-gray-200 mb-6 flex gap-6" id="about-tabs-header">
              <button
                onClick={() => setActiveTab("vision")}
                className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-all relative ${
                  activeTab === "vision" ? "text-[#0A2342]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Our Vision & Mission
                {activeTab === "vision" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-all relative ${
                  activeTab === "history" ? "text-[#0A2342]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Why Ibadan Market?
                {activeTab === "history" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
              </button>
              <button
                onClick={() => setActiveTab("safety")}
                className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-all relative ${
                  activeTab === "safety" ? "text-[#0A2342]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Security Guarantee
                {activeTab === "safety" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
              </button>
            </div>

            {/* Tab content panel */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm min-h-[140px] mb-8" id="about-tab-panel">
              {activeTab === "vision" && (
                <div className="animate-in fade-in duration-300">
                  <h4 className="font-sans font-bold text-[#0A2342] text-sm mb-2">Sustainable Communities & Long-Term Growth</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    Our mission is to construct safe, highly automated, and eco-friendly estates. We focus on premium structural deliverables that withstand generations, maintaining continuous capital appreciation for every buyer.
                  </p>
                </div>
              )}

              {activeTab === "history" && (
                <div className="animate-in fade-in duration-300">
                  <h4 className="font-sans font-bold text-[#0A2342] text-sm mb-2">Ibadan: West Africa's High Appreciation Corridor</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    With the new Lagos-Ibadan train corridor, Oyo State dry port, and metropolitan infrastructure expansion, real estate values in Moniya, Akobo, and Alao-Akala extension are doubling every 2 years, delivering safer yields than standard funds.
                  </p>
                </div>
              )}

              {activeTab === "safety" && (
                <div className="animate-in fade-in duration-300">
                  <h4 className="font-sans font-bold text-[#0A2342] text-sm mb-2">100% Verified Titles: Zero "Omo-Onile" Encumbrances</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    Every landmark is secured directly through formal, regularized government lines with C of O or Governor's Consent. We strictly handle document generation, land survey mappings, and provide clear legal deeds for complete purchase safety.
                  </p>
                </div>
              )}
            </div>

            {/* Quick point list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8" id="about-quick-points">
              <div className="flex items-center gap-2 text-xs font-medium text-[#333333]">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
                Guaranteed Certificate of Occupancy
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#333333]">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
                No Hidden Fees & Split Pricing
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#333333]">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
                Modern Eco-friendly Infrastructures
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#333333]">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
                Secure 12-Month Payment Layouts
              </div>
            </div>

            {/* Action button */}
            <a
              href="#services"
              className="w-fit inline-flex items-center gap-1 text-sm font-semibold text-[#0A2342] hover:text-[#D4AF37] transition-all group"
            >
              Explore Our Diverse Services
              <ChevronRight className="h-4 w-4 bg-[#0A2342]/5 group-hover:bg-[#D4AF37]/20 p-0.5 rounded-full transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
