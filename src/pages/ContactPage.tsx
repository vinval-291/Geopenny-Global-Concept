import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Check, 
  Loader2, 
  AlertTriangle, 
  Compass, 
  FileCheck,
  Calendar,
  Layers,
  Database,
  UserCheck,
  User,
  Activity
} from "lucide-react";
import { BookingFormInput } from "../types";

interface ContactPageProps {
  prefilledService?: string;
  prefilledBudget?: string;
  registeredConsultations: any[];
  onAddConsultation: (consultation: any) => void;
}

export default function ContactPage({ 
  prefilledService = "", 
  prefilledBudget = "",
  registeredConsultations,
  onAddConsultation
}: ContactPageProps) {
  
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

  // Sync pre-fills from ROI Calculator or Property details click trigger
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

    // Validate
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
        
        // Add to our real-time session list state
        const generatedId = "GEOP-" + Math.floor(1000 + Math.random() * 9000);
        const generatedDate = new Date();
        const dateString = generatedDate.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric"
        });

        const newConsultation = {
          id: generatedId,
          fullName: formData.fullName,
          service: formData.service || "General Consulting Services",
          budget: formData.budget === "under20m" ? "Below ₦20M" : formData.budget === "20m-50m" ? "₦20M - ₦50M" : "Above ₦50M",
          date: dateString,
          status: "Cleared for Vetting",
          assignedAdvisor: "Senior Advisor Babalola, Oyo Desk A"
        };
        
        onAddConsultation(newConsultation);

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
      coord: "Floor 4, Cocoa House, Dugbe, Ibadan, Oyo State, Nigeria",
      desc: "Our primary consultation hub. Meet our Advisory Directors for physical paperwork signing, custom printing material approvals, and layout documents check."
    },
    green: {
      name: "Green Valley Estate Layout",
      coord: "Akobo Ext Corridor, Ibadan",
      desc: "Ongoing gated layout physical allocation inspections. Fully secure perimeter access tours."
    },
    residences: {
      name: "Heritage Court Residences",
      coord: "Alao-Akala Bypass, Ring Road, Ibadan",
      desc: "Completed & architectural duplex layouts. Schedule walkthrough inspections directly with our physical engineering desk."
    }
  };

  return (
    <div className="animate-in fade-in duration-300 font-sans text-left">
      
      {/* 1. HERO HEADER */}
      <section className="bg-[#0B1F3A] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-900/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-bold">Direct Channels</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">Join Secure Consultations</h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            We sign deeds, inspect sites, and design creative materials directly from Cocoa House, Ibadan. Schedule your verification meeting today.
          </p>
        </div>
      </section>

      {/* 2. MAIN INTERACTIVE CONTACT SECTION */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Coordinates & Maps */}
            <div className="lg:col-span-5 space-y-8" id="contact-coordinates-block">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#0B1F3A]">Connect With Geopenny</h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Protect your real estate and design capital with Ibadan's vetted multi-service experts. Book a verified consultation inside our office boardrooms.
                </p>
              </div>

              {/* Direct Channels */}
              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex gap-4 p-4 bg-slate-50 border border-gray-150 rounded-2xl">
                  <MapPin className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#0B1F3A]">Corporate Office</h4>
                    <p className="text-gray-650 leading-relaxed font-light">
                      Suite 3, Floor 4, Cocoa House, Dugbe Center, Ibadan, Oyo State, Nigeria.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-slate-50 border border-gray-150 rounded-2xl">
                  <Phone className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#0B1F3A]">Office Contact Hotlines</h4>
                    <p className="text-gray-650 font-mono font-medium leading-relaxed">
                      +234 (0) 813 555 7792 <br />
                      +234 (0) 803 123 4567
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-slate-50 border border-gray-150 rounded-2xl">
                  <Mail className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#0B1F3A]">Electronic Support Channels</h4>
                    <p className="text-gray-650 font-mono font-medium leading-relaxed">
                      info@geopennyglobal.com <br />
                      advisory@geopennyglobal.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Map Simulation */}
              <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm" id="radar-map-block">
                <div className="bg-[#0B1F3A] text-white px-5 py-3 flex justify-between items-center border-b border-[#D4AF37]/35">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold">Interactive Location Radar</span>
                  <span className="text-[10px] text-[#D4AF37] font-mono font-bold">Ibadan Oyo</span>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-50 border-b border-gray-150">
                  <button
                    onClick={() => setSelectedMapPin("office")}
                    className={`py-1.5 text-[9px] font-mono rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                      selectedMapPin === "office" ? "bg-[#0B1F3A] text-[#D4AF37] font-bold" : "text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    Cocoa House HQ
                  </button>
                  <button
                    onClick={() => setSelectedMapPin("green")}
                    className={`py-1.5 text-[9px] font-mono rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                      selectedMapPin === "green" ? "bg-[#0B1F3A] text-[#D4AF37] font-bold" : "text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    Green Valley
                  </button>
                  <button
                    onClick={() => setSelectedMapPin("residences")}
                    className={`py-1.5 text-[9px] font-mono rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                      selectedMapPin === "residences" ? "bg-[#0B1F3A] text-[#D4AF37] font-bold" : "text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    Heritage Loop
                  </button>
                </div>

                <div className="h-44 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%">
                      <line x1="0" y1="40" x2="400" y2="40" stroke="#000" strokeWidth="2.5" />
                      <line x1="140" y1="0" x2="140" y2="200" stroke="#000" strokeWidth="2" />
                      <circle cx="140" cy="40" r="12" fill="none" stroke="#D4AF37" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="absolute z-10 flex flex-col items-center">
                    <MapPin className="h-6 w-6 text-red-600 animate-bounce" />
                    <span className="p-1 bg-[#0B1F3A] text-[#D4AF37] text-[8px] font-bold uppercase rounded border border-[#D4AF37]/50 mt-1">
                      {selectedMapPin === "office" ? "Floor 4, Cocoa House" : selectedMapPin === "green" ? "Akobo Sector" : "Alao Akala route"}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-gray-150 text-left">
                  <span className="text-[10px] font-bold text-[#0B1F3A] block">{mapLocations[selectedMapPin].name}</span>
                  <span className="text-[9px] font-mono text-gray-400 block mt-0.5 italic">{mapLocations[selectedMapPin].coord}</span>
                  <p className="text-xs text-gray-600 mt-2 font-light leading-relaxed">{mapLocations[selectedMapPin].desc}</p>
                </div>
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-7 bg-white border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-10" id="scheduler-form-block">
              <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-1 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-[#D4AF37]" /> Reserve Strategic Consultations
              </h3>
              <p className="text-xs text-gray-500 mb-6 font-light">
                Submit raw credentials and target parameters to coordinate direct physical sessions with our division partners.
              </p>

              {errorMsg && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex gap-2.5 items-start text-xs text-red-700 font-medium mb-5">
                  <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex gap-2.5 items-start text-xs text-emerald-800 mb-5">
                  <FileCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">Consultation Filed!</h5>
                    <p className="mt-0.5 leading-relaxed font-light">{successMsg}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider font-mono text-gray-500 mb-1.5 font-bold">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kolawole Alao"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full h-11 border border-gray-300 rounded-xl text-xs px-3 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider font-mono text-gray-500 mb-1.5 font-bold">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alao@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 border border-gray-300 rounded-xl text-xs px-3 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider font-mono text-gray-500 mb-1.5 font-bold">Phone (WhatsApp preferred) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 812 345 6789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 border border-gray-300 rounded-xl text-xs px-3 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider font-mono text-gray-500 mb-1.5 font-bold">Division Channel</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full h-11 border border-gray-300 bg-white rounded-xl text-xs px-3 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="">General Consulting Services</option>
                      <option value="Real Estate Properties Acquisition">Real Estate Properties Acquisition</option>
                      <option value="Precision Graphic Design & Branding">Precision Graphic Design & Branding</option>
                      <option value="Industrial Print Production">Industrial Print Production</option>
                      <option value="General Corporate Procurement">General Corporate Procurement</option>
                      <option value="Facility Tenant Management">Facility Tenant Management</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider font-mono text-gray-500 mb-1.5 font-bold">Estimated Budget Frame</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full h-11 border border-gray-300 bg-white rounded-xl text-xs px-3 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                  >
                    <option value="">Choose Budget Frame</option>
                    <option value="under20m">Below ₦20,000,000</option>
                    <option value="20m-50m">₦20,000,000 - ₦50,000,000</option>
                    <option value="above50m">Above ₦50,000,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider font-mono text-gray-500 mb-1.5 font-bold">Briefly explain your project context or order requests</label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about survey verification, design dimensions, print volumes, file sizes or desired inspection dates."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl text-xs p-3 focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-[#0B1F3A] hover:bg-[#D4AF37] hover:text-[#0B1F3A] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> REGISTERING ADVISORY SPOT...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" /> SECURE ADVISORY SLOT
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

          {/* CRM DATABASE LEDGER */}
          <div className="mt-16 bg-[#071324] text-white border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5 mb-6">
              <div>
                <span className="text-[10px] text-[#D4AF37] font-mono tracking-widest uppercase flex items-center gap-2 font-bold">
                  <Database className="h-4 w-4 text-[#D4AF37]" /> Active Consultation Registry ledgers
                </span>
                <h4 className="font-serif text-lg text-white font-bold mt-1">Real-Time Allocation Status Verification</h4>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 py-1 px-3 rounded-full">
                <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono text-[#D4AF37] uppercase font-bold">Connected (Floor 4)</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 font-light leading-normal max-w-2xl mb-6 text-left">
              To guarantee total transparency, every prospective booking filed under our registry is assigned a unique tracking footprint. Verified surveyor schedules can be monitored below.
            </p>

            <div className="overflow-x-auto select-none text-left">
              <table className="w-full text-left border-collapse text-xs min-w-[650px]">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 font-mono text-[9px] uppercase">
                    <th className="py-2.5 pl-2">ID Tracker</th>
                    <th className="py-2.5">Proponent Client</th>
                    <th className="py-2.5">Requested Section</th>
                    <th className="py-2.5">Budget Class</th>
                    <th className="py-2.5">Registry Date</th>
                    <th className="py-2.5">Advisor Assignee</th>
                    <th className="py-2.5 pr-2 text-right">Approval Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {registeredConsultations.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors text-xs text-gray-200">
                      <td className="py-3 pl-2 font-mono text-emerald-405 text-emerald-400 font-semibold">{item.id}</td>
                      <td className="py-3 font-semibold flex items-center gap-1.5 font-sans">
                        <div className="h-6 w-6 rounded-full bg-slate-800 text-[#D4AF37] text-[9px] flex items-center justify-center font-black uppercase">
                          {item.fullName.split(" ").map((n: string) => n[0]).join("") || "C"}
                        </div>
                        {item.fullName}
                      </td>
                      <td className="py-3 text-gray-300 font-sans">{item.service}</td>
                      <td className="py-3 font-mono font-medium text-gray-350 text-gray-300">{item.budget || "Unspecified"}</td>
                      <td className="py-3 font-mono text-gray-400">{item.date}</td>
                      <td className="py-3 text-gray-300 font-light">{item.assignedAdvisor}</td>
                      <td className="py-3 pr-2 text-right">
                        <span className="inline-flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-semibold py-0.5 px-2.5 rounded-full">
                          <Check className="h-3 w-3" strokeWidth={3} /> {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Default row if list empty */}
                  {registeredConsultations.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-gray-500 font-mono text-[10px]">
                        No local consultations filed in this session. Complete the form above to record your slot.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
