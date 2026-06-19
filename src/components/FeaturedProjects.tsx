import React, { useState } from "react";
import { FEATURED_PROPERTIES } from "../data";
import { PropertyListing } from "../types";
import { 
  MapPin, 
  Tag, 
  Maximize2, 
  Compass, 
  Coins, 
  FileText, 
  Info, 
  Calendar,
  X,
  Phone
} from "lucide-react";

interface FeaturedProjectsProps {
  onOpenBooking: (propertyName?: string) => void;
  filteredType: string;
  filteredBudget: string;
}

export default function FeaturedProjects({ onOpenBooking, filteredType, filteredBudget }: FeaturedProjectsProps) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [activePropertyTab, setActivePropertyTab] = useState<"features" | "finance" | "floorplan">("features");

  // Multi-tier search and budget filtering
  const filteredListings = FEATURED_PROPERTIES.filter((listing) => {
    // Type Filter
    if (filteredType && listing.type !== filteredType) return false;

    // Budget Filter
    if (filteredBudget) {
      if (filteredBudget === "under20m" && listing.price >= 20000000) return false;
      if (filteredBudget === "20m-50m" && (listing.price < 20000000 || listing.price > 50000000)) return false;
      if (filteredBudget === "above50m" && listing.price <= 50000000) return false;
    }

    return true;
  });

  return (
    <section id="projects" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block font-mono mb-2">Vetted Ibadan Developments</span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-[#0A2342] tracking-tight">
              Explore Our Signature Property Portfolio
            </h2>
          </div>
          <p className="text-xs text-gray-500 max-w-sm mt-4 md:mt-0 leading-relaxed font-light">
            Each project represents our strict dedication to superior craftsmanship, regularized titles, and locations that capture high capital appreciation.
          </p>
        </div>

        {/* Listings Layout */}
        {filteredListings.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 font-sans text-sm text-gray-500">
            <p className="font-semibold text-gray-700">No properties matched your exact filter parameters.</p>
            <p className="text-xs text-gray-400 mt-1">Please talk to our AI Investment Advisor to outline customized options.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" id="projects-grid">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:border-gray-200 transition-all duration-300 duration-500 flex flex-col"
              >
                {/* Image Section with badges */}
                <div className="relative overflow-hidden h-[240px] sm:h-[300px]">
                  <img
                    src={listing.imageUrl}
                    alt={listing.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5" />

                  {/* Top-row status badge */}
                  <div className="absolute top-4 left-4 bg-[#0A2342] text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-md border border-[#D4AF37]/50 shadow-md">
                    {listing.type}
                  </div>

                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#0A2342] text-[10px] font-extrabold tracking-wider uppercase py-1 px-3 rounded-md shadow-md">
                    {listing.status}
                  </div>

                  {/* Left bottom inline location */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
                    <MapPin className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
                    <span className="text-xs font-semibold drop-shadow">{listing.location}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#0A2342]">
                      {listing.name}
                    </h3>
                    <span className="text-sm font-bold text-[#D4AF37] whitespace-nowrap bg-[#0A2342]/5 border border-[#D4AF37]/20 px-2.5 py-1 rounded-md">
                      {listing.priceString.split(" per")[0]}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-gray-600 leading-relaxed font-light mb-6">
                    {listing.description.substring(0, 150)}...
                  </p>

                  <div className="bg-amber-50/70 border border-amber-200/50 p-4 rounded-xl mb-6">
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block font-mono">Advisory Yield Forecast</span>
                    <p className="text-xs text-[#0A2342] mt-1 italic font-light">"{listing.roiEstimate}"</p>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setSelectedProperty(listing);
                        setActivePropertyTab("features");
                      }}
                      className="py-3 bg-slate-100 hover:bg-[#0A2342] transition-colors hover:text-white rounded-xl text-xs font-semibold text-[#0A2342] text-center flex items-center justify-center gap-2 cursor-pointer"
                      id={`btn-explore-${listing.id}`}
                    >
                      <Info className="h-3.5 w-3.5" />
                      View Project Details
                    </button>
                    <button
                      onClick={() => onOpenBooking(listing.name)}
                      className="py-3 bg-gradient-to-r from-[#D4AF37] to-[#B08D24] text-[#0A2342] font-semibold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 hover:shadow-md"
                    >
                      Secure Plot Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Property Deep Dive Overlay Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in" id="property-detail-overlay">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            {/* Header banner image inside modal */}
            <div className="relative h-[180px] sm:h-[260px] w-full">
              <img
                src={selectedProperty.imageUrl}
                alt={selectedProperty.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 p-2 bg-slate-900/40 hover:bg-[#D4AF37] text-white hover:text-[#0A2342] rounded-full backdrop-blur-sm transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-5 left-6 text-white">
                <div className="inline-block bg-[#D4AF37] text-[#0A2342] text-[9px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider mb-2">
                  {selectedProperty.type} • {selectedProperty.status}
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold drop-shadow">
                  {selectedProperty.name}
                </h3>
                <p className="text-xs text-gray-200 mt-1 flex items-center gap-1.5 drop-shadow">
                  <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" /> {selectedProperty.location}
                </p>
              </div>
            </div>

            {/* Modal Navigation */}
            <div className="border-b border-gray-150 px-6 sm:px-8 py-3 flex gap-4 overflow-x-auto bg-gray-50">
              <button
                onClick={() => setActivePropertyTab("features")}
                className={`py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 relative ${
                  activePropertyTab === "features" ? "text-[#0A2342]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Compass className="h-4 w-4 text-[#D4AF37]" /> Core Features & Title
                {activePropertyTab === "features" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
              </button>
              <button
                onClick={() => setActivePropertyTab("finance")}
                className={`py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 relative ${
                  activePropertyTab === "finance" ? "text-[#0A2342]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Coins className="h-4 w-4 text-[#D4AF37]" /> Payment Schemes & Deposits
                {activePropertyTab === "finance" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
              </button>
              <button
                onClick={() => setActivePropertyTab("floorplan")}
                className={`py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 relative ${
                  activePropertyTab === "floorplan" ? "text-[#0A2342]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <FileText className="h-4 w-4 text-[#D4AF37]" /> Site Map & Satellite
                {activePropertyTab === "floorplan" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
              </button>
            </div>

            {/* Modal Body Contents */}
            <div className="px-6 sm:px-8 py-6">
              
              {activePropertyTab === "features" && (
                <div className="animate-in fade-in duration-300">
                  <h4 className="font-sans font-bold text-sm text-[#0A2342] mb-3">Project Description</h4>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed font-light mb-6">
                    {selectedProperty.description}
                  </p>

                  <h4 className="font-sans font-bold text-sm text-[#0A2342] mb-3">Estate Infrapoints</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProperty.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-600">
                        <span className="h-2 w-2 rounded-full bg-[#D4AF37] border border-[#0A2342]/10" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePropertyTab === "finance" && (
                <div className="animate-in fade-in duration-300">
                  <h4 className="font-sans font-bold text-sm text-[#0A2342] mb-2">Pricing Framework</h4>
                  <p className="text-xs text-gray-500 mb-6 font-light">
                    Every property undergoes strict price regulation with a flexible roadmap tailored to safeguard investors.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="border border-gray-150 p-4 rounded-xl bg-slate-50">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-mono">Outright Purchase</span>
                      <span className="text-base font-bold text-[#0A2342] block mt-1">
                        ₦{selectedProperty.price.toLocaleString()}
                      </span>
                      <p className="text-[10px] text-gray-500 mt-2 font-light">Immediate 100% layout transfer. Includes a 5% outright premium waiver discount.</p>
                    </div>

                    <div className="border border-gray-150 p-4 rounded-xl">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-mono">6-Month Installment</span>
                      <span className="text-base font-bold text-[#0A2342] block mt-1">
                        ₦{Math.round(selectedProperty.price * 1.05).toLocaleString()}
                      </span>
                      <p className="text-[10px] text-gray-500 mt-2 font-light">20% commitment deposit, with remaining divided equally over 6 months.</p>
                    </div>

                    <div className="border border-gray-150 p-4 rounded-xl">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-mono">12-Month Installment</span>
                      <span className="text-base font-bold text-[#0A2342] block mt-1">
                        ₦{Math.round(selectedProperty.price * 1.10).toLocaleString()}
                      </span>
                      <p className="text-[10px] text-gray-500 mt-2 font-light">Custom financial allocation blueprint for corporate syndicates and families.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0A2342]/5 border border-[#D4AF37]/30 rounded-xl flex gap-3">
                    <Coins className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-sans font-bold text-xs text-[#0A2342]">Transparent Legal & Allocation Documentation Statement</h5>
                      <p className="text-[10px] text-gray-600 mt-1 leading-relaxed font-light">
                        Prices cover physical infrastructure allocation. Mandatory standard fees like Land Survey draft (₦350,000), Development Levy (₦500,000), and Deed of Assignment execution (₦150,000) are fully pre-disclosed during documentation. Zero hidden charges.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activePropertyTab === "floorplan" && (
                <div className="animate-in fade-in duration-300">
                  <h4 className="font-sans font-bold text-sm text-[#0A2342] mb-3">Simulated Cadastral Survey & Position Coordinates</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-light mb-4">
                    The block coordinates are processed directly within Oyo State GIS systems for complete dispute-free assurance.
                  </p>

                  {/* Mock Cadet Layout Graphic representation of plotting */}
                  <div className="bg-slate-900 border border-[#D4AF37]/50 rounded-xl p-6 text-center text-white flex flex-col items-center justify-center min-h-[180px] relative overflow-hidden">
                    {/* SVG abstract cadastre layout */}
                    <div className="absolute inset-0 opacity-15">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>

                    <Compass className="h-8 w-8 text-[#D4AF37] mb-2 z-10 animate-spin" style={{ animationDuration: "12s" }} />
                    <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] z-10 uppercase">
                      GPS: {selectedProperty.mapCoordinates.lat}° N, {selectedProperty.mapCoordinates.lng}° E
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 mt-1 z-10">
                      Ibadan Cadastral Chart Zone - Sector B47/Oyo
                    </span>

                    <div className="grid grid-cols-4 gap-2 mt-4 w-full max-w-sm z-10">
                      <div className="p-2 border border-white/15 bg-white/5 rounded text-[10px] font-mono">PLOT 01 - Sold</div>
                      <div className="p-2 border border-[#D4AF37] bg-[#D4AF37]/10 rounded text-[10px] font-mono text-[#D4AF37]">PLOT 02 - Open</div>
                      <div className="p-2 border border-white/15 bg-white/5 rounded text-[10px] font-mono">PLOT 03 - Sold</div>
                      <div className="p-2 border border-[#D4AF37] bg-[#D4AF37]/10 rounded text-[10px] font-mono text-[#D4AF37]">PLOT 04 - Open</div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Actions */}
            <div className="border-t border-gray-150 px-6 sm:px-8 py-5 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 bg-emerald-500 rounded-full w-2 animate-ping" />
                <span className="text-xs text-gray-500 font-mono">Senior advisor ready at Cocoa House</span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="px-5 py-3 hover:bg-gray-200 text-xs font-semibold text-[#0A2342] rounded-xl transition-all cursor-pointer flex-grow sm:flex-grow-0"
                >
                  Close Window
                </button>
                <button
                  onClick={() => {
                    const name = selectedProperty.name;
                    setSelectedProperty(null);
                    onOpenBooking(name);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B08D24] text-[#0A2342] font-bold text-xs tracking-wider uppercase rounded-xl hover:shadow-lg transition-all cursor-pointer flex-grow sm:flex-grow-0"
                >
                  Reserve Plot Now
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
