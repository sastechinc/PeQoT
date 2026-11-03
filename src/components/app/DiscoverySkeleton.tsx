/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Discovery Feed Skeleton Loader
 * Bandwidth-optimized for smooth loading across Liberia and worldwide
 */

import React from 'react';
import { Sparkles, Globe } from 'lucide-react';

export const DiscoverySkeleton: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-xl shadow-rose-950/5 animate-pulse text-left">
      
      {/* Photo Frame Skeleton */}
      <div className="relative aspect-4/5 bg-gradient-to-b from-slate-200 via-rose-100/40 to-slate-300">
        <div className="absolute top-4 left-4 w-28 h-6 bg-white/70 backdrop-blur-md rounded-full" />
        
        {/* Scrim simulation */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex flex-col justify-end p-6 space-y-2">
          <div className="w-48 h-7 bg-white/80 rounded-lg" />
          <div className="w-32 h-4 bg-rose-200/70 rounded-md" />
        </div>
      </div>

      {/* Attributes & Bio Skeleton */}
      <div className="p-6 space-y-4">
        
        {/* Intention & Occupation chips */}
        <div className="flex gap-2">
          <div className="w-36 h-6 bg-rose-100 rounded-lg" />
          <div className="w-28 h-6 bg-slate-100 rounded-lg" />
        </div>

        {/* Bio lines */}
        <div className="space-y-2 pt-1">
          <div className="w-full h-3.5 bg-slate-200/80 rounded" />
          <div className="w-5/6 h-3.5 bg-slate-200/80 rounded" />
          <div className="w-3/4 h-3.5 bg-slate-200/60 rounded" />
        </div>

        {/* Languages & Tags */}
        <div className="space-y-2 pt-2 border-t border-rose-50">
          <div className="w-40 h-3 bg-slate-200 rounded" />
          <div className="flex gap-1.5 pt-1">
            <div className="w-16 h-5 bg-slate-100 rounded-md" />
            <div className="w-20 h-5 bg-slate-100 rounded-md" />
            <div className="w-24 h-5 bg-slate-100 rounded-md" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-100" />
          <div className="w-12 h-12 rounded-full bg-amber-50/60 border border-amber-100" />
          <div className="w-16 h-16 rounded-full bg-rose-200/70" />
        </div>

      </div>

      {/* Bandwidth advisory */}
      <div className="py-2.5 px-4 bg-rose-50/40 text-center border-t border-rose-100/50 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
        <Globe className="w-3.5 h-3.5 text-rose-400 animate-spin" />
        <span>Optimizing image payloads for your network...</span>
      </div>

    </div>
  );
};
