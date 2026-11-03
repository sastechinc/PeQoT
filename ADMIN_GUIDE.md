# PeQoT Administration & Moderation Guide
> For SAS Tech Inc. Authorized Personnel Only

## Roles & Access Hierarchy
- **Super Administrator (`super_admin`)**: Full platform authority, database schema maintenance, administrative appointments, audit review.
- **Administrator (`admin`)**: User suspension, banning, platform security rules, dispute resolution.
- **Moderator (`moderator`)**: Review identity verification requests (approve/reject biometric IDs), process safety reports, flag inappropriate content.
- **Customer Support (`customer_support`)**: Review support tickets, provide assistance, read-only user lookups.
- **Member (`member`)**: Standard dating user.

---

## 1. Identity Verification Queue Workflow
1. Navigate to **Admin Dashboard -> Verifications**.
2. Examine the submitted government biometric identification card/passport alongside the live selfie portrait.
3. Verify:
   - Name and birthdate match the registered profile.
   - Age is mathematically $\ge 18$.
   - Face in selfie matches the identification photograph.
4. Click **Approve** to issue the official PeQoT Verified Badge, or click **Reject** with a documented explanation.

---

## 2. Safety & Moderation Reports Workflow
1. Navigate to **Admin Dashboard -> Reports**.
2. Select an incident from the pending queue.
3. Review the reporting category:
   - `fake_profile`
   - `scamming`
   - `harassment`
   - `impersonation`
   - `inappropriate_content`
   - `threats`
   - `underage_user`
4. If an infraction has occurred:
   - For severe violations (underage, scams, threats): Click **Ban Account** immediately.
   - For temporary violations: Click **Suspend Account**.
5. Document the decision rationale in the resolution notes to preserve the audit trail.
