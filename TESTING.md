# PeQoT Quality Assurance & Testing Suite

## Test Execution Matrix

| Test ID | Module | Verification Objective | Expected Outcome | Status |
|---|---|---|---|---|
| TC-01 | Registration | Submit birthdate for candidate aged 16 | Registration rejected; error message displayed; database CHECK constraint holds | PASSED |
| TC-02 | Registration | Submit birthdate for candidate aged 24 | Registration succeeds; age calculated accurately; session initiated | PASSED |
| TC-03 | Discovery | Apply country filter: "Liberia" | Only profiles residing in Liberia are returned | PASSED |
| TC-04 | Matching | User A likes User B; User B has not liked User A | Like recorded; no match created | PASSED |
| TC-05 | Matching | User B likes User A (mutual like) | Match created; conversation created; notification fired | PASSED |
| TC-06 | Messaging | Match participant sends message | Message delivered; timestamps rendered; read receipts tracked | PASSED |
| TC-07 | Security / RLS | Non-matched user attempts to query messages | Query blocked; 0 records returned | PASSED |
| TC-08 | Blocking | User A blocks User B | User B disappears from discovery & active chats for User A; User A hidden from User B | PASSED |
| TC-09 | Reporting | User files report under "scamming" | Report logged to moderation queue; admin audit entry created | PASSED |
| TC-10 | Moderation | Admin suspends offending account | Account status becomes `suspended`; user features deactivated | PASSED |
| TC-11 | Verification | User submits ID; Admin approves | Verified badge appears on profile; audit log saved | PASSED |
| TC-12 | Responsive UI | Test viewport at 375px (iPhone) and 1440px (Desktop) | Clean thumb navigation on mobile; expansive multi-column grid on desktop | PASSED |
