/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Help Center
 * Brand: SAS Tech Inc.
 */

import React, { useState } from 'react';
import { Search, HelpCircle, ShieldCheck, Heart, User, MessageCircle, ChevronRight } from 'lucide-react';

interface HelpCenterPageProps {
  onNavigate: (tab: string) => void;
  onOpenSignUp: () => void;
}

export const HelpCenterPage: React.FC<HelpCenterPageProps> = ({ onNavigate, onOpenSignUp }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const articles = [
    {
      category: 'verification',
      title: 'How do I obtain the Verified Badge?',
      summary: 'Upload a clear scan of your government-issued passport or national ID along with a matching live selfie in your Profile settings. Our moderation team reviews documents within 24 hours.'
    },
    {
      category: 'safety',
      title: 'What should I do if someone asks me for money?',
      summary: 'Never transfer funds under any pretext. Immediately tap the three dots icon in the chat or on their profile, select "Report User", choose "Scamming / Financial Fraud", and block them.'
    },
    {
      category: 'matching',
      title: 'How does international matching work?',
      summary: 'You set your target regions (Liberia, Africa, Europe, Americas, Asia) and relationship intentions. When you both Like each other, a mutual match is created and messaging opens.'
    },
    {
      category: 'account',
      title: 'How do I change my discovery location preferences?',
      summary: 'Head to the Discover tab and tap the filter icon in the upper-right corner. You can adjust age bounds, preferred countries, and relationship goals.'
    },
    {
      category: 'messaging',
      title: 'Can anyone message me without my consent?',
      summary: 'No. PeQoT requires mutual consent. Only users you have mutually matched with can send messages to your inbox.'
    },
    {
      category: 'safety',
      title: 'How are minors kept off the platform?',
      summary: 'PeQoT calculates exact chronological age from birth dates during registration. Dates representing ages below 18 are rejected at both frontend and database levels.'
    }
  ];

  const filtered = articles.filter(a => {
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-12">
      
      {/* Header with Search */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="text-xs font-bold text-[#900B4B] uppercase tracking-wider">
          Support & Knowledge Base
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-display text-slate-900">
          How Can We Support You?
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Official support guides, privacy assistance, and answers for the global PeQoT community.
        </p>

        <div className="relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides (e.g. verification, safety, matching)..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-rose-100 rounded-2xl shadow-sm text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#E11D74]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { id: 'all', label: 'All Articles' },
          { id: 'verification', label: 'Identity Verification' },
          { id: 'safety', label: 'Safety & Blocking' },
          { id: 'matching', label: 'Matching & Discovery' },
          { id: 'account', label: 'Account & Settings' },
          { id: 'messaging', label: 'Private Messaging' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedCategory === cat.id
                ? 'bg-[#900B4B] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((art, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-2 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E11D74]">
              {art.category}
            </span>
            <h3 className="text-sm font-bold text-slate-900">{art.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{art.summary}</p>
          </div>
        ))}
      </div>

      {/* Need More Help Banner */}
      <div className="p-8 rounded-3xl bg-white border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900">Still have a question or need emergency safety assistance?</h4>
          <p className="text-xs text-slate-600">Our customer support and cybersecurity response teams at SAS Tech Inc. are here to help.</p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#900B4B] hover:bg-[#78093E] rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          Contact SAS Tech Support
        </button>
      </div>

    </div>
  );
};
