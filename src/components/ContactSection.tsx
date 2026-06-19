import React, { useState, useEffect } from "react";
import { BookingFormInput } from "../types";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Check, 
  Loader2, 
  AlertTriangle,
  Compass,
  FileCheck
} from "lucide-react";

interface ContactSectionProps {
  prefilledService?: string;
  prefilledBudget?: string;
}

export default function ContactSection({ prefilledService = "", prefilledBudget = "" }: ContactSectionProps) {
  const [formData, setFormData] = useState<BookingFormInput>({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedMapPin, setSelectedMapPin] = useState<"office" | "green" | "residences">("office");

  // Sync pre-fills from Property details click trigger
  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledBudget) {
      // Map raw budget number to dropdown option
      const bVal = Number(prefilledBudget);
      let dropdownValue = "";
      if (bVal < 20000000) dropdownValue = "under20m";
      else if (bVal <= 50000000) dropdownValue = "20m-50m";
      else dropdownValue = "above50m";

      setFormData((prev) => ({ ...prev, budget: dropdownValue }));
    }
  }, [prefilledBudget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    // Validate telephone numbers
    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMsg("Please complete the required fields: Full Name, Email, and Phone.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/consultation/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSuccessMsg(data.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          service: "",
          budget: "",
          message: ""
        });
      } else {
        setErrorMsg(data.error || "An error occurred submitting your consult request.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Could not connect to the booking registry. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  const mapLocations = {
    office: {
      name: "Corporate HQ: Cocoa House",
      coord: "Floor 7, Dugbe, Ibadan, Oyo State, Nigeria",
      desc: "Our primary consultation hub. Meet our Advisory Directors for physical paperwork signing, survey inspections, and file checks."
    },
    green: {
      name: "Green Valley Estate",
      coord: "Akobo Ext Corridor, Ibadan",
      desc: "Ongoing residential physical allocation inspections. Fully gated secure access with guides."
    },
    residences: {
      name: "Heritage Court Duplexes",
      coord: "Alao-Akala Way, Ring Road bypass",
      desc: "Architectural duplex structural layouts. Schedule custom smart walkthrough inspections with engineering team."
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Coordinates details & Interactive Vector Map */}
          <div className="lg:col-span-5 space-y-8" id="contact-info-panel">
            <div>
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest font-mono block">Direct Channels</span>
              <h2 className="font-sans text-3xl font-bold text-[#0A2342] mt-2">
                Connect With Our Advisors Inside Cocoa House
              </h2>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-light">
                Secure property purchasing requires seasoned structural clarity. Reach us directly at our headquarters or call for verified land tours.
              </p>
            </div>

            {/* Office Contact details */}
            <div className="space-y-4" id="address-block">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-150">
                <MapPin className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#0A2342]">Headquarters Address</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Floor 7, Cocoa House, Dugbe Center, Ibadan, Oyo State, Nigeria.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-150">
                <Phone className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#0A2342]">Telephone Core lines</h4>
                  <p className="text-xs text-gray-600 mt-1 font-mono">
                    +234 (0) 803 888 2235 <br />
                    +234 (0) 812 444 7792
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-150">
                <Mail className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#0A2342]">Email Channels</h4>
                  <p className="text-xs text-gray-600 mt-1 font-mono">
                    advisory@headstonerealty.ng <br />
                    sales@headstonerealty.ng
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Vector Map (Simulated Satellite Map) */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm" id="map-widget">
              <div className="bg-[#0A2342] text-white px-5 py-3.5 flex justify-between items-center border-b border-[#D4AF37]/35">
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold">Interactive Location Radar</span>
                <span className="text-[10px] text-gray-300 font-mono">Ibadan, Oyo State</span>
              </div>

              {/* Map Selection Tabs */}
              <div className="grid grid-cols-3 gap-1 p-2 bg-gray-50 border-b border-gray-150">
                <button
                  onClick={() => setSelectedMapPin("office")}
                  className={`py-1.5 text-[9px] font-mono rounded uppercase tracking-wider transition-all cursor-pointer ${
                    selectedMapPin === "office" ? "bg-[#0A2342] text-[#D4AF37]" : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  HQ Cocoa House
                </button>
                <button
                  onClick={() => setSelectedMapPin("green")}
                  className={`py-1.5 text-[9px] font-mono rounded uppercase tracking-wider transition-all cursor-pointer ${
                    selectedMapPin === "green" ? "bg-[#0A2342] text-[#D4AF37]" : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  Green Valley
                </button>
                <button
                  onClick={() => setSelectedMapPin("residences")}
                  className={`py-1.5 text-[9px] font-mono rounded uppercase tracking-wider transition-all cursor-pointer ${
                    selectedMapPin === "residences" ? "bg-[#0A2342] text-[#D4AF37]" : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  Heritage Crt
                </button>
              </div>

              {/* Vector representation of Ibadan landmarks */}
              <div className="relative h-[200px] bg-slate-100 flex items-center justify-center overflow-hidden">
                {/* SVG vector roads background */}
                <div className="absolute inset-0 opacity-25">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#000" strokeWidth="3" />
                    <line x1="120" y1="0" x2="120" y2="200" stroke="#000" strokeWidth="2.5" />
                    <line x1="300" y1="0" x2="0" y2="200" stroke="#000" strokeWidth="1.5" />
                    <circle cx="120" cy="50" r="15" fill="none" stroke="#D4AF37" strokeWidth="2" />
                  </svg>
                </div>

                {/* Animated Coordinates map pin overlays */}
                <div className="absolute z-10 flex flex-col items-center">
                  <div className="h-6 w-6 bg-red-600 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg animate-bounce duration-1000">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <span className="p-1.5 bg-[#0A2342] text-[#D4AF37] text-[9px] font-bold uppercase rounded border border-[#D4AF37]/50 shadow mt-1">
                    {selectedMapPin === "office" ? "Cocoa House HQ" : selectedMapPin === "green" ? "Green Valley" : "Heritage Court"}
                  </span>
                </div>
              </div>

              {/* Pin metadata details */}
              <div className="p-4 bg-gray-50 border-t border-gray-150">
                <span className="text-[10px] font-bold text-[#0A2342] block">
                  {mapLocations[selectedMapPin].name}
                </span>
                <span className="text-[9px] font-mono text-gray-400 mt-0.5 block italic">
                  {mapLocations[selectedMapPin].coord}
                </span>
                <p className="text-xs text-gray-600 font-light mt-2 leading-relaxed">
                  {mapLocations[selectedMapPin].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Conversion Form */}
          <div className="lg:col-span-7 bg-white border border-gray-200 shadow-xl rounded-3xl p-6 sm:p-10" id="consultation-form-block">
            <h3 className="font-sans text-xl font-bold text-[#0A2342] mb-2 flex items-center gap-2">
              <Compass className="h-5.5 w-5.5 text-[#D4AF37]" />
              Schedule Advisory Consultation
            </h3>
            <p className="text-xs text-gray-500 mb-6 font-light">
              Submit your specific goals and an investment advisor will formulate immediate property listings before your physical inspection.
            </p>

            {/* Error messaging Banner */}
            {errorMsg && (
              <div className="p-3.5 bg-red-55/65 border border-red-200 rounded-xl flex gap-2.5 items-start text-xs text-red-700 font-medium mb-6">
                <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success messaging Banner */}
            {successMsg && (
              <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-xl flex gap-3 text-xs text-emerald-800 mb-6">
                <FileCheck className="h-5.5 w-5.5 text-emerald-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-sm">Consultation Reserved!</h5>
                  <p className="mt-1 leading-relaxed font-light">{successMsg}</p>
                </div>
              </div>
            )}

            {/* Main Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kolawole Alao"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full h-11 border border-gray-300 rounded-lg text-sm px-3 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alao@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 border border-gray-300 rounded-lg text-sm px-3 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-1.5">
                    Phone line (WhatsApp preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +234 803 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 border border-gray-300 rounded-lg text-sm px-3 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-1.5">
                    Target service sector
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full h-11 border border-gray-300 bg-white rounded-lg text-sm px-3 focus:outline-none focus:border-[#D4AF37] transition-all"
                  >
                    <option value="">General Property Consultation</option>
                    <option value="Residential Property Development">Residential Property Development</option>
                    <option value="Land Acquisition & Sales">Land Acquisition & Sales</option>
                    <option value="Real Estate Investment Advisory">Real Estate Investment Advisory</option>
                    <option value="Property Management">Property Management</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-1.5">
                  Target investment budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full h-11 border border-gray-300 bg-white rounded-lg text-sm px-3 focus:outline-none focus:border-[#D4AF37] transition-all"
                >
                  <option value="">Choose Budget Frame</option>
                  <option value="under20m">Below ₦20,000,000</option>
                  <option value="20m-50m">₦20,000,000 - ₦50,000,000</option>
                  <option value="above50m">Above ₦50,000,000</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-1.5">
                  What particulars are you seeking to verify/acquire?
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about the property features or timeline queries you have."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg text-sm p-3 focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#0A2342] text-white hover:bg-[#D4AF37] hover:text-[#0A2342] font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#0A2342]/10 disabled:opacity-50"
                id="btn-submit-lead-form"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Connecting Cocoa House Registry...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" /> Securing Advisor Appointment
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
