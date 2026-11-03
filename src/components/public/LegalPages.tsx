/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Legal Policies (Privacy, Terms, Cookies)
 * Brand: SAS Tech Inc.
 */

import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
  onNavigate: (tab: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-10">
      
      {/* Title */}
      <div className="space-y-3 pb-6 border-b border-rose-100">
        <div className="text-xs font-bold text-[#900B4B] uppercase tracking-wider">
          Legal & Compliance · SAS Tech Inc.
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-display text-slate-900">
          {type === 'privacy' && 'PeQoT Global Privacy Policy'}
          {type === 'terms' && 'Terms of Service Agreement'}
          {type === 'cookies' && 'Cookie & Tracking Technology Policy'}
        </h1>
        <div className="text-xs text-slate-500">
          Effective Date: January 1, 2026 · Last Updated: November 2026
        </div>
      </div>

      {type === 'privacy' && (
        <div className="prose prose-sm text-slate-700 space-y-6 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Data Controller Identity</h2>
            <p>
              This Privacy Policy governs the processing of personal data by <strong>SAS Tech Inc.</strong>, the operating entity of the PeQoT dating platform ("PeQoT", "we", "us"). We adhere to international data protection principles including the General Data Protection Regulation (GDPR) and regional African data privacy frameworks.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Strict 18+ Age Gating Data Processing</h2>
            <p>
              PeQoT does not knowingly collect or maintain information from individuals under the age of 18. Date of birth is collected strictly to verify adult eligibility. Minors who attempt to create accounts will have their submissions rejected and any related data expunged.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Information We Collect</h2>
            <p>We process the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Registration Data:</strong> Email address, encrypted authentication tokens, and date of birth.</li>
              <li><strong>Profile Data:</strong> Display name, gender, general city and country, relationship intention, languages, biography, and photographs.</li>
              <li><strong>Biometric & ID Documents (Optional Verification):</strong> Government ID copies and matching selfies submitted strictly for verification badges, stored in encrypted private storage accessible only to vetted compliance moderators.</li>
              <li><strong>Communications Data:</strong> 1-to-1 direct messages exchanged between mutually matched members, protected by PostgreSQL Row Level Security (RLS).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Zero Data Brokering Guarantee</h2>
            <p>
              SAS Tech Inc. does not sell, license, or broker personal member data to advertisers, analytics brokers, or commercial syndicates under any circumstances.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Your Data Rights</h2>
            <p>
              You maintain the absolute right to inspect, export, modify, or permanently delete your profile and message history at any time through your Profile Settings or by emailing <code className="text-[#900B4B]">privacy@peqot.lib</code>.
            </p>
          </section>
        </div>
      )}

      {type === 'terms' && (
        <div className="prose prose-sm text-slate-700 space-y-6 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms & Eligibility</h2>
            <p>
              By accessing or creating an account on PeQoT, you represent and warrant that you are an adult aged 18 or older and possess the legal capacity to enter into this binding agreement. If you are under 18, you are strictly prohibited from using the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Member Code of Conduct</h2>
            <p>Every member agrees to maintain civil, honest, and respectful conduct. You strictly agree NOT to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Solicit money, loans, cryptocurrency, or gifts from other members.</li>
              <li>Impersonate any real person or organization.</li>
              <li>Transmit obscene, pornographic, violent, or defamatory material.</li>
              <li>Harass, threaten, stalk, or intimidate any user.</li>
              <li>Operate bots, automated scrapers, or multiple duplicate accounts.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Termination & Moderation Authority</h2>
            <p>
              SAS Tech Inc. reserves the immediate right to suspend or permanently ban any account that violates our safety policies, attempts fraud, or submits false identity credentials, without liability or prior warning.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Limitation of Liability</h2>
            <p>
              PeQoT facilitates international introductions. SAS Tech Inc. is not liable for interpersonal conduct, travel decisions, or external communications conducted outside the platform. Users are urged to exercise safety precautions when arranging physical meetings.
            </p>
          </section>
        </div>
      )}

      {type === 'cookies' && (
        <div className="prose prose-sm text-slate-700 space-y-6 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. How We Use Cookies</h2>
            <p>
              PeQoT utilizes strictly essential session cookies and local storage tokens to maintain authenticated sessions, record your discovery preferences, and prevent cross-site request forgery (CSRF).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. No Third-Party Ad Trackers</h2>
            <p>
              We do not embed third-party surveillance ad tracking pixels or behavioral marketing cookies. All cookies are first-party and functional.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Managing Cookie Preferences</h2>
            <p>
              You can configure your browser to block cookies; however, essential cookies are required for you to remain logged in securely.
            </p>
          </section>
        </div>
      )}

      <div className="pt-6 border-t border-rose-100 flex items-center justify-between text-xs text-slate-500">
        <div>Official policy published by SAS Tech Inc., Monrovia, Liberia.</div>
        <button
          onClick={() => onNavigate('home')}
          className="font-semibold text-[#900B4B] hover:underline"
        >
          Return to PeQoT Home
        </button>
      </div>

    </div>
  );
};
