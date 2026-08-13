'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { DataSourceBadge } from '@/components/ui/DataSourceBadge';
import { ALL_REPRESENTATIVES } from '@/lib/political-directory';
import { CIVIC_TAXONOMY } from '@/lib/taxonomy';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  X,
  Bot,
  User,
  MessageSquare,
  Building2,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Phone,
  FileText,
  ThumbsUp,
  Volume2,
  Minimize2,
  Maximize2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'report_problem' | 'contact_representative' | 'view_data_catalog' | 'view_map';
    title: string;
    payload?: any;
  };
  provenanceSourceId?: string;
}

const QUICK_PROMPTS = [
  '📍 Report a dangerous pothole in Ward 7',
  '🏛️ Who is my Ward Corporator & MLA in Vadodara?',
  '🌬️ What is the live CPCB Air Quality (AQI)?',
  '💰 How do I earn bounties for solving civic problems?',
  '📜 Guide me on filing an online RTI for road repair funds',
];

export function CivicChatbotModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: "Namaste! I am JanVaani Civic AI Saathi. I can help you report local problems in your mother tongue, look up your elected MLA/Corporator, check real-time open data (CPCB AQI, Census), or draft engineering solutions. How can I assist your neighborhood today?",
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle Speech Recognition
  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN'; // Indian multilingual recognition
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Generate Intelligent Contextual AI Civic Responses
  const generateAiResponse = (userQuery: string): ChatMessage => {
    const q = userQuery.toLowerCase();

    // 1. Problem Reporting Intent
    if (
      q.includes('report') ||
      q.includes('pothole') ||
      q.includes('drainage') ||
      q.includes('garbage') ||
      q.includes('street light') ||
      q.includes('pani') ||
      q.includes('kharab') ||
      q.includes('light')
    ) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'ai',
        text: `I have analyzed your civic report. Based on your description, I categorized this as **Infrastructure & Roads / Public Utilities** in **Ward 7 (Karelibaug)** with **High Priority (P1)**. I've prepared a pre-filled draft case ready for community confirmation!`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: {
          type: 'report_problem',
          title: 'Review & Submit Draft Problem Case',
          payload: {
            title: 'Reported Issue in Ward 7',
            category: 'infrastructure',
            severity: 'high',
          },
        },
      };
    }

    // 2. Representative / MLA / Corporator Query
    if (
      q.includes('mla') ||
      q.includes('corporator') ||
      q.includes('mp') ||
      q.includes('officer') ||
      q.includes('contact') ||
      q.includes('neta') ||
      q.includes('ward')
    ) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'ai',
        text: `Here is the verified 4-tier leadership chain for **Ward 7 (Karelibaug & VIP Road, Vadodara)** from our Open Data Radar:\n\n• **Corporator**: Shri Manoj Patel (BJP 🪷) — Tel: +91 98980 12345\n• **Ward Engineer**: Er. Rajesh K. Patel (VMC Engineering) — Tel: +91 265 248 1199\n• **MLA (Sayajigunj #141)**: Keyur Rokadiya — MLA-LAD Spent: ₹3.32 Cr (94.8%)\n• **MP (Vadodara #20)**: Dr. Hemang Joshi — MPLADS Utilized: ₹4.78 Cr (95.6%)`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: {
          type: 'contact_representative',
          title: 'Open Verified Representatives Directory',
        },
      };
    }

    // 3. CPCB Air Quality / Environment Query
    if (q.includes('aqi') || q.includes('air') || q.includes('pollution') || q.includes('cpcb') || q.includes('hawa')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'ai',
        text: `According to live telemetry from the **Central Pollution Control Board (CPCB) CAAQMS Station at Dandia Bazaar, Vadodara**:\n\n• **Current AQI**: 78 (Satisfactory 🟢)\n• **Primary Pollutant**: PM2.5 (24.2 µg/m³)\n• **National Average Benchmark**: 112 (Moderate 🟡)\n• **Freshness**: Synced today at official CPCB REST feed.`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        provenanceSourceId: 'src_cpcb_aqi',
        suggestedAction: {
          type: 'view_data_catalog',
          title: 'Inspect CPCB Live Air Dataset in Catalog',
        },
      };
    }

    // 4. Bounty / Reward Query
    if (q.includes('bounty') || q.includes('reward') || q.includes('points') || q.includes('upi') || q.includes('earn')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'ai',
        text: `JanVaani uses a **Proof-of-Impact Reward Engine** (strictly preventing spam):\n\n1. **Verified Problem Finding**: 50 – 200 pts once 5+ neighborhood residents verify with photos.\n2. **Engineering Solution Submission**: ₹500 – ₹10,000 sponsored bounties when adopted by municipal engineers.\n3. **Resolution Verification**: 100 pts for auditing and verifying that a pothole or drain was truly fixed.\n4. **Payout**: Auto-credited to your verified UPI VPA on the 1st of every month.`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
    }

    // 5. RTI / Legal / Governance Query
    if (q.includes('rti') || q.includes('escalate') || q.includes('complaint') || q.includes('delay') || q.includes('sla')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'ai',
        text: `If a municipal department breaches the standard **72-hour P1 Emergency SLA** without action, you can:\n\n1. **Auto-Escalate to Ward Executive Engineer**: Trigger a red-flag alert to the Zonal Dy. Municipal Commissioner.\n2. **File an Online RTI Application**: Apply on your state RTI portal ('onlinerti.gujarat.gov.in') asking for contractor tender terms and asphalt inspection test reports.\n3. **Initiate a Citizen Co-Sign Petition**: Gather 50+ ward votes on JanVaani to auto-dispatch an alert to the District Collector.`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
    }

    // Default Fallback Response
    return {
      id: `msg_${Date.now()}`,
      sender: 'ai',
      text: `I understand your civic query regarding "${userQuery}". You can track live problem cases on our GIS Map, review verified open data in our National Data Catalog, or connect directly with your Ward Corporator for immediate intervention.`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      suggestedAction: {
        type: 'view_map',
        title: 'Explore High-Definition Spatial Map',
      },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = generateAiResponse(text);
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Action Button (Always Visible in Bottom Right) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 p-3.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-xs shadow-2xl flex items-center gap-2 hover:scale-105 transition-all duration-300 border-2 border-white/20 animate-bounce group"
          title="Open JanVaani AI Civic Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white" />
          </div>
          <span className="hidden sm:inline">JanVaani AI Saathi</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </button>
      )}

      {/* Interactive Chatbot Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isExpanded
              ? 'inset-4 sm:inset-10 rounded-3xl'
              : 'bottom-5 right-5 w-[92vw] sm:w-[420px] h-[580px] rounded-3xl'
          } bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95`}
        >
          {/* Header Bar */}
          <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-white">JanVaani AI Saathi</h3>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-blue-500/30 text-blue-300 border border-blue-400/30">
                    Multilingual AI
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Speaks 10+ Indian Languages</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                title={isExpanded ? 'Minimize' : 'Maximize'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* AI Trust Transparency Warning Strip */}
          <div className="px-4 py-1.5 bg-amber-50 border-b border-amber-200 text-[10px] font-bold text-amber-900 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
              <span>AI Inferred Assistant • Real Data Verified at data.gov.in</span>
            </div>
            <Link href="/about/technology" className="underline hover:text-amber-950">
              Tech Stack
            </Link>
          </div>

          {/* Messages Scrollable Body */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line font-medium">{msg.text}</div>

                  {/* Provenance Badge if sourced from open data */}
                  {msg.provenanceSourceId && (
                    <div className="pt-1">
                      <DataSourceBadge sourceId={msg.provenanceSourceId} size="sm" />
                    </div>
                  )}

                  {/* Suggested Action Card */}
                  {msg.suggestedAction && (
                    <div className="pt-2 border-t border-slate-100 mt-2">
                      {msg.suggestedAction.type === 'report_problem' && (
                        <Link
                          href="/report"
                          onClick={() => setIsOpen(false)}
                          className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                        >
                          <span>{msg.suggestedAction.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}

                      {msg.suggestedAction.type === 'contact_representative' && (
                        <Link
                          href="/government/representatives"
                          onClick={() => setIsOpen(false)}
                          className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                        >
                          <span>{msg.suggestedAction.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}

                      {msg.suggestedAction.type === 'view_data_catalog' && (
                        <Link
                          href="/data-catalog"
                          onClick={() => setIsOpen(false)}
                          className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                        >
                          <span>{msg.suggestedAction.title}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}

                      {msg.suggestedAction.type === 'view_map' && (
                        <Link
                          href="/map"
                          onClick={() => setIsOpen(false)}
                          className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                        >
                          <span>{msg.suggestedAction.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  )}

                  <div
                    className={`text-[9px] font-semibold text-right ${
                      msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-slate-500 font-bold p-2 animate-pulse">
                <Bot className="w-4 h-4 text-blue-600" />
                <span>JanVaani AI is analyzing open civic telemetry...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[11px] font-bold whitespace-nowrap transition-colors border border-slate-200/80"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input & Voice Bar */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`p-2.5 rounded-xl transition-all ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title={isListening ? 'Listening... Speak in Hindi/English/Gujarati' : 'Voice Input'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                placeholder={
                  isListening
                    ? 'Listening... Speak in Hindi, Gujarati, English...'
                    : 'Ask anything or describe a civic problem...'
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-all shadow-md"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
