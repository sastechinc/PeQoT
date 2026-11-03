/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT International Dating Platform
 * "Where Hearts Meet, Beyond Borders."
 * Brand: SAS Tech Inc.
 */

import React, { useState, useEffect } from 'react';
import { peqotStore } from './lib/peqotStore';
import { UserProfile, Match } from './types/peqot';

// Layout & Global Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Public Pages
import { HomePage } from './components/public/HomePage';
import { AboutPage } from './components/public/AboutPage';
import { HowItWorksPage } from './components/public/HowItWorksPage';
import { DiscoverPreviewPage } from './components/public/DiscoverPreviewPage';
import { SafetyPage } from './components/public/SafetyPage';
import { GuidelinesPage } from './components/public/GuidelinesPage';
import { HelpCenterPage } from './components/public/HelpCenterPage';
import { ContactPage } from './components/public/ContactPage';
import { LegalPage } from './components/public/LegalPages';
import { AuthModals } from './components/public/AuthModals';

// Authenticated Views
import { DiscoverFeed } from './components/app/DiscoverFeed';
import { MatchesList } from './components/app/MatchesList';
import { MessagingCenter } from './components/app/MessagingCenter';
import { ProfileEditor } from './components/app/ProfileEditor';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals
import { VerificationModal } from './components/app/VerificationModal';
import { CallingModal } from './components/app/CallingModal';
import { ReportModal } from './components/app/ReportModal';
import { PublicProfileModal } from './components/app/PublicProfileModal';
import { FirebaseModal } from './components/FirebaseModal';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => peqotStore.getCurrentUser());
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [authMode, setAuthMode] = useState<'signup' | 'login' | 'forgot-password' | null>(null);

  // Modal states
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);
  const [reportingUser, setReportingUser] = useState<UserProfile | null>(null);
  const [callingState, setCallingState] = useState<{ user: UserProfile | null; type: 'audio' | 'video' } | null>(null);
  const [inspectedProfile, setInspectedProfile] = useState<UserProfile | null>(null);
  const [selectedChatMatchId, setSelectedChatMatchId] = useState<string | null>(null);

  // Subscribe to store updates
  useEffect(() => {
    const unsub = peqotStore.subscribe(() => {
      setCurrentUser(peqotStore.getCurrentUser());
    });
    return unsub;
  }, []);

  // Compute unread message count
  const matches = peqotStore.getMatches();
  const totalUnread = matches.reduce((sum, m) => sum + (m.unread_count || 0), 0);

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setAuthMode(null);
    setCurrentTab('discover');
  };

  const handleLogout = () => {
    // Switch to public view
    setCurrentTab('home');
  };

  const handleRoleSwitch = (role: UserProfile['role']) => {
    peqotStore.switchTestRole(role);
    setCurrentUser(peqotStore.getCurrentUser());
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F8] text-[#1E1622] font-sans antialiased selection:bg-rose-500/20 selection:text-[#900B4B]">
      
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        unreadCount={totalUnread}
        onOpenAuth={(mode) => setAuthMode(mode)}
        onLogout={handleLogout}
        onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
        onRoleSwitch={handleRoleSwitch}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* Public Pages */}
        {currentTab === 'home' && (
          <HomePage
            onOpenSignUp={() => setAuthMode('signup')}
            onOpenLogin={() => setAuthMode('login')}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onOpenSignUp={() => setAuthMode('signup')}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksPage
            onOpenSignUp={() => setAuthMode('signup')}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'discover-preview' && (
          <DiscoverPreviewPage
            onOpenSignUp={() => setAuthMode('signup')}
            onOpenLogin={() => setAuthMode('login')}
          />
        )}

        {currentTab === 'safety' && (
          <SafetyPage
            onOpenSignUp={() => setAuthMode('signup')}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'guidelines' && (
          <GuidelinesPage
            onOpenSignUp={() => setAuthMode('signup')}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'help' && (
          <HelpCenterPage
            onNavigate={handleNavigate}
            onOpenSignUp={() => setAuthMode('signup')}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}

        {currentTab === 'privacy' && (
          <LegalPage type="privacy" onNavigate={handleNavigate} />
        )}

        {currentTab === 'terms' && (
          <LegalPage type="terms" onNavigate={handleNavigate} />
        )}

        {currentTab === 'cookies' && (
          <LegalPage type="cookies" onNavigate={handleNavigate} />
        )}

        {/* Authenticated Core Dating Modules */}
        {currentTab === 'discover' && (
          <DiscoverFeed
            onMatchSuccess={(match) => {
              // Handled within feed celebration
            }}
            onOpenReport={(user) => setReportingUser(user)}
            onOpenMessages={(matchId) => {
              setSelectedChatMatchId(matchId);
              setCurrentTab('messages');
            }}
          />
        )}

        {currentTab === 'matches' && (
          <MatchesList
            onOpenConversation={(matchId) => {
              setSelectedChatMatchId(matchId);
              setCurrentTab('messages');
            }}
            onNavigateToDiscover={() => handleNavigate('discover')}
          />
        )}

        {currentTab === 'messages' && (
          <MessagingCenter
            initialMatchId={selectedChatMatchId}
            onOpenReport={(user) => setReportingUser(user)}
            onOpenCalling={(user, type) => setCallingState({ user, type })}
            onViewProfile={(user) => setInspectedProfile(user)}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileEditor
            onOpenVerification={() => setIsVerificationOpen(true)}
            onPreviewPublic={(user) => setInspectedProfile(user)}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard
            onInspectUser={(user) => setInspectedProfile(user)}
          />
        )}

      </main>

      {/* Global Footer with Official Branding */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Modals */}
      {authMode && (
        <AuthModals
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitchMode={(mode) => setAuthMode(mode)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {isVerificationOpen && (
        <VerificationModal
          isOpen={isVerificationOpen}
          onClose={() => setIsVerificationOpen(false)}
        />
      )}

      {callingState?.user && (
        <CallingModal
          user={callingState.user}
          callType={callingState.type}
          onClose={() => setCallingState(null)}
        />
      )}

      {reportingUser && (
        <ReportModal
          user={reportingUser}
          onClose={() => setReportingUser(null)}
        />
      )}

      {inspectedProfile && (
        <PublicProfileModal
          user={inspectedProfile}
          onClose={() => setInspectedProfile(null)}
        />
      )}

      {isFirebaseModalOpen && (
        <FirebaseModal
          isOpen={isFirebaseModalOpen}
          onClose={() => setIsFirebaseModalOpen(false)}
        />
      )}

    </div>
  );
}
