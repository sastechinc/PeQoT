/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT About Page
 * Brand: SAS Tech Inc.
 */

import React from 'react';
import { Heart, Globe2, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

interface AboutPageProps {
  onOpenSignUp: () => void;
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenSignUp, onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-16">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#900B4B] tracking-wider uppercase">
          <span>About PeQoT</span>
          <span aria-hidden="true">·</span>
          <span>SAS Tech Inc.</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-display text-slate-900 leading-tight">
          Where Hearts Meet, Beyond Borders.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          PeQoT was born from a singular, transformative conviction: authentic love, genuine companionship, and deep emotional affinity should never be constrained by geographical borders or socio-economic limitations.
        </p>
      </div>

      {/* Meaning of PeQoT */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-rose-100 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold font-serif-display text-slate-900">
          The Official PeQoT Philosophy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-2">
          <div className="space-y-2 border-l-2 border-rose-300 pl-4">
            <span className="text-3xl font-bold text-[#900B4B] font-serif-display">P</span>
            <h3 className="text-sm font-bold text-slate-900">Passion</h3>
            <p className="text-xs text-slate-600">The vital romantic spark that inspires deep emotional devotion and genuine courtship.</p>
          </div>
          <div className="space-y-2 border-l-2 border-rose-300 pl-4">
            <span className="text-3xl font-bold text-[#900B4B] font-serif-display">e</span>
            <h3 className="text-sm font-bold text-slate-900">Encounters</h3>
            <p className="text-xs text-slate-600">Serendipitous, life-altering introductions across different continents and cultures.</p>
          </div>
          <div className="space-y-2 border-l-2 border-rose-300 pl-4">
            <span className="text-3xl font-bold text-[#900B4B] font-serif-display">Q</span>
            <h3 className="text-sm font-bold text-slate-900">Quality</h3>
            <p className="text-xs text-slate-600">Strict 18+ age checks, biometric ID verifications, and zero bot profiles.</p>
          </div>
          <div className="space-y-2 border-l-2 border-rose-300 pl-4">
            <span className="text-3xl font-bold text-[#900B4B] font-serif-display">o</span>
            <h3 className="text-sm font-bold text-slate-900">Openness</h3>
            <p className="text-xs text-slate-600">Embracing diverse traditions, global perspectives, and intercultural understanding.</p>
          </div>
          <div className="space-y-2 border-l-2 border-rose-300 pl-4">
            <span className="text-3xl font-bold text-[#900B4B] font-serif-display">T</span>
            <h3 className="text-sm font-bold text-slate-900">Togetherness</h3>
            <p className="text-xs text-slate-600">Building lifelong marriages, partnerships, and resilient families across borders.</p>
          </div>
        </div>
      </div>

      {/* Story & Liberia Gateway */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#900B4B]">Our Roots</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-slate-900">
            Founded by SAS Tech Inc. in Monrovia
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Headquartered in Monrovia, Liberia, SAS Tech Inc. recognized that mainstream international dating applications frequently neglected users in West Africa and other developing nations through unstable performance, lack of local customer support, and inadequate scam protections.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            PeQoT was purposefully engineered to provide an international-standard experience: lightweight for moderate network speeds, fortified by modern cryptographic Row Level Security, and verified with human integrity.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-rose-100">
          <img
            src="/src/assets/images/peqot_dating_liberia_1793670570605.jpg"
            alt="Authentic Liberian community member"
            referrerPolicy="no-referrer"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Corporate Governance */}
      <div className="p-8 rounded-2xl bg-white border border-rose-100 space-y-4">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-[#900B4B]" />
          <h2 className="text-xl font-bold font-serif-display text-slate-900">
            Corporate Governance & Safety Standards
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          SAS Tech Inc. operates PeQoT with absolute commitment to legal compliance, privacy protection (GDPR and regional data laws), and minor safety. We never sell user data, we never simulate fake active profiles or artificial engagement, and our moderation team actively reviews reported infractions 24/7.
        </p>
        <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#E11D74]" /> 18+ Verification Mandatory</span>
          <span className="flex items-center gap-1.5"><Globe2 className="w-4 h-4 text-[#E11D74]" /> Worldwide Reach</span>
          <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-[#E11D74]" /> Non-Profit Mission Values</span>
        </div>
      </div>

    </div>
  );
};
