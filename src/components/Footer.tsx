/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Professional Footer
 * Brand: SAS Tech Inc.
 */

import React from 'react';
import { Heart, ShieldCheck, Globe, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#18111D] text-slate-300 pt-16 pb-12 border-t border-[#2A1D33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#2C2136]">
          
          {/* Column 1: Brand & Slogan */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="PeQoT Official Logo"
                className="w-8 h-8 object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://imagepaste.org/i/txvb2gfp.png';
                }}
              />
              <span className="text-xl font-bold tracking-tight text-white font-serif-display">
                PeQoT
              </span>
            </div>
            <p className="text-sm font-serif-display italic text-rose-200/90 text-lg">
              "Where Hearts Meet, Beyond Borders."
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              PeQoT is an international dating platform engineered for authentic human connections. 
              Connecting singles across Liberia, West Africa, Europe, the Americas, and worldwide with dignity, privacy, and verified security.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-rose-300">
                <ShieldCheck className="w-3.5 h-3.5" /> 18+ Adults Only
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Strict RLS Privacy
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Global Reach
              </span>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-rose-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-rose-300 transition-colors">
                  How PeQoT Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('discover-preview')} className="hover:text-rose-300 transition-colors">
                  International Discovery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-rose-300 transition-colors">
                  About PeQoT
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Safety & Support</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('safety')} className="hover:text-rose-300 transition-colors">
                  Safety & Security
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guidelines')} className="hover:text-rose-300 transition-colors">
                  Community Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('help')} className="hover:text-rose-300 transition-colors">
                  Help Center & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-rose-300 transition-colors">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal & Compliance</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-rose-300 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-rose-300 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cookies')} className="hover:text-rose-300 transition-colors">
                  Cookie Policy
                </button>
              </li>
              <li>
                <span className="text-[11px] text-rose-400/80 block pt-1">
                  Protected by PostgreSQL RLS
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} PeQoT. All rights reserved. Technology & Brand operated by <strong className="text-slate-300">SAS Tech Inc.</strong>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Monrovia, Liberia</span>
            <span>·</span>
            <span>Worldwide Coverage</span>
            <span>·</span>
            <span className="text-rose-400 font-medium">18+ Strict Verification</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
