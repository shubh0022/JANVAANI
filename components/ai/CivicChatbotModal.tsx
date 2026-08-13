'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { DataSourceBadge } from '@/components/ui/DataSourceBadge';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  X,
  Bot,
  User,
  MapPin,
  ArrowRight,
  Minimize2,
  Maximize2,
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
  '📍 Report a pothole in Ward 7',
  '🏛️ Who is my MLA & Corporator?',
  '🌬️ Live CPCB Air Quality (AQI)',
  '💰 How do bounties work?',
  '📜 File an online RTI',
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
      text: "Namaste! I am JanVaani AI Saathi. Report a problem in any Indian language, find your MLA/Corporator, check live CPCB air quality, or draft civic solutions.",
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

  // Speech Recognition (Multilingual)
  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
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
      recognition.lang = 'hi-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        setInputText(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const generateAiResponse = (userQuery: string): ChatMessage => {
    const q = userQuery.toLowerCase();

    // Problem reporting intent
    if (
      q.includes('report') ||
      q.includes('pothole') ||
      q.includes('drainage') ||
      q.includes('garbage') ||
      q.includes('light') ||
      q.includes('pani') ||
      q.includes('road')
    ) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'ai',
        text: `Identified as **Infrastructure / Utilities** in **Ward 7 (Karelibaug)** with **High Priority (P1)**. Draft ticket prepared:`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: {
          type: 'report_problem',
          title: 'Review & Submit Problem Case',
        },
      };
    }

    // Representatives intent
    if (
      q.includes('mla') ||
      q.includes('corporator') ||
      q.includes('mp') ||
      q.includes('officer') ||
      q.includes('contact')
    ) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'ai',
        text: `**Ward 7 (Karelibaug) Leadership:**\n• **Corporator**: Manoj Patel (BJP) • +91 98980 12345\n• **Ward Engineer**: Er. Rajesh Patel • +91 265 248 1199\n• **MLA**: Keyur Rokadiya (Sayajigunj #141)\n• **MP**: Dr. Hemang Joshi (Vadodara #20)`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: {
          type: 'contact_representative',
          title: 'Open Representatives Radar',
        },
      };
    }

    // AQI / Environment intent
    if (q.includes('aqi') || q.includes('air') || q.includes('pollution') || q.includes('cpcb')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'ai',
        text: `**Live CPCB Telemetry (Vadodara Station):**\n• **Current AQI**: 78 (Satisfactory 🟢)\n• **PM2.5**: 24.2 µg/m³\n• **Source**: Central Pollution Control Board`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        provenanceSourceId: 'src_cpcb_aqi',
        suggestedAction: {
          type: 'view_data_catalog',
          title: 'View Dataset in Open Data Catalog',
        },
      };
    }

    // Bounties intent
    if (q.includes('bounty') || q.includes('reward') || q.includes('points') || q.includes('upi')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'ai',
        text: `**Proof-of-Impact Rewards:**\n• Problem Verification: 50 – 200 pts\n• Solution Bounties: ₹500 – ₹10,000\n• Direct UPI settlement on 1st of month.`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
    }

    return {
      id: `msg_${Date.now()}`,
      sender: 'ai',
      text: `Regarding "${userQuery}": You can track live issues on our GIS Map, check our National Data Catalog, or connect with your local Ward Corporator.`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      suggestedAction: {
        type: 'view_map',
        title: 'Open Spatial GIS Map',
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
    }, 600);
  };

  return (
    <>
      {/* Sleek Compact Floating Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 px-3 py-2 rounded-full bg-slate-900/95 hover:bg-blue-600 text-white font-extrabold text-xs shadow-xl flex items-center gap-2 hover:scale-105 transition-all duration-200 border border-slate-700/80 backdrop-blur-md group"
          title="Open Small Civic AI Assistant"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[11px] font-black">AI Saathi</span>
        </button>
      )}

      {/* Small Compact Chatbot Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-200 ${
            isExpanded
              ? 'inset-4 sm:inset-12 rounded-3xl'
              : 'bottom-4 right-4 w-[90vw] sm:w-[340px] h-[450px] rounded-2xl'
          } bg-white shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col animate-in fade-in zoom-in-95`}
        >
          {/* Compact Header Bar */}
          <div className="px-3.5 py-2.5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black text-white leading-none">JanVaani AI</h3>
                  <span className="text-[8px] font-extrabold uppercase px-1 py-0.2 rounded bg-blue-500/20 text-blue-300">
                    Mini
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
                title={isExpanded ? 'Restore Small' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Compact Messages Body */}
          <div className="flex-1 p-3 space-y-2.5 overflow-y-auto bg-slate-50/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3 h-3" />
                  </div>
                )}

                <div
                  className={`max-w-[86%] rounded-xl p-2.5 text-[11px] leading-relaxed space-y-1.5 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Provenance Badge */}
                  {msg.provenanceSourceId && (
                    <div className="pt-0.5">
                      <DataSourceBadge sourceId={msg.provenanceSourceId} size="sm" />
                    </div>
                  )}

                  {/* Suggested Action Card */}
                  {msg.suggestedAction && (
                    <div className="pt-1.5 border-t border-slate-100 mt-1">
                      {msg.suggestedAction.type === 'report_problem' && (
                        <Link
                          href="/report"
                          onClick={() => setIsOpen(false)}
                          className="w-full py-1.5 px-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>{msg.suggestedAction.title}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}

                      {msg.suggestedAction.type === 'contact_representative' && (
                        <Link
                          href="/government/representatives"
                          onClick={() => setIsOpen(false)}
                          className="w-full py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>{msg.suggestedAction.title}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}

                      {msg.suggestedAction.type === 'view_data_catalog' && (
                        <Link
                          href="/data-catalog"
                          onClick={() => setIsOpen(false)}
                          className="w-full py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>{msg.suggestedAction.title}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}

                      {msg.suggestedAction.type === 'view_map' && (
                        <Link
                          href="/map"
                          onClick={() => setIsOpen(false)}
                          className="w-full py-1.5 px-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>{msg.suggestedAction.title}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  )}

                  <div
                    className={`text-[8px] font-semibold text-right ${
                      msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-5 h-5 rounded-md bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-1.5 items-center text-[10px] text-slate-500 font-bold p-1 animate-pulse">
                <Bot className="w-3 h-3 text-blue-600" />
                <span>AI is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Compact Quick Suggestion Chips */}
          <div className="px-2 py-1.5 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-1 scrollbar-none shrink-0">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[10px] font-bold whitespace-nowrap transition-colors border border-slate-200/80"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Compact Input Bar */}
          <div className="p-2 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5"
            >
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`p-1.5 rounded-lg transition-all ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title={isListening ? 'Listening...' : 'Voice Input'}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              </button>

              <input
                type="text"
                placeholder={isListening ? 'Listening...' : 'Ask AI Saathi...'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-2.5 py-1.5 text-[11px] font-semibold bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-slate-900"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-all shadow-xs"
                title="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
