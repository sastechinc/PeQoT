/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Unified Administration & Moderation Suite
 * Brand: SAS Tech Inc.
 * Role-Based Access Control (RBAC) Gated
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  FileCheck2, 
  Flag, 
  History, 
  Settings, 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  XCircle, 
  UserX, 
  RotateCcw, 
  Lock,
  Eye,
  Sliders,
  Sparkles
} from 'lucide-react';
import { peqotStore } from '../../lib/peqotStore';
import { UserProfile, VerificationRequest, UserReport, AdminAuditLog } from '../../types/peqot';

interface AdminDashboardProps {
  onInspectUser: (user: UserProfile) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onInspectUser }) => {
  const currentUser = peqotStore.getCurrentUser();
  const isAuthorized = ['super_admin', 'admin', 'moderator'].includes(currentUser.role);

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'verifications' | 'reports' | 'audit' | 'settings'>('overview');
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [stats, setStats] = useState(() => peqotStore.getAdminStats());
  const [profiles, setProfiles] = useState<UserProfile[]>(() => peqotStore.getAllProfiles());
  const [verifications, setVerifications] = useState<VerificationRequest[]>(() => peqotStore.getAllVerifications());
  const [reports, setReports] = useState<UserReport[]>(() => peqotStore.getAllReports());
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() => peqotStore.getAuditLogs());

  const refreshAll = () => {
    setStats(peqotStore.getAdminStats());
    setProfiles(peqotStore.getAllProfiles());
    setVerifications(peqotStore.getAllVerifications());
    setReports(peqotStore.getAllReports());
    setAuditLogs(peqotStore.getAuditLogs());
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-3xl border border-rose-100 shadow-lg text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold font-serif-display text-slate-900">
          Access Prohibited
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          The Administration Dashboard is strictly restricted to authenticated SAS Tech Inc. Super Administrators, Administrators, and Moderators.
        </p>
        <p className="text-[11px] text-slate-400">
          Your current account role is: <strong className="text-slate-800">{currentUser.role}</strong>. Use the navigation role selector to test with administrator credentials.
        </p>
      </div>
    );
  }

  // Action handlers
  const handleApproveVerification = (id: string) => {
    peqotStore.approveVerification(id);
    refreshAll();
  };

  const handleRejectVerification = (id: string) => {
    const reason = prompt('Please enter the reason for rejection:', 'ID document does not match selfie biometric check or birth date is unconfirmed.');
    if (reason) {
      peqotStore.rejectVerification(id, reason);
      refreshAll();
    }
  };

  const handleModerateAccount = (userId: string, action: 'suspend' | 'ban' | 'restore') => {
    const notes = prompt(`Confirm ${action} for user ${userId}. Enter rationale:`, `Administrative action initiated by ${currentUser.email}`);
    if (notes) {
      peqotStore.moderateAccount(userId, action, notes);
      refreshAll();
    }
  };

  const handleResolveReport = (reportId: string, status: 'action_taken' | 'dismissed') => {
    const notes = prompt(`Resolution notes for report:`, `Investigated and resolved as ${status}.`);
    if (notes) {
      peqotStore.resolveReport(reportId, status, notes);
      refreshAll();
    }
  };

  const filteredUsers = profiles.filter(p => 
    p.display_name.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
    p.country.toLowerCase().includes(searchUserQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#900B4B] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#E11D74]" />
            <span>SAS Tech Inc. Security Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-display text-slate-900 mt-1">
            PeQoT Platform Administration
          </h1>
          <p className="text-xs text-slate-500">
            Signed in as: <strong className="text-slate-800">{currentUser.email}</strong> ({currentUser.role})
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto self-start sm:self-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Sparkles },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'verifications', label: 'Verifications', icon: FileCheck2 },
            { id: 'reports', label: 'Reports', icon: Flag },
            { id: 'audit', label: 'Audit Logs', icon: History }
          ].map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive ? 'bg-white text-[#900B4B] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* KPI Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Members</span>
              <div className="text-3xl font-bold text-slate-900 tabular-nums">{stats.totalUsers}</div>
              <span className="text-[10px] text-emerald-600 font-medium">100% Verified 18+</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Biometric Verified</span>
              <div className="text-3xl font-bold text-[#900B4B] tabular-nums">{stats.verifiedUsers}</div>
              <span className="text-[10px] text-slate-500">Official Blue Badges</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pending Reviews</span>
              <div className="text-3xl font-bold text-amber-600 tabular-nums">{stats.pendingVerifications}</div>
              <span className="text-[10px] text-amber-700 font-medium">Action Required</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Matches</span>
              <div className="text-3xl font-bold text-[#E11D74] tabular-nums">{stats.activeMatches}</div>
              <span className="text-[10px] text-slate-500">{stats.totalMessages} Messages Exchanged</span>
            </div>
          </div>

          {/* Quick Action Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Pending ID Approvals Queue */}
            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-rose-100/60 pb-3">
                <h3 className="text-sm font-bold text-slate-900 font-serif-display">
                  Urgent Biometric Verification Queue
                </h3>
                <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold">
                  {verifications.filter(v => v.status === 'pending').length} Pending
                </span>
              </div>

              <div className="space-y-3">
                {verifications.filter(v => v.status === 'pending').map((v) => (
                  <div key={v.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900">{v.user_name}</div>
                      <div className="text-[11px] text-slate-500">{v.user_email}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApproveVerification(v.id)}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectVerification(v.id)}
                        className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
                {verifications.filter(v => v.status === 'pending').length === 0 && (
                  <div className="text-center py-6 text-xs text-slate-400">
                    Verification queue is clear. No pending biometric submissions.
                  </div>
                )}
              </div>
            </div>

            {/* Pending Safety Reports Queue */}
            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-rose-100/60 pb-3">
                <h3 className="text-sm font-bold text-slate-900 font-serif-display">
                  Safety & Fraud Reports
                </h3>
                <span className="text-xs text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md font-semibold">
                  {reports.filter(r => r.status === 'pending').length} Open
                </span>
              </div>

              <div className="space-y-3">
                {reports.filter(r => r.status === 'pending').map((r) => (
                  <div key={r.id} className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-rose-900 uppercase font-mono">{r.category}</strong>
                      <span className="text-[10px] text-slate-400">{new Date(r.created_at).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-xs text-slate-700">{r.details}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-500">Reported: {r.reported_user_name}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleResolveReport(r.id, 'action_taken')}
                          className="px-2.5 py-1 text-[11px] font-bold text-white bg-rose-700 rounded-md"
                        >
                          Enforce Ban
                        </button>
                        <button
                          onClick={() => handleResolveReport(r.id, 'dismissed')}
                          className="px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-white border border-slate-200 rounded-md"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {reports.filter(r => r.status === 'pending').length === 0 && (
                  <div className="text-center py-6 text-xs text-slate-400">
                    No open reports. Platform status healthy.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Users Management */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-base font-bold font-serif-display text-slate-900">
              Registered Member Directory
            </h2>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchUserQuery}
                onChange={(e) => setSearchUserQuery(e.target.value)}
                placeholder="Search member name, country, email..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-y border-slate-100">
                <tr>
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Age / DOB</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Verified</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-rose-50/30">
                    <td className="py-3 px-4 flex items-center gap-2.5 font-medium text-slate-900">
                      <img
                        src={user.photos[0]?.url || '/src/assets/images/peqot_dating_liberia_1793670570605.jpg'}
                        alt={user.display_name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div>{user.display_name}</div>
                        <div className="text-[10px] text-slate-400">{user.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 tabular-nums">
                      {user.age} yrs <span className="text-slate-400">({user.birth_date})</span>
                    </td>
                    <td className="py-3 px-4">{user.city}, {user.country}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        user.account_status === 'active' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : user.account_status === 'suspended'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {user.account_status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.is_verified ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="text-slate-400">Unverified</span>
                      )}
                    </td>
                    <td className="py-3 px-4 uppercase text-[10px] font-bold text-slate-600">
                      {user.role}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => onInspectUser(user)}
                        title="View Full Profile"
                        className="p-1 text-slate-500 hover:text-slate-900"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {user.account_status === 'active' ? (
                        <>
                          <button
                            onClick={() => handleModerateAccount(user.id, 'suspend')}
                            className="px-2 py-1 text-[10px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded"
                          >
                            Suspend
                          </button>
                          <button
                            onClick={() => handleModerateAccount(user.id, 'ban')}
                            className="px-2 py-1 text-[10px] font-bold text-rose-800 bg-rose-50 hover:bg-rose-100 rounded"
                          >
                            Ban
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleModerateAccount(user.id, 'restore')}
                          className="px-2 py-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded"
                        >
                          Restore
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Verification Queue */}
      {activeTab === 'verifications' && (
        <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-rose-100/60 pb-3">
            <div>
              <h2 className="text-base font-bold font-serif-display text-slate-900">
                Biometric ID Review Desk
              </h2>
              <p className="text-xs text-slate-500">
                Inspect government ID cards and real-time biometric selfies before issuing official verified badges.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verifications.map((v) => (
              <div key={v.id} className="p-5 rounded-2xl border border-rose-100 space-y-4 bg-[#FAF7F8]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{v.user_name}</h3>
                    <div className="text-[11px] text-slate-500">{v.user_email}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    v.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    v.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {v.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">ID Document</span>
                    <img
                      src={v.id_document_url}
                      alt="ID Document"
                      referrerPolicy="no-referrer"
                      className="w-full h-32 object-cover rounded-xl border border-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Biometric Selfie</span>
                    <img
                      src={v.selfie_url}
                      alt="Selfie"
                      referrerPolicy="no-referrer"
                      className="w-full h-32 object-cover rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                {v.status === 'pending' && (
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => handleApproveVerification(v.id)}
                      className="flex-1 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors"
                    >
                      Approve & Issue Badge
                    </button>
                    <button
                      onClick={() => handleRejectVerification(v.id)}
                      className="flex-1 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
                    >
                      Reject Submission
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Safety Reports */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 space-y-6">
          <div className="border-b border-rose-100/60 pb-3">
            <h2 className="text-base font-bold font-serif-display text-slate-900">
              Safety Complaints & Incident History
            </h2>
            <p className="text-xs text-slate-500">
              Covers the 8 official reporting categories: scams, harassment, underage attempts, fake profiles, threats.
            </p>
          </div>

          <div className="space-y-4">
            {reports.map((r) => (
              <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-800 uppercase tracking-wide">
                    Category: {r.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    r.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {r.status}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{r.details}</p>
                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <div>
                    Reporter: <strong>{r.reporter_name}</strong> · Reported User: <strong>{r.reported_user_name}</strong>
                  </div>
                  {r.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleResolveReport(r.id, 'action_taken')}
                        className="px-3 py-1 text-xs font-bold text-white bg-rose-700 rounded-lg"
                      >
                        Enforce Action
                      </button>
                      <button
                        onClick={() => handleResolveReport(r.id, 'dismissed')}
                        className="px-3 py-1 text-xs font-medium text-slate-600 bg-white border rounded-lg"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {reports.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-400">
                No safety complaints on record.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Immutable Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 space-y-6">
          <div className="border-b border-rose-100/60 pb-3">
            <h2 className="text-base font-bold font-serif-display text-slate-900">
              Administrative Security Audit Trail
            </h2>
            <p className="text-xs text-slate-500">
              Immutable server and database audit log tracking all moderation interventions.
            </p>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900">
                    <span className="uppercase text-[#900B4B] font-mono mr-2">[{log.action_type}]</span>
                    Target: {log.target_user_name || log.target_user_id || 'System'}
                  </div>
                  <div className="text-slate-600 text-[11px]">{log.notes}</div>
                </div>
                <div className="text-right text-[10px] text-slate-400 shrink-0">
                  <div>Admin: {log.admin_email}</div>
                  <div>{new Date(log.created_at).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
