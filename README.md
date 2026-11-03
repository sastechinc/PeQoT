# PeQoT — International Dating Platform
> *"Where Hearts Meet, Beyond Borders."*  
> Powered by **SAS Tech Inc.**

PeQoT is a secure, elegant, international dating and relationship platform designed to connect adults (18+) across Liberia, West Africa, Europe, the Americas, Asia, Oceania, and the world.

---

## The PeQoT Identity
- **P** — Passion
- **e** — Encounters
- **Q** — Quality
- **o** — Openness
- **T** — Togetherness

**Official Slogan**: *"Where Hearts Meet, Beyond Borders."*  
**Technology & Operating Entity**: SAS Tech Inc.  
**Audience**: Strictly adults aged 18 and older. Minor access is prevented through biometric/DOB verification policies.

---

## Core Platform Highlights
1. **International Matchmaking Engine**: Discover like-minded singles by country, mutual relationship intentions, age, spoken languages, and shared values.
2. **Mutual Consent Matching**: Two members only connect when there is mutual interest (`Like` / `Super-Like`).
3. **End-to-End Secure Messaging**: Private 1-to-1 real-time messaging governed strictly by database Row Level Security (RLS). No eavesdropping or ID manipulation.
4. **Authentic Profile Verification**: Multi-stage identity checks requiring government-issued biometric ID and selfie matching. Verified badges are awarded only after manual or automated clearance.
5. **Safety & Zero-Tolerance Moderation**: In-app reporting across 8 safety categories (scams, underage attempts, harassment, fake profiles) with instant blocking and rapid admin action.
6. **Administrative & Moderation Suite**: Full role-based access control (Super Admin, Admin, Moderator, Customer Support) with immutable audit logging.
7. **Bandwidth-Optimized Performance**: Engineered for reliable operation across varying network conditions in Liberia and worldwide with lazy image loading and resilient fallbacks.

---

## Technical Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons.
- **Backend & Database**: Google Firebase & Enterprise Cloud Firestore (`gen-lang-client-0535995285`).
- **Security**: Zero-Trust Attribute-Based Access Control (ABAC) Firestore Security Rules.
- **Performance**: Shimmer skeleton loaders for bandwidth-constrained networks in Liberia and worldwide.
- **Deployment**: Vercel & Cloud Run compatible.

---

## Project Documentation Index
- [INSTALLATION.md](./INSTALLATION.md) — Local development and setup instructions.
- [DATABASE.md](./DATABASE.md) — Database schema, relationships, and indexes.
- [SECURITY.md](./SECURITY.md) — Cybersecurity architecture, RLS policies, and age gating.
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Vercel and production deployment guide.
- [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) — Required environment variables.
- [TESTING.md](./TESTING.md) — Quality assurance test suite and security verification.
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) — Operations manual for administrators and moderators.
