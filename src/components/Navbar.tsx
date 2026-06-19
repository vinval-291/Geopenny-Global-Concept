import React, { useState, useEffect } from "react";
import { Landmark, Menu, X, CalendarRange, Phone, Sparkles } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onSetPage: (page: string) => void;
  onOpenBooking: () => void;
  onOpenAdvisor: () => void;
}

export default function Navbar({ currentPage, onSetPage, onOpenBooking, onOpenAdvisor }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", pageId: "home" },
    { label: "About Us", pageId: "about" },
    { label: "Our Services", pageId: "services" },
    { label: "Properties", pageId: "projects" },
    { label: "Design Portfolio", pageId: "portfolio" },
    { label: "ROI Estimator", pageId: "roi" },
    { label: "Contact Us", pageId: "contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onSetPage(pageId);
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B1F3A]/95 backdrop-blur-md shadow-lg border-b border-[#D4AF37]/20 py-3"
          : "bg-[#0B1F3A] sm:bg-[#0B1F3A]/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between font-sans">
          
          {/* Logo & Branding */}
          <button
            onClick={(e) => handleLinkClick(e, "home")}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
            id="nav-logo"
          >
            <div className="relative p-2 bg-[#0B1F3A] border border-[#D4AF37] rounded-lg shadow-inner overflow-hidden flex items-center justify-center">
              <Landmark className="h-5 w-5 sm:h-6 sm:w-6 text-[#D4AF37]" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white text-sm sm:text-base leading-none">
                GEOPENNY<span className="text-[#D4AF37]"> GLOBAL</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] font-mono text-gray-300 leading-none mt-1">
                Value • Creativity • Trust
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5" id="desktop-menu">
            {navLinks.map((link) => {
              const isActive = currentPage === link.pageId;
              return (
                <button
                  key={link.label}
                  onClick={(e) => handleLinkClick(e, link.pageId)}
                  className={`text-xs font-semibold tracking-wide transition-all duration-200 relative group py-2 cursor-pointer ${
                    isActive ? "text-[#D4AF37]" : "text-gray-200 hover:text-[#D4AF37]"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </button>
              );
            })}
          </nav>

          {/* Call-to-actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenAdvisor}
              className="px-3 py-2 bg-[#0B1F3A]/60 hover:bg-[#0B1F3A] border border-slate-700 hover:border-[#D4AF37] text-white rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              id="btn-nav-advisor"
            >
              <Sparkles className="h-3 w-3 text-[#D4AF37] animate-pulse" />
              Ask AI Agent
            </button>
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B08D24] text-slate-950 font-bold text-xs tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              id="btn-nav-consult"
            >
              <CalendarRange className="h-3.5 w-3.5" />
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenAdvisor}
              className="p-1.5 bg-[#0B1F3A] text-[#D4AF37] border border-[#D4AF37]/20 rounded-lg text-[10px] uppercase font-bold font-mono tracking-wider shadow"
              title="Speak with AI Advisor"
            >
              AI Agent
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
              id="btn-mobile-trigger"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0B1F3A] border-b border-[#D4AF37]/30 shadow-2xl transition-all duration-300 z-40 animate-in fade-in slide-in-from-top-4" id="mobile-drawer">
          <div className="px-4 pt-3 pb-6 space-y-3 bg-[#0B1F3A]">
            <div className="grid grid-cols-1 gap-1 pb-3 border-b border-white/5">
              {navLinks.map((link) => {
                const isActive = currentPage === link.pageId;
                return (
                  <button
                    key={link.label}
                    onClick={(e) => handleLinkClick(e, link.pageId)}
                    className={`block w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive ? "bg-[#D4AF37]/15 text-[#D4AF37]" : "text-gray-200 hover:text-[#D4AF37] hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdvisor();
                }}
                className="w-full py-2.5 bg-slate-900 border border-slate-800 hover:border-[#D4AF37] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                id="btn-mobile-nav-ai"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#D4AF37] animate-pulse" />
                Ask Geopenny AI Agent
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B08D24] text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                id="btn-mobile-nav-consult"
              >
                <CalendarRange className="h-3.5 w-3.5" />
                Book Sourcing Consult
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
