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
  '📍 Report pothole',
  '🏛️ Find MLA',
  '🌬️ Live AQI',
  '💰 Bounties',
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
      text: "Namaste! JanVaani AI ready. Ask about Wards, MLAs, AQI, or report a civic issue.",
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
        text: `Drafted **P1 Infrastructure** case for **Ward 7 (Karelibaug)**:`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: {
          type: 'report_problem',
          title: 'Submit Case →',
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
        text: `**Ward 7 Leadership:**\n• Corporator: Manoj Patel (BJP)\n• MLA: Keyur Rokadiya\n• Engineer: Er. Rajesh Patel`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: {
          type: 'contact_representative',
          title: 'Open Contacts',
        },
      };
    }

    // AQI / Environment intent
    if (q.includes('aqi') || q.includes('air') || q.includes('pollution') || q.includes('cpcb')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'ai',
        text: `**Live CPCB (Vadodara):**\n• AQI: 78 (Good 🟢)\n• PM2.5: 24.2 µg/m³`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        provenanceSourceId: 'src_cpcb_aqi',
      };
    }

    // Bounties intent
    if (q.includes('bounty') || q.includes('reward') || q.includes('points') || q.includes('upi')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'ai',
        text: `Earn 50-200 pts for verification, ₹500-₹10K for solutions. Auto-credited to UPI monthly.`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
    }

    return {
      id: `msg_${Date.now()}`,
      sender: 'ai',
      text: `For "${userQuery}": Check the GIS Map, Data Catalog, or connect with your local Corporator.`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      suggestedAction: {
        type: 'view_map',
        title: 'Open Map →',
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
    }, 500);
  };

  return (
    <>
      {/* Very Small Floating Circle Launcher (36px) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-3 right-3 z-50 w-9 h-9 rounded-full bg-slate-950 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-200 border border-slate-700/80 backdrop-blur-md group"
          title="JanVaani AI (Click to open)"
        >
          <Bot className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950" />
        </button>
      )}

      {/* Very Small Compact Window (290px × 370px) */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-200 ${
            isExpanded
              ? 'inset-4 sm:inset-16 rounded-2xl'
              : 'bottom-3 right-3 w-[290px] sm:w-[300px] h-[370px] rounded-xl'
          } bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95`}
        >
          {/* Micro Header */}
          <div className="px-2.5 py-1.5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-white">
                <Bot className="w-3 h-3" />
              </div>
              <span className="text-[11px] font-black text-white">AI Saathi</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="flex items-center gap-0.5 text-slate-400">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors"
                title={isExpanded ? 'Restore Mini' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Micro Messages Body */}
          <div className="flex-1 p-2 space-y-2 overflow-y-auto bg-slate-50/70 text-[10px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-1.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-2.5 h-2.5" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-lg p-2 leading-relaxed space-y-1 shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line text-[10px]">{msg.text}</div>

                  {/* Suggested Action Card */}
                  {msg.suggestedAction && (
                    <div className="pt-1 border-t border-slate-100 mt-1">
                      {msg.suggestedAction.type === 'report_problem' && (
                        <Link
                          href="/report"
                          onClick={() => setIsOpen(false)}
                          className="w-full py-1 px-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[9px] flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>{msg.suggestedAction.title}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </Link>
                      )}

                      {msg.suggestedAction.type === 'contact_representative' && (
                        <Link
                          href="/government/representatives"
                          onClick={() => setIsOpen(false)}
                          className="w-full py-1 px-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[9px] flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>{msg.suggestedAction.title}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </Link>
                      )}

                      {msg.suggestedAction.type === 'view_map' && (
                        <Link
                          href="/map"
                          onClick={() => setIsOpen(false)}
                          className="w-full py-1 px-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[9px] flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>{msg.suggestedAction.title}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
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
                  <div className="w-4 h-4 rounded bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-1 items-center text-[9px] text-slate-500 font-bold p-1 animate-pulse">
                <Bot className="w-2.5 h-2.5 text-blue-600" />
                <span>AI typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Micro Chips */}
          <div className="px-1.5 py-1 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-1 scrollbar-none shrink-0">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[9px] font-bold whitespace-nowrap transition-colors border border-slate-200/80"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Micro Input Bar */}
          <div className="p-1.5 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1"
            >
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`p-1 rounded transition-all ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title={isListening ? 'Listening...' : 'Voice'}
              >
                {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
              </button>

              <input
                type="text"
                placeholder={isListening ? 'Listening...' : 'Type query...'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-2 py-1 text-[10px] font-semibold bg-slate-50 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none text-slate-900"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-1 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-all"
                title="Send"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
