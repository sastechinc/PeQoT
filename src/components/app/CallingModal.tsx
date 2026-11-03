/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Voice & Video Call Architecture
 * Brand: SAS Tech Inc.
 * Section 10 Compliance: Extensible architecture, clearly marked as coming soon
 */

import React, { useState } from 'react';
import { X, Phone, Video, Mic, MicOff, VideoOff, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { UserProfile } from '../../types/peqot';

interface CallingModalProps {
  user: UserProfile | null;
  callType: 'audio' | 'video';
  onClose: () => void;
}

export const CallingModal: React.FC<CallingModalProps> = ({ user, callType, onClose }) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(callType === 'video');

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#18111D] text-white rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl border border-[#2F1F3B]">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#E11D74]" />
          <span>WebRTC Calling Architecture · Coming Soon</span>
        </div>

        {/* User Card */}
        <div className="space-y-3">
          <div className="relative w-28 h-28 mx-auto">
            <img
              src={user.photos[0]?.url || '/src/assets/images/peqot_dating_liberia_1793670570605.jpg'}
              alt={user.display_name}
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover border-4 border-[#900B4B] shadow-lg"
            />
            {user.is_verified && (
              <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold font-serif-display">
              {user.display_name}, {user.age}
            </h2>
            <p className="text-xs text-rose-300">
              {user.city}, {user.country}
            </p>
          </div>
        </div>

        {/* Architectural Advisory Notice */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 text-left space-y-2">
          <div className="font-semibold text-rose-200 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-[#E11D74]" />
            <span>Production Provider Integration</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Per Section 10 of PeQoT system specifications: Real-time encrypted WebRTC audio and video calling is prepared for Agora / Daily.co provider integration upon provisioning of verified credentials. Decorative mock connections are disabled to safeguard privacy.
          </p>
        </div>

        {/* Hardware Permissions Preview */}
        <div className="space-y-2 text-left">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Hardware & Privacy Controls
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMicEnabled(!micEnabled)}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-colors ${
                micEnabled ? 'bg-white/10 border-white/20 text-white' : 'bg-rose-900/30 border-rose-800 text-rose-300'
              }`}
            >
              {micEnabled ? <Mic className="w-4 h-4 text-emerald-400" /> : <MicOff className="w-4 h-4 text-rose-400" />}
              <span>{micEnabled ? 'Mic Active' : 'Mic Muted'}</span>
            </button>

            <button
              onClick={() => setCamEnabled(!camEnabled)}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-colors ${
                camEnabled ? 'bg-white/10 border-white/20 text-white' : 'bg-rose-900/30 border-rose-800 text-rose-300'
              }`}
            >
              {camEnabled ? <Video className="w-4 h-4 text-emerald-400" /> : <VideoOff className="w-4 h-4 text-rose-400" />}
              <span>{camEnabled ? 'Cam Active' : 'Cam Muted'}</span>
            </button>
          </div>
        </div>

        {/* End Call / Close Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-colors"
          >
            Close Call Architecture View
          </button>
        </div>

      </div>
    </div>
  );
};
