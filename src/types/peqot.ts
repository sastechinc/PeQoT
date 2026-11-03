/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT International Dating Platform — Core Domain Types
 * Brand: SAS Tech Inc.
 */

export type UserRole = 'super_admin' | 'admin' | 'moderator' | 'customer_support' | 'member';

export type AccountStatus = 'active' | 'suspended' | 'banned';

export type VerificationStatus = 'none' | 'pending' | 'approved' | 'rejected';

export type RelationshipIntention = 
  | 'marriage' 
  | 'long_term' 
  | 'serious_dating' 
  | 'friendship' 
  | 'open_to_possibilities';

export type Gender = 'female' | 'male' | 'non_binary' | 'other';

export interface ProfilePhoto {
  id: string;
  url: string;
  is_primary: boolean;
  caption?: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  birth_date: string; // YYYY-MM-DD
  age: number; // Automatically calculated, >= 18 enforced
  gender: Gender;
  country: string;
  city: string;
  bio: string;
  relationship_intention: RelationshipIntention;
  occupation?: string;
  education?: string;
  languages: string[];
  interests: string[];
  lifestyle?: {
    smoking?: 'never' | 'socially' | 'regularly';
    drinking?: 'never' | 'socially' | 'regularly';
    exercise?: 'active' | 'moderate' | 'rarely';
    pets?: string;
  };
  photos: ProfilePhoto[];
  is_verified: boolean;
  verification_status: VerificationStatus;
  role: UserRole;
  account_status: AccountStatus;
  created_at: string;
  updated_at: string;
  last_active?: string;
}

export interface DiscoveryPreferences {
  interested_in_gender: Gender[] | 'all';
  min_age: number;
  max_age: number;
  countries: string[];
  intentions: RelationshipIntention[];
  verified_only: boolean;
}

export interface UserLike {
  id: string;
  from_user_id: string;
  to_user_id: string;
  type: 'like' | 'super_like';
  created_at: string;
}

export interface Match {
  id: string;
  user_1_id: string;
  user_2_id: string;
  matched_at: string;
  is_active: boolean;
  matched_user?: UserProfile;
  last_message?: string;
  last_message_at?: string;
  unread_count?: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  sent_at: string;
  read_at?: string | null;
  is_read: boolean;
}

export interface Conversation {
  id: string;
  match_id: string;
  participant_ids: [string, string];
  other_user: UserProfile;
  last_message?: Message;
  unread_count: number;
  created_at: string;
}

export type ReportCategory = 
  | 'fake_profile' 
  | 'scamming' 
  | 'harassment' 
  | 'impersonation' 
  | 'inappropriate_content' 
  | 'threats' 
  | 'underage_user' 
  | 'other';

export interface UserReport {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  reporter_name?: string;
  reported_user_name?: string;
  category: ReportCategory;
  details: string;
  status: 'pending' | 'reviewed' | 'action_taken' | 'dismissed';
  created_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  resolution_notes?: string;
}

export interface VerificationRequest {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  id_document_url: string;
  selfie_url: string;
  status: VerificationStatus;
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  rejection_reason?: string;
}

export interface BlockRecord {
  id: string;
  blocker_id: string;
  blocked_user_id: string;
  created_at: string;
}

export interface AdminAuditLog {
  id: string;
  admin_id: string;
  admin_email: string;
  action_type: 
    | 'user_suspend' 
    | 'user_ban' 
    | 'user_restore' 
    | 'verification_approve' 
    | 'verification_reject' 
    | 'report_resolved' 
    | 'settings_update';
  target_user_id?: string;
  target_user_name?: string;
  notes: string;
  created_at: string;
}
