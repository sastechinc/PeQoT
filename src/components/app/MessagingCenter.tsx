/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Real-Time Private Messaging Center
 * Brand: SAS Tech Inc.
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  ShieldCheck, 
  Phone, 
  Video, 
  MoreVertical, 
  Flag, 
  UserX, 
  Check, 
  CheckCheck, 
  User, 
  Lock,
  MessageCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { Match, Message, UserProfile } from '../../types/peqot';
import { peqotStore } from '../../lib/peqotStore';
import { MessagingSkeleton } from './MessagingSkeleton';

interface MessagingCenterProps {
  initialMatchId?: string | null;
  onOpenReport: (user: UserProfile) => void;
  onOpenCalling: (user: UserProfile, type: 'audio' | 'video') => void;
  onViewProfile: (user: UserProfile) => void;
}

export const MessagingCenter: React.FC<MessagingCenterProps> = ({
  initialMatchId,
  onOpenReport,
  onOpenCalling,
  onViewProfile
}) => {
  const [matches, setMatches] = useState<Match[]>(() => peqotStore.getMatches());
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(initialMatchId || (matches[0]?.id || null));
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputContent, setInputContent] = useState('');
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = peqotStore.getCurrentUser();

  // Subscribe to store updates
  useEffect(() => {
    const unsub = peqotStore.subscribe(() => {
      setMatches(peqotStore.getMatches());
      if (selectedMatchId) {
        setMessages(peqotStore.getConversationMessages(selectedMatchId));
      }
    });
    return unsub;
  }, [selectedMatchId]);

  // Handle selected match change
  useEffect(() => {
    if (selectedMatchId) {
      setIsLoadingMessages(true);
      const timer = setTimeout(() => {
        setMessages(peqotStore.getConversationMessages(selectedMatchId));
        peqotStore.markMessagesRead(selectedMatchId);
        setIsLoadingMessages(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedMatchId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeMatch = matches.find(m => m.id === selectedMatchId);
  const matchedUser = activeMatch?.matched_user;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatchId || !inputContent.trim()) return;

    peqotStore.sendMessage(selectedMatchId, inputContent);
    setInputContent('');
  };

  const handleBlockUser = () => {
    if (matchedUser) {
      if (confirm(`Are you sure you want to block ${matchedUser.display_name}? You will no longer see each other.`)) {
        peqotStore.blockUser(matchedUser.id);
        setShowActionMenu(false);
        setSelectedMatchId(null);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6 py-6 text-left">
      
      {isLoadingMessages && messages.length === 0 ? (
        <MessagingSkeleton />
      ) : (
      <div className="bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px] max-h-[750px]">
        
        {/* Left Pane: Conversations List */}
        <div className={`md:col-span-5 lg:col-span-4 border-r border-rose-100 flex flex-col ${
          selectedMatchId && 'hidden md:flex'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-rose-100/70 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-serif-display text-slate-900">
                Conversations
              </h2>
              <span className="text-[11px] text-slate-400">
                Protected by Firestore Security Rules
              </span>
            </div>
            <span className="text-xs font-semibold text-[#900B4B] bg-rose-50 px-2 py-0.5 rounded-md">
              {matches.length}
            </span>
          </div>

          {/* Conversations Scroll View */}
          <div className="flex-1 overflow-y-auto divide-y divide-rose-50">
            {matches.length > 0 ? (
              matches.map((m) => {
                const user = m.matched_user;
                if (!user) return null;
                const isSelected = m.id === selectedMatchId;

                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMatchId(m.id)}
                    className={`w-full p-4 flex items-center gap-3 text-left transition-colors ${
                      isSelected ? 'bg-rose-50/70 border-l-4 border-[#900B4B]' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={user.photos[0]?.url || '/src/assets/images/peqot_dating_liberia_1793670570605.jpg'}
                        alt={user.display_name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border border-rose-200"
                      />
                      {user.is_verified && (
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {user.display_name}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {user.country}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {m.last_message || 'New Match'}
                      </p>
                    </div>

                    {m.unread_count && m.unread_count > 0 ? (
                      <span className="w-5 h-5 rounded-full bg-[#E11D74] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {m.unread_count}
                      </span>
                    ) : null}
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 space-y-2">
                <MessageCircle className="w-8 h-8 text-rose-300 mx-auto" />
                <p>No active conversations yet.</p>
                <p className="text-[11px] text-slate-400">Match with someone in Discover to start chatting.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Active Chat Room */}
        <div className={`md:col-span-7 lg:col-span-8 flex flex-col bg-[#FAF7F8] ${
          !selectedMatchId && 'hidden md:flex'
        }`}>
          {activeMatch && matchedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-3.5 sm:p-4 bg-white border-b border-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedMatchId(null)}
                    className="md:hidden p-1.5 text-slate-500 hover:text-slate-800"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onViewProfile(matchedUser)}
                    className="flex items-center gap-2.5 text-left group"
                  >
                    <img
                      src={matchedUser.photos[0]?.url || '/src/assets/images/peqot_dating_liberia_1793670570605.jpg'}
                      alt={matchedUser.display_name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-rose-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#900B4B]">
                        <span>{matchedUser.display_name}, {matchedUser.age}</span>
                        {matchedUser.is_verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {matchedUser.city}, {matchedUser.country} · {matchedUser.last_active || 'Active recently'}
                      </div>
                    </div>
                  </button>
                </div>

                {/* Right Call & Actions */}
                <div className="flex items-center gap-2 relative">
                  <button
                    onClick={() => onOpenCalling(matchedUser, 'audio')}
                    title="Audio Call (Preview Architecture)"
                    className="p-2 text-slate-600 hover:text-[#900B4B] hover:bg-rose-50 rounded-full transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenCalling(matchedUser, 'video')}
                    title="Video Call (Preview Architecture)"
                    className="p-2 text-slate-600 hover:text-[#900B4B] hover:bg-rose-50 rounded-full transition-colors"
                  >
                    <Video className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setShowActionMenu(!showActionMenu)}
                    className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Dropdown Action Menu */}
                  {showActionMenu && (
                    <div className="absolute right-0 top-10 w-44 bg-white rounded-2xl shadow-xl border border-rose-100 py-1.5 z-20 text-xs">
                      <button
                        onClick={() => {
                          setShowActionMenu(false);
                          onViewProfile(matchedUser);
                        }}
                        className="w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>View Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowActionMenu(false);
                          onOpenReport(matchedUser);
                        }}
                        className="w-full px-3 py-2 text-left text-amber-700 hover:bg-amber-50 flex items-center gap-2"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span>Report Safety Issue</span>
                      </button>
                      <button
                        onClick={handleBlockUser}
                        className="w-full px-3 py-2 text-left text-rose-700 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100 mt-1 pt-1.5"
                      >
                        <UserX className="w-3.5 h-3.5" />
                        <span>Block {matchedUser.display_name}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Messages Thread Container */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
                
                {/* Security Guarantee Banner */}
                <div className="mx-auto max-w-sm py-2 px-3 rounded-xl bg-white/70 border border-rose-100/80 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3 text-rose-400" />
                  <span>Private 1-to-1 conversation protected by RLS encryption.</span>
                </div>

                {isLoadingMessages ? (
                  <div className="space-y-4 py-4 animate-pulse">
                    {/* Incoming bubble placeholder */}
                    <div className="flex flex-col items-start space-y-1.5">
                      <div className="h-11 w-3/5 bg-slate-100 rounded-2xl rounded-bl-none border border-rose-50" />
                      <div className="h-2.5 w-16 bg-slate-100 rounded ml-1" />
                    </div>
                    {/* Outgoing bubble placeholder */}
                    <div className="flex flex-col items-end space-y-1.5">
                      <div className="h-12 w-2/3 bg-rose-100/70 rounded-2xl rounded-br-none" />
                      <div className="h-2.5 w-20 bg-slate-100 rounded mr-1" />
                    </div>
                    {/* Incoming bubble placeholder */}
                    <div className="flex flex-col items-start space-y-1.5">
                      <div className="h-9 w-1/2 bg-slate-100 rounded-2xl rounded-bl-none border border-rose-50" />
                      <div className="h-2.5 w-14 bg-slate-100 rounded ml-1" />
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.sender_id === currentUser.id;

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[78%] sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            isMe
                              ? 'bg-gradient-to-r from-[#900B4B] to-[#E11D74] text-white rounded-br-none shadow-sm'
                              : 'bg-white text-slate-900 border border-rose-100/80 rounded-bl-none shadow-sm'
                          }`}
                        >
                          {msg.content}
                        </div>

                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                          <span>{new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {isMe && (
                            msg.is_read ? (
                              <span title="Read"><CheckCheck className="w-3 h-3 text-[#E11D74]" /></span>
                            ) : (
                              <span title="Delivered"><Check className="w-3 h-3 text-slate-400" /></span>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 sm:p-4 bg-white border-t border-rose-100 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  placeholder={`Write a sincere message to ${matchedUser.display_name}...`}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#E11D74]"
                />

                <button
                  type="submit"
                  disabled={!inputContent.trim()}
                  className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#900B4B] to-[#E11D74] text-white flex items-center justify-center disabled:opacity-40 hover:opacity-95 shadow-md shadow-rose-900/15 transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-3">
              <MessageCircle className="w-12 h-12 text-rose-200" />
              <h3 className="text-base font-bold font-serif-display text-slate-700">
                Select a Match to Begin Sincere Courtship
              </h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Your direct messages are confidential and shielded by database authorization.
              </p>
            </div>
          )}
        </div>
      </div>
      )}

    </div>
  );
};
