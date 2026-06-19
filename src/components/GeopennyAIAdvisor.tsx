import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Landmark, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ExternalLink
} from "lucide-react";

interface Message {
  role: "user" | "advisor";
  text: string;
}

interface GeopennyAIAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onSelectPropertyFromChat: (serviceName?: string) => void;
}

export default function GeopennyAIAdvisor({ 
  isOpen, 
  onClose, 
  onOpen,
  onSelectPropertyFromChat 
}: GeopennyAIAdvisorProps) {
  
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "advisor",
      text: "Hello! I am your **Geopenny Investment & Creative Advisor**, consulting with you from Floor 4 of dynamic **Cocoa House in Ibadan**.\n\nI can analyze our prime real estate listings, estimate pricing for custom graphic designs and print orders, or assist with tenant management guidelines. What details are we calculating today?"
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    "Vetted Gated Lands",
    "Request Corporate Branding",
    "High-Volume Print Pricing",
    "Book Cocoa House inspection"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (!isOpen) {
      setHasUnread(true);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputMsg("");
    setLoading(true);

    try {
      const response = await fetch("/api/advisor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: messages
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: "advisor", text: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "advisor",
            text: "I apologize, our advisory lines at Cocoa House are experiencing high traffic. Kindly resend your query or use our scheduled consultation form."
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "advisor",
          text: "[Advisory Fallback] For complete project protection, we highly advise contacting our team directly at +234 (0) 813 555 7792 or submitting an outright consultation ticket."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const parseMarkdownBold = (rawText: string) => {
    const parts = rawText.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="font-bold text-[#D4AF37]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const handleOpenWidget = () => {
    setHasUnread(false);
    onOpen();
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      {!isOpen && (
        <button
          onClick={handleOpenWidget}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#0B1F3A] text-white p-4 rounded-full border border-[#D4AF37]/50 shadow-2xl hover:bg-slate-900 transition-all transform hover:-translate-y-1 cursor-pointer flex items-center gap-2 group hover:scale-105"
          id="ai-bot-floating-trigger"
        >
          {/* Unread pulsing dot */}
          {hasUnread && (
            <span className="absolute top-0 right-0 h-3 w-3 bg-[#D4AF37] rounded-full border border-white animate-pulse" />
          )}
          
          <div className="relative animate-in fade-in duration-305">
            <MessageSquare className="h-6 w-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
            </span>
          </div>
          
          <span className="text-xs font-semibold tracking-wide pr-2 hidden sm:inline">
            Virtual Advisor Desk
          </span>
        </button>
      )}

      {/* Slide-out Chat Widget Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 w-auto sm:w-full sm:max-w-[400px] h-[500px] sm:h-[520px] bg-slate-950 border border-[#D4AF37]/45 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-12 duration-200"
          id="ai-bot-panel-expanded"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B1F3A] to-[#123e75] p-4 flex items-center justify-between border-b border-[#D4AF37]/40 text-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-white/5 border border-[#D4AF37] rounded-lg">
                <Landmark className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold font-sans tracking-wide uppercase">
                  GEOPENNY <span className="text-[#D4AF37]">ADVISOR AI</span>
                </span>
                <span className="text-[8px] uppercase tracking-widest font-mono text-gray-300 font-bold">
                  Floor 4, Cocoa House • Ibadan
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Status Indicator */}
              <div className="flex items-center gap-1 bg-[#00A86B]/10 border border-[#00A86B]/20 py-0.5 px-2 rounded-full">
                <span className="h-1.5 w-1.5 bg-emerald-450 rounded-full bg-[#00A86B] animate-pulse" />
                <span className="text-[8px] font-mono text-[#00A86B] uppercase font-bold">Online</span>
              </div>
              
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Minimise Chat"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Message List Log panel */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#071324] grid grid-cols-1 select-none">
            
            {/* Advice notice banner */}
            <div className="p-2.5 bg-slate-900/60 border border-[#D4AF37]/15 rounded-xl text-[9px] text-gray-300 leading-normal flex items-center gap-2 flex-wrap text-left">
              <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
              <span>Registered survey boundaries and custom design files are certified secure at Geopenny.</span>
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 max-w-[85%] text-left ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`p-1.5 rounded-lg h-fit border shrink-0 ${
                  msg.role === "user" ? "bg-slate-800 border-white/10 text-white" : "bg-[#0B1F3A] border-[#D4AF37]/30 text-[#D4AF37]"
                }`}>
                  {msg.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>

                <div className={`rounded-xl p-3 text-xs leading-normal font-sans ${
                  msg.role === "user" 
                    ? "bg-[#D4AF37] text-slate-950 font-bold" 
                    : "bg-slate-900 border border-white/5 text-gray-100"
                }`}>
                  {msg.text.split("\n\n").map((chunk, chunkIdx) => (
                    <p key={chunkIdx} className={`${chunkIdx > 0 ? "mt-2" : ""}`}>
                      {parseMarkdownBold(chunk)}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 max-w-[80%] mr-auto items-center text-left">
                <div className="p-1.5 bg-[#0B1F3A] border border-[#D4AF37]/35 rounded-lg text-[#D4AF37]">
                  <Bot className="h-3.5 w-3.5 animate-bounce" />
                </div>
                <div className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions tray */}
          <div className="bg-[#051120] px-3 py-2 flex gap-1.5 overflow-x-auto border-t border-white/5 shrink-0 select-none">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSendMessage(p)}
                className="text-[9px] font-semibold tracking-wide whitespace-nowrap px-2.5 py-1.5 bg-slate-900 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-md text-gray-300 transition-colors cursor-pointer shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input control tray */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMsg);
            }} 
            className="p-3 bg-slate-950 border-t border-[#D4AF37]/30 flex gap-2 items-center shrink-0"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask Geopenny Advisor..."
              className="flex-grow h-10 bg-slate-900 text-white rounded-lg border border-white/10 text-xs px-3 focus:outline-none focus:border-[#D4AF37] pr-2 transition-all text-left"
            />
            <button
              type="submit"
              disabled={loading || !inputMsg.trim()}
              className="h-10 w-10 shrink-0 bg-[#D4AF37] hover:bg-white text-slate-950 rounded-lg flex items-center justify-center transition-all cursor-pointer disabled:opacity-40"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>

          {/* Direct WhatsApp External link */}
          <div className="bg-[#081a2e] text-[9px] text-[#D4AF37] text-center py-1.5 border-t border-white/5 flex items-center justify-center gap-1 font-mono hover:bg-[#0c243f] transition-all cursor-pointer">
            <ExternalLink className="h-3 w-3 shrink-0" />
            <a 
              href="https://wa.me/2348135557792?text=Hello%20Geopenny%20Global%20Concept%2C%20I%20am%20inquiring%20about%20your%20multi-services." 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline flex items-center pr-2"
            >
              Simulate Instant WhatsApp Chat with Coordinator
            </a>
          </div>

        </div>
      )}
    </>
  );
}
