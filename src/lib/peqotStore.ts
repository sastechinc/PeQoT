/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Unified Store & Data Engine
 * Brand: SAS Tech Inc.
 */

import { 
  UserProfile, 
  Match, 
  Message, 
  Conversation, 
  UserLike, 
  UserReport, 
  VerificationRequest, 
  BlockRecord, 
  AdminAuditLog,
  DiscoveryPreferences,
  RelationshipIntention,
  Gender,
  ReportCategory
} from '../types/peqot';
import { 
  db, 
  handleFirestoreError, 
  OperationType,
  saveProfileToCloud,
  deleteProfileFromCloud,
  fetchAllProfilesFromCloud,
  saveMatchToCloud,
  fetchAllMatchesFromCloud,
  saveMessageToCloud,
  fetchMessagesFromCloud,
  saveLikeToCloud,
  saveVerificationToCloud,
  saveReportToCloud,
  subscribeToProfilesCloud
} from './firebaseClient';


// Calculate exact age from YYYY-MM-DD
export function calculateAge(birthDateString: string): number {
  if (!birthDateString) return 0;
  const birthDate = new Date(birthDateString);
  if (isNaN(birthDate.getTime())) return 0;
  
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Initial seed profiles spanning Liberia, West Africa, Europe, Americas, Asia
const SEED_PROFILES: UserProfile[] = [
  {
    id: 'user_monrovia_1',
    email: 'kormassa.t@peqot.lib',
    display_name: 'Kormassa',
    birth_date: '1998-05-14',
    age: 28,
    gender: 'female',
    country: 'Liberia',
    city: 'Monrovia',
    bio: 'Passionate public health researcher and cultural storyteller. Love Sunday strolls along Silver Beach, jazz, and deep conversations about African heritage and global community.',
    relationship_intention: 'serious_dating',
    occupation: 'Public Health Specialist',
    education: 'University of Liberia / MPH Candidate',
    languages: ['English', 'Kpelle', 'French'],
    interests: ['Cultural Heritage', 'Coastal Walks', 'African Literature', 'Acoustic Soul', 'Community Health'],
    lifestyle: {
      drinking: 'socially',
      smoking: 'never',
      exercise: 'active',
      pets: 'Love dogs'
    },
    photos: [
      {
        id: 'p1',
        url: '/src/assets/images/peqot_dating_liberia_1793670570605.jpg',
        is_primary: true,
        created_at: '2026-01-10T10:00:00Z'
      }
    ],
    is_verified: true,
    verification_status: 'approved',
    role: 'member',
    account_status: 'active',
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-02-01T12:00:00Z',
    last_active: 'Just now'
  },
  {
    id: 'user_paris_1',
    email: 'antoine.l@peqot.fr',
    display_name: 'Antoine',
    birth_date: '1996-09-22',
    age: 30,
    gender: 'male',
    country: 'France',
    city: 'Paris',
    bio: 'Architectural restoration engineer fascinated by cross-continental aesthetics. Enjoys espresso in Saint-Germain, modern art, and discovering West African music traditions.',
    relationship_intention: 'long_term',
    occupation: 'Heritage Architect',
    education: 'École Nationale Supérieure d’Architecture',
    languages: ['French', 'English', 'Spanish'],
    interests: ['Architecture', 'World Music', 'Espresso Culture', 'Contemporary Art', 'Travel'],
    lifestyle: {
      drinking: 'socially',
      smoking: 'never',
      exercise: 'active',
      pets: 'Cat owner'
    },
    photos: [
      {
        id: 'p2',
        url: '/src/assets/images/peqot_dating_international_1793670571282.jpg',
        is_primary: true,
        created_at: '2026-01-12T14:30:00Z'
      }
    ],
    is_verified: true,
    verification_status: 'approved',
    role: 'member',
    account_status: 'active',
    created_at: '2026-01-12T14:30:00Z',
    updated_at: '2026-02-02T10:15:00Z',
    last_active: '15m ago'
  },
  {
    id: 'user_london_1',
    email: 'zainab.a@peqot.uk',
    display_name: 'Zainab',
    birth_date: '1999-03-18',
    age: 27,
    gender: 'female',
    country: 'United Kingdom',
    city: 'London',
    bio: 'Fintech strategy consultant with roots in West Africa. Enthusiastic about international affairs, indie bookstores in South Kensington, and exploring new culinary cultures.',
    relationship_intention: 'marriage',
    occupation: 'Financial Strategy Manager',
    education: 'London School of Economics',
    languages: ['English', 'Yoruba', 'Arabic'],
    interests: ['Economic Development', 'Indie Books', 'Culinary Arts', 'Classical Violin', 'Pilates'],
    lifestyle: {
      drinking: 'never',
      smoking: 'never',
      exercise: 'active',
      pets: 'None yet'
    },
    photos: [
      {
        id: 'p3',
        url: '/src/assets/images/peqot_hero_couple_1793670569695.jpg',
        is_primary: true,
        created_at: '2026-01-15T09:20:00Z'
      }
    ],
    is_verified: true,
    verification_status: 'approved',
    role: 'member',
    account_status: 'active',
    created_at: '2026-01-15T09:20:00Z',
    updated_at: '2026-02-02T08:00:00Z',
    last_active: '1 hour ago'
  },
  {
    id: 'user_ny_1',
    email: 'marcus.v@peqot.us',
    display_name: 'Marcus',
    birth_date: '1994-11-05',
    age: 32,
    gender: 'male',
    country: 'United States',
    city: 'New York',
    bio: 'Documentary filmmaker capturing stories of global diaspora and mutual heritage. Looking for an authentic life partner who values international adventures and warm hospitality.',
    relationship_intention: 'long_term',
    occupation: 'Documentary Producer & Cinematographer',
    education: 'NYU Tisch School of the Arts',
    languages: ['English', 'Portuguese'],
    interests: ['Filmmaking', 'Photography', 'Afrobeats', 'Hiking', 'Global Affairs'],
    lifestyle: {
      drinking: 'socially',
      smoking: 'never',
      exercise: 'moderate',
      pets: 'Rescue dog'
    },
    photos: [
      {
        id: 'p4',
        url: '/src/assets/images/peqot_matching_community_1793670571415.jpg',
        is_primary: true,
        created_at: '2026-01-18T18:00:00Z'
      }
    ],
    is_verified: true,
    verification_status: 'approved',
    role: 'member',
    account_status: 'active',
    created_at: '2026-01-18T18:00:00Z',
    updated_at: '2026-02-02T16:00:00Z',
    last_active: '3 hours ago'
  },
  {
    id: 'user_accra_1',
    email: 'kwame.o@peqot.gh',
    display_name: 'Kwame',
    birth_date: '1995-07-29',
    age: 31,
    gender: 'male',
    country: 'Ghana',
    city: 'Accra',
    bio: 'Renewable energy entrepreneur working across West Africa. Passionate about green technology, jazz evenings at +233 Jazz Bar, and building a meaningful family together.',
    relationship_intention: 'marriage',
    occupation: 'Solar Systems Engineer',
    education: 'KNUST / MSc Renewable Tech',
    languages: ['English', 'Twi', 'French'],
    interests: ['Green Tech', 'Live Jazz', 'Volleyball', 'Travel', 'Reading'],
    lifestyle: {
      drinking: 'socially',
      smoking: 'never',
      exercise: 'active',
      pets: 'None'
    },
    photos: [
      {
        id: 'p5',
        url: '/src/assets/images/peqot_dating_international_1793670571282.jpg',
        is_primary: true,
        created_at: '2026-01-20T11:00:00Z'
      }
    ],
    is_verified: false,
    verification_status: 'pending',
    role: 'member',
    account_status: 'active',
    created_at: '2026-01-20T11:00:00Z',
    updated_at: '2026-02-02T11:00:00Z',
    last_active: '2 days ago'
  }
];

// Initial current logged-in user (Super Admin & Member persona)
const INITIAL_CURRENT_USER: UserProfile = {
  id: 'current_user_1',
  email: 'admin.mosee2023@gmail.com',
  display_name: 'Sekou Kamara',
  birth_date: '1992-06-15',
  age: 34,
  gender: 'male',
  country: 'Liberia',
  city: 'Monrovia',
  bio: 'Software engineer and entrepreneur with SAS Tech Inc. Devoted to bridging cultures and establishing genuine, enduring romantic bonds across Africa and the world.',
  relationship_intention: 'marriage',
  occupation: 'Lead Systems Architect',
  education: 'BSc Computer Science',
  languages: ['English', 'French'],
  interests: ['Technology & Society', 'Ocean Walks', 'Afro-Jazz', 'Global Travel', 'Chess'],
  lifestyle: {
    drinking: 'never',
    smoking: 'never',
    exercise: 'active',
    pets: 'Golden Retriever'
  },
  photos: [
    {
      id: 'p_me',
      url: '/src/assets/images/peqot_dating_international_1793670571282.jpg',
      is_primary: true,
      created_at: '2026-01-01T00:00:00Z'
    }
  ],
  is_verified: true,
  verification_status: 'approved',
  role: 'super_admin',
  account_status: 'active',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-02-01T00:00:00Z',
  last_active: 'Active now'
};

const INITIAL_LIKES: UserLike[] = [
  // Candidate Kormassa already liked current user! (So when current user likes her, it matches)
  {
    id: 'like_kormassa_to_me',
    from_user_id: 'user_monrovia_1',
    to_user_id: 'current_user_1',
    type: 'like',
    created_at: '2026-02-01T15:00:00Z'
  }
];

const INITIAL_MATCHES: Match[] = [
  {
    id: 'match_1',
    user_1_id: 'current_user_1',
    user_2_id: 'user_london_1',
    matched_at: '2026-02-01T12:00:00Z',
    is_active: true
  }
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg_1',
    conversation_id: 'conv_match_1',
    sender_id: 'user_london_1',
    receiver_id: 'current_user_1',
    content: 'Hello Sekou! It is truly wonderful to connect on PeQoT. I saw that you are based in Monrovia and passionate about cross-cultural initiatives.',
    sent_at: '2026-02-01T12:05:00Z',
    read_at: '2026-02-01T12:10:00Z',
    is_read: true
  },
  {
    id: 'msg_2',
    conversation_id: 'conv_match_1',
    sender_id: 'current_user_1',
    receiver_id: 'user_london_1',
    content: 'Greetings Zainab! A pleasure to meet you. Yes, we are deeply committed to connecting genuine hearts across Liberia and internationally.',
    sent_at: '2026-02-01T12:15:00Z',
    read_at: '2026-02-01T12:20:00Z',
    is_read: true
  },
  {
    id: 'msg_3',
    conversation_id: 'conv_match_1',
    sender_id: 'user_london_1',
    receiver_id: 'current_user_1',
    content: 'That is inspiring. What are your favorite places to visit along the coast of Monrovia?',
    sent_at: '2026-02-02T10:30:00Z',
    read_at: null,
    is_read: false
  }
];

const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'audit_1',
    admin_id: 'current_user_1',
    admin_email: 'admin.mosee2023@gmail.com',
    action_type: 'verification_approve',
    target_user_id: 'user_monrovia_1',
    target_user_name: 'Kormassa',
    notes: 'Government biometric ID verified successfully with matching portrait.',
    created_at: '2026-01-10T11:00:00Z'
  },
  {
    id: 'audit_2',
    admin_id: 'current_user_1',
    admin_email: 'admin.mosee2023@gmail.com',
    action_type: 'verification_approve',
    target_user_id: 'user_paris_1',
    target_user_name: 'Antoine',
    notes: 'French national passport and selfie biometric check passed.',
    created_at: '2026-01-12T15:00:00Z'
  }
];

const INITIAL_VERIFICATIONS: VerificationRequest[] = [
  {
    id: 'verif_1',
    user_id: 'user_accra_1',
    user_name: 'Kwame',
    user_email: 'kwame.o@peqot.gh',
    id_document_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    selfie_url: '/src/assets/images/peqot_dating_international_1793670571282.jpg',
    status: 'pending',
    submitted_at: '2026-02-02T09:00:00Z'
  }
];

const INITIAL_REPORTS: UserReport[] = [];

// Local Storage Keys for zero-loss state
const STORAGE_KEY_PROFILES = 'peqot_profiles_v1';
const STORAGE_KEY_CURRENT_USER = 'peqot_current_user_v1';
const STORAGE_KEY_LIKES = 'peqot_likes_v1';
const STORAGE_KEY_MATCHES = 'peqot_matches_v1';
const STORAGE_KEY_MESSAGES = 'peqot_messages_v1';
const STORAGE_KEY_BLOCKS = 'peqot_blocks_v1';
const STORAGE_KEY_REPORTS = 'peqot_reports_v1';
const STORAGE_KEY_VERIFICATIONS = 'peqot_verifications_v1';
const STORAGE_KEY_AUDIT_LOGS = 'peqot_audit_logs_v1';
const STORAGE_KEY_PREFS = 'peqot_discovery_prefs_v1';

class PeqotStore {
  private profiles: UserProfile[];
  private currentUser: UserProfile;
  private likes: UserLike[];
  private matches: Match[];
  private messages: Message[];
  private blocks: BlockRecord[];
  private reports: UserReport[];
  private verifications: VerificationRequest[];
  private auditLogs: AdminAuditLog[];
  private preferences: DiscoveryPreferences;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.profiles = this.loadOr(STORAGE_KEY_PROFILES, SEED_PROFILES);
    this.currentUser = this.loadOr(STORAGE_KEY_CURRENT_USER, INITIAL_CURRENT_USER);
    this.likes = this.loadOr(STORAGE_KEY_LIKES, INITIAL_LIKES);
    this.matches = this.loadOr(STORAGE_KEY_MATCHES, INITIAL_MATCHES);
    this.messages = this.loadOr(STORAGE_KEY_MESSAGES, INITIAL_MESSAGES);
    this.blocks = this.loadOr(STORAGE_KEY_BLOCKS, []);
    this.reports = this.loadOr(STORAGE_KEY_REPORTS, INITIAL_REPORTS);
    this.verifications = this.loadOr(STORAGE_KEY_VERIFICATIONS, INITIAL_VERIFICATIONS);
    this.auditLogs = this.loadOr(STORAGE_KEY_AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    this.preferences = this.loadOr(STORAGE_KEY_PREFS, {
      interested_in_gender: 'all',
      min_age: 18,
      max_age: 60,
      countries: [],
      intentions: [],
      verified_only: false
    });

    // Automatically synchronize with Firestore on startup
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.loadProfilesFromFirestore();
        subscribeToProfilesCloud((cloudProfiles) => {
          if (cloudProfiles && cloudProfiles.length > 0) {
            const map = new Map<string, UserProfile>();
            this.profiles.forEach(p => map.set(p.id, p));
            cloudProfiles.forEach(p => map.set(p.id, p));
            this.profiles = Array.from(map.values());
            this.persist(STORAGE_KEY_PROFILES, this.profiles);

            // Keep current user updated if changed in cloud
            const me = cloudProfiles.find(p => p.id === this.currentUser.id || p.email.toLowerCase() === this.currentUser.email.toLowerCase());
            if (me) {
              this.currentUser = { ...this.currentUser, ...me };
              this.persist(STORAGE_KEY_CURRENT_USER, this.currentUser);
            }
            this.notify();
          }
        });
      }, 50);
    }
  }

  // Load all profiles and uploads directly from Firestore to ensure zero data loss on site data deletion
  public async loadProfilesFromFirestore(): Promise<UserProfile[]> {
    try {
      const cloudProfiles = await fetchAllProfilesFromCloud();
      if (cloudProfiles && cloudProfiles.length > 0) {
        const map = new Map<string, UserProfile>();
        // Base seed profiles
        SEED_PROFILES.forEach(p => map.set(p.id, p));
        // Current local profiles
        this.profiles.forEach(p => map.set(p.id, p));
        // Overwrite with persistent cloud data
        cloudProfiles.forEach(p => map.set(p.id, p));

        this.profiles = Array.from(map.values());
        this.persist(STORAGE_KEY_PROFILES, this.profiles);

        // Update current user if exists in cloud
        const me = this.profiles.find(p => p.id === this.currentUser.id || p.email.toLowerCase() === this.currentUser.email.toLowerCase());
        if (me) {
          this.currentUser = me;
          this.persist(STORAGE_KEY_CURRENT_USER, this.currentUser);
        }
        this.notify();
        return this.profiles;
      } else {
        // If Firestore is completely fresh, seed default profiles into the cloud
        for (const seed of SEED_PROFILES) {
          await saveProfileToCloud(seed);
        }
        await saveProfileToCloud(INITIAL_CURRENT_USER);
      }
    } catch (err) {
      console.warn('Firestore profiles fetch note:', err);
    }
    return this.profiles;
  }

  private loadOr<T>(key: string, fallback: T): T {
    try {
      if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key);
        if (item) return JSON.parse(item);
      }
    } catch {
      // Fallback
    }
    return fallback;
  }

  private persist(key: string, value: unknown) {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {
      // Ignore
    }
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  // --- Auth & Session ---
  public getCurrentUser(): UserProfile {
    return this.currentUser;
  }

  public setCurrentUser(user: UserProfile) {
    this.currentUser = user;
    this.persist(STORAGE_KEY_CURRENT_USER, user);
    this.notify();
  }

  // Authenticate returning users and restore their complete profile & uploads from Firestore
  public async loginUser(email: string): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
    const cleanEmail = email.toLowerCase().trim();
    // Pull fresh profiles from Firestore
    await this.loadProfilesFromFirestore();

    const user = this.profiles.find(p => p.email.toLowerCase() === cleanEmail);
    if (user) {
      if (user.account_status === 'suspended') {
        return { success: false, error: 'This account has been temporarily suspended by PeQoT moderation.' };
      }
      if (user.account_status === 'banned') {
        return { success: false, error: 'This account has been permanently banned for safety policy violations.' };
      }

      this.currentUser = user;
      this.persist(STORAGE_KEY_CURRENT_USER, this.currentUser);
      this.notify();
      return { success: true, user };
    }

    return { 
      success: false, 
      error: `No PeQoT account found for ${email}. Please check your email or sign up.` 
    };
  }

  // Delete account and all uploaded data permanently from Firestore
  public async deleteAccount(userId: string): Promise<boolean> {
    this.profiles = this.profiles.filter(p => p.id !== userId);
    this.persist(STORAGE_KEY_PROFILES, this.profiles);

    // Delete from Firestore Cloud
    await deleteProfileFromCloud(userId);

    // Reset current user to initial
    this.currentUser = INITIAL_CURRENT_USER;
    this.persist(STORAGE_KEY_CURRENT_USER, this.currentUser);
    this.notify();
    return true;
  }

  public switchTestRole(role: UserProfile['role']) {
    this.currentUser = {
      ...this.currentUser,
      role
    };
    this.persist(STORAGE_KEY_CURRENT_USER, this.currentUser);
    this.notify();
  }

  public updateProfile(updates: Partial<UserProfile>): { success: boolean; error?: string } {
    if (updates.birth_date) {
      const calculatedAge = calculateAge(updates.birth_date);
      if (calculatedAge < 18) {
        return { 
          success: false, 
          error: 'You must be at least 18 years old to use PeQoT. Minors are strictly prohibited.' 
        };
      }
      updates.age = calculatedAge;
    }

    this.currentUser = {
      ...this.currentUser,
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.persist(STORAGE_KEY_CURRENT_USER, this.currentUser);

    // Also update in profiles list
    this.profiles = this.profiles.map(p => p.id === this.currentUser.id ? this.currentUser : p);
    this.persist(STORAGE_KEY_PROFILES, this.profiles);

    // Mirror to Firestore Cloud so uploads & edits persist indefinitely
    saveProfileToCloud(this.currentUser);

    this.notify();
    return { success: true };
  }

  // Registration strictly enforcing age >= 18
  public registerUser(params: {
    email: string;
    display_name: string;
    birth_date: string;
    gender: Gender;
    country: string;
    city: string;
    relationship_intention: RelationshipIntention;
    bio: string;
  }): { success: boolean; error?: string; user?: UserProfile } {
    const age = calculateAge(params.birth_date);
    if (age < 18) {
      return {
        success: false,
        error: 'Age verification failed: You must be at least 18 years old to register on PeQoT. Platform policy strictly prohibits minors.'
      };
    }

    if (!params.email || !params.display_name || !params.country) {
      return {
        success: false,
        error: 'Please complete all required fields.'
      };
    }

    const newUser: UserProfile = {
      id: 'user_' + Date.now(),
      email: params.email.toLowerCase().trim(),
      display_name: params.display_name.trim(),
      birth_date: params.birth_date,
      age,
      gender: params.gender,
      country: params.country,
      city: params.city.trim() || 'Undisclosed',
      bio: params.bio.trim() || 'Looking to meet sincere partners across borders.',
      relationship_intention: params.relationship_intention,
      languages: ['English'],
      interests: ['International Travel', 'Cultural Exchange'],
      photos: [
        {
          id: 'photo_initial_' + Date.now(),
          url: '/src/assets/images/peqot_hero_couple_1793670569695.jpg',
          is_primary: true,
          created_at: new Date().toISOString()
        }
      ],
      is_verified: false,
      verification_status: 'none',
      role: 'member',
      account_status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_active: 'Active now'
    };

    this.profiles.push(newUser);
    this.persist(STORAGE_KEY_PROFILES, this.profiles);

    this.currentUser = newUser;
    this.persist(STORAGE_KEY_CURRENT_USER, this.currentUser);

    // Mirror to Firestore Cloud
    saveProfileToCloud(newUser);

    this.notify();
    return { success: true, user: newUser };
  }

  // --- Discovery & Matching ---
  public getDiscoveryProfiles(): UserProfile[] {
    const blockedIds = new Set(
      this.blocks
        .filter(b => b.blocker_id === this.currentUser.id || b.blocked_user_id === this.currentUser.id)
        .map(b => b.blocker_id === this.currentUser.id ? b.blocked_user_id : b.blocker_id)
    );

    // Filter out current user, blocked users, suspended users
    return this.profiles.filter(p => {
      if (p.id === this.currentUser.id) return false;
      if (p.account_status !== 'active') return false;
      if (blockedIds.has(p.id)) return false;

      // Gender preference
      if (this.preferences.interested_in_gender !== 'all' && 
          this.preferences.interested_in_gender.length > 0 &&
          !this.preferences.interested_in_gender.includes(p.gender)) {
        return false;
      }

      // Age filter
      if (p.age < this.preferences.min_age || p.age > this.preferences.max_age) {
        return false;
      }

      // Country filter
      if (this.preferences.countries.length > 0 && !this.preferences.countries.includes(p.country)) {
        return false;
      }

      // Verified only
      if (this.preferences.verified_only && !p.is_verified) {
        return false;
      }

      // Intention filter
      if (this.preferences.intentions.length > 0 && !this.preferences.intentions.includes(p.relationship_intention)) {
        return false;
      }

      return true;
    });
  }

  public getPreferences(): DiscoveryPreferences {
    return this.preferences;
  }

  public updatePreferences(prefs: Partial<DiscoveryPreferences>) {
    this.preferences = {
      ...this.preferences,
      ...prefs
    };
    this.persist(STORAGE_KEY_PREFS, this.preferences);
    this.notify();
  }

  // Like a profile & check mutual match
  public likeProfile(targetUserId: string, type: 'like' | 'super_like' = 'like'): { isMatch: boolean; match?: Match } {
    const existingLike = this.likes.find(
      l => l.from_user_id === this.currentUser.id && l.to_user_id === targetUserId
    );

    if (!existingLike) {
      const newLike: UserLike = {
        id: 'like_' + Date.now(),
        from_user_id: this.currentUser.id,
        to_user_id: targetUserId,
        type,
        created_at: new Date().toISOString()
      };
      this.likes.push(newLike);
      this.persist(STORAGE_KEY_LIKES, this.likes);
      saveLikeToCloud(newLike);
    }

    // Check if target user has liked current user
    const mutualLike = this.likes.find(
      l => l.from_user_id === targetUserId && l.to_user_id === this.currentUser.id
    );

    if (mutualLike) {
      // Check if match already exists
      let match = this.matches.find(
        m => (m.user_1_id === this.currentUser.id && m.user_2_id === targetUserId) ||
             (m.user_2_id === this.currentUser.id && m.user_1_id === targetUserId)
      );

      if (!match) {
        match = {
          id: 'match_' + Date.now(),
          user_1_id: this.currentUser.id,
          user_2_id: targetUserId,
          matched_at: new Date().toISOString(),
          is_active: true
        };
        this.matches.push(match);
        this.persist(STORAGE_KEY_MATCHES, this.matches);
        saveMatchToCloud(match);
      }

      const targetProfile = this.profiles.find(p => p.id === targetUserId);
      this.notify();
      return { 
        isMatch: true, 
        match: { ...match, matched_user: targetProfile } 
      };
    }

    this.notify();
    return { isMatch: false };
  }

  // Get active matches for current user
  public getMatches(): Match[] {
    const blockedIds = new Set(
      this.blocks
        .filter(b => b.blocker_id === this.currentUser.id || b.blocked_user_id === this.currentUser.id)
        .map(b => b.blocker_id === this.currentUser.id ? b.blocked_user_id : b.blocker_id)
    );

    return this.matches
      .filter(m => m.is_active && (m.user_1_id === this.currentUser.id || m.user_2_id === this.currentUser.id))
      .filter(m => {
        const otherId = m.user_1_id === this.currentUser.id ? m.user_2_id : m.user_1_id;
        return !blockedIds.has(otherId);
      })
      .map(m => {
        const otherId = m.user_1_id === this.currentUser.id ? m.user_2_id : m.user_1_id;
        const otherUser = this.profiles.find(p => p.id === otherId);
        
        // Find last message in conversation
        const convId = 'conv_' + m.id;
        const convMsgs = this.messages.filter(msg => msg.conversation_id === convId);
        const lastMsg = convMsgs[convMsgs.length - 1];
        const unreadCount = convMsgs.filter(msg => msg.receiver_id === this.currentUser.id && !msg.is_read).length;

        return {
          ...m,
          matched_user: otherUser,
          last_message: lastMsg ? lastMsg.content : 'New mutual match! Say hello.',
          last_message_at: lastMsg ? lastMsg.sent_at : m.matched_at,
          unread_count: unreadCount
        };
      })
      .sort((a, b) => new Date(b.last_message_at || 0).getTime() - new Date(a.last_message_at || 0).getTime());
  }

  // --- Messaging ---
  public getConversationMessages(matchId: string): Message[] {
    const convId = 'conv_' + matchId;
    return this.messages
      .filter(m => m.conversation_id === convId)
      .sort((a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime());
  }

  public sendMessage(matchId: string, content: string): Message | null {
    if (!content.trim()) return null;

    const match = this.matches.find(m => m.id === matchId && m.is_active);
    if (!match) return null;

    const receiverId = match.user_1_id === this.currentUser.id ? match.user_2_id : match.user_1_id;

    const newMsg: Message = {
      id: 'msg_' + Date.now(),
      conversation_id: 'conv_' + matchId,
      sender_id: this.currentUser.id,
      receiver_id: receiverId,
      content: content.trim(),
      sent_at: new Date().toISOString(),
      read_at: null,
      is_read: false
    };

    this.messages.push(newMsg);
    this.persist(STORAGE_KEY_MESSAGES, this.messages);
    saveMessageToCloud(matchId, newMsg);
    this.notify();
    return newMsg;
  }

  public markMessagesRead(matchId: string) {
    const convId = 'conv_' + matchId;
    let modified = false;
    this.messages = this.messages.map(msg => {
      if (msg.conversation_id === convId && msg.receiver_id === this.currentUser.id && !msg.is_read) {
        modified = true;
        return {
          ...msg,
          is_read: true,
          read_at: new Date().toISOString()
        };
      }
      return msg;
    });

    if (modified) {
      this.persist(STORAGE_KEY_MESSAGES, this.messages);
      this.notify();
    }
  }

  // --- Safety, Reporting & Blocking ---
  public blockUser(targetUserId: string) {
    const alreadyBlocked = this.blocks.some(
      b => b.blocker_id === this.currentUser.id && b.blocked_user_id === targetUserId
    );
    if (!alreadyBlocked) {
      this.blocks.push({
        id: 'block_' + Date.now(),
        blocker_id: this.currentUser.id,
        blocked_user_id: targetUserId,
        created_at: new Date().toISOString()
      });
      this.persist(STORAGE_KEY_BLOCKS, this.blocks);
      this.notify();
    }
  }

  public unblockUser(targetUserId: string) {
    this.blocks = this.blocks.filter(
      b => !(b.blocker_id === this.currentUser.id && b.blocked_user_id === targetUserId)
    );
    this.persist(STORAGE_KEY_BLOCKS, this.blocks);
    this.notify();
  }

  public getBlockedUsers(): UserProfile[] {
    const blockedIds = this.blocks
      .filter(b => b.blocker_id === this.currentUser.id)
      .map(b => b.blocked_user_id);
    return this.profiles.filter(p => blockedIds.includes(p.id));
  }

  public reportUser(params: {
    reported_user_id: string;
    category: ReportCategory;
    details: string;
  }): { success: boolean } {
    const reportedUser = this.profiles.find(p => p.id === params.reported_user_id);
    const newReport: UserReport = {
      id: 'report_' + Date.now(),
      reporter_id: this.currentUser.id,
      reporter_name: this.currentUser.display_name,
      reported_user_id: params.reported_user_id,
      reported_user_name: reportedUser ? reportedUser.display_name : 'Unknown User',
      category: params.category,
      details: params.details.trim(),
      status: 'pending',
      created_at: new Date().toISOString()
    };

    this.reports.push(newReport);
    this.persist(STORAGE_KEY_REPORTS, this.reports);
    saveReportToCloud(newReport);

    // Automatically offer or apply block for safety
    this.blockUser(params.reported_user_id);

    this.notify();
    return { success: true };
  }

  // --- Profile Verification Submission ---
  public submitVerification(idDocumentUrl: string, selfieUrl: string): { success: boolean; error?: string } {
    const existing = this.verifications.find(
      v => v.user_id === this.currentUser.id && v.status === 'pending'
    );
    if (existing) {
      return { success: false, error: 'You already have an identity verification request under review.' };
    }

    const request: VerificationRequest = {
      id: 'verif_' + Date.now(),
      user_id: this.currentUser.id,
      user_name: this.currentUser.display_name,
      user_email: this.currentUser.email,
      id_document_url: idDocumentUrl,
      selfie_url: selfieUrl,
      status: 'pending',
      submitted_at: new Date().toISOString()
    };

    this.verifications.push(request);
    this.persist(STORAGE_KEY_VERIFICATIONS, this.verifications);
    saveVerificationToCloud(request);

    this.currentUser = {
      ...this.currentUser,
      verification_status: 'pending'
    };
    this.persist(STORAGE_KEY_CURRENT_USER, this.currentUser);
    this.notify();
    return { success: true };
  }

  // --- Administration & Moderation ---
  public getAdminStats() {
    return {
      totalUsers: this.profiles.length,
      verifiedUsers: this.profiles.filter(p => p.is_verified).length,
      pendingVerifications: this.verifications.filter(v => v.status === 'pending').length,
      activeMatches: this.matches.filter(m => m.is_active).length,
      totalMessages: this.messages.length,
      pendingReports: this.reports.filter(r => r.status === 'pending').length,
      suspendedAccounts: this.profiles.filter(p => p.account_status === 'suspended').length,
      bannedAccounts: this.profiles.filter(p => p.account_status === 'banned').length
    };
  }

  public getAllProfiles(): UserProfile[] {
    return this.profiles;
  }

  public getAllVerifications(): VerificationRequest[] {
    return this.verifications;
  }

  public getAllReports(): UserReport[] {
    return this.reports;
  }

  public getAuditLogs(): AdminAuditLog[] {
    return this.auditLogs;
  }

  public approveVerification(verificationId: string): boolean {
    const req = this.verifications.find(v => v.id === verificationId);
    if (!req) return false;

    req.status = 'approved';
    req.reviewed_at = new Date().toISOString();
    req.reviewed_by = this.currentUser.email;

    // Update target user profile
    this.profiles = this.profiles.map(p => {
      if (p.id === req.user_id) {
        return {
          ...p,
          is_verified: true,
          verification_status: 'approved'
        };
      }
      return p;
    });

    if (this.currentUser.id === req.user_id) {
      this.currentUser = {
        ...this.currentUser,
        is_verified: true,
        verification_status: 'approved'
      };
      this.persist(STORAGE_KEY_CURRENT_USER, this.currentUser);
    }

    // Add audit log
    this.auditLogs.unshift({
      id: 'audit_' + Date.now(),
      admin_id: this.currentUser.id,
      admin_email: this.currentUser.email,
      action_type: 'verification_approve',
      target_user_id: req.user_id,
      target_user_name: req.user_name,
      notes: `Identity verification approved. Biometric review matched registered details.`,
      created_at: new Date().toISOString()
    });

    this.persist(STORAGE_KEY_VERIFICATIONS, this.verifications);
    this.persist(STORAGE_KEY_PROFILES, this.profiles);
    this.persist(STORAGE_KEY_AUDIT_LOGS, this.auditLogs);
    this.notify();
    return true;
  }

  public rejectVerification(verificationId: string, reason: string): boolean {
    const req = this.verifications.find(v => v.id === verificationId);
    if (!req) return false;

    req.status = 'rejected';
    req.reviewed_at = new Date().toISOString();
    req.reviewed_by = this.currentUser.email;
    req.rejection_reason = reason;

    this.profiles = this.profiles.map(p => {
      if (p.id === req.user_id) {
        return {
          ...p,
          is_verified: false,
          verification_status: 'rejected'
        };
      }
      return p;
    });

    if (this.currentUser.id === req.user_id) {
      this.currentUser = {
        ...this.currentUser,
        is_verified: false,
        verification_status: 'rejected'
      };
      this.persist(STORAGE_KEY_CURRENT_USER, this.currentUser);
    }

    this.auditLogs.unshift({
      id: 'audit_' + Date.now(),
      admin_id: this.currentUser.id,
      admin_email: this.currentUser.email,
      action_type: 'verification_reject',
      target_user_id: req.user_id,
      target_user_name: req.user_name,
      notes: `Verification rejected: ${reason}`,
      created_at: new Date().toISOString()
    });

    this.persist(STORAGE_KEY_VERIFICATIONS, this.verifications);
    this.persist(STORAGE_KEY_PROFILES, this.profiles);
    this.persist(STORAGE_KEY_AUDIT_LOGS, this.auditLogs);
    this.notify();
    return true;
  }

  public moderateAccount(userId: string, action: 'suspend' | 'ban' | 'restore', notes: string): boolean {
    const user = this.profiles.find(p => p.id === userId);
    if (!user) return false;

    const newStatus = action === 'restore' ? 'active' : action === 'suspend' ? 'suspended' : 'banned';
    user.account_status = newStatus;

    this.auditLogs.unshift({
      id: 'audit_' + Date.now(),
      admin_id: this.currentUser.id,
      admin_email: this.currentUser.email,
      action_type: action === 'suspend' ? 'user_suspend' : action === 'ban' ? 'user_ban' : 'user_restore',
      target_user_id: user.id,
      target_user_name: user.display_name,
      notes,
      created_at: new Date().toISOString()
    });

    this.persist(STORAGE_KEY_PROFILES, this.profiles);
    this.persist(STORAGE_KEY_AUDIT_LOGS, this.auditLogs);
    this.notify();
    return true;
  }

  public resolveReport(reportId: string, status: 'action_taken' | 'dismissed', notes: string): boolean {
    const report = this.reports.find(r => r.id === reportId);
    if (!report) return false;

    report.status = status;
    report.reviewed_at = new Date().toISOString();
    report.reviewed_by = this.currentUser.email;
    report.resolution_notes = notes;

    this.auditLogs.unshift({
      id: 'audit_' + Date.now(),
      admin_id: this.currentUser.id,
      admin_email: this.currentUser.email,
      action_type: 'report_resolved',
      target_user_id: report.reported_user_id,
      target_user_name: report.reported_user_name,
      notes: `Report [${report.category}] resolved as ${status}: ${notes}`,
      created_at: new Date().toISOString()
    });

    this.persist(STORAGE_KEY_REPORTS, this.reports);
    this.persist(STORAGE_KEY_AUDIT_LOGS, this.auditLogs);
    this.notify();
    return true;
  }
}

export const peqotStore = new PeqotStore();
