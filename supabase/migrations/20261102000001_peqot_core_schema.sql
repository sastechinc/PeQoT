-- PeQoT International Dating Platform
-- PostgreSQL Core Schema & Row Level Security (RLS) Migrations
-- Brand: SAS Tech Inc.
-- Target: Supabase PostgreSQL Database

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM TYPES
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'moderator', 'customer_support', 'member');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE account_status AS ENUM ('active', 'suspended', 'banned');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE verification_status AS ENUM ('none', 'pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE relationship_intention AS ENUM (
    'marriage', 
    'long_term', 
    'serious_dating', 
    'friendship', 
    'open_to_possibilities'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE report_category AS ENUM (
    'fake_profile',
    'scamming',
    'harassment',
    'impersonation',
    'inappropriate_content',
    'threats',
    'underage_user',
    'other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  gender TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT,
  bio TEXT,
  relationship_intention relationship_intention DEFAULT 'serious_dating',
  occupation TEXT,
  education TEXT,
  languages TEXT[] DEFAULT ARRAY['English']::TEXT[],
  interests TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_verified BOOLEAN DEFAULT FALSE,
  verification_status verification_status DEFAULT 'none',
  role user_role DEFAULT 'member',
  account_status account_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  -- Constraint: Age must be at least 18 years
  CONSTRAINT age_at_least_18 CHECK (birth_date <= (CURRENT_DATE - INTERVAL '18 years'))
);

CREATE INDEX IF NOT EXISTS idx_profiles_country ON public.profiles(country);
CREATE INDEX IF NOT EXISTS idx_profiles_gender ON public.profiles(gender);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(account_status);

-- 4. USER DISCOVERY PREFERENCES
CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  interested_in_gender TEXT[] DEFAULT ARRAY['all']::TEXT[],
  min_age INTEGER DEFAULT 18 CHECK (min_age >= 18),
  max_age INTEGER DEFAULT 75 CHECK (max_age >= min_age),
  preferred_countries TEXT[] DEFAULT ARRAY[]::TEXT[],
  preferred_intentions relationship_intention[] DEFAULT ARRAY[]::relationship_intention[],
  verified_only BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROFILE PHOTOS
CREATE TABLE IF NOT EXISTS public.profile_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profile_photos_user ON public.profile_photos(user_id);

-- 6. LIKES TABLE
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'like' CHECK (type IN ('like', 'super_like')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_like UNIQUE (from_user_id, to_user_id),
  CONSTRAINT no_self_like CHECK (from_user_id <> to_user_id)
);

CREATE INDEX IF NOT EXISTS idx_likes_from_to ON public.likes(from_user_id, to_user_id);
CREATE INDEX IF NOT EXISTS idx_likes_to ON public.likes(to_user_id);

-- 7. MATCHES TABLE
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_1_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_2_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  matched_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  CONSTRAINT unique_match_pair UNIQUE (user_1_id, user_2_id),
  CONSTRAINT match_order CHECK (user_1_id < user_2_id)
);

CREATE INDEX IF NOT EXISTS idx_matches_user_1 ON public.matches(user_1_id);
CREATE INDEX IF NOT EXISTS idx_matches_user_2 ON public.matches(user_2_id);

-- 8. CONVERSATIONS & MESSAGES
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID NOT NULL UNIQUE REFERENCES public.matches(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  is_read BOOLEAN DEFAULT FALSE,
  CONSTRAINT message_participants CHECK (sender_id <> receiver_id)
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id, sent_at ASC);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_read ON public.messages(receiver_id, is_read);

-- 9. USER BLOCKS
CREATE TABLE IF NOT EXISTS public.blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocker_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  blocked_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_block UNIQUE (blocker_id, blocked_user_id),
  CONSTRAINT no_self_block CHECK (blocker_id <> blocked_user_id)
);

CREATE INDEX IF NOT EXISTS idx_blocks_blocker ON public.blocks(blocker_id);
CREATE INDEX IF NOT EXISTS idx_blocks_blocked ON public.blocks(blocked_user_id);

-- 10. SAFETY REPORTS
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reported_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category report_category NOT NULL,
  details TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'action_taken', 'dismissed')),
  resolution_notes TEXT,
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_reported ON public.reports(reported_user_id);

-- 11. IDENTITY VERIFICATIONS
CREATE TABLE IF NOT EXISTS public.verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  id_document_url TEXT NOT NULL,
  selfie_url TEXT NOT NULL,
  status verification_status DEFAULT 'pending',
  rejection_reason TEXT,
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_verifications_status ON public.verifications(status);

-- 12. ADMIN AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  admin_email TEXT NOT NULL,
  action_type TEXT NOT NULL,
  target_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper security function: Check if current user is an Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
      AND role IN ('super_admin', 'admin', 'moderator')
      AND account_status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public active profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    account_status = 'active' 
    AND NOT EXISTS (
      SELECT 1 FROM public.blocks 
      WHERE (blocker_id = auth.uid() AND blocked_user_id = profiles.id)
         OR (blocker_id = profiles.id AND blocked_user_id = auth.uid())
    )
  );

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id 
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()) -- Cannot elevate role
  );

-- Likes Policies
CREATE POLICY "Users can insert their own likes"
  ON public.likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can view likes they made"
  ON public.likes FOR SELECT
  TO authenticated
  USING (auth.uid() = from_user_id);

-- Matches Policies
CREATE POLICY "Users can view matches they are a participant of"
  ON public.matches FOR SELECT
  TO authenticated
  USING (auth.uid() = user_1_id OR auth.uid() = user_2_id);

-- Messages Policies
CREATE POLICY "Users can view messages in their conversations"
  ON public.messages FOR SELECT
  TO authenticated
  USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
  );

CREATE POLICY "Users can send messages to their matches"
  ON public.messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM public.conversations c
      JOIN public.matches m ON c.match_id = m.id
      WHERE c.id = messages.conversation_id
        AND (m.user_1_id = auth.uid() OR m.user_2_id = auth.uid())
        AND m.is_active = TRUE
    )
  );

-- Verifications Policies
CREATE POLICY "Users can view and insert their own verifications"
  ON public.verifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can submit their own verification"
  ON public.verifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update verification status"
  ON public.verifications FOR UPDATE
  TO authenticated
  USING (public.is_admin());

-- Reports Policies
CREATE POLICY "Users can insert reports"
  ON public.reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Admins can view and manage reports"
  ON public.reports FOR ALL
  TO authenticated
  USING (public.is_admin());

-- Blocks Policies
CREATE POLICY "Users can manage their own blocks"
  ON public.blocks FOR ALL
  TO authenticated
  USING (auth.uid() = blocker_id)
  WITH CHECK (auth.uid() = blocker_id);

-- Admin Audit Logs
CREATE POLICY "Admins can view and insert audit logs"
  ON public.admin_audit_logs FOR ALL
  TO authenticated
  USING (public.is_admin());
