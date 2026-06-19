import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GeopennyAIAdvisor from "./components/GeopennyAIAdvisor";

// Import custom page components
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import InvestmentsPage from "./pages/InvestmentsPage";
import ContactPage from "./pages/ContactPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import PortfolioPage from "./pages/PortfolioPage";

interface ConsultationItem {
  id: string;
  fullName: string;
  service: string;
  budget: string;
  date: string;
  status: string;
  assignedAdvisor: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPropertyId, setSelectedPropertyId] = useState("green-valley");

  // Filters state shared across search actions
  const [searchFilters, setSearchFilters] = useState({
    type: "",
    budget: "",
    status: ""
  });

  // Prefill states triggered when clicking allocating/consultation guides
  const [prefilledService, setPrefilledService] = useState("");
  const [prefilledBudget, setPrefilledBudget] = useState("");

  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Real-time ledger of consultations registered during the session
  const [registeredConsultations, setRegisteredConsultations] = useState<ConsultationItem[]>([
    {
      id: "HDST-4290",
      fullName: "Engr. Kunle Shofolarin",
      service: "Land Acquisition & Sales",
      budget: "₦20M - ₦50M",
      date: "14 Jun 2026",
      status: "Cleared for Vetting",
      assignedAdvisor: "Senior Partner Adeniyi, Oyo Desk B"
    },
    {
      id: "HDST-6132",
      fullName: "Mrs. Folashade Ademoye",
      service: "Residential Property Development",
      budget: "Above ₦50M",
      date: "12 Jun 2026",
      status: "Cleared for Vetting",
      assignedAdvisor: "Barr. Amina Balogun, Legal Desk A"
    }
  ]);

  const handleSetPage = (pageId: string) => {
    setCurrentPage(pageId);
    // Instant smooth reset scroll as standard multiple pages transition behavior
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleViewPropertyDetail = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setCurrentPage("property-detail");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleOpenBooking = (serviceName?: string, budgetValue?: string) => {
    if (serviceName) setPrefilledService(serviceName);
    if (budgetValue) setPrefilledBudget(budgetValue);
    handleSetPage("contact");
  };

  const handleAddConsultation = (newItem: ConsultationItem) => {
    setRegisteredConsultations((prev) => [newItem, ...prev]);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home 
            onSetPage={handleSetPage}
            onOpenBooking={handleOpenBooking}
            onOpenAdvisor={() => setIsAdvisorOpen(true)}
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
            activeTestimonialIdx={activeTestimonialIdx}
            setActiveTestimonialIdx={setActiveTestimonialIdx}
            onViewPropertyDetail={handleViewPropertyDetail}
          />
        );
      case "about":
        return <AboutPage />;
      case "services":
        return <ServicesPage onOpenBooking={handleOpenBooking} />;
      case "projects":
        return (
          <ProjectsPage 
            onOpenBooking={handleOpenBooking}
            initialTypeFilter={searchFilters.type}
            initialBudgetFilter={searchFilters.budget}
            onViewPropertyDetail={handleViewPropertyDetail}
          />
        );
      case "property-detail":
        return (
          <PropertyDetailPage 
            propertyId={selectedPropertyId}
            onSetPage={handleSetPage}
            onOpenBooking={handleOpenBooking}
            onSelectProperty={handleViewPropertyDetail}
          />
        );
      case "portfolio":
        return (
          <PortfolioPage 
            onOpenBooking={handleOpenBooking}
          />
        );
      case "roi":
        return <InvestmentsPage onOpenBooking={handleOpenBooking} />;
      case "contact":
        return (
          <ContactPage 
            prefilledService={prefilledService}
            prefilledBudget={prefilledBudget}
            registeredConsultations={registeredConsultations}
            onAddConsultation={handleAddConsultation}
          />
        );
      default:
        return (
          <Home 
            onSetPage={handleSetPage}
            onOpenBooking={handleOpenBooking}
            onOpenAdvisor={() => setIsAdvisorOpen(true)}
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
            activeTestimonialIdx={activeTestimonialIdx}
            setActiveTestimonialIdx={setActiveTestimonialIdx}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-800 flex flex-col antialiased selection:bg-[#D4AF37] selection:text-[#0A2342]">
      {/* Sticky Top Header Navigation */}
      <Navbar 
        currentPage={currentPage}
        onSetPage={handleSetPage}
        onOpenBooking={() => handleOpenBooking("General Property Consultation")} 
        onOpenAdvisor={() => setIsAdvisorOpen(true)} 
      />

      <main className="flex-grow pt-20">
        {renderActivePage()}
      </main>

      {/* Main Corporate Information Footer */}
      <Footer onSetPage={handleSetPage} />

      {/* Geopenny Global Concept AI Advisory Desk Chatbot Container */}
      <GeopennyAIAdvisor 
        isOpen={isAdvisorOpen} 
        onClose={() => setIsAdvisorOpen(false)} 
        onOpen={() => setIsAdvisorOpen(true)}
        onSelectPropertyFromChat={handleOpenBooking}
      />
    </div>
  );
}
