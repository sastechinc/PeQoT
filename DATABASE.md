# PeQoT Database Architecture & Cloud Firestore Engine

PeQoT operates on **Google Cloud Firestore (Enterprise Edition)** within the official Firebase integration (`gen-lang-client-0535995285`), fortified with Zero-Trust Attribute-Based Access Control (ABAC) security rules.

## Cloud Firestore Collections

### 1. `/profiles/{userId}`
Stores user profiles. Age is strictly verified ($\ge 18$) upon creation.
- Document ID: `userId`
- Attributes: `id`, `email`, `display_name`, `birth_date`, `age` ($\ge 18$), `gender`, `country`, `city`, `bio`, `relationship_intention`, `occupation`, `education`, `languages`, `interests`, `is_verified`, `verification_status`, `role`, `account_status`, `created_at`, `updated_at`.
- Security: Owners can update biographical details; users cannot elevate `role` or self-assign `is_verified`.

### 2. `/likes/{likeId}`
Stores mutual liking intent.
- Attributes: `from_user_id`, `to_user_id`, `type`, `created_at`.
- Security: `from_user_id == request.auth.uid`.

### 3. `/matches/{matchId}`
Stores active mutual connections.
- Attributes: `user_1_id`, `user_2_id`, `matched_at`, `is_active`.
- Security: Readable only by participating users or administrators.

### 4. `/matches/{matchId}/messages/{messageId}`
Subcollection for end-to-end authorized 1-to-1 direct messaging.
- Attributes: `id`, `conversation_id`, `sender_id`, `receiver_id`, `content`, `sent_at`, `is_read`.
- Master Gate Rule: Enforces that sender must belong to parent match (`user_1_id` or `user_2_id`).

### 5. `/reports/{reportId}`
Stores user safety reports across 8 official categories.
- Security: Reporter can create; only admins can list or resolve.

### 6. `/verifications/{verificationId}`
Stores biometric government ID scans and selfies in private storage.
- Security: Restricted to document owner and authorized compliance officers.

### 7. `/admin_audit_logs/{logId}`
Immutable audit trail of all moderation and administrative actions.

### 2. `user_preferences`
- Discovery settings for age bounds (18–75), target countries, genders, and intentions.

### 3. `profile_photos`
- Tracks uploaded photos in Supabase Storage. Supports `is_primary` flag.

### 4. `likes`
- Records single-direction interest (`like` or `super_like`).
- Unique constraint `(from_user_id, to_user_id)` prevents spam duplicate likes.
- Check constraint `from_user_id <> to_user_id` prevents self-likes.

### 5. `matches`
- Generated when mutual likes exist.
- Ordered pair constraint `user_1_id < user_2_id` guarantees canonical single-row records.

### 6. `conversations` & `messages`
- 1-to-1 private chat threads mapped directly to valid matches.
- Messages feature `is_read`, `read_at`, `sent_at`.
- Protected by RLS so non-participants receive 0 rows.

### 7. `blocks` & `reports`
- Mutual blocking hides profiles across discovery and messaging.
- Reports record category (`fake_profile`, `scamming`, `harassment`, `impersonation`, `inappropriate_content`, `threats`, `underage_user`, `other`).

### 8. `verifications`
- Stores user-submitted biometric ID documents and selfies for moderation.

### 9. `admin_audit_logs`
- Immutable event logs for all administrative actions (suspensions, bans, badge awards, report resolutions).

## Migrations Location
`/supabase/migrations/20261102000001_peqot_core_schema.sql`
