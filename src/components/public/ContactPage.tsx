/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Official Contact Page
 * Brand: SAS Tech Inc.
 */

import React, { useState } from 'react';
import { Mail, MapPin, Building, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-12">
      
      <div className="space-y-4 max-w-2xl">
        <div className="text-xs font-bold text-[#900B4B] uppercase tracking-wider">
          Direct Communications
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-display text-slate-900">
          Contact SAS Tech Inc.
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Whether you have an account inquiry, press inquiry, or safety concern, our team in Monrovia and distributed international hubs is ready to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 font-serif-display">
              Corporate Headquarters
            </h3>
            
            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <Building className="w-4 h-4 text-[#900B4B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block text-xs">Operating Company:</strong>
                  <span>SAS Tech Inc.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#900B4B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block text-xs">Address:</strong>
                  <span>Tubman Boulevard, Sinkor<br />Monrovia, Republic of Liberia</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#900B4B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block text-xs">Support Email:</strong>
                  <span>support@peqot.lib · inquiries@sastech.lib</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-rose-100/70 text-[11px] text-slate-500">
              Emergency safety reports submitted via in-app tools receive prioritization within 2 hours.
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Message Delivered Successfully</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you for contacting SAS Tech Inc. Your inquiry reference ticket has been logged and a support representative will follow up via email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#900B4B] hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <h3 className="text-base font-bold text-slate-900 font-serif-display">
                  Submit Support Ticket
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Samuel Davis"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. samuel@example.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Verification Assistance">Identity Verification Assistance</option>
                    <option value="Safety & Urgent Report">Safety & Urgent Report</option>
                    <option value="Technical Support">Technical Support / Connection Issue</option>
                    <option value="Press & Partnership">Press & Partnership with SAS Tech Inc.</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry clearly..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#900B4B] to-[#E11D74] hover:opacity-95 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Ticket to SAS Tech Inc.</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
