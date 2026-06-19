import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Award, 
  Handshake, 
  FileText, 
  Scale, 
  Landmark,
  ArrowRight,
  Sparkles,
  Users,
  Palette,
  Printer
} from "lucide-react";

export default function AboutPage() {
  const [activeMilestone, setActiveMilestone] = useState("m4");

  const timelines = [
    {
      id: "m1",
      year: "2017",
      title: "The Creative Foundation",
      desc: "Launched Geopenny Concept as a boutique creative studio in Ibadan, specializing in custom logos, brand identity booklets, and express high-definition printing solutions for local micro-enterprises."
    },
    {
      id: "m2",
      year: "2020",
      title: "Real Estate Integration",
      desc: "Expanded into property advisory and layout brokerage. We established a rigorous verification system to ensure all land parcels sold are pre-vetted with zero local or government encumbrances."
    },
    {
      id: "m3",
      year: "2023",
      title: "Custodian Property Solutions",
      desc: "Pioneered specialized tenant vetting and automated rent administration workflows, becoming a reliable local property manager of choice for landlords based both in Nigeria and the diaspora."
    },
    {
      id: "m4",
      year: "2026",
      title: "Unified Multi-Service Leader",
      desc: "Established Geopenny Global Concept as a multi-sector leader, consolidating properties management, creative design, large-format printing, and commercial merchandise sourcing under one unified contract desk."
    }
  ];

  const brandValues = [
    {
      title: "Absolute Integrity",
      desc: "We prioritize honest advice over quick sales. Whether measuring land coordinates or configuring ink resolution, our commitments remain transparent."
    },
    {
      title: "Aesthetic Precision",
      desc: "Our printing and design studio sets stellar local benchmarks. We treat your corporate stationery, folders, and rollup banners as customized masterpieces."
    },
    {
      title: "Local Market Mastery",
      desc: "We leverage deep administrative insights regarding Oyo State land regularizations and Ibadan business growth patterns to deliver maximum asset values."
    }
  ];

  const executiveTeam = [
    {
      name: "Prince Kolawole Alao",
      role: "Founder & Chief Executive Office",
      bio: "An energetic entrepreneur with over 12 years of hands-on experience in corporate branding, procurement pipelines, and strategic real estate hedging. Directs Geopenny's physical expansion plans.",
      accent: "bg-[#0B1F3A] text-white"
    },
    {
      name: "Engr. Victoria Adeleye",
      role: "Operations & Facility Management Director",
      bio: "A certified civil engineer overseeing structural audits, preventative maintenance, and strict tenant vetting cycles across our managed apartments in Ibadan.",
      accent: "bg-[#D4AF37] text-slate-950"
    },
    {
      name: "Mr. Femi Shonibare",
      role: "Principal Creative Lead",
      bio: "A highly talented typographer and visual designer who graduated with top honors. Directs our state-of-the-art print run workflows and corporate branding briefs.",
      accent: "bg-slate-900 text-[#D4AF37]"
    }
  ];

  return (
    <div className="animate-in fade-in duration-300 font-sans text-left">
      
      {/* 1. HERO HEADER BANNER */}
      <section className="bg-[#0B1F3A] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] to-[#040e1b] pointer-events-none" />
        <div className="absolute top-10 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">Value • Creativity • Trust</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            About Geopenny Global Concept
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            We are a professional multi-service company based in Ibadan, Oyo State, Nigeria, offering an integrated approach to properties, visual designs, and corporate supplies.
          </p>
        </div>
      </section>

      {/* 2. CORPORATE HISTORY & CHRONICLES */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Core Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block font-mono">Our Chronicles</span>
              <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-[#0B1F3A] leading-tight tracking-tight">
                Simplifying Property Transactions & Strengthening Brands
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                Geopenny Global Concept was founded with a clear, ambitious mission: to establish a reliable, high-integrity service terminal addressing two critical headaches in the Southwestern Nigerian market—scam-prone real estate and low-quality, delayed marketing prints.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                By housing expert land surveyors, licensed property legal consultants, advanced graphic designers, and high-precision print engineers in one integrated service network, we guarantee a completely secure, frictionless corporate execution flow for local business operators and diaspora clients alike.
              </p>

              {/* Pillars list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                {brandValues.map((v, idx) => (
                  <div key={idx} className="bg-[#F7F9FC] border border-gray-150 p-5 rounded-2xl text-left space-y-2">
                    <h4 className="font-serif text-xs font-bold text-[#0B1F3A]">{v.title}</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-light">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timelines Registry */}
            <div className="lg:col-span-5 bg-[#0B1F3A] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-4">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block font-bold">Milestones Registry</span>
              <div className="space-y-4 text-left">
                {timelines.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveMilestone(t.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex gap-4 ${
                      activeMilestone === t.id 
                        ? "bg-slate-900 border-[#D4AF37] text-white shadow" 
                        : "bg-transparent border-white/5 hover:border-white/20 text-gray-300"
                    }`}
                  >
                    <span className="font-serif text-base font-black text-[#D4AF37] shrink-0">{t.year}</span>
                    <div className="text-left">
                      <h4 className="font-sans font-bold text-xs text-white">{t.title}</h4>
                      {activeMilestone === t.id && (
                        <p className="text-[10px] text-gray-300 font-light mt-1.5 leading-relaxed">
                          {t.desc}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. EXECUTIVE DIRECTORY */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-bold">The Leadership</span>
          <h2 className="font-serif text-3xl font-extrabold text-[#0B1F3A]">Management Directory</h2>
          <p className="text-xs text-gray-500 max-w-xl mx-auto font-light">
            Our multi-disciplinary coordinators secure outstanding service boundaries, ensuring every single plot, print, or supply meets client demands.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {executiveTeam.map((p, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between">
                <div className="space-y-4">
                  <div className={`h-12 w-12 rounded-2xl ${p.accent} flex items-center justify-center font-bold text-base shadow-sm`}>
                    {p.name.split(" ").slice(-2).map(n => n[0]).join("")}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-serif font-bold text-base text-[#0B1F3A]">{p.name}</h3>
                    <span className="text-[10px] uppercase font-mono text-[#D4AF37] font-semibold block">{p.role}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {p.bio}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-gray-150 flex items-center gap-1.5 text-[9px] uppercase font-mono text-gray-400 font-bold">
                  <ShieldCheck className="h-4 w-4 text-[#D4AF37]" /> Signed Executive Delegate
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MISSION COMPLIANCE MANIFESTO */}
      <section className="py-16 md:py-24 bg-[#0B1F3A] text-white relative">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block font-bold">Operating Manifesto</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white mt-1">Our Six-Point Quality Guard</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-[#D4AF37] font-mono">01</span>
              <h4 className="font-serif text-sm font-bold">Approved Survey Plan Only</h4>
              <p className="text-[11px] text-gray-400 font-light">Every single plot marketed undergoes complete boundary checks before display.</p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-[#D4AF37] font-mono">02</span>
              <h4 className="font-serif text-sm font-bold">Zero Omo-Onile Encumbrance</h4>
              <p className="text-[11px] text-gray-400 font-light">We register allocations directly under modern gated frameworks to guarantee security.</p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-[#D4AF37] font-mono">03</span>
              <h4 className="font-serif text-sm font-bold">Aesthetic Brand Standards</h4>
              <p className="text-[11px] text-gray-400 font-light">Every mockup files created on the creative desk complies with corporate guides.</p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-[#D4AF37] font-mono">04</span>
              <h4 className="font-serif text-sm font-bold">High Density Heavy Prints</h4>
              <p className="text-[11px] text-gray-400 font-light">We use premium paper stocks and state-of-the-art inkjets to deliver exact colors.</p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-[#D4AF37] font-mono">05</span>
              <h4 className="font-serif text-sm font-bold">Procurement Timeline Guard</h4>
              <p className="text-[11px] text-gray-400 font-light">No late distributions. Bulk corporate merchandise delivers within strict windows.</p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-[#00A86B] font-mono">06</span>
              <h4 className="font-serif text-sm font-bold">Absolute Client Trust</h4>
              <p className="text-[11px] text-gray-400 font-light">We build long-term relationships through absolute integrity and friendly communication.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
