import { PropertyListing, ServiceItem, TestimonialItem, PortfolioItem } from "./types";

export const FEATURED_PROPERTIES: PropertyListing[] = [
  {
    id: "royal-haven",
    name: "Royal Haven Lands",
    location: "Moniya Train Link Corridor, Ibadan",
    price: 8500000,
    priceString: "₦8,500,000 per plot",
    type: "Land",
    status: "Limited Plots",
    description: "Geopenny's premium dry-table residential layout. Positioned close to the newly completed Lagos-Ibadan railway and Oyo Dry Port. 100% free from any indigenous disputes or landgrabbers (Omo-Onile). Ready for immediate physical allocation.",
    features: [
      "Registered Survey & Certificate of Occupancy Link",
      "Excellent dry top-surface (Zero sandfilling required)",
      "Solar Powered Perimeter Illumination",
      "Secured Gated Smart Gatehouse",
      "Immediate Beacon Placement & Allotment"
    ],
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    roiEstimate: "Forecasted capital appreciation of 28% annually based on rail terminus and transport hub expansion.",
    mapCoordinates: { lat: 7.5312, lng: 3.9114 }
  },
  {
    id: "metro-plaza",
    name: "Geopenny Commercial Plaza",
    location: "Ring Road Bypass, Bodija, Ibadan",
    price: 45000000,
    priceString: "₦45,000,000 per Space",
    type: "Commercial",
    status: "Hot Deal",
    description: "Premium investment-ready retail office shells situated in the commercial core of Bodija. Built-to-suit with extensive parking slots, massive corporate visibility, and dual access roads for seamless shipping or client reach.",
    features: [
      "Governor's Consent Title Deeds",
      "Spacious Paved Vehicle Parking Layouts",
      "Dual Dedicated Industrial Inverter Core",
      "CCTV Surveillance & Guard Patrols",
      "High-speed fiber-optic connectivity ready"
    ],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    roiEstimate: "High yielding corporate rental assets; annual rent projection averaging 9.5% with steady rent escalations.",
    mapCoordinates: { lat: 7.3912, lng: 3.8964 }
  },
  {
    id: "emerald-court",
    name: "Emerald Green Court Residences",
    location: "Alao-Akala Way, Akobo, Ibadan",
    price: 85000000,
    priceString: "₦85,000,000 per Unit",
    type: "Residential",
    status: "Selling",
    description: "Contemporary 4-Bedroom fully detached modern executive duplexes. Equipped with home smart hub provisions, fitted multi-tiered thermal kitchen arrays, and a private master balcony overlook.",
    features: [
      "Global Certificate of Occupancy (C of O)",
      "Fitted Smarthome Light & Speaker Pre-wiring",
      "Built-in Premium Gas Hob and Heat Extractors",
      "24/7 Security Sentries & Intercom System",
      "Dedicated Electric Power Substation"
    ],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    roiEstimate: "Exceptional short-let capability generating ₦120,000 daily rental revenue, or steady capital hedging of 18% yearly.",
    mapCoordinates: { lat: 7.3524, lng: 3.8643 }
  },
  {
    id: "apex-suites",
    name: "Apex Luxury Rentals",
    location: "Bodija Estate Gated, Ibadan",
    price: 3200000,
    priceString: "₦3,200,000 per year",
    type: "Rental",
    status: "For Rent",
    description: "Exquisite 2-Bedroom luxury apartment available for long-term rental in the highly secure, fully paved Bodija Estate. Comes with central water systems, dedicated generator backup, and modern tiles and sanitary wares.",
    features: [
      "Fully serviced gated compound utilities",
      "Assigned car shelter for residents",
      "Water treatment facility and underground pumps",
      "Prepaid meters and active maintenance team",
      "Walkable distance to Bodija shopping malls"
    ],
    imageUrl: "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80",
    roiEstimate: "Immediate tenant occupancy; managed under Geopenny concept with secure rental administration logs.",
    mapCoordinates: { lat: 7.4205, lng: 3.9015 }
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p-logo-1",
    title: "Oasis Logistics Logo",
    category: "Logo",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
    description: "Modern minimalist logo utilizing clean paths and dual blue/teal shades to inspire movement and corporate trust.",
    client: "Oasis Cargo Hub"
  },
  {
    id: "p-brand-1",
    title: "Ibadan Tech Summit 2026",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80",
    description: "Complete design identity, custom banners, social media templates, and corporate merchandise sets.",
    client: "Oyo Developers Initiative"
  },
  {
    id: "p-flyer-1",
    title: "Real Estate Property Campaign Campaign Flysheets",
    category: "Flyer",
    imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=600&q=80",
    description: "High-impact glossy flyer layout with dynamic property showcases designed for local distributor teams.",
    client: "Vantage Real Estate Group"
  },
  {
    id: "p-banner-1",
    title: "Geopenny Corporate Exhibition Rollup Banner",
    category: "Banner",
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80",
    description: "Rollup pop banner featuring bold golden and navy typographic highlights for events and brand lobbies.",
    client: "Geopenny Concept Showcase"
  },
  {
    id: "p-card-1",
    title: "Gold Foil Premium Business Cards",
    category: "Business Card",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    description: "Luxury heavy-weight black card design with elegant hot-stamping golden foil on logo edges.",
    client: "Akin & Partners Legal Desk"
  },
  {
    id: "p-marketing-1",
    title: "Corporate Broadsheet Brochure Outlay",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd45e9b2d4f?auto=format&fit=crop&w=600&q=80",
    description: "Bi-fold promotional catalogs illustrating energy delivery workflows with highly legible columns.",
    client: "Kola Gas & Energy Distribution"
  }
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: "real-estate-services",
    title: "Real Estate Services",
    shortDescription: "Expert property brokerage, layout sales, land allocation, and title documentation processing.",
    fullDescription: "At Geopenny Global Concept, we simplify the complex process of buying, selling, or leasing properties in Ibadan and across Southwestern Nigeria. We handle outright property sales, strategic land zoning acquisitions, and complete document regularizations (C of O, Governor's Consent, Survey Filing).",
    iconName: "Landmark",
    features: ["Property Sales & Acquisitions", "Property Letting & Leasing", "Deed and Title Documentation", "Zero Dispute Land Guarantees"],
    category: "Real Estate"
  },
  {
    id: "property-management",
    title: "Property Management & Facility Supervision",
    shortDescription: "Complete tenant screening, prompt rent collections, routine maintenance, and landlord reporting.",
    fullDescription: "We act as your reliable local custodian to protect and optimize your real estate values. We handle critical landlord responsibilities: detailed tenant vetting, structured rent tracking, physical property checks, coordinate expert repairs, and provide transparent balance reports.",
    iconName: "ShieldCheck",
    features: ["Rigorous Tenant Screening", "Automated Rent Collection Logs", "Prompt & Skilled General Maintenance", "Frequent Inspections & Management Reports"],
    category: "Property Management"
  },
  {
    id: "real-estate-consulting",
    title: "Real Estate Consulting",
    shortDescription: "Strategic portfolio advisory, feasibility surveys, and local Ibadan market intelligence.",
    fullDescription: "We deliver analytical real estate insight to direct your capital successfully. Our consultation reports cover upcoming infrastructural alignments (such as the Ibadan Circular Road), neighborhood yield forecasts, zoning checks, and comprehensive feasibility checks.",
    iconName: "TrendingUp",
    features: ["Feasibility Analyses", "Ibadan Corridors Evaluation", "Investment Risk Hedging", "Diaspora Purchase Safekeeping"],
    category: "Advisory"
  },
  {
    id: "graphic-design",
    title: "Graphic Design & Branding",
    shortDescription: "Distinct branding identity design, high-end logos, social banners, and marketing mockups.",
    fullDescription: "We craft visual identities that demand attention and project authority. Our creative division delivers bespoke logo design suites, complete social media graphics, corporate brand guides, product packages, and professional publicity layouts customized to tell your brand narrative.",
    iconName: "Sparkles",
    features: ["Bespoke Brand Identities & Logos", "Social Media Poster Designs", "Corporate Promotional Folders", "Packaging Mockups & Media Graphics"],
    category: "Creative & Print"
  },
  {
    id: "printing-services",
    title: "Printing Solutions",
    shortDescription: "Premium speed prints: cards, brochures, leaflets, folders, large banners, and stationery.",
    fullDescription: "Our high-precision modern printing services merge outstanding materials with crisp color accuracy. We print high-definition business cards, promotional leaflets, brand brochures, indoor/outdoor display banners, and branded corporate envelopes.",
    iconName: "FileText",
    features: ["Gold-Foil Business Cards", "Multi-page Exhibition Pamphlets", "Weatherproof Event Banners", "Corporate Custom Letterheads"],
    category: "Creative & Print"
  },
  {
    id: "general-merchandise",
    title: "General Merchandise & Supply Solutions",
    shortDescription: "Corporate procurement, tailored items, logistics supply, and business materials sourcing.",
    fullDescription: "We act as a trusted procurement and supply partner to bridge corporate material gaps. We source high-quality customized gifts, corporate branded items, office equipment, general business supplies, and promotional merchandise at affordable wholesale rates.",
    iconName: "Briefcase",
    features: ["Corporate Sourcing & Procurement", "Custom Branded Corporate Gifts", "Bulk Office Material Distribution", "Dependable Logistics Sourcing"],
    category: "Supply & Support"
  }
];

export const CUSTOMER_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "gt-1",
    name: "Dr. Adebayo Adeleye",
    role: "Bodija Clinic Director",
    company: "St. Jude Specialist Clinic",
    type: "Property Buyer",
    text: "We acquired modern office suites in Bodija through Geopenny. Their professional advice, straightforward documentation checking, and deep knowledge of the Ibadan real estate corridors made our transaction entirely risk-free.",
    rating: 5,
    avatarColor: "bg-blue-900 text-gold-50"
  },
  {
    id: "gt-2",
    name: "Chief Mrs. Ronke Alao",
    role: "Property Owner",
    company: "Alao Estates Limited",
    type: "Landlord",
    text: "Managing thousands of tenants while living abroad was a nightmare before Geopenny stepped in. Their facility supervision team oversees rent collections and repairs on my properties in Akobo. Extremely reliable property management!",
    rating: 5,
    avatarColor: "bg-amber-800 text-yellow-50"
  },
  {
    id: "gt-3",
    name: "Olawale Shonibare",
    role: "Founder",
    company: "Apex Tech Labs",
    type: "Design Client",
    text: "The creative team at Geopenny created our brand guidelines and designed beautiful roll-up banners and customized stationery for us. Our brand visibility has skyrocketed. Excellence and speed is guaranteed here.",
    rating: 5,
    avatarColor: "bg-emerald-900 text-emerald-50"
  },
  {
    id: "gt-4",
    name: "Alhaji Bello Gwarzo",
    role: "Supply Chain Manager",
    company: "Northern Foods Corp",
    type: "Business Owner",
    text: "Geopenny handles our massive printing demands and corporate merchandise procurement. Deliveries are always on-time, the materials used are premium, and pricing is highly transparent. A stellar multi-service provider in Ibadan.",
    rating: 5,
    avatarColor: "bg-slate-900 text-slate-100"
  }
];
