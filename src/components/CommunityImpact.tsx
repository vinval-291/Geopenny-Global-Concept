import React from "react";
import { Leaf, Users, Lightbulb, Sparkles } from "lucide-react";

export default function CommunityImpact() {
  const impacts = [
    {
      id: "green",
      title: "Eco-Conscious Infrastructure",
      desc: "We integrate centralized solar grids, waste recycling units, and native Oyo floral vegetation in our gated layouts, cutting carbon emissions by 40% compared to traditional fossil estates.",
      stat: "40% Carbon Cut",
      icon: <Leaf className="h-6 w-6 text-[#D4AF37]" />
    },
    {
      id: "jobs",
      title: "Local Workforce Empowerment",
      desc: "Every development prioritizes local bricklayers, carpenters, architects, and civil engineers in Ibadan. We have employed over 1,500+ Oyo citizens, fostering wealth inside our immediate communities.",
      stat: "1,500+ Jobs Created",
      icon: <Users className="h-6 w-6 text-[#D4AF37]" />
    },
    {
      id: "social",
      title: "Oyo CSR Programs",
      desc: "A portion of our annual proceeds from Cocoa House is dedicated to refurbishing public school rooms, clean borehole projects, and secondary school business incubator programs within the Ibadan center.",
      stat: "5 Public Schools Backed",
      icon: <Lightbulb className="h-6 w-6 text-[#D4AF37]" />
    }
  ];

  return (
    <section id="community" className="py-20 md:py-28 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#0A2342] uppercase tracking-widest block font-mono">Community Integrity</span>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-[#0A2342] tracking-tight mt-2">
            Pioneering Sustainable Transformation in Ibadan
          </h2>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed font-light">
            Developments cannot stand in isolation. At Headstone Realty, we ensure each building expands regional prosperity, improves infrastructure, and drives community wellness.
          </p>
        </div>

        {/* Infographic block cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="community-grid">
          {impacts.map((imp) => (
            <div
              key={imp.id}
              className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8 rounded-2xl flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-all duration-300"
            >
              <div>
                <div className="p-3 bg-[#0A2342]/5 border border-[#0A2342]/10 rounded-xl w-fit group-hover:bg-[#D4AF37]/15 transition-colors mb-6">
                  {imp.icon}
                </div>
                <h3 className="font-sans font-bold text-lg text-[#0A2342] mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {imp.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light mb-6">
                  {imp.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-gray-400">Impact Metric</span>
                <span className="text-sm font-extrabold text-[#D4AF37] bg-[#0A2342]/5 px-2.5 py-1 rounded-md">
                  {imp.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Quote banner */}
        <div className="mt-16 bg-[#0A2342] rounded-2xl p-8 sm:p-12 relative overflow-hidden text-center text-white border border-[#D4AF37]/35 shadow-xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full filter blur-2xl pointer-events-none" />
          <p className="font-sans text-base sm:text-lg italic leading-relaxed max-w-3xl mx-auto font-light">
            "Real estate in Nigeria should represent more than concrete blocks. It is an act of legacy construction. We focus our energy on lifting the communities where we build."
          </p>
          <div className="mt-6 flex flex-col items-center">
            <span className="font-sans font-bold text-sm text-[#D4AF37]">Adewale Adeniyi</span>
            <span className="text-[10px] uppercase font-mono text-gray-300 tracking-wider mt-1">Managing Developer, Headstone Realty</span>
          </div>
        </div>

      </div>
    </section>
  );
}
