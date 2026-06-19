import React, { useState } from "react";
import { CORE_SERVICES } from "../data";
import { ServiceItem } from "../types";
import { 
  Home, 
  Building2, 
  Map, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Plus, 
  X, 
  CalendarRange 
} from "lucide-react";

interface ServicesSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Return the appropriate Lucide icon by name
  const renderServiceIcon = (iconName: string) => {
    const iconClass = "h-7 w-7 text-[#D4AF37]";
    switch (iconName) {
      case "Home":
        return <Home className={iconClass} />;
      case "Building2":
        return <Building2 className={iconClass} />;
      case "Map":
        return <Map className={iconClass} />;
      case "Briefcase":
        return <Briefcase className={iconClass} />;
      case "TrendingUp":
        return <TrendingUp className={iconClass} />;
      case "ShieldCheck":
        return <ShieldCheck className={iconClass} />;
      default:
        return <Home className={iconClass} />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#0A2342] text-white relative overflow-hidden">
      {/* Absolute decorative backdrops */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest font-mono">Comprehensive Real Estate Capabilites</span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-3">
            Constructing Future Landscapes. <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white via-white to-[#D4AF37] bg-clip-text text-transparent">Securing Lasting Wealth.</span>
          </h2>
          <div className="h-1 w-20 bg-[#D4AF37] mx-auto mt-6" />
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="services-grid">
          {CORE_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="group bg-gradient-to-b from-[#11325a] to-[#0d284a] rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-[#D4AF37]/35 shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Gold border decorative line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex justify-between items-start mb-6">
                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#D4AF37]/10 transition-colors">
                  {renderServiceIcon(service.iconName)}
                </div>
                <span className="text-xs font-mono font-bold text-gray-500 group-hover:text-[#D4AF37] transition-colors">
                  0{index + 1}
                </span>
              </div>

              <h3 className="font-sans font-bold text-lg text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                {service.title}
              </h3>

              <p className="font-sans text-xs text-gray-300 leading-relaxed font-light mb-6">
                {service.shortDescription}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/15">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-gray-300 group-hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Learn More Inside
                  <ArrowRight className="h-3 w-3" />
                </button>
                <button
                  onClick={() => onOpenBooking(service.title)}
                  className="p-2 bg-white/5 hover:bg-[#D4AF37] hover:text-[#0A2342] text-[#D4AF37] rounded-lg transition-colors cursor-pointer"
                  title="Book immediate consult"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Callback Pitch Box */}
        <div className="mt-16 bg-gradient-to-r from-[#11325a] via-slate-900 to-[#11325a] rounded-2xl p-6 sm:p-10 border border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center sm:text-left">
            <h4 className="font-sans font-bold text-white text-lg">Require a Customized Building or Land Valuation?</h4>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed">
              Our direct valuation surveyors carry out custom layouts, surveyor planning drafts, and legal tracking directly from Cocoa House, Ibadan. Speak to our principal surveyor.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking("Property Consultation")}
            className="px-6 py-3.5 bg-[#D4AF37] text-[#0A2342] hover:bg-white hover:text-[#0A2342] font-semibold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-md shadow-[#D4AF37]/10"
            id="services-surveyor-btn"
          >
            Contact Principal Surveyor
          </button>
        </div>

      </div>

      {/* Service Detail Dynamic Modal (Gassmorphism Layout) */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in" id="service-overlay-modal">
          <div className="bg-slate-900 border border-[#D4AF37]/50 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full filter blur-2xl pointer-events-none" />

            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#D4AF37]/15 rounded-lg border border-[#D4AF37]/30">
                  {renderServiceIcon(selectedService.iconName)}
                </div>
                <h3 className="font-sans font-bold text-xl text-white">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                id="close-service-modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="font-sans text-sm text-gray-200 leading-relaxed mb-6 font-light">
              {selectedService.fullDescription}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
              Included Deliverables & Highlights
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {selectedService.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full shrink-0" />
                  {feature}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10 justify-end">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-3 hover:bg-white/5 text-xs font-semibold text-gray-300 rounded-lg transition-colors cursor-pointer"
              >
                Dismiss Window
              </button>
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onOpenBooking(title);
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B08D24] text-[#0A2342] font-semibold text-xs tracking-wide rounded-lg hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                id="modal-service-book-btn"
              >
                <CalendarRange className="h-4 w-4" />
                Book Consult for {selectedService.title.split(" ")[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
