import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Lead Storage for CRM and Lead Tracking
interface ConsultationBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  status: "Pending" | "Assigned" | "Completed";
  createdAt: string;
}

const bookingsList: ConsultationBooking[] = [
  {
    id: "1",
    fullName: "Oluwaseun Ademola",
    email: "ademola.seun@outlook.com",
    phone: "+234 803 123 4567",
    service: "Real Estate Investment Advisory",
    budget: "₦50,000,000 - ₦100,000,000",
    message: "Interested in purchasing multiple plots info at Green Valley Estate. Kindly advise on capital growth potential over 5 years.",
    status: "Assigned",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    fullName: "Dr. Chioma Nwachukwu",
    email: "chiomachidex@yahoo.com",
    phone: "+234 812 987 6543",
    service: "Property Development",
    budget: "Above ₦150,000,000",
    message: "Seeking commercial partners to build a medical clinic plaza in Ibadan.",
    status: "Pending",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  }
];

// Helper to safely get the Gemini API Client
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key.includes("MY_GEMINI_API_KEY") || key === "") {
      throw new Error("GEMINI_API_KEY is not configured. Please add your real Gemini API Key in the Settings > Secrets panel of your AI Studio environment.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

// REST APIs
// 1. Chat with the Geopenny AI Agent
app.post("/api/advisor/chat", async (req, res) => {
  try {
    const { message, chatHistory = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message parameter is required." });
    }

    let ai;
    try {
      ai = getGemini();
    } catch (err: any) {
      // Graceful error fallback with dummy responses if API Key is not set up
      console.warn("Gemini Client initialization failed: ", err.message);
      return res.json({
        text: `[Demo Mode Notice: Gemini API Key is missing. Follow Settings > Secrets to configure your own key for complete AI intelligence!]\n\nHello! I am your **Geopenny Investment & Creative Advisor**. I can help guide you through luxury estate acquisitions, premium graphic designs, industrial print volumes, and property management in Ibadan, Oyo State. \n\nRegarding your request: "${message}", our team at Cocoa House recommends exploring **Green Valley Estate** gated lands, **Heritage Court Residences**, or consulting with our visual print coordinators. Both divisions offer dynamic and strategic high-return potential. Would you like us to schedule a direct expert callback?`,
        isDemo: true
      });
    }

    // Format chat history for the Gemini API
    // We will leverage simple models.generateContent with prompt template to provide precise structural recommendations.
    const prompt = `You are the premium, highly professional Multi-Service & Property Advisor chatbot for "Geopenny Global Concept", which is headquartered at Suite 3, Floor 4 of the historic Cocoa House in Dugbe, Ibadan, Oyo State, Nigeria.

Your goal is to consult with clients on our comprehensive business divisions, demonstrating absolute integrity, transparency, and high aesthetic precision.

Information about Geopenny Global Concept:
- Headquarters: Suite 3, Floor 4, Cocoa House, Dugbe, Ibadan, Oyo State.
- Key Real Estate Holdings:
  1. "Green Valley Estate" in Akobo Ext (₦15,000,000 per residential plot; certified C of O, high gating security, eco-friendly green environment).
  2. "Heritage Court Residences" on Alao-Akala Bypass (₦75,000,000 for luxury 4-bedroom terrace duplexes with smart fittings).
- Key Printing & Branding Solutions:
  1. Precision graphic design, logo layout, and physical corporate brand books.
  2. Industrial high-volume express offset printing (brochures, corporate directories, calendars, banner flyers).
  3. General procurement and corporate supplies.
- Landmark/Location focus: Ibadan, Oyo State (including Dugbe, Akobo, Alao-Akala Way, Moniya, Bodija, and Samonda).
- Trust & Legality: We guarantee zero "Omo-Onile" property encumbrances, regularized lands registered in Oyo Caddastre, and perfect print color accuracy with clear delivery timelines.

Guidelines for your dialogue:
- Speak politely, with corporate warmth, and demonstrate vast knowledge of real estate, print materials, and general merch in Nigeria.
- Guide prospects on land documents (C of O, Deed of Assignment, surveys) or print design details (dimensions, paper weight, binding types).
- Encourage booking a live inspection or scheduling a graphic vetting meeting at our Cocoa House desk.

Conversation History:
${chatHistory.map((h: any) => `${h.role === 'user' ? 'Client' : 'Advisor'}: ${h.text}`).join("\n")}
Client: ${message}
Advisor:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    const aiText = response.text || "I apologize, but I could not formulate a response at this time. Please speak with our sales advisors.";

    return res.json({ text: aiText });
  } catch (error: any) {
    console.error("Error in AI Chat advisor:", error);
    return res.status(500).json({ error: error.message || "An unexpected error occurred." });
  }
});

// 2. ROI Evaluation Tool
app.post("/api/advisor/calculate-roi", (req, res) => {
  const { propertyName, budgetAmount, years = 5 } = req.body;
  
  if (!propertyName || !budgetAmount) {
    return res.status(400).json({ error: "Missing required parameters propertyName or budgetAmount." });
  }

  const budget = parseFloat(budgetAmount);
  let annualAppreciationRate = 0.18; // 18% default typical high-quality real estate in crucial parts of Ibadan
  let rentalYieldRate = 0.06; // 6% rental yield
  let description = "";

  if (propertyName === "Royal Haven Lands") {
    annualAppreciationRate = 0.22; // Elite Akobo/Ring Road corridor growth
    rentalYieldRate = 0.05; // Residential focus
    description = "Royal Haven Lands enjoys strong capital gains driven by high demand for master-planned secure communities in Ibadan's premium growth corridor.";
  } else if (propertyName === "Geopenny Commercial Plaza") {
    annualAppreciationRate = 0.25; // Commercial property appreciating at hyper speed
    rentalYieldRate = 0.08; // High rental yield from tech centers and modern retail
    description = "Ibadan's business hubs are experiencing a retail renaissance. Positioning corporate premises here yields aggressive rental escalation and lease longevity.";
  } else if (propertyName === "Emerald Green Court Residences") {
    annualAppreciationRate = 0.15; // Duplex structural assets grow steadily
    rentalYieldRate = 0.07; // Exceptional rental income from luxury vacation homes and corporate lets
    description = "Sought-after by diaspora luxury tenants, premium duplexes in Alao-Akala / Bodija capture top tier rental payouts.";
  } else {
    // Custom land packets
    annualAppreciationRate = 0.20;
    rentalYieldRate = 0.04;
    description = "Strategic suburban Ibadan land packets appreciate rapidly alongside the expanded Lagos-Ibadan rail transit and metropolitan development.";
  }

  // Calculate compound values
  const appreciationMultiplier = Math.pow(1 + annualAppreciationRate, years);
  const futureAssetValue = budget * appreciationMultiplier;
  
  // Calculate cumulative estimated rental income over years
  let totalRentalIncome = 0;
  for (let y = 1; y <= years; y++) {
    const assetValAtYear = budget * Math.pow(1 + annualAppreciationRate, y - 1);
    totalRentalIncome += assetValAtYear * rentalYieldRate;
  }

  const capitalGain = futureAssetValue - budget;
  const totalReturn = capitalGain + totalRentalIncome;
  const totalROIPercentage = (totalReturn / budget) * 100;

  return res.json({
    propertyName,
    initialInvestment: budget,
    holdingPeriodYears: years,
    annualAppreciationRate: annualAppreciationRate * 100,
    annualRentalYieldRate: rentalYieldRate * 100,
    estimatedFutureValue: Math.round(futureAssetValue),
    accumulatedRentalIncome: Math.round(totalRentalIncome),
    capitalGain: Math.round(capitalGain),
    netTotalReturn: Math.round(totalReturn),
    totalROIPercentage: Math.round(totalROIPercentage),
    narrative: description,
    paymentStrategy: [
      { step: "Initial Commitment", value: `₦${Math.round(budget * 0.2).toLocaleString()} (20% Outright Deposit)` },
      { step: "Quarterly Installments", value: `₦${Math.round((budget * 0.8) / 4).toLocaleString()} over 4 quarters` },
      { step: "Expected Year 1 Appreciation", value: `+₦${Math.round(budget * annualAppreciationRate).toLocaleString()}` },
    ]
  });
});

// 3. Book Consultation / Store Lead
app.post("/api/consultation/book", (req, res) => {
  const { fullName, email, phone, service, budget, message } = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({ error: "Full Name, Email, and Phone number are required fields." });
  }

  const newBooking: ConsultationBooking = {
    id: String(bookingsList.length + 1),
    fullName,
    email,
    phone,
    service: service || "General Property Consultation",
    budget: budget || "Not Specified",
    message: message || "Requesting standard call back",
    status: "Pending",
    createdAt: new Date().toISOString()
  };

  bookingsList.unshift(newBooking);

  return res.json({
    success: true,
    message: "Thank you! Your advisory booking with Geopenny Global Concept has been secured successfully. One of our Senior Investment Partners from Floor 4 of Cocoa House, Ibadan will reach out within the next 24 hours.",
    booking: newBooking
  });
});

// 4. Retrieve Active bookings for dashboard
app.get("/api/consultation/list", (req, res) => {
  return res.json(bookingsList);
});

// Setup Express and Vite Routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Geopenny Global Concept server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
