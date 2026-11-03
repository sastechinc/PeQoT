/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Identity Verification Modal
 * Brand: SAS Tech Inc.
 */

import React, { useState } from 'react';
import { X, ShieldCheck, Upload, AlertCircle, CheckCircle2, FileText, Camera } from 'lucide-react';
import { peqotStore } from '../../lib/peqotStore';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
  const currentUser = peqotStore.getCurrentUser();
  const [docUrl, setDocUrl] = useState('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80');
  const [selfieUrl, setSelfieUrl] = useState(currentUser?.photos?.[0]?.url || '/src/assets/images/peqot_hero_couple_1793670569695.jpg');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = peqotStore.submitVerification(docUrl, selfieUrl);
    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.error || 'Failed to submit verification request.');
    }
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
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#900B4B] uppercase">
            <ShieldCheck className="w-4 h-4 text-[#E11D74]" />
            <span>Biometric Trust Tier</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-display text-slate-900">
            Verify Your Identity
          </h2>
          <p className="text-xs text-slate-500">
            Obtain the PeQoT Verified Badge. Reviewed strictly by SAS Tech Inc. compliance officers.
          </p>
        </div>

        {currentUser.is_verified ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-emerald-900">Your Identity is Formally Verified</h3>
            <p className="text-xs text-emerald-700 max-w-sm mx-auto">
              Your biometric verification has cleared compliance. The official PeQoT blue badge is actively shown on your profile.
            </p>
          </div>
        ) : submitted || currentUser.verification_status === 'pending' ? (
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Verification Under Review</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Your government ID scan and live selfie are currently under manual review by our Monrovia compliance desk. 
              Turnaround time is typically within 12 to 24 hours.
            </p>
            <div className="text-[11px] text-amber-700 pt-1">
              Documents are stored in an encrypted private vault and purged per GDPR data retention protocols.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2 text-xs text-slate-700">
              <div className="font-bold text-[#900B4B]">Requirements for Approval:</div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600">
                <li>Valid government-issued passport, national ID card, or driver's license.</li>
                <li>Name and birthdate must match your profile ({currentUser.display_name}, age {currentUser.age}).</li>
                <li>Clear live selfie showing full face without sunglasses or hats.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">1. Government Photo ID Document Scan</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={docUrl}
                  onChange={(e) => setDocUrl(e.target.value)}
                  placeholder="ID document storage URI"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>
              <p className="text-[10px] text-slate-400">Encrypted in private storage. Never visible to other dating members.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">2. Real-Time Verification Selfie</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={selfieUrl}
                  onChange={(e) => setSelfieUrl(e.target.value)}
                  placeholder="Live selfie photo URI"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#900B4B] to-[#E11D74] hover:opacity-95 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Submit Verification for Review</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
