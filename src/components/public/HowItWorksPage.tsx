/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT How It Works
 * Brand: SAS Tech Inc.
 */

import React from 'react';
import { ShieldCheck, Sliders, HeartHandshake, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowItWorksPageProps {
  onOpenSignUp: () => void;
  onNavigate: (tab: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onOpenSignUp, onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-16">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-bold text-[#900B4B] uppercase tracking-wider">
          Transparent Process
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-display text-slate-900">
          How PeQoT Works
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Unlike casual swipe apps that foster superficial browsing, PeQoT is intentionally designed for intentional, international courtship. Here is how your journey unfolds from verification to marriage.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        
        {/* Step 1 */}
        <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-3 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-[#900B4B] mx-auto md:mx-0 font-serif-display font-bold text-2xl">
              01
            </div>
            <div className="text-xs font-bold text-[#E11D74] mt-3">AGE & IDENTITY</div>
          </div>
          <div className="md:col-span-9 space-y-2">
            <h2 className="text-xl font-bold text-slate-900">18+ Strict Registration & Biometric Verification</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every applicant verifies their date of birth with mathematical validation. To receive the official PeQoT Verified Badge, members submit a valid government passport or ID and a real-time matching selfie. Minors are barred by automated security checks.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-700 font-medium pt-1">
              <CheckCircle2 className="w-4 h-4" /> Zero fake bots
              <CheckCircle2 className="w-4 h-4" /> Identity protected in private storage
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-3 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-[#900B4B] mx-auto md:mx-0 font-serif-display font-bold text-2xl">
              02
            </div>
            <div className="text-xs font-bold text-[#E11D74] mt-3">DISCOVERY</div>
          </div>
          <div className="md:col-span-9 space-y-2">
            <h2 className="text-xl font-bold text-slate-900">Curated International Discovery & Cultural Matching</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Define your preferences by country (Liberia, West Africa, Europe, Americas, Asia), spoken languages, lifestyle habits, and relationship intentions (Marriage, Long-Term Commitment, Friendship). You browse profiles with rich biographies and authentic photos.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
              <span>Filter by country</span> · <span>Filter by intentions</span> · <span>Verified-only mode</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-3 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-[#900B4B] mx-auto md:mx-0 font-serif-display font-bold text-2xl">
              03
            </div>
            <div className="text-xs font-bold text-[#E11D74] mt-3">CONSENT</div>
          </div>
          <div className="md:col-span-9 space-y-2">
            <h2 className="text-xl font-bold text-slate-900">Mutual Like & Two-Way Matching</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We eliminate unwanted inbox clutter. A conversation can only begin when two individuals express mutual admiration. Send a Like or a Super-Like to highlight your sincerity. When both members agree, a Match is officially formed.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-3 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-[#900B4B] mx-auto md:mx-0 font-serif-display font-bold text-2xl">
              04
            </div>
            <div className="text-xs font-bold text-[#E11D74] mt-3">PRIVACY</div>
          </div>
          <div className="md:col-span-9 space-y-2">
            <h2 className="text-xl font-bold text-slate-900">Encrypted 1-to-1 Real-Time Conversations</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Engage directly in high-speed, private messaging backed by PostgreSQL Row Level Security. Share your daily life, culture, voice messages, and plan mutual travel visits. Block or report any inappropriate behavior with instant one-click moderation.
            </p>
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#900B4B] to-[#E11D74] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold font-serif-display">Experience the Difference</h3>
          <p className="text-xs text-rose-100 mt-1">Join the verified international community today.</p>
        </div>
        <button
          onClick={onOpenSignUp}
          className="px-6 py-3 text-xs font-bold text-[#900B4B] bg-white hover:bg-rose-50 rounded-xl transition-colors whitespace-nowrap"
        >
          Get Started (18+)
        </button>
      </div>

    </div>
  );
};
