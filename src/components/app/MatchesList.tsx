/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Matches List
 * Brand: SAS Tech Inc.
 */

import React from 'react';
import { Heart, MessageCircle, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { Match, UserProfile } from '../../types/peqot';
import { peqotStore } from '../../lib/peqotStore';

interface MatchesListProps {
  onOpenConversation: (matchId: string) => void;
  onNavigateToDiscover: () => void;
}

export const MatchesList: React.FC<MatchesListProps> = ({
  onOpenConversation,
  onNavigateToDiscover
}) => {
  const matches = peqotStore.getMatches();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-left space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-100">
        <div>
          <h1 className="text-2xl font-bold font-serif-display text-slate-900">
            Mutual Matches
          </h1>
          <p className="text-xs text-slate-500">
            Members who mutually liked your profile. Direct messaging is unlocked.
          </p>
        </div>
        <div className="text-xs font-semibold text-[#900B4B] bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 self-start sm:self-auto">
          {matches.length} Active {matches.length === 1 ? 'Connection' : 'Connections'}
        </div>
      </div>

      {matches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => {
            const user = match.matched_user;
            if (!user) return null;

            return (
              <div 
                key={match.id}
                className="bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
                    <img
                      src={user.photos[0]?.url || '/src/assets/images/peqot_dating_liberia_1793670570605.jpg'}
                      alt={user.display_name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {user.is_verified && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Verified
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white text-left">
                      <div className="text-base font-bold font-serif-display">
                        {user.display_name}, {user.age}
                      </div>
                      <div className="text-xs text-rose-200">
                        {user.city}, {user.country}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 text-left">
                    <div className="text-xs font-medium text-slate-500 line-clamp-1">
                      Seeking: <strong className="text-slate-800 capitalize">{user.relationship_intention.replace('_', ' ')}</strong>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      "{user.bio}"
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => onOpenConversation(match.id)}
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#900B4B] to-[#E11D74] hover:opacity-95 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open Conversation</span>
                    {match.unread_count && match.unread_count > 0 ? (
                      <span className="w-2 h-2 rounded-full bg-white ml-1" />
                    ) : null}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 bg-white rounded-3xl border border-rose-100 text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-[#900B4B] flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7 fill-rose-500" />
          </div>
          <h3 className="text-lg font-bold font-serif-display text-slate-900">
            No Mutual Matches Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Explore profiles in the Discover feed and send Likes to singles whose values resonate with you.
          </p>
          <button
            onClick={onNavigateToDiscover}
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#900B4B] rounded-xl hover:bg-[#78093E] transition-colors"
          >
            Start Discovering
          </button>
        </div>
      )}

    </div>
  );
};
