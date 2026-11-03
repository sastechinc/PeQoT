/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Homepage
 * Brand: SAS Tech Inc.
 */

import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Globe2, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquareHeart, 
  Users2, 
  ChevronDown
} from 'lucide-react';

interface HomePageProps {
  onOpenSignUp: () => void;
  onOpenLogin: () => void;
  onNavigate: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenSignUp,
  onOpenLogin,
  onNavigate
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is the meaning behind the name PeQoT?',
      a: 'PeQoT stands for Passion, Encounters, Quality, Openness, and Togetherness. Founded under SAS Tech Inc., our platform is dedicated to bridging hearts across borders with sincerity, emotional security, and authentic romance.'
    },
    {
      q: 'How does PeQoT strictly protect against underage users?',
      a: 'PeQoT is strictly restricted to adults aged 18 and older. We enforce chronological birth date calculation at registration and require government biometric identification during our verification process. Minors are barred from creating dating profiles.'
    },
    {
      q: 'Can members in Liberia and other African countries connect worldwide?',
      a: 'Yes. PeQoT was purposefully architected to connect singles in Liberia, throughout Africa, and with partners in Europe, North America, South America, Asia, and Oceania without geographic discrimination.'
    },
    {
      q: 'Are my private messages protected from other users and staff?',
      a: 'Yes. All communications are protected through PostgreSQL Row Level Security (RLS). Database policies guarantee that only verified members of an active mutual match can query or post messages in a conversation.'
    },
    {
      q: 'Is there a fee to register and discover matches?',
      a: 'Joining PeQoT, creating your verified profile, setting discovery preferences, discovering singles, and engaging in mutual matching are free. Optional premium capabilities may be introduced later through verified regional payment channels.'
    }
  ];

  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-rose-100/70 bg-gradient-to-b from-rose-50/50 via-[#FAF7F8] to-[#FAF7F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Trust Kicker (No Pill Enclosure per Anti-Slop Guidelines) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#900B4B] tracking-wide uppercase">
                <span>International Dating Platform</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-[#E11D74]">
                  <ShieldCheck className="w-3.5 h-3.5" /> 18+ Verified Adult Community
                </span>
                <span aria-hidden="true">·</span>
                <span>Powered by SAS Tech Inc.</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E1622] font-serif-display leading-[1.12]">
                Where Hearts Meet, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#900B4B] via-[#C2185B] to-[#E11D74]">
                  Beyond Borders.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Discover genuine international romance rooted in respect, emotional safety, and shared dreams. 
                Whether you are in Liberia, across West Africa, Europe, or the Americas, PeQoT unites singles who cherish deep, lifelong togetherness.
              </p>

              {/* Acronym Values Banner */}
              <div className="grid grid-cols-5 gap-2 pt-2 pb-1 border-y border-rose-200/60 max-w-xl text-center">
                <div>
                  <div className="text-lg font-bold text-[#900B4B] font-serif-display">P</div>
                  <div className="text-[11px] font-medium text-slate-600">Passion</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#900B4B] font-serif-display">e</div>
                  <div className="text-[11px] font-medium text-slate-600">Encounters</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#900B4B] font-serif-display">Q</div>
                  <div className="text-[11px] font-medium text-slate-600">Quality</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#900B4B] font-serif-display">o</div>
                  <div className="text-[11px] font-medium text-slate-600">Openness</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#900B4B] font-serif-display">T</div>
                  <div className="text-[11px] font-medium text-slate-600">Togetherness</div>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onOpenSignUp}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#900B4B] to-[#E11D74] hover:opacity-95 rounded-xl shadow-md shadow-rose-900/15 flex items-center justify-center gap-2 transition-all"
                >
                  Create Verified Profile (18+)
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="px-5 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  Explore How It Works
                </button>
              </div>

              {/* Trust Metadata */}
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Biometric ID Verification
                </span>
                <span aria-hidden="true">·</span>
                <span>Zero Fake Bot Profiles</span>
                <span aria-hidden="true">·</span>
                <span>End-to-End RLS Encrypted</span>
              </div>

            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl shadow-rose-950/20 border-4 border-white">
                <img
                  src="/src/assets/images/peqot_hero_couple_1793670569695.jpg"
                  alt="PeQoT international couple connecting at sunset"
                  referrerPolicy="no-referrer"
                  className="w-full h-[440px] sm:h-[480px] object-cover"
                />
                
                {/* Visual Overlay Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white text-left">
                  <div className="flex items-center gap-2 text-xs font-medium text-rose-300 mb-1">
                    <Globe2 className="w-4 h-4" />
                    <span>Liberia ⇄ Worldwide Connections</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-display leading-tight">
                    Sincere International Bonds
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                    Verified adults looking for meaningful courtship, cultural learning, and enduring commitment.
                  </p>
                </div>
              </div>

              {/* Trust Callout */}
              <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-lg border border-rose-100 flex items-center gap-3 max-w-[260px] text-left">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-[#E11D74] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Strict Age-Gating</div>
                  <div className="text-[11px] text-slate-500">Only adults aged 18+ verified</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4-Step Matching Journey */}
      <section className="py-20 bg-white border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#900B4B]">
              The PeQoT Pathway
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-slate-900">
              How Genuine International Love Unfolds
            </h2>
            <p className="text-sm text-slate-600">
              Four deliberate steps engineered to maximize emotional safety, cultural compatibility, and true mutual commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            
            <div className="p-6 rounded-2xl bg-[#FAF7F8] border border-rose-100 space-y-3">
              <div className="text-xs font-bold text-[#900B4B]">01. Verification</div>
              <h3 className="text-lg font-semibold text-slate-900">18+ Identity Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Confirm your adult eligibility and verify government ID to ensure every member on PeQoT is real, honest, and accountable.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F8] border border-rose-100 space-y-3">
              <div className="text-xs font-bold text-[#900B4B]">02. Discovery</div>
              <h3 className="text-lg font-semibold text-slate-900">Cross-Border Preferences</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter by country, languages, life intentions (marriage, long-term), and passions across Liberia, Africa, Europe, and the Americas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F8] border border-rose-100 space-y-3">
              <div className="text-xs font-bold text-[#900B4B]">03. Mutual Match</div>
              <h3 className="text-lg font-semibold text-slate-900">Two-Way Consent</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No unsolicited inbox flooding. Connections only activate when both people express mutual interest through a Like or Super-Like.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F8] border border-rose-100 space-y-3">
              <div className="text-xs font-bold text-[#900B4B]">04. Sincere Chat</div>
              <h3 className="text-lg font-semibold text-slate-900">Encrypted Private Messaging</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Converse securely in 1-to-1 chats protected by database Row Level Security. Share values, culture, and plan future meetings.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* International Showcase Spotlight */}
      <section className="py-20 bg-[#FAF7F8] border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#900B4B]">
                African & Global Convergence
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-slate-900 leading-tight">
                From Monrovia to London, Paris, and New York
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Historically, single adults in West Africa and developing regions have faced barriers on international platforms: 
                unjust geo-restrictions, predatory paywalls, and high volumes of fraudulent accounts. 
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>PeQoT</strong> changes the paradigm. Developed under SAS Tech Inc., our platform guarantees equal dignity, 
                streamlined bandwidth optimization for African networks, and strict security screening for members in every country.
              </p>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D74] shrink-0" />
                  <span>Bandwidth-optimized for seamless loading across Liberia and worldwide.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D74] shrink-0" />
                  <span>Zero tolerance for scams, commercial solicitations, and fake personas.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D74] shrink-0" />
                  <span>Dedicated moderation queue responding to safety reports within hours.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('discover-preview')}
                  className="px-5 py-2.5 text-xs font-semibold text-[#900B4B] hover:text-[#E11D74] border border-rose-200 hover:border-rose-300 rounded-lg bg-white transition-colors flex items-center gap-2"
                >
                  View Sample International Community
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-md border border-white">
                  <img
                    src="/src/assets/images/peqot_dating_liberia_1793670570605.jpg"
                    alt="African woman smiling in Monrovia"
                    referrerPolicy="no-referrer"
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-3 bg-white text-left text-xs">
                    <div className="font-semibold text-slate-900">Kormassa, 28</div>
                    <div className="text-slate-500 text-[11px]">Monrovia, Liberia</div>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md border border-white">
                  <img
                    src="/src/assets/images/peqot_matching_community_1793670571415.jpg"
                    alt="International community gathering"
                    referrerPolicy="no-referrer"
                    className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-3 bg-white text-left text-xs">
                    <div className="font-semibold text-slate-900">Rooftop Encounters</div>
                    <div className="text-slate-500 text-[11px]">Global Social Events</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="rounded-2xl overflow-hidden shadow-md border border-white">
                  <img
                    src="/src/assets/images/peqot_dating_international_1793670571282.jpg"
                    alt="European man in Paris café"
                    referrerPolicy="no-referrer"
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-3 bg-white text-left text-xs">
                    <div className="font-semibold text-slate-900">Antoine, 30</div>
                    <div className="text-slate-500 text-[11px]">Paris, France</div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#900B4B] to-[#E11D74] text-white text-left space-y-2">
                  <Heart className="w-5 h-5 fill-white" />
                  <div className="text-sm font-bold font-serif-display">Sincere Intentions</div>
                  <p className="text-[11px] text-rose-100 leading-snug">
                    Over 80% of our members specify Marriage or Long-Term Partnership as their primary life goal.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Safety & Security Highlights */}
      <section className="py-20 bg-white border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#900B4B]">
              Safety First Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-slate-900">
              Your Peace of Mind is Non-Negotiable
            </h2>
            <p className="text-sm text-slate-600">
              International romance requires extraordinary cybersecurity, data sovereignty, and human moderation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            <div className="p-6 rounded-2xl bg-[#FAF7F8] border border-rose-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100/70 flex items-center justify-center text-[#900B4B]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Underage Tolerance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Age calculation is verified against birth dates during signup and corroborated with biometric identity documents. Minor profiles are strictly blocked.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F8] border border-rose-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100/70 flex items-center justify-center text-[#900B4B]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">PostgreSQL Row Level Security</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Messages, match status, and documents are secured via database-level policies. Third parties cannot inspect private chats by tampering with URLs or API calls.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F8] border border-rose-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100/70 flex items-center justify-center text-[#900B4B]">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Anti-Scam & Instant Blocking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive reporting categories for fake profiles, financial requests, and harassment. Blocking immediately isolates the offending user.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-[#FAF7F8] border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#900B4B]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-bold font-serif-display text-slate-900">
              Everything You Need to Know About PeQoT
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white border border-rose-100/80 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm hover:text-[#900B4B]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#900B4B]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-rose-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#900B4B] to-[#E11D74] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Heart className="w-10 h-10 fill-white mx-auto opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-display">
            Ready to Meet Sincere Hearts Across Borders?
          </h2>
          <p className="text-sm sm:text-base text-rose-100 max-w-xl mx-auto">
            Join thousands of authentic singles from Liberia and across the globe who are building lasting relationships today.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenSignUp}
              className="px-8 py-3.5 text-sm font-bold text-[#900B4B] bg-white hover:bg-rose-50 rounded-xl shadow-lg transition-all"
            >
              Sign Up Now (18+)
            </button>
            <button
              onClick={onOpenLogin}
              className="px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 border border-white/30 rounded-xl transition-colors"
            >
              Member Login
            </button>
          </div>
          <div className="text-[11px] text-rose-200 pt-1">
            Strict 18+ policy enforced. SAS Tech Inc. guarantees data privacy.
          </div>
        </div>
      </section>

    </div>
  );
};
