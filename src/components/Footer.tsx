import React, { useState } from "react";
import { Landmark, Facebook, Instagram, Linkedin, Twitter, ArrowUp, Send, Check } from "lucide-react";

interface FooterProps {
  onSetPage: (pageId: string) => void;
}

export default function Footer({ onSetPage }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail) {
      setSuccess(true);
      setNewsEmail("");
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    onSetPage(pageId);
  };

  return (
    <footer className="bg-[#040e1b] border-t border-[#D4AF37]/35 text-white py-16 md:py-20 relative overflow-hidden font-sans" id="footer">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 pb-12 border-b border-white/5">
          
          {/* Column 1: Brand pitch */}
          <div className="lg:col-span-4 space-y-4">
            <button 
              onClick={(e) => handleLinkClick(e, "home")} 
              className="flex items-center gap-2 text-left bg-transparent border-0 p-0 cursor-pointer"
            >
              <div className="p-1.5 bg-white/5 border border-[#D4AF37] rounded-lg">
                <Landmark className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <span className="font-sans font-bold tracking-tight text-white text-base">
                GEOPENNY<span className="text-[#D4AF37]"> GLOBAL</span>
              </span>
            </button>
            
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Designing corporate identities, printing high-quality marketing materials, safeguarding capital real estate assets, and coordinating reliable procurement supplies across Ibadan, Oyo State, Nigeria.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer">
                <Facebook className="h-4 w-4" />
              </span>
              <span className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer">
                <Instagram className="h-4 w-4" />
              </span>
              <span className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer">
                <Linkedin className="h-4 w-4" />
              </span>
              <span className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer">
                <Twitter className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37]">Navigation</h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-gray-400 text-left">
              <button onClick={(e) => handleLinkClick(e, "home")} className="text-left hover:text-[#D4AF37] bg-transparent border-0 p-0 cursor-pointer transition-colors">Home</button>
              <button onClick={(e) => handleLinkClick(e, "about")} className="text-left hover:text-[#D4AF37] bg-transparent border-0 p-0 cursor-pointer transition-colors">About Us</button>
              <button onClick={(e) => handleLinkClick(e, "services")} className="text-left hover:text-[#D4AF37] bg-transparent border-0 p-0 cursor-pointer transition-colors">Our Services</button>
              <button onClick={(e) => handleLinkClick(e, "projects")} className="text-left hover:text-[#D4AF37] bg-transparent border-0 p-0 cursor-pointer transition-colors">Our Properties</button>
              <button onClick={(e) => handleLinkClick(e, "portfolio")} className="text-left hover:text-[#D4AF37] bg-transparent border-0 p-0 cursor-pointer transition-colors">Design Portfolio</button>
              <button onClick={(e) => handleLinkClick(e, "contact")} className="text-left hover:text-[#D4AF37] bg-transparent border-0 p-0 cursor-pointer transition-colors">Contact Office</button>
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37]">Specialist Sectors</h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-gray-400">
              <button onClick={(e) => handleLinkClick(e, "services")} className="text-left hover:text-[#D4AF37] bg-transparent border-0 p-0 cursor-pointer transition-all">Property Sales & Leasing</button>
              <button onClick={(e) => handleLinkClick(e, "services")} className="text-left hover:text-[#D4AF37] bg-transparent border-0 p-0 cursor-pointer transition-all">Property Management</button>
              <button onClick={(e) => handleLinkClick(e, "services")} className="text-left hover:text-[#D4AF37] bg-transparent border-0 p-0 cursor-pointer transition-all">Graphic Design & Branding</button>
              <button onClick={(e) => handleLinkClick(e, "services")} className="text-left hover:text-[#D4AF37] bg-transparent border-0 p-0 cursor-pointer transition-all">High-Grade Printing Services</button>
              <button onClick={(e) => handleLinkClick(e, "services")} className="text-left hover:text-[#D4AF37] bg-transparent border-0 p-0 cursor-pointer transition-all">General Procurement Merchandise</button>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37]">Business Intelligence</h4>
            <p className="text-xs text-gray-400 leading-normal font-light">
              Receive premium property research notices, design trends, printing discounts, and local procurement updates directly.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative flex">
              <input
                type="email"
                required
                placeholder="Work email address"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                className="w-full h-10 bg-white/5 border border-white/10 rounded-lg text-xs px-3 focus:outline-none focus:border-[#D4AF37] pr-10 text-white"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-10 w-10 text-[#0B1F3A] bg-[#D4AF37] hover:bg-white rounded-r-lg transition-colors flex items-center justify-center cursor-pointer"
                title="Subscribe"
              >
                {success ? <Check className="h-4 w-4 bg-emerald-500 rounded p-0.5 text-white" /> : <Send className="h-3.5 w-3.5" />}
              </button>
            </form>
          </div>

        </div>

        {/* Lower row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-mono">
          <span>© {currentYear} Geopenny Global Concept. Oyo State, Nigeria. All Intellectual Assets Reserved.</span>
          
          <button
            onClick={handleScrollUp}
            className="flex items-center gap-1 hover:text-[#D4AF37] transition-all uppercase text-[9px] cursor-pointer bg-transparent border-0 p-0 font-mono text-gray-500"
          >
            Scroll to Top
            <ArrowUp className="h-3.5 w-3.5 bg-white/5 border border-white/10 rounded-full p-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
