/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Public Discover Preview
 * Brand: SAS Tech Inc.
 */

import React, { useState } from 'react';
import { ShieldCheck, Globe2, Heart, Lock, ArrowRight, Filter } from 'lucide-react';
import { COUNTRIES } from '../../data/constants';

interface DiscoverPreviewPageProps {
  onOpenSignUp: () => void;
  onOpenLogin: () => void;
}

export const DiscoverPreviewPage: React.FC<DiscoverPreviewPageProps> = ({
  onOpenSignUp,
  onOpenLogin
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('All');

  const previewProfiles = [
    {
      name: 'Kormassa',
      age: 28,
      country: 'Liberia',
      city: 'Monrovia',
      intention: 'Serious Dating',
      occupation: 'Public Health Specialist',
      languages: ['English', 'Kpelle', 'French'],
      photo: '/src/assets/images/peqot_dating_liberia_1793670570605.jpg',
      bio: 'Cultural storyteller and researcher. Love coastal strolls, afro-soul music, and conversations about African heritage.'
    },
    {
      name: 'Antoine',
      age: 30,
      country: 'France',
      city: 'Paris',
      intention: 'Long-term Partnership',
      occupation: 'Heritage Architect',
      languages: ['French', 'English'],
      photo: '/src/assets/images/peqot_dating_international_1793670571282.jpg',
      bio: 'Heritage architect passionate about cross-continental aesthetics, modern art, and discovering West African music traditions.'
    },
    {
      name: 'Zainab',
      age: 27,
      country: 'United Kingdom',
      city: 'London',
      intention: 'Marriage',
      occupation: 'Financial Strategy Manager',
      languages: ['English', 'Yoruba', 'Arabic'],
      photo: '/src/assets/images/peqot_hero_couple_1793670569695.jpg',
      bio: 'Fintech strategy consultant with roots in West Africa. Enthusiastic about indie bookstores and exploring culinary traditions.'
    },
    {
      name: 'Marcus',
      age: 32,
      country: 'United States',
      city: 'New York',
      intention: 'Long-term Partnership',
      occupation: 'Documentary Filmmaker',
      languages: ['English', 'Portuguese'],
      photo: '/src/assets/images/peqot_matching_community_1793670571415.jpg',
      bio: 'Documentary filmmaker capturing stories of global diaspora. Looking for an authentic partner who values international journeys.'
    }
  ];

  const filtered = selectedCountry === 'All' 
    ? previewProfiles 
    : previewProfiles.filter(p => p.country === selectedCountry);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-rose-100">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-bold text-[#900B4B] uppercase tracking-wider">
            Public Member Showcase
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-display text-slate-900">
            Discover Verified International Singles
          </h1>
          <p className="text-sm text-slate-600">
            A preview of verified adult singles connecting across borders. Join PeQoT to view complete profiles, exchange mutual likes, and start secure conversations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {['All', 'Liberia', 'France', 'United Kingdom', 'United States'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCountry === c 
                  ? 'bg-[#900B4B] text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Profiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((profile, idx) => (
          <div 
            key={idx}
            className="group bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-4/5 overflow-hidden">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] font-semibold text-emerald-800 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="text-base font-bold font-serif-display">
                    {profile.name}, {profile.age}
                  </div>
                  <div className="text-xs text-rose-200 font-medium">
                    {profile.city}, {profile.country}
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3 text-left">
                <div className="text-xs text-slate-500 font-medium">
                  Seeking: <strong className="text-slate-800">{profile.intention}</strong>
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  "{profile.bio}"
                </p>
                <div className="text-[11px] text-slate-500 flex flex-wrap gap-1">
                  <span>Languages:</span>
                  <span className="font-medium text-slate-700">{profile.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={onOpenSignUp}
                className="w-full py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-[#900B4B] text-[#900B4B] hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Connect with {profile.name} (18+)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Notice & Registration Prompt */}
      <div className="p-8 rounded-3xl bg-white border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#900B4B] uppercase">
            <Lock className="w-4 h-4" />
            <span>Privacy Guarded Directory</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Exact Location & Contact Details are Never Public
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            PeQoT protects every member's personal information. Full profile details, direct messaging, and location proximity are only accessible to verified 18+ registered members with mutual consent.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenLogin}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={onOpenSignUp}
            className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#900B4B] to-[#E11D74] rounded-xl shadow-sm transition-all"
          >
            Create Your Profile (18+)
          </button>
        </div>
      </div>

    </div>
  );
};
