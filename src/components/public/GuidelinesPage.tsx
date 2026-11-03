/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Community Guidelines
 * Brand: SAS Tech Inc.
 */

import React from 'react';
import { Heart, Check, X, ShieldAlert } from 'lucide-react';

interface GuidelinesPageProps {
  onOpenSignUp: () => void;
  onNavigate: (tab: string) => void;
}

export const GuidelinesPage: React.FC<GuidelinesPageProps> = ({ onOpenSignUp, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-12">
      
      <div className="space-y-4">
        <div className="text-xs font-bold text-[#900B4B] uppercase tracking-wider">
          Community Standards
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-display text-slate-900">
          PeQoT Community Guidelines
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          PeQoT is a sanctuary for authentic, intercultural courtship. To protect the dignity and safety of our global community, every member agrees to adhere strictly to these core behavioral standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Do's */}
        <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>What We Encourage</span>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Authentic Representation:</strong> Upload recent, genuine photos of yourself and state your true life intentions clearly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Cultural Respect:</strong> Approach conversations with curiosity, patience, and honor for diverse international traditions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Mutual Kindness:</strong> Treat every match with the high standard of respect you would desire for your own family.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Identity Verification:</strong> Complete biometric verification to foster platform-wide trust.</span>
            </li>
          </ul>
        </div>

        {/* Don'ts */}
        <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
            <X className="w-5 h-5 text-rose-600" />
            <span>Strictly Prohibited Violations</span>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span><strong>Underage Accounts:</strong> Strictly zero tolerance. Anyone under 18 is banned and permanently reported.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span><strong>Financial Solicitations & Scams:</strong> Asking for money, wire transfers, crypto investments, or gifts will trigger an immediate permanent ban.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span><strong>Explicit / Pornographic Content:</strong> Lewd photographs, unsolicited explicit messages, or sexual solicitation are strictly forbidden.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span><strong>Harassment & Hate Speech:</strong> Any discrimination based on race, nationality, religion, or gender results in immediate expulsion.</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-xs font-bold text-amber-900">Enforcement & Appeals</div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Our moderation team reviews every report manually. In cases of accidental flagging, members can submit an appeal through SAS Tech Inc. Customer Support with their verification docket.
          </p>
        </div>
      </div>

    </div>
  );
};
