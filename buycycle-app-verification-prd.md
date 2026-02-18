# buycycle App Sign-Up & Verification Flow
## Product Requirements Document (PRD)

**Version:** 1.0
**Last Updated:** February 2026
**Author:** Product Team
**Status:** Ready for Development
**Platform:** iOS / Android (native app)

---

## 1. Executive Summary

This document defines the complete sign-up and verification experience for buycycle's mobile app. The flow supports three authentication methods (email, Google, Apple), collects profile details including commercial seller status, implements dual verification (email + SMS), and tracks acquisition sources.

### Key Objectives
- Reduce sign-up friction with minimal required fields per step
- Maintain security through dual verification (email + phone)
- Support both private and commercial seller registration
- Track marketing attribution via "How did you hear about us?"
- Block unverified users from app functionality via hard block screen

---

## 2. User Flows

### Flow A: Email Registration

```
Step 1: Account Creation (email + password)
  → Step 2: Email Verification (6-digit code)
  → Step 3: Profile Details (name + optional commercial)
  → Step 4: Phone Number Entry
  → Step 5: SMS Code Verification
  → Step 6: Acquisition Source (optional)
  → Success
```

### Flow B: Social Login (Google / Apple)

```
Step 1: Google/Apple Auth
  → Step 2: Profile Details (name + optional commercial)
  → Step 3: Phone Number Entry
  → Step 4: SMS Code Verification
  → Step 5: Acquisition Source (optional)
  → Success
```

**Key difference:** Social login skips email verification entirely (email is pre-verified by provider).

### Flow C: Hard Block (Returning Unverified User)

```
Hard Block Screen → Resume at next incomplete verification step
```

Shown when a user with incomplete verification attempts to use the app.

---

## 3. Screen Specifications

### 3.1 Account Creation (Email Flow Only)

**Purpose:** Collect email and password to create account.

**Fields:**
- Email input (validated with regex on blur)
- Password input (with show/hide toggle)

**Password Criteria** (shown inline, real-time validation):
- Minimum 8 characters
- At least 1 number
- At least 1 lowercase letter
- At least 1 uppercase letter

**Actions:**
- "Continue" primary button (disabled until email valid + password meets all criteria)
- "Continue with Google" button
- "Continue with Apple" button
- "Already have an account? Log in" link

**Additional:**
- Terms of Use and Privacy Policy links above Continue button
- "or" divider between email and social login options

### 3.2 Profile Details — Email Path (ProfileNameScreen)

**Purpose:** Collect name and optional commercial seller details after email verification.

**Header:** "Complete your profile"
**Subtitle:** "Tell us your name to personalize your experience."

**Badge:** Pill badge at top — "Signing up with Email" with envelope icon (background: secondary, border-radius: 20px)

**Progress:** Step 2 of 4

**Fields:**
- First name (required)
- Last name (required)
- "I am a commercial seller" checkbox (unchecked by default)
- Company name (required if checkbox is checked, hidden otherwise)

**Validation:**
- Continue disabled until first name + last name filled
- If commercial checkbox checked, Continue also requires company name
- Unchecking the box clears company name field and its error

**Actions:**
- "Continue" primary button
- Back navigation via header

### 3.3 Profile Details — Social Path (SocialNameScreen)

**Purpose:** Collect/confirm name after Google or Apple login.

**Header:** "Complete your profile"
**Subtitle:**
- If name pre-filled from provider: "We found your name from your account. Please confirm or update it."
- If no name from provider: "Please enter your name to continue."

**Badge:** Pill badge — "Connected with Google" or "Connected with Apple" (with provider icon)

**Fields:**
- First name (pre-filled from provider if available, required)
- Last name (pre-filled from provider if available, required)
- "I am a commercial seller" checkbox (unchecked by default)
- Company name (required if checkbox checked)

**Additional:**
- Green confirmation box: "Email verified via Google" / "Email verified via Apple" with checkmark icon (background: positive)

**Validation:** Same as ProfileNameScreen (section 3.2)

**Edge cases:**
- Apple Sign-In often hides name — fields are empty, user must enter manually
- Google returns name ~70% of the time

### 3.4 Email Verification

**Purpose:** Verify the email address via 6-digit code.

**Header:** "Check your inbox"
**Subtitle:** "We sent a 6-digit code to **{email}**"

**Progress:** Step 1 of 4

**Input:** 6-digit code input (6 individual boxes, 48×56px each, auto-advance on digit entry, paste support)

**States:**
- Verifying: "Verifying..." text shown during simulated API call (1.5s)
- Error: "Invalid code. Please try again." (code input clears, shown in red)
- Test code: any 6-digit code succeeds except `000000` which triggers error

**Actions:**
- Resend code link (available after 30s countdown: "Resend code (available in 0:XX)")
- "Wrong email? Go back" link

**Info box:** "Check spam folder if you don't see the email within 2 minutes."

### 3.5 Phone Number Entry

**Purpose:** Collect phone number for SMS verification.

**Header:** "Verify your phone"
**Subtitle:** "We'll send a code via SMS to verify your number."

**Progress:** Step 3 of 4

**Input:** Phone number with country code selector
- Country code dropdown (default: +49 Germany)
- Dropdown shows flag emoji, country name, and dialing code
- Minimum 6 digits required for validation

**Supported countries:**

| Country | Code | Flag |
|---------|------|------|
| Germany | +49 | 🇩🇪 |
| Austria | +43 | 🇦🇹 |
| Switzerland | +41 | 🇨🇭 |
| Netherlands | +31 | 🇳🇱 |
| Spain | +34 | 🇪🇸 |
| France | +33 | 🇫🇷 |
| Italy | +39 | 🇮🇹 |
| Belgium | +32 | 🇧🇪 |
| United Kingdom | +44 | 🇬🇧 |
| Poland | +48 | 🇵🇱 |

**Actions:**
- "Send verification code" primary button (disabled until valid phone number)
- Loading state while sending

**Info box:** "This keeps our marketplace safe for buyers and sellers."

### 3.6 SMS Code Verification

**Purpose:** Verify phone number via 6-digit SMS code.

**Header:** "Enter the code"
**Subtitle:** "Sent via SMS to **{masked_phone}**"
- Phone display format: `+49 170 •••• 567` (first 3 digits shown, last 3 shown, middle masked)

**Progress:** Step 3 of 4

**Input:** 6-digit code input (same component as email verification)

**States:**
- Same as email verification (verifying, error, test codes)

**Actions:**
- Resend code (30s countdown, then clickable link)
- "Change number" link → navigates back to phone number entry
- Separator dot (·) between resend and change number links

**Info box:**
- "Didn't receive it?"
- "• Check SMS isn't blocked"
- "• Wait 1-2 minutes"

### 3.7 Acquisition Source

**Purpose:** Track how user discovered buycycle. Optional step.

**Header:** "How did you hear about us?"
**Subtitle:** "This helps us improve buycycle for everyone."

**Progress:** Step 4 of 4

**Input:** Free text field
- Label: "Your answer (optional)"
- Placeholder: "e.g. Google, friend recommendation, Instagram..."

**Actions:**
- "Continue" primary button (disabled if text is empty)
- "Skip" secondary button (always enabled)

### 3.8 Verification Complete

**Purpose:** Confirm successful registration.

**Header:** "You're all set!"
**Subtitle:** "Your account is verified and ready to use."

**Animation:** Success checkmark icon scales from 0 to 1 (300ms, bouncy cubic-bezier)

**Actions:**
- "Start browsing" primary button
- "Create your first listing" secondary button

### 3.9 Hard Block Screen

**Purpose:** Block unverified users from app functionality and route them to complete verification.

**Icon:** Lock icon in grey circle

**Header:**
- Both pending: "Complete your account setup"
- One remaining: "One more step"

**Subtitle:**
- Both pending: "To use buycycle, please verify your email and phone number."
- Email done: "Verify your phone number to start using buycycle."
- Phone done: "Verify your email address to start using buycycle."

**Checklist:** Email ✓/✗ and Phone ✓/✗ with "verify now" action labels

**Actions:**
- Dynamic CTA: "Verify phone" / "Verify email" / "Continue setup"
- "This keeps our marketplace safe for buyers and sellers." info text
- "Log out" link

---

## 4. Data Requirements

### User Data Model

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| email | string | Yes | Validated with regex |
| password | string (hashed) | Yes (email flow) | Must meet 4 criteria |
| firstName | string | Yes | Collected in step 2 |
| lastName | string | Yes | Collected in step 2 |
| isCommercialSeller | boolean | Yes | Default: false |
| companyName | string | Conditional | Required if isCommercialSeller = true |
| countryCode | string | Yes | Default: +49 |
| phoneNumber | string | Yes | Minimum 6 digits |
| emailVerified | boolean | Yes | Default: false |
| phoneVerified | boolean | Yes | Default: false |
| loginProvider | enum | Yes | 'email', 'google', 'apple' |
| acquisitionSource | string | No | Null if skipped |

### SMS Code Logic

- 6-digit numeric code, cryptographically random
- Expires after 10 minutes
- Max 5 attempts before requiring new code
- Rate limit: 3 codes per hour per phone number

### Email Code Logic

- 6-digit numeric code
- Resend available after 30-second cooldown

---

## 5. Validation Rules

### Account Creation

| Field | Rule | Error Message |
|-------|------|---------------|
| Email | Valid email format (regex) | "Please enter a valid email address" |
| Password | 8+ chars, 1 number, 1 lower, 1 upper | Shown inline via criteria checklist |

### Profile Details

| Field | Rule | Error Message |
|-------|------|---------------|
| First name | Non-empty after trim | "First name is required" |
| Last name | Non-empty after trim | "Last name is required" |
| Company name | Non-empty if isCommercialSeller | "Company name is required" |

### Phone Number

| Field | Rule | Error Message |
|-------|------|---------------|
| Phone number | Minimum 6 digits | "Please enter a valid phone number" |

### Verification Codes

| Scenario | Error Message |
|----------|---------------|
| Invalid code | "Invalid code. Please try again." |

---

## 6. Navigation & Progress

### Progress Indicator

4-step progress shown as "Step X of 4" with filled/empty dots:

| Step | Email Flow | Social Flow |
|------|-----------|-------------|
| 1 | Email Verification | — (skipped) |
| 2 | Profile Details | Profile Details |
| 3 | Phone Number + SMS Code | Phone Number + SMS Code |
| 4 | Acquisition Source | Acquisition Source |

### Back Navigation

- All screens have a back button in the header
- Back from SMS code → Phone number entry
- Back from phone number → Profile details
- Back from profile details → Email verification (email flow) or account creation (social flow)
- "Change number" on SMS code screen → Phone number entry

---

## 7. SEON Integration

- SEON fraud check is triggered **after phone verification is successfully completed**, not after full registration
- This is a server-side operation, invisible to the user

---

## 8. Analytics — Mixpanel Events

| Trigger | Event | Properties |
|---------|-------|------------|
| Account created (email) | `signup_account_created` | `auth_method`, `platform: app` |
| Profile details submitted | `signup_profile_completed` | `is_commercial`, `auth_method`, `name_was_prefilled`, `platform: app` |
| Email verification success | `signup_email_verified` | `time_to_verify_seconds`, `platform: app` |
| Send SMS code clicked | `signup_phone_code_requested` | `country_code`, `phone_masked`, `platform: app` |
| SMS code attempted | `signup_phone_verify_attempted` | `attempt_number`, `platform: app` |
| SMS verification success | `signup_phone_verified` | `time_to_verify_seconds`, `platform: app` |
| SMS verification failed | `signup_phone_verify_failed` | `error_type`, `attempt_number`, `platform: app` |
| Resend SMS clicked | `signup_phone_code_resent` | `resend_count`, `platform: app` |
| Acquisition source submitted | `signup_acquisition_source_submitted` | `source_text`, `source_length`, `platform: app` |
| Acquisition source skipped | `signup_acquisition_source_skipped` | `platform: app` |
| Sign out during flow | `signup_flow_abandoned` | `abandoned_at_step`, `platform: app` |
| Registration completed | `signup_completed` | `total_time_seconds`, `had_errors`, `auth_method`, `is_commercial`, `platform: app` |

**Funnel tracking:** Track drop-off at each step, segmented by auth method (email vs social) and commercial vs personal.

---

## 9. Error Handling

### Verification Errors

| Scenario | User Message |
|----------|--------------|
| Invalid verification code | "Invalid code. Please try again." |
| Phone already registered | "This phone number is already associated with an account" |
| Invalid phone format | Client-side: disabled button until valid |
| SMS delivery failed | "Failed to send SMS. Please try again." |
| Code expired | "Code expired. Please request a new one." |
| Max attempts exceeded | "Too many incorrect attempts. Please request a new code." |
| Rate limit hit | "Too many attempts. Please try again in X minutes." |

### Flow Edge Cases

| Scenario | Handling |
|----------|----------|
| App backgrounded during flow | State preserved in memory, user resumes at current step |
| Session expired after partial verification | Re-authenticate, skip to correct step based on saved state |
| User goes back from acquisition source | Allowed, phone remains verified |
| Apple hides email/name | Empty fields shown, user must enter manually |
| Commercial checkbox unchecked after filling company name | Company name field hidden and cleared |

---

## 10. Security Considerations

- **Phone validation:** Use libphonenumber for format validation
- **SMS code:** 6 digits, cryptographically random, hashed storage
- **Rate limiting:** Per-phone and per-user limits on code sends
- **Fraud prevention:** SEON triggered immediately after phone verification
- **Data privacy:** Phone numbers and company name are PII, ensure GDPR compliance
- **Code timing:** Use constant-time comparison to prevent timing attacks

---

## 11. Design System

### Tokens

| Token | Value |
|-------|-------|
| Font | Neue Haas Grotesk Text Pro |
| Background primary | #FCFCFC |
| Background secondary | #F3F3F3 |
| Content primary | #090907 |
| Content secondary | #333333 |
| Content positive | #146C43 |
| Content alert | #B91C1C |
| Border tertiary | #EAEAEA |
| Spacing scale | 4px increments (4, 8, 12, 16, 24, 32, 44, 48) |

### Component Library

All screens use shared components:
- **AppHeader** — back button, optional right action
- **ProgressIndicator** — "Step X of Y" with dot indicators
- **TextField** — label, input, error state, helper text, password toggle
- **PhoneInput** — country code picker + phone number field
- **CodeInput** — 6 individual digit boxes with auto-advance and paste support
- **PrimaryButton** — full-width, disabled state, loading state, optional right icon
- **SecondaryButton** — full-width, outline style
- **TextLink** — inline clickable text
- **InfoBox** — light blue background info container
- **ChecklistItem** — completed/pending indicator with label and action
- **PasswordCriteria** — real-time password rule checklist

### Mobile Frame

- 390px viewport width (iPhone form factor)
- Dynamic Island at top
- Status bar with time, signal, battery
- Home indicator at bottom (34px safe area)

---

## 12. Open Questions

- [ ] Phone country code: should it auto-detect based on user location (geolocation) or stay hardcoded to +49?
- [ ] Should sign-out be available during verification steps (currently only on Hard Block screen)?
- [ ] Transition animations between steps: slide left/right with 200–300ms ease-out — should these be added to the app?
