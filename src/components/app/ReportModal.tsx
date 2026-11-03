/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT User Report & Moderation Modal
 * Section 11 Official Reporting Categories
 * Brand: SAS Tech Inc.
 */

import React, { useState } from 'react';
import { X, Flag, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { UserProfile, ReportCategory } from '../../types/peqot';
import { peqotStore } from '../../lib/peqotStore';

interface ReportModalProps {
  user: UserProfile | null;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ user, onClose }) => {
  const [category, setCategory] = useState<ReportCategory>('scamming');
  const [details, setDetails] = useState('');
  const [autoBlock, setAutoBlock] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!user) return null;

  const categories: { id: ReportCategory; label: string; desc: string }[] = [
    { id: 'fake_profile', label: 'Fake Profile / Stolen Photos', desc: 'Profile photos or biographical details are fabricated or stolen.' },
    { id: 'scamming', label: 'Scamming / Financial Solicitations', desc: 'Asked for money, wire transfers, crypto, or investments.' },
    { id: 'harassment', label: 'Harassment / Bullying', desc: 'Unwanted persistent contact, offensive remarks, or hostility.' },
    { id: 'impersonation', label: 'Impersonation of Another Person', desc: 'Pretending to be someone else or a known celebrity.' },
    { id: 'inappropriate_content', label: 'Inappropriate / Explicit Material', desc: 'Pornographic imagery or sexual solicitation.' },
    { id: 'threats', label: 'Threats / Physical Safety Risk', desc: 'Intimidation, stalking, or threats of violence.' },
    { id: 'underage_user', label: 'Suspected Underage User (Under 18)', desc: 'Suspected minor attempting to use the dating service.' },
    { id: 'other', label: 'Other Safety Concern', desc: 'Any other serious platform violation.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    peqotStore.reportUser({
      reported_user_id: user.id,
      category,
      details
    });

    if (autoBlock) {
      peqotStore.blockUser(user.id);
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 text-left space-y-6 shadow-2xl border border-rose-100 my-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 uppercase">
            <Flag className="w-4 h-4 text-rose-600" />
            <span>Safety Reporting Escalation</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-display text-slate-900">
            Report {user.display_name}
          </h2>
          <p className="text-xs text-slate-500">
            Your complaint is submitted anonymously to our SAS Tech Inc. moderation queue.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Safety Report Received</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you for protecting the PeQoT community. {user.display_name} has been blocked from contacting you, and our safety team is reviewing the incident logs.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#900B4B] rounded-xl hover:bg-[#78093E] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Select Violation Category *</label>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {categories.map((c) => (
                  <label
                    key={c.id}
                    className={`block p-3 rounded-2xl border cursor-pointer transition-all ${
                      category === c.id 
                        ? 'bg-rose-50 border-[#900B4B] text-slate-900' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="report_cat"
                        value={c.id}
                        checked={category === c.id}
                        onChange={() => setCategory(c.id)}
                        className="text-[#900B4B] focus:ring-0"
                      />
                      <span className="text-xs font-bold">{c.label}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-5 mt-0.5">{c.desc}</p>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Specific Details / Context *</label>
              <textarea
                rows={3}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe what occurred, dates, or messages sent..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={autoBlock}
                  onChange={(e) => setAutoBlock(e.target.checked)}
                  className="rounded text-[#900B4B] focus:ring-0"
                />
                <span>Also immediately block {user.display_name} from my discovery and messages</span>
              </label>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-rose-700 hover:bg-rose-800 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Submit Confidential Report</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
