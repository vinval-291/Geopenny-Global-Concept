export interface PropertyListing {
  id: string;
  name: string;
  location: string;
  price: number;
  priceString: string;
  type: "Residential" | "Commercial" | "Land" | "Rental";
  status: "Selling" | "Hot Deal" | "Limited Plots" | "Fully Built" | "For Rent" | "For Lease";
  description: string;
  features: string[];
  imageUrl: string;
  roiEstimate: string;
  mapCoordinates: { lat: number; lng: number };
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "Logo" | "Branding" | "Flyer" | "Banner" | "Business Card" | "Marketing";
  imageUrl: string;
  description: string;
  client: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  category: "Real Estate" | "Property Management" | "Advisory" | "Creative & Print" | "Supply & Support";
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  type: "Property Buyer" | "Landlord" | "Business Owner" | "Design Client";
  text: string;
  rating: number;
  avatarColor: string;
}

export interface BookingFormInput {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}


