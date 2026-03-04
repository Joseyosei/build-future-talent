

## Plan: Auth + Registration + Onboarding (with Lovable Cloud)

This plan focuses on building the authentication system, multi-step registration, and onboarding flows for all three user types using Lovable Cloud (Supabase under the hood).

### Phase 1: Enable Lovable Cloud + Design System Update

1. **Enable Lovable Cloud** — Set up database, auth, and storage via Lovable Cloud
2. **Update design system** — Rebrand to the new navy/amber palette:
   - Background: `#0D1B2A` (deep navy), Cards: lighter navy tones
   - Primary CTA: `#F5A623` (amber), Text: `#FFFFFF` / `#F8F6F1`
   - Fonts: Georgia for headings, Trebuchet MS / system-sans for body
3. **Update Header/Footer** — New nav: Logo | Jobs | Employers | Institutions | Sign In | Get Started (amber)

### Phase 2: Database Schema

Create tables via Lovable Cloud migrations:

```text
users table (extends auth.users):
  - role: candidate | employer | institution

candidate_profiles:
  - user_id, first_name, last_name, location, phone, background_text,
    quiz_answers (jsonb), availability, right_to_work, photo_url, bio

employer_profiles:
  - user_id, company_name, contact_name, logo_url, description, website,
    company_type, company_size, region, hiring_roles (text[]),
    hire_volume, plan, trust_score

institution_profiles:
  - user_id, institution_name, contact_name, logo_url, description,
    institution_type, region, website, regulatory_body,
    partnership_goals (text[]), plan

user_roles:
  - user_id, role (enum: admin, candidate, employer, institution)
```

RLS policies using `has_role()` security definer function. Users can only read/update their own profiles.

### Phase 3: Auth Pages

**`/login`** — Split layout page:
- Left panel: amber gradient with logo + tagline
- Right panel: email/password form, "Continue with Google" button, role toggle (Candidate/Employer/Institution), forgot password link, link to `/register`

**`/register`** — Multi-step form with progress indicator:
- Step 1: Choose account type (3 large cards with icons and descriptions)
- Step 2: Role-specific form fields (as specified in the brief)
- Step 3: Email verification screen with "Resend code"

**`/reset-password`** — Password reset form (handles recovery token from URL)

### Phase 4: Onboarding Wizards

**`/onboarding/candidate`** (5 steps):
1. Background free text
2. Career interest quiz (4 card-style questions)
3. Availability selector
4. Right to work + basic checks
5. Photo upload + bio (140 char)
6. Final: "Your Construction Match" — 3 matched roles with match %

**`/onboarding/employer`** (3 steps):
1. Company details (logo, description, website, type)
2. Hiring needs (role checklist, volume, regions)
3. Plan selection with feature comparison table (Free / Growth £299/mo / Scale £999/mo)

**`/onboarding/institution`** (2 steps + plan):
1. Institution details (logo, description, Ofsted, region)
2. Partnership goals (checkboxes)
3. Plan selection (Starter free / Professional £5K/yr / Enterprise custom)

### Phase 5: Role-Based Routing

- After login, redirect to `/dashboard/candidate`, `/dashboard/employer`, or `/dashboard/institution` based on role
- Auth guard component wrapping dashboard routes
- Onboarding check: if profile incomplete, redirect to onboarding wizard

### Technical Details

- **Forms**: react-hook-form + zod validation on all forms
- **Auth**: Supabase auth via Lovable Cloud (email/password + Google OAuth)
- **File uploads**: Lovable Cloud storage for logos and profile photos
- **State management**: React context for auth state with `onAuthStateChange` listener
- **Components**: ~15 new files (auth pages, onboarding steps, auth context, protected route wrapper, shared form components)

### What This Does NOT Include (next iterations)

- Full dashboard rebuilds (kept as-is for now)
- Job board with real data
- Build Ready badges system
- Career Pathfinder tool
- Public pages rebrand (kept as-is with current design)

