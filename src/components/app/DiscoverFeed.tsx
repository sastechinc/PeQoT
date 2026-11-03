/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT International Discovery Engine
 * Brand: SAS Tech Inc.
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  X, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  Filter, 
  MessageCircle,
  Flag,
  UserX,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { UserProfile, Match, Gender, RelationshipIntention } from '../../types/peqot';
import { peqotStore } from '../../lib/peqotStore';
import { COUNTRIES, RELATIONSHIP_INTENTIONS } from '../../data/constants';
import { DiscoverySkeleton } from './DiscoverySkeleton';

interface DiscoverFeedProps {
  onMatchSuccess: (match: Match) => void;
  onOpenReport: (user: UserProfile) => void;
  onOpenMessages: (matchId: string) => void;
}

export const DiscoverFeed: React.FC<DiscoverFeedProps> = ({
  onMatchSuccess,
  onOpenReport,
  onOpenMessages
}) => {
  const [profiles, setProfiles] = useState<UserProfile[]>(() => peqotStore.getDiscoveryProfiles());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [matchedCandidate, setMatchedCandidate] = useState<UserProfile | null>(null);
  const [matchedRecord, setMatchedRecord] = useState<Match | null>(null);

  // Filter preferences state
  const currentPrefs = peqotStore.getPreferences();
  const [prefs, setPrefs] = useState(currentPrefs);

  // Synchronize with Firestore on mount and display skeleton loader
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const initDiscovery = async () => {
      await peqotStore.loadProfilesFromFirestore();
      if (isMounted) {
        setProfiles(peqotStore.getDiscoveryProfiles());
        setIsLoading(false);
      }
    };

    initDiscovery();

    const unsub = peqotStore.subscribe(() => {
      if (isMounted) {
        setProfiles(peqotStore.getDiscoveryProfiles());
      }
    });

    return () => {
      isMounted = false;
      unsub();
    };
  }, []);

  const refreshProfiles = async () => {
    setIsLoading(true);
    await peqotStore.loadProfilesFromFirestore();
    const list = peqotStore.getDiscoveryProfiles();
    setProfiles(list);
    setCurrentIndex(0);
    setActivePhotoIdx(0);
    setIsLoading(false);
  };

  const handleLike = (type: 'like' | 'super_like' = 'like') => {
    if (currentIndex >= profiles.length) return;
    const target = profiles[currentIndex];
    const result = peqotStore.likeProfile(target.id, type);

    if (result.isMatch && result.match) {
      setMatchedCandidate(target);
      setMatchedRecord(result.match);
      onMatchSuccess(result.match);
    }

    setCurrentIndex(prev => prev + 1);
    setActivePhotoIdx(0);
  };

  const handlePass = () => {
    setCurrentIndex(prev => prev + 1);
    setActivePhotoIdx(0);
  };

  const handleApplyFilters = () => {
    peqotStore.updatePreferences(prefs);
    setShowFilters(false);
    refreshProfiles();
  };

  const handleResetFilters = () => {
    const defaultPrefs = {
      interested_in_gender: 'all' as const,
      min_age: 18,
      max_age: 70,
      countries: [],
      intentions: [],
      verified_only: false
    };
    setPrefs(defaultPrefs);
    peqotStore.updatePreferences(defaultPrefs);
    setShowFilters(false);
    refreshProfiles();
  };

  const currentProfile = profiles[currentIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-left">
      
      {/* Top Bar with Filter Trigger */}
      <div className="flex items-center justify-between pb-6 border-b border-rose-100 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif-display text-slate-900">
            International Discovery
          </h1>
          <p className="text-xs text-slate-500">
            Cross-border matchmaking verified for adults (18+)
          </p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors ${
            showFilters 
              ? 'bg-[#900B4B] text-white border-[#900B4B]' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filters</span>
          {prefs.countries.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500 ml-1" />
          )}
        </button>
      </div>

      {/* Filter Drawer */}
      {showFilters && (
        <div className="mb-8 p-6 bg-white rounded-3xl border border-rose-100 shadow-md space-y-5 animate-fade-in text-left">
          <div className="flex items-center justify-between border-b border-rose-100/60 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-serif-display">
              Discovery Preferences
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#900B4B] hover:bg-[#78093E] rounded-lg transition-colors"
              >
                Apply Preferences
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Age Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Age Range: {prefs.min_age} - {prefs.max_age}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="18"
                  max={prefs.max_age}
                  value={prefs.min_age}
                  onChange={(e) => setPrefs({ ...prefs, min_age: Math.max(18, parseInt(e.target.value) || 18) })}
                  className="w-16 px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                />
                <span className="text-xs text-slate-400">to</span>
                <input
                  type="number"
                  min={prefs.min_age}
                  max="85"
                  value={prefs.max_age}
                  onChange={(e) => setPrefs({ ...prefs, max_age: Math.min(85, parseInt(e.target.value) || 75) })}
                  className="w-16 px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            {/* Target Countries */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Target Region</label>
              <select
                value={prefs.countries[0] || ''}
                onChange={(e) => setPrefs({ ...prefs, countries: e.target.value ? [e.target.value] : [] })}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="">Worldwide (All Countries)</option>
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Verified Only */}
            <div className="space-y-1.5 sm:pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={prefs.verified_only}
                  onChange={(e) => setPrefs({ ...prefs, verified_only: e.target.checked })}
                  className="rounded text-[#900B4B] focus:ring-0"
                />
                <span>Verified Biometric Profiles Only</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Profile Card Deck / Skeleton */}
      {isLoading ? (
        <DiscoverySkeleton />
      ) : currentProfile ? (
        <div className="max-w-md mx-auto bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-xl shadow-rose-950/5">
          
          {/* Photo Carousel Area */}
          <div className="relative aspect-4/5 bg-slate-900 overflow-hidden">
            <img
              src={currentProfile.photos[activePhotoIdx]?.url || '/src/assets/images/peqot_hero_couple_1793670569695.jpg'}
              alt={currentProfile.display_name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* Multiple Photos Indicator */}
            {currentProfile.photos.length > 1 && (
              <div className="absolute top-3 left-4 right-4 flex gap-1 z-10">
                {currentProfile.photos.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      i === activePhotoIdx ? 'bg-white shadow' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Carousel Nav Arrows */}
            {currentProfile.photos.length > 1 && (
              <>
                <button
                  onClick={() => setActivePhotoIdx(p => Math.max(0, p - 1))}
                  disabled={activePhotoIdx === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center disabled:opacity-0 transition-opacity"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActivePhotoIdx(p => Math.min(currentProfile.photos.length - 1, p + 1))}
                  disabled={activePhotoIdx === currentProfile.photos.length - 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center disabled:opacity-0 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Verified Badge */}
            {currentProfile.is_verified && (
              <div className="absolute top-6 left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 shadow">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Biometric ID</span>
              </div>
            )}

            {/* Scrim Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 text-white text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-serif-display leading-tight">
                    {currentProfile.display_name}, {currentProfile.age}
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-rose-200 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{currentProfile.city}, {currentProfile.country}</span>
                  </div>
                </div>

                {/* Safety Report Trigger */}
                <button
                  onClick={() => onOpenReport(currentProfile)}
                  title="Report Profile for safety violation"
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Profile Attributes */}
          <div className="p-6 space-y-4 text-left">
            
            {/* Intention & Occupation */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-1 bg-rose-50 border border-rose-100 text-rose-900 px-2.5 py-1 rounded-lg font-medium">
                <Heart className="w-3 h-3 text-[#E11D74]" />
                <span className="capitalize">{currentProfile.relationship_intention.replace('_', ' ')}</span>
              </div>
              {currentProfile.occupation && (
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                  <Briefcase className="w-3 h-3 text-slate-500" />
                  <span>{currentProfile.occupation}</span>
                </div>
              )}
            </div>

            {/* Bio */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              "{currentProfile.bio}"
            </p>

            {/* Languages & Interests */}
            <div className="space-y-2 pt-2 border-t border-rose-50 text-xs">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-slate-500">Languages:</span>
                <span className="font-semibold text-slate-800">{currentProfile.languages.join(', ')}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentProfile.interests.map((tag, i) => (
                  <span key={i} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar (Pass, SuperLike, Like) */}
            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={handlePass}
                title="Pass"
                className="w-14 h-14 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={() => handleLike('super_like')}
                title="Super Like"
                className="w-12 h-12 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200 flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform"
              >
                <Sparkles className="w-5 h-5 fill-amber-500" />
              </button>

              <button
                onClick={() => handleLike('like')}
                title="Like"
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#900B4B] to-[#E11D74] hover:opacity-95 text-white flex items-center justify-center shadow-lg shadow-rose-900/25 hover:scale-105 active:scale-95 transition-transform"
              >
                <Heart className="w-7 h-7 fill-white" />
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* Empty Deck State */
        <div className="p-12 max-w-md mx-auto bg-white rounded-3xl border border-rose-100 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-[#E11D74] flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7 fill-rose-500" />
          </div>
          <h3 className="text-xl font-bold font-serif-display text-slate-900">
            You Have Explored All Current Matches
          </h3>
          <p className="text-xs text-slate-600 max-w-xs mx-auto">
            Try adjusting your target country or age filters to meet other singles from Liberia and around the world.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#900B4B] rounded-xl hover:bg-[#78093E] transition-colors"
          >
            Reset Filters & View Again
          </button>
        </div>
      )}

      {/* Mutual Match Modal Celebration */}
      {matchedCandidate && matchedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-8 text-center space-y-6 shadow-2xl border-2 border-rose-200">
            
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto text-[#E11D74]">
              <Heart className="w-9 h-9 fill-rose-600 animate-bounce" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#900B4B] uppercase tracking-wider">
                Mutual Attraction
              </span>
              <h2 className="text-3xl font-bold font-serif-display text-slate-900">
                It's a Match!
              </h2>
              <p className="text-xs italic text-rose-800 font-serif-display">
                "Where Hearts Meet, Beyond Borders."
              </p>
              <p className="text-xs text-slate-600 pt-1">
                You and <strong>{matchedCandidate.display_name}</strong> have expressed mutual interest.
              </p>
            </div>

            {/* Profile Photos Pair */}
            <div className="flex items-center justify-center gap-3">
              <img
                src={peqotStore.getCurrentUser().photos[0]?.url || '/src/assets/images/peqot_hero_couple_1793670569695.jpg'}
                alt="You"
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <Heart className="w-6 h-6 text-[#E11D74] fill-rose-500 shrink-0" />
              <img
                src={matchedCandidate.photos[0]?.url || '/src/assets/images/peqot_dating_liberia_1793670570605.jpg'}
                alt={matchedCandidate.display_name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setMatchedCandidate(null);
                  onOpenMessages(matchedRecord.id);
                }}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#900B4B] to-[#E11D74] rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send {matchedCandidate.display_name} a Message</span>
              </button>

              <button
                onClick={() => setMatchedCandidate(null)}
                className="w-full py-2.5 text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                Keep Discovering
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
