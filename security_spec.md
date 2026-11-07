# Security Specification & Test Suite

## 1. Data Invariants
- `interview_feedback`:
  - Must be created by an authenticated user whose email ends with `@cmrit.ac.in` (or allowed college domain).
  - The `authorUid` must match `request.auth.uid`.
  - Content must respect length limits (max 1000 characters on comments/questions, max 100 on company/role).
  - Feedback can be read by any verified college domain user for anonymous dashboard analytics, but cannot be modified or deleted once submitted to prevent retrospective tampering.
- `opportunities`:
  - Publicly readable by authenticated college students.
  - Can only be written/updated by admins or automated background scraper service accounts.
- `users`:
  - Split/isolated user profile. Users can only read and write their own profile (`request.auth.uid == userId`).
  - Roles (`role: admin`) cannot be self-elevated.

## 2. The "Dirty Dozen" Payloads (Must Return PERMISSION_DENIED)
1. **Unauthenticated Write**: Anonymous visitor trying to post interview feedback without authenticating.
2. **Invalid Email Domain**: Authenticated user with `@gmail.com` trying to submit feedback when only `@cmrit.ac.in` is whitelisted.
3. **Spoofed Author UID**: User A posting feedback with `authorUid: 'user-b'`.
4. **Giant String DOS**: Submitting `technicalQuestions` with 50,000 characters to exploit wallet quota.
5. **Missing Required Fields**: Submitting feedback without `company` or `overallDifficulty`.
6. **Negative/Invalid Duration**: Submitting `durationMinutes: -15` or `durationMinutes: 9999`.
7. **Invalid Difficulty Enum**: Submitting `overallDifficulty: "Impossible"`.
8. **Feedback Tampering**: User trying to update/delete an existing feedback document after it was indexed.
9. **Unauthorized Opportunity Creation**: Normal student trying to create or delete an official `opportunities` document.
10. **Profile Impersonation**: User A trying to read or write `/users/userB`.
11. **Self-Promotion to Admin**: User trying to set `role: "admin"` in their own profile document.
12. **Malformed Path ID**: Trying to access a collection with a 2000-character malicious path ID.
