/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Public Profile Preview Modal
 * Brand: SAS Tech Inc.
 */

import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, Heart, Briefcase, GraduationCap, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserProfile } from '../../types/peqot';

interface PublicProfileModalProps {
  user: UserProfile | null;
  onClose: () => void;
  onOpenMessage?: () => void;
}

export const PublicProfileModal: React.FC<PublicProfileModalProps> = ({ user, onClose, onOpenMessage }) => {
  const [activePhoto, setActivePhoto] = useState(0);

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-rose-100 my-8 text-left">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Photo Gallery */}
        <div className="relative aspect-4/5 bg-slate-900 overflow-hidden">
          <img
            src={user.photos[activePhoto]?.url || '/src/assets/images/peqot_hero_couple_1793670569695.jpg'}
            alt={user.display_name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />

          {user.photos.length > 1 && (
            <>
              <button
                onClick={() => setActivePhoto(p => Math.max(0, p - 1))}
                disabled={activePhoto === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center disabled:opacity-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActivePhoto(p => Math.min(user.photos.length - 1, p + 1))}
                disabled={activePhoto === user.photos.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center disabled:opacity-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {user.is_verified && (
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 shadow">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Adult</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
            <h2 className="text-2xl font-bold font-serif-display">
              {user.display_name}, {user.age}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-rose-200 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{user.city}, {user.country}</span>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-4">
          
          <div className="flex items-center gap-2 text-xs">
            <div className="bg-rose-50 border border-rose-100 text-rose-900 px-2.5 py-1 rounded-lg font-medium">
              Seeking: <span className="capitalize">{user.relationship_intention.replace('_', ' ')}</span>
            </div>
            {user.occupation && (
              <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700">
                {user.occupation}
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            "{user.bio}"
          </p>

          <div className="space-y-2 pt-2 border-t border-rose-50 text-xs">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-500">Languages:</span>
              <span className="font-semibold text-slate-800">{user.languages.join(', ')}</span>
            </div>
            {user.education && (
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-slate-500">Education:</span>
                <span className="font-semibold text-slate-800">{user.education}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {user.interests.map((tag, i) => (
                <span key={i} className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
            >
              Close Profile
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
