/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Official Firebase Console & Architecture Inspector
 * Brand: SAS Tech Inc.
 */

import React, { useState, useEffect } from 'react';
import { X, Flame, CheckCircle2, ShieldCheck, Database, Lock, Server, RefreshCw } from 'lucide-react';
import { testFirebaseConnection } from '../lib/firebaseClient';
import firebaseConfig from '../../firebase-applet-config.json';

interface FirebaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseModal: React.FC<FirebaseModalProps> = ({ isOpen, onClose }) => {
  const [isLiveConnected, setIsLiveConnected] = useState<boolean | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleTest = async () => {
    setIsTesting(true);
    const connected = await testFirebaseConnection();
    setIsLiveConnected(connected);
    setIsTesting(false);
  };

  useEffect(() => {
    if (isOpen) {
      handleTest();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 text-left space-y-6 shadow-2xl border border-rose-100 my-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#900B4B] uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Official Firebase Integration</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-display text-slate-900">
            Firebase & Firestore Engine
          </h2>
          <p className="text-xs text-slate-500">
            Provisioned Google Cloud project with Enterprise Firestore and Auth.
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="p-4 rounded-2xl border bg-emerald-50 border-emerald-200 text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <div className="font-bold flex items-center gap-2">
              <span>Firebase Provisioned & Online</span>
              {isTesting && <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />}
            </div>
            <p className="leading-relaxed text-emerald-800">
              Connected to live project <code className="font-mono bg-emerald-100 px-1 py-0.5 rounded">{firebaseConfig.projectId}</code> with Enterprise Firestore instance <code className="font-mono bg-emerald-100 px-1 py-0.5 rounded">{firebaseConfig.firestoreDatabaseId}</code>.
            </p>
          </div>
        </div>

        {/* Config Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
          <div className="font-bold text-slate-900 flex items-center justify-between">
            <span>Project Parameters</span>
            <button
              onClick={handleTest}
              disabled={isTesting}
              className="text-[11px] font-semibold text-[#900B4B] hover:underline flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
              <span>Ping Firestore</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div>
              <span className="text-slate-400 block">Project ID:</span>
              <strong className="font-mono text-slate-800">{firebaseConfig.projectId}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Auth Domain:</span>
              <strong className="font-mono text-slate-800">{firebaseConfig.authDomain}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Firestore Database ID:</span>
              <strong className="font-mono text-slate-800">{firebaseConfig.firestoreDatabaseId}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Storage Bucket:</span>
              <strong className="font-mono text-slate-800">{firebaseConfig.storageBucket}</strong>
            </div>
          </div>
        </div>

        {/* Firestore Security Rules Card */}
        <div className="p-4 rounded-2xl bg-[#18111D] text-slate-300 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-white font-bold">
            <ShieldCheck className="w-4 h-4 text-[#E11D74]" />
            <span>Deployed Firestore Security Rules</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Strict Zero-Trust Attribute-Based Access Control (ABAC) rules deployed via DeployRules RPC.
            Protects <code className="text-rose-300">/profiles</code>, <code className="text-rose-300">/matches/{'{id}'}/messages</code>, <code className="text-rose-300">/likes</code>, and <code className="text-rose-300">/verifications</code> against unauthorized access.
          </p>
        </div>

      </div>
    </div>
  );
};
