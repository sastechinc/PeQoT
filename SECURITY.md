# PeQoT Cybersecurity & Safety Architecture

Security, privacy, and user safety are non-negotiable core pillars of the PeQoT international dating platform.

---

## 1. 18+ Age Gating & Minor Protection
- **Multi-Layer Age Verification**:
  1. Frontend mathematical verification: Calculates exact chronological age from date of birth. Any date resulting in < 18 years is immediately blocked.
  2. Database CHECK constraint: `CHECK (birth_date <= (CURRENT_DATE - INTERVAL '18 years'))` prevents bypass through API manipulation.
  3. Biometric ID Verification: Members submitting government identification have their birth date reconciled before verified badges are issued.

## 2. Row Level Security (RLS) Enforcement
- Every database table has RLS enabled (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`).
- **Private Messages**: Only verified match participants can select or insert messages. Altering conversation URLs or query parameters returns 0 rows.
- **Role Elevation Defense**: Users cannot update their own role column. Only users possessing `is_admin()` status can modify privileges.
- **Zero Public Identification Documents**: Verification selfies and passport/ID scans are kept in private buckets with access restricted to the document owner and authorized administrators.

## 3. Anti-Harassment & Blocking
- Blocking a user immediately:
  1. Terminates discovery feed visibility in both directions.
  2. Blocks messaging and hides past matches.
  3. Precludes any further interactions without notifying the blocked party.

## 4. Moderation & Audit Accountability
- Every administrative action (suspension, account ban, verification review, report resolution) writes an immutable record to `admin_audit_logs`.
- Roles are segregated:
  - `super_admin`: Full system control and administrator management.
  - `admin`: Account moderation, dispute resolution, platform configuration.
  - `moderator`: Content moderation, report review, identity verification.
  - `customer_support`: Ticket response, guidance, read-only review.
  - `member`: Standard user features.

## 5. Reporting Categories
- Fake profile
- Scamming / financial fraud
- Harassment or bullying
- Impersonation
- Inappropriate explicit content
- Threats or safety hazards
- Underage user suspicion
- Other violations
