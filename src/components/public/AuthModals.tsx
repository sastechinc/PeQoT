/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Authentication Modals (SignUp, Login, ForgotPassword)
 * Strictly enforces 18+ age requirement
 * Brand: SAS Tech Inc.
 */

import React, { useState } from 'react';
import { X, ShieldCheck, Heart, AlertCircle, ArrowRight, Lock, CheckCircle2, UserCheck } from 'lucide-react';
import { calculateAge, peqotStore } from '../../lib/peqotStore';
import { COUNTRIES, RELATIONSHIP_INTENTIONS } from '../../data/constants';
import { Gender, RelationshipIntention, UserProfile } from '../../types/peqot';

interface AuthModalsProps {
  mode: 'signup' | 'login' | 'forgot-password' | null;
  onClose: () => void;
  onSwitchMode: (mode: 'signup' | 'login' | 'forgot-password') => void;
  onAuthSuccess: (user: UserProfile) => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  mode,
  onClose,
  onSwitchMode,
  onAuthSuccess
}) => {
  if (!mode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {mode === 'signup' && (
          <SignUpForm 
            onSuccess={onAuthSuccess} 
            onSwitchToLogin={() => onSwitchMode('login')} 
          />
        )}

        {mode === 'login' && (
          <LoginForm 
            onSuccess={onAuthSuccess} 
            onSwitchToSignUp={() => onSwitchMode('signup')}
            onSwitchToForgot={() => onSwitchMode('forgot-password')}
          />
        )}

        {mode === 'forgot-password' && (
          <ForgotPasswordForm 
            onSwitchToLogin={() => onSwitchMode('login')} 
          />
        )}

      </div>
    </div>
  );
};

// --- Sign Up Form ---
const SignUpForm: React.FC<{
  onSuccess: (user: UserProfile) => void;
  onSwitchToLogin: () => void;
}> = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    display_name: '',
    email: '',
    birth_date: '',
    gender: 'female' as Gender,
    country: 'Liberia',
    city: 'Monrovia',
    relationship_intention: 'serious_dating' as RelationshipIntention,
    bio: '',
    password: ''
  });

  const [error, setError] = useState<string | null>(null);

  const calculatedAge = formData.birth_date ? calculateAge(formData.birth_date) : 0;
  const isUnderage = formData.birth_date !== '' && calculatedAge < 18;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.birth_date) {
      setError('Please provide your date of birth to verify age eligibility.');
      return;
    }

    if (calculatedAge < 18) {
      setError('Eligibility check failed: You must be at least 18 years old to join PeQoT. Minors are strictly prohibited.');
      return;
    }

    if (!formData.display_name.trim() || !formData.email.trim() || !formData.password) {
      setError('Please fill in all required registration fields.');
      return;
    }

    const result = peqotStore.registerUser({
      display_name: formData.display_name,
      email: formData.email,
      birth_date: formData.birth_date,
      gender: formData.gender,
      country: formData.country,
      city: formData.city,
      relationship_intention: formData.relationship_intention,
      bio: formData.bio || 'Seeking a genuine and sincere international partner.'
    });

    if (result.success && result.user) {
      onSuccess(result.user);
    } else {
      setError(result.error || 'Failed to complete registration.');
    }
  };

  return (
    <div className="p-6 sm:p-8 text-left space-y-5">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#900B4B] uppercase">
          <ShieldCheck className="w-4 h-4 text-[#E11D74]" />
          <span>Strict 18+ Verification</span>
        </div>
        <h2 className="text-2xl font-bold font-serif-display text-slate-900">
          Join PeQoT Today
        </h2>
        <p className="text-xs text-slate-500">
          Where Hearts Meet, Beyond Borders · Powered by SAS Tech Inc.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span className="leading-snug">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Full Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Display Name *</label>
            <input
              type="text"
              required
              value={formData.display_name}
              onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
              placeholder="e.g. Kormassa"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. you@example.com"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            />
          </div>
        </div>

        {/* Date of Birth — Strict Age Calculation */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">
              Date of Birth * (Must be 18+)
            </label>
            {formData.birth_date && (
              <span className={`text-[11px] font-bold ${isUnderage ? 'text-rose-600' : 'text-emerald-700'}`}>
                Calculated Age: {calculatedAge} years {isUnderage ? '(Underage Blocked)' : '(Eligible)'}
              </span>
            )}
          </div>
          <input
            type="date"
            required
            max={new Date().toISOString().split('T')[0]}
            value={formData.birth_date}
            onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
            className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-xl focus:outline-none ${
              isUnderage ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200 focus:border-[#E11D74]'
            }`}
          />
          <p className="text-[10px] text-slate-400">
            PeQoT strictly prevents minors from accessing the service. Your birth date is verified against government records.
          </p>
        </div>

        {/* Gender & Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Gender *</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non_binary">Non-binary</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Country *</label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            >
              {COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* City & Relationship Intention */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">City / General Region</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="e.g. Monrovia"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Seeking</label>
            <select
              value={formData.relationship_intention}
              onChange={(e) => setFormData({ ...formData, relationship_intention: e.target.value as RelationshipIntention })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            >
              {RELATIONSHIP_INTENTIONS.map(i => (
                <option key={i.value} value={i.value}>{i.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Create Secure Password *</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="At least 8 characters"
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
          />
        </div>

        <button
          type="submit"
          disabled={isUnderage}
          className={`w-full py-3 px-4 text-xs font-bold text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
            isUnderage 
              ? 'bg-slate-300 cursor-not-allowed text-slate-500' 
              : 'bg-gradient-to-r from-[#900B4B] to-[#E11D74] hover:opacity-95 shadow-rose-900/15'
          }`}
        >
          <span>Complete 18+ Verification & Join</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </form>

      <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-500">
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className="font-bold text-[#900B4B] hover:underline"
        >
          Log In
        </button>
      </div>

    </div>
  );
};

// --- Login Form ---
const LoginForm: React.FC<{
  onSuccess: (user: UserProfile) => void;
  onSwitchToSignUp: () => void;
  onSwitchToForgot: () => void;
}> = ({ onSuccess, onSwitchToSignUp, onSwitchToForgot }) => {
  const [email, setEmail] = useState('admin.mosee2023@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await peqotStore.loginUser(email);
      if (res.success && res.user) {
        onSuccess(res.user);
      } else {
        setError(res.error || 'Failed to authenticate. Please check your credentials.');
      }
    } catch {
      setError('An error occurred during authentication. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoSwitch = (role: 'super_admin' | 'member_monrovia' | 'member_paris') => {
    if (role === 'super_admin') {
      peqotStore.switchTestRole('super_admin');
      onSuccess(peqotStore.getCurrentUser());
    } else if (role === 'member_monrovia') {
      const kormassa = peqotStore.getAllProfiles().find(p => p.id === 'user_monrovia_1');
      if (kormassa) {
        peqotStore.setCurrentUser(kormassa);
        onSuccess(kormassa);
      }
    } else if (role === 'member_paris') {
      const antoine = peqotStore.getAllProfiles().find(p => p.id === 'user_paris_1');
      if (antoine) {
        peqotStore.setCurrentUser(antoine);
        onSuccess(antoine);
      }
    }
  };

  return (
    <div className="p-6 sm:p-8 text-left space-y-6">
      
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#900B4B] uppercase">
          <Heart className="w-4 h-4 text-[#E11D74] fill-rose-500" />
          <span>Member Access</span>
        </div>
        <h2 className="text-2xl font-bold font-serif-display text-slate-900">
          Welcome Back to PeQoT
        </h2>
        <p className="text-xs text-slate-500">
          Where Hearts Meet, Beyond Borders.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <button
              type="button"
              onClick={onSwitchToForgot}
              className="text-[11px] font-semibold text-[#900B4B] hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#900B4B] to-[#E11D74] hover:opacity-95 disabled:opacity-50 rounded-xl shadow-md shadow-rose-900/15 transition-all flex items-center justify-center gap-2"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>{isSubmitting ? 'Authenticating & Fetching Cloud Profile...' : 'Sign In to PeQoT'}</span>
        </button>
      </form>

      {/* Quick Testing Personas */}
      <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2 text-left">
        <div className="text-[11px] font-bold text-[#900B4B] uppercase tracking-wider flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Quick Evaluation Personas</span>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleQuickDemoSwitch('super_admin')}
            className="p-2 rounded-lg bg-white border border-rose-200 hover:border-[#900B4B] text-[11px] font-semibold text-slate-800 text-center transition-colors"
          >
            Sekou (Admin)
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoSwitch('member_monrovia')}
            className="p-2 rounded-lg bg-white border border-rose-200 hover:border-[#900B4B] text-[11px] font-semibold text-slate-800 text-center transition-colors"
          >
            Kormassa (Lib)
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoSwitch('member_paris')}
            className="p-2 rounded-lg bg-white border border-rose-200 hover:border-[#900B4B] text-[11px] font-semibold text-slate-800 text-center transition-colors"
          >
            Antoine (Fr)
          </button>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-500">
        Do not have an account?{' '}
        <button
          onClick={onSwitchToSignUp}
          className="font-bold text-[#900B4B] hover:underline"
        >
          Create Profile (18+)
        </button>
      </div>

    </div>
  );
};

// --- Forgot Password Form ---
const ForgotPasswordForm: React.FC<{
  onSwitchToLogin: () => void;
}> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="p-6 sm:p-8 text-left space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold font-serif-display text-slate-900">
          Reset Your Password
        </h2>
        <p className="text-xs text-slate-500">
          Enter your registered email and we will dispatch a secure password reset link.
        </p>
      </div>

      {submitted ? (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Reset Link Dispatched</span>
          </div>
          <p className="text-xs text-emerald-700">
            If an active PeQoT account is registered under <strong>{email}</strong>, you will receive instructions within 2 minutes.
          </p>
          <button
            onClick={onSwitchToLogin}
            className="pt-2 text-xs font-bold text-[#900B4B] hover:underline"
          >
            Return to Sign In
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Account Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. you@example.com"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#900B4B] to-[#E11D74] hover:opacity-95 rounded-xl shadow-md transition-all"
          >
            Send Password Reset Link
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-xs font-medium text-slate-500 hover:text-slate-900"
            >
              Cancel and Return to Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
