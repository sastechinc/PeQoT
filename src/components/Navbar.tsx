/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Top Navigation Bar
 * Follows strict 3-Zone Top Bar Contract
 */

import React from 'react';
import { Heart, ShieldCheck, Flame, MessageCircle, Sparkles, User, LogOut } from 'lucide-react';
import { UserProfile } from '../types/peqot';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  currentUser: UserProfile | null;
  unreadCount: number;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenFirebaseModal: () => void;
  onRoleSwitch: (role: UserProfile['role']) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  currentUser,
  unreadCount,
  onOpenAuth,
  onLogout,
  onOpenFirebaseModal,
  onRoleSwitch
}) => {
  const isAdminOrMod = currentUser && ['super_admin', 'admin', 'moderator'].includes(currentUser.role);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-rose-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand wordmark & logo */}
        <button
          onClick={() => onNavigate(currentUser ? 'discover' : 'home')}
          className="flex items-center gap-2.5 group text-left whitespace-nowrap shrink-0"
        >
          <img
            src="/logo.png"
            alt="PeQoT Official Logo"
            className="w-9 h-9 object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform"
            onError={(e) => {
              // Fallback to URL if local asset has issue
              (e.target as HTMLImageElement).src = 'https://imagepaste.org/i/txvb2gfp.png';
            }}
          />
          <span className="text-xl font-bold tracking-tight text-[#1E1622] font-serif-display">
            PeQoT
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {!currentUser ? (
            <>
              <button
                onClick={() => onNavigate('home')}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentTab === 'home' ? 'text-[#E11D74] font-semibold' : 'hover:text-slate-900'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('how-it-works')}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentTab === 'how-it-works' ? 'text-[#E11D74] font-semibold' : 'hover:text-slate-900'
                }`}
              >
                How It Works
              </button>
              <button
                onClick={() => onNavigate('discover-preview')}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentTab === 'discover-preview' ? 'text-[#E11D74] font-semibold' : 'hover:text-slate-900'
                }`}
              >
                Discover Preview
              </button>
              <button
                onClick={() => onNavigate('safety')}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentTab === 'safety' ? 'text-[#E11D74] font-semibold' : 'hover:text-slate-900'
                }`}
              >
                Safety & Trust
              </button>
              <button
                onClick={() => onNavigate('about')}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentTab === 'about' ? 'text-[#E11D74] font-semibold' : 'hover:text-slate-900'
                }`}
              >
                About
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate('discover')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  currentTab === 'discover' ? 'text-[#E11D74] font-semibold' : 'hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#E11D74]" />
                Discover
              </button>
              <button
                onClick={() => onNavigate('matches')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  currentTab === 'matches' ? 'text-[#E11D74] font-semibold' : 'hover:text-slate-900'
                }`}
              >
                <Heart className="w-4 h-4" />
                Matches
              </button>
              <button
                onClick={() => onNavigate('messages')}
                className={`relative flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  currentTab === 'messages' ? 'text-[#E11D74] font-semibold' : 'hover:text-slate-900'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Messages
                {unreadCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#E11D74]" />
                )}
              </button>
              <button
                onClick={() => onNavigate('profile')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  currentTab === 'profile' ? 'text-[#E11D74] font-semibold' : 'hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                My Profile
              </button>
              {isAdminOrMod && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                    currentTab === 'admin' ? 'text-[#900B4B] font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#900B4B]" />
                  Admin
                </button>
              )}
            </>
          )}
        </nav>

        {/* Zone 3: 1 primary action + system helpers */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Official Firebase Integration button */}
          <button
            onClick={onOpenFirebaseModal}
            title="Inspect Official Google Firebase & Firestore Integration"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 border border-slate-200"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="hidden sm:inline">Firebase</span>
          </button>

          {!currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#900B4B] to-[#E11D74] hover:opacity-95 rounded-lg shadow-sm shadow-rose-900/10 transition-all whitespace-nowrap shrink-0"
              >
                Join PeQoT (18+)
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Role preview badge */}
              <select
                value={currentUser.role}
                onChange={(e) => onRoleSwitch(e.target.value as UserProfile['role'])}
                className="text-xs bg-rose-50 border border-rose-200 text-rose-900 rounded-md px-2 py-1 focus:outline-none cursor-pointer"
                title="Switch role for evaluation"
              >
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="member">Member</option>
              </select>

              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <img
                  src={currentUser.photos[0]?.url || '/src/assets/images/peqot_hero_couple_1793670569695.jpg'}
                  alt={currentUser.display_name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-rose-200"
                />
                <span className="text-xs font-semibold text-slate-800 hidden sm:inline max-w-[100px] truncate">
                  {currentUser.display_name}
                </span>
              </button>

              <button
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
