/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Safety & Security Page
 * Brand: SAS Tech Inc.
 */

import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, EyeOff, UserX, FileCheck, PhoneCall } from 'lucide-react';

interface SafetyPageProps {
  onOpenSignUp: () => void;
  onNavigate: (tab: string) => void;
}

export const SafetyPage: React.FC<SafetyPageProps> = ({ onOpenSignUp, onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-16">
      
      {/* Title */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-bold text-[#900B4B] uppercase tracking-wider">
          Cybersecurity & Member Protection
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-display text-slate-900">
          Safety & Security at PeQoT
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          At SAS Tech Inc., your physical, financial, and emotional safety is our highest engineering priority. We implement strict defense-in-depth protocols so you can seek romance with total peace of mind.
        </p>
      </div>

      {/* 4 Pillars of Safety */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-[#900B4B]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Strict 18+ Verification & Minor Barring</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Minors are strictly prohibited from the platform. We run automated chronological checks on date-of-birth fields, verified against government IDs. Our moderation team immediately bans and flags any underage impersonator accounts.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-[#900B4B]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">PostgreSQL Row Level Security (RLS)</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Your private text messages, match data, and submitted verification scans cannot be retrieved by unauthorized parties. The database guarantees that only verified participants in an active match have permission to read conversation data.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-[#900B4B]">
            <EyeOff className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Zero Location or Address Leakage</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We only display broad city and country indications (e.g. Monrovia, Liberia; Paris, France). Exact GPS coordinates and home addresses are never captured or revealed to other members under any circumstances.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-[#900B4B]">
            <UserX className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Anti-Scam & Financial Safety Advisory</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Never send wire transfers, cryptocurrency, gift cards, or emergency money to someone you have only met online. Any profile asking for financial assistance or business investments is in violation of our terms and should be reported immediately.
          </p>
        </div>

      </div>

      {/* Safety Guidelines for International Romance */}
      <div className="p-8 rounded-3xl bg-[#FAF7F8] border border-rose-100 space-y-6">
        <h2 className="text-2xl font-bold font-serif-display text-slate-900">
          Golden Rules for International Dating
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-[#900B4B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
            <div>
              <strong>Keep communications on PeQoT initially:</strong> Scammers frequently request to transition immediately to external messaging apps to evade moderation filters.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-[#900B4B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
            <div>
              <strong>Verify their badge:</strong> Prioritize connecting with members with the verified blue checkmark who have passed government biometric checks.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-[#900B4B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
            <div>
              <strong>Meet in public places:</strong> When traveling internationally for a first in-person meeting, always stay in an independent hotel, meet in busy public venues, and share your itinerary with family.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
