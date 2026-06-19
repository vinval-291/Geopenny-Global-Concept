import React, { useState } from "react";
import { Sparkles, ArrowRight, Printer, Palette, Award, ShieldCheck, Check } from "lucide-react";
import { PORTFOLIO_ITEMS } from "../data";

interface PortfolioPageProps {
  onOpenBooking: (serviceName?: string, budgetVal?: string) => void;
}

export default function PortfolioPage({ onOpenBooking }: PortfolioPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Logo", "Branding", "Flyer", "Banner", "Business Card", "Marketing"];

  const filteredItems = selectedCategory === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <Palette className="h-4 w-4" /> Creative & Branding Showcase
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] tracking-tight">
            Design & Printing Portfolio
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed mt-3">
            Explore Geopenny's premium graphic branding concepts, corporate brochures, gold-foil custom business cards, and event marketing collateral custom crafted for ambitious brands in Ibadan, Oyo State, and worldwide.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-gray-200 pb-5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37] hover:text-[#0B1F3A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Wrapper */}
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#0B1F3A] text-[#D4AF37] border border-[#D4AF37]/30 text-[9px] font-mono font-semibold uppercase rounded-md shadow">
                    {item.category}
                  </span>
                </div>

                {/* Content Box */}
                <div className="p-6">
                  <span className="text-[10px] font-mono font-semibold text-gray-400 block uppercase">Client: {item.client}</span>
                  <h3 className="font-serif font-bold text-lg text-[#0B1F3A] mt-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 font-light mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Order Button / Details banner */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => onOpenBooking(`Custom Sourcing Print/Design: ${item.title}`)}
                  className="w-full py-2.5 bg-[#0B1F3A]/5 hover:bg-[#D4AF37]/10 text-[#0B1F3A] hover:text-slate-950 text-xs font-bold uppercase tracking-wider border border-slate-250 hover:border-[#D4AF37] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Order Similar Concept
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Creative Sourcing Info Callout bar */}
        <div className="mt-16 bg-gradient-to-r from-[#0B1F3A] to-[#040e1b] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full filter blur-3xl" />
          
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] block tracking-widest font-mono uppercase text-[#D4AF37] font-semibold">
              Premium Corporate Print runs
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-bold">Have an Upcoming Event or Corporate Redesign?</h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              We operate high-definition industrial printers capable of rendering massive rollup banners, premium gold embossed business stationery, marketing flyers, and brand custom brochures. Our dedicated design consultants will bring your concepts to life, maintaining strict color code alignment.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 text-xs">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <span className="text-gray-200">Industry-vetted materials</span>
              </div>
              <div className="flex items-center gap-2">
                <Printer className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <span className="text-gray-200">Express print delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#D3C] text-emerald-400 shrink-0" />
                <span className="text-gray-200">100% Satisfaction backed</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-2.5">
              <button
                onClick={() => onOpenBooking(`Corporate Identity & Graphic Design Suite`)}
                className="px-5 py-3 bg-[#D4AF37] hover:bg-white text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Hire Creative Desk
              </button>
              <button
                onClick={() => onOpenBooking(`Bulk Custom Procurement & Printing Solution`)}
                className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/10 rounded-xl transition-all cursor-pointer"
              >
                Request Print Quote
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
