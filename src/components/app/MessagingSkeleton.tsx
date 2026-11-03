/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Messaging Center Skeleton Loader
 * Bandwidth-optimized for instant UX feedback
 */

import React from 'react';
import { Lock } from 'lucide-react';

export const MessagingSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px] max-h-[750px] animate-pulse text-left">
      
      {/* Left Pane: Conversations Skeleton */}
      <div className="md:col-span-5 lg:col-span-4 border-r border-rose-100 flex flex-col">
        <div className="p-4 border-b border-rose-100/70 flex items-center justify-between">
          <div className="w-28 h-5 bg-slate-200 rounded-md" />
          <div className="w-6 h-5 bg-rose-100 rounded-md" />
        </div>

        <div className="p-3 space-y-3 divide-y divide-rose-50">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="pt-3 first:pt-0 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <div className="w-24 h-3.5 bg-slate-200 rounded" />
                  <div className="w-10 h-3 bg-slate-100 rounded" />
                </div>
                <div className="w-36 h-3 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane: Active Chat Skeleton */}
      <div className="md:col-span-7 lg:col-span-8 flex flex-col bg-[#FAF7F8]">
        
        {/* Header */}
        <div className="p-4 bg-white border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200" />
            <div className="space-y-1.5">
              <div className="w-28 h-4 bg-slate-200 rounded" />
              <div className="w-36 h-2.5 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100" />
            <div className="w-8 h-8 rounded-full bg-slate-100" />
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          <div className="mx-auto w-48 h-6 bg-white/70 border border-rose-100 rounded-xl" />

          {/* Incoming */}
          <div className="flex flex-col items-start space-y-1">
            <div className="w-64 h-12 bg-white rounded-2xl rounded-bl-none border border-rose-100/80 shadow-sm" />
            <div className="w-12 h-2.5 bg-slate-200 rounded" />
          </div>

          {/* Outgoing */}
          <div className="flex flex-col items-end space-y-1">
            <div className="w-56 h-10 bg-rose-200/60 rounded-2xl rounded-br-none shadow-sm" />
            <div className="w-12 h-2.5 bg-slate-200 rounded" />
          </div>

          {/* Incoming */}
          <div className="flex flex-col items-start space-y-1">
            <div className="w-72 h-14 bg-white rounded-2xl rounded-bl-none border border-rose-100/80 shadow-sm" />
            <div className="w-12 h-2.5 bg-slate-200 rounded" />
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-rose-100 flex items-center gap-2">
          <div className="flex-1 h-10 bg-slate-100 rounded-2xl" />
          <div className="w-10 h-10 rounded-2xl bg-rose-200" />
        </div>

      </div>

    </div>
  );
};
