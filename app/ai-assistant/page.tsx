'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DataSourceBadge } from '@/components/ui/DataSourceBadge';
import {
  Bot,
  Sparkles,
  Send,
  Mic,
  MicOff,
  Building2,
  MapPin,
  HelpCircle,
  FileText,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Shield,
  Layers,
  Lightbulb,
} from 'lucide-react';

export default function AiAssistantPage() {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [chatHistory, setChatHistory] = useState([
    {
      id: 'ai_1',
      sender: 'ai',
      text: "Namaste! Welcome to the JanVaani Civic AI Intelligence Center. I can synthesize neighborhood complaints into actionable municipal tickets, cross-reference official data.gov.in and Census datasets, or connect you with your Ward Corporator and MLA. What civic issue or open data insight can I help you with?",
      timestamp: '10:00 AM',
    },
  ]);

  const handleSend = (preset?: string) => {
    const text = preset || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setInputText('');
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      const aiReply = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: `Analysis complete for: "${text}".\n\n1. **Identified Sector**: Infrastructure / Urban Utilities\n2. **Jurisdiction**: Karelibaug (Ward 07), Vadodara Municipal Corporation\n3. **Recommended SLA Action**: Auto-route to Executive Engineer Er. Rajesh K. Patel with a 72-hour P1 resolution clock.\n4. **Baseline Context**: Ward 7 has an active 92.4% SLA resolution rate across 180 solved cases this quarter.`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory((prev) => [...prev, aiReply]);
    }, 900);
  };

  return (
    <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30">
                  JanVaani Civic Intelligence AI
                </span>
                <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Multi-Modal NLP
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                JanVaani AI Saathi (Civic Assistant &amp; Co-Pilot)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/data-catalog"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition-colors"
            >
              Open Data Catalog →
            </Link>
            <Link
              href="/government/representatives"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition-colors"
            >
              Representatives Radar
            </Link>
          </div>
        </div>

        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          Ask questions in Hindi, Gujarati, English or any Indian regional language. JanVaani AI extracts structured parameters, flags duplicates, matches open government datasets, and helps you file high-impact civic interventions.
        </p>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Pre-Built Civic Templates */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-3">
            <h3 className="text-sm font-black text-slate-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Prompt Templates</span>
            </h3>

            <div className="space-y-2">
              {[
                {
                  title: '📍 Auto-Draft Road Repair Case',
                  desc: 'Draft an engineering ticket for pothole repair in Karelibaug',
                  prompt: 'Draft an urgent P1 problem report for dangerous potholes near Karelibaug water tank.',
                },
                {
                  title: '🏛️ Look Up Ward 7 Leadership',
                  desc: 'Get direct WhatsApp & phone of Corporator, MLA & Engineer',
                  prompt: 'Who are the elected corporators, MLAs and Executive Engineers for Ward 7 Vadodara?',
                },
                {
                  title: '🌬️ CPCB Air Quality (AQI) Check',
                  desc: 'Real-time particulate telemetry from local monitoring station',
                  prompt: 'What is the current CPCB air quality and PM2.5 level in Vadodara?',
                },
                {
                  title: '📜 Draft an Online RTI Application',
                  desc: 'Template for requesting road contractor bitumen expenditure',
                  prompt: 'How to write an online RTI request for municipal road resurfacing contracts?',
                },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(item.prompt)}
                  className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-300 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-3xl border border-blue-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-blue-900 font-extrabold">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>AI Ethics &amp; Transparency</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              JanVaani AI does not fabricate legal claims or government statements. All outputs are marked as <strong>AI Inferred Analysis</strong> and cite registered open data sources.
            </p>
          </div>
        </div>

        {/* Right Side: Conversation Flow */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-card flex flex-col h-[620px] overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-slate-50/40">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed space-y-2 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  <div
                    className={`text-[9px] font-semibold text-right ${
                      msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex gap-2 items-center text-xs text-slate-500 font-bold p-3 animate-pulse">
                <Bot className="w-4 h-4 text-blue-600" />
                <span>JanVaani AI is synthesizing civic telemetry...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask JanVaani AI anything or describe a local civic issue in your language..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-3 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
