# Plan: Build the Initial Microbank Application (MVP)

**Pathway ID:** microbank_mvp_20260809  
**Type:** MVP / Bootstrap  
**Status:** Completed

---

## Phase 1: Project Scaffold & Configuration

> Set up the React + Vite project, routing, global styles, and design tokens.

- [x] Task: Initialize the React + Vite project with TypeScript
  - [x] Run `npm create vite@latest` with React + TypeScript template
  - [x] Install dependencies: `react-router-dom`
  - [x] Set up ESLint and Prettier configuration
  - [x] Remove Vite boilerplate (default CSS, App.tsx content)
- [x] Task: Define the design system & global CSS
  - [x] Write failing test: design tokens exist (CSS custom properties for green palette)
  - [x] Create `src/styles/global.css` with CSS variables (`--color-accent: #1BA94C`, etc.)
  - [x] Set up Google Fonts (Inter)
  - [x] Implement base reset and typography styles
- [x] Task: Set up React Router with route structure
  - [x] Write failing test: all routes render without crashing
  - [x] Configure routes: `/`, `/login`, `/signup`, `/dashboard`
  - [x] Create placeholder page components for each route
  - [x] Implement `ProtectedRoute` component (redirects unauthenticated users)
- [x] Task: Phase 1 Verification & Checkpoint (Refer to workflow.md)

---

## Phase 2: Data Layer & Auth Context

> Implement the localStorage data layer and authentication logic.

- [x] Task: Design the data schema for localStorage
  - [x] Write failing test: data schema shape is correct (users[], accounts{}, transactions[])
  - [x] Create `src/lib/storage.ts` — typed read/write helpers for localStorage
  - [x] Create `src/lib/db.ts` — domain-level operations (getUser, createUser, etc.)
- [x] Task: Implement user registration logic
  - [x] Write failing tests: duplicate username rejected, user saved to localStorage
  - [x] Implement `signUp(username, password)` in `src/lib/auth.ts`
- [x] Task: Implement user login/logout logic
  - [x] Write failing tests: invalid credentials rejected, session persisted
  - [x] Implement `logIn(username, password)` and `logOut()` in `src/lib/auth.ts`
  - [x] Store active session (username) in localStorage
- [x] Task: Create AuthContext & AuthProvider
  - [x] Write failing test: context provides currentUser, login, logout, signup functions
  - [x] Implement `src/context/AuthContext.tsx`
  - [x] Wrap app in `AuthProvider` in `main.tsx`
- [x] Task: Phase 2 Verification & Checkpoint (Refer to workflow.md)

---

## Phase 3: Landing Page

> Build the premium marketing landing page for unauthenticated users.

- [x] Task: Build the Navbar component
  - [x] Write failing test: Navbar renders logo, Login link, and Sign Up link
  - [x] Implement `src/components/Navbar.tsx` — logo left, CTA buttons right
  - [x] Style with green accent on Sign Up button
- [x] Task: Build the Hero section
  - [x] Write failing test: Hero renders headline, tagline, and CTA button
  - [x] Implement `src/components/Hero.tsx` — bold headline, supporting text, "Get Started" CTA
- [x] Task: Build the Feature Cards section
  - [x] Write failing test: Feature section renders 4 cards with titles and descriptions
  - [x] Implement `src/components/FeatureCards.tsx` — text-based cards for Accounts, Transfers, History, Security
- [x] Task: Build the Footer component
  - [x] Write failing test: Footer renders with dark-to-green gradient background
  - [x] Implement `src/components/Footer.tsx` — dark-to-green gradient, branding, links
- [x] Task: Assemble the Landing Page
  - [x] Write failing test: `/` route renders all Landing Page sections
  - [x] Compose `src/pages/LandingPage.tsx` with Navbar, Hero, Features, Footer
- [x] Task: Phase 3 Verification & Checkpoint (Refer to workflow.md)

---

## Phase 4: Authentication Screens

> Build the Sign Up and Log In pages.

- [x] Task: Build the Sign Up page
  - [x] Write failing tests: form renders, submits, rejects duplicates, redirects to /dashboard on success
  - [x] Implement `src/pages/SignUpPage.tsx` — username + password form, error display
  - [x] Style consistently with green palette
- [x] Task: Build the Log In page
  - [x] Write failing tests: form renders, rejects invalid credentials, redirects on success
  - [x] Implement `src/pages/LoginPage.tsx` — username + password form, error display
- [x] Task: Phase 4 Verification & Checkpoint (Refer to workflow.md)

---

## Phase 5: Banking Dashboard

> Build the authenticated dashboard — balance, transactions, deposit/withdraw.

- [x] Task: Build the Dashboard layout
  - [x] Write failing test: `/dashboard` renders only for authenticated users (redirects otherwise)
  - [x] Implement `src/pages/DashboardPage.tsx` — header with username + logout button
- [x] Task: Build the Account Overview & Create Account flow
  - [x] Write failing tests: shows balance; shows "Create Account" prompt if no account exists
  - [x] Implement `src/components/AccountOverview.tsx`
  - [x] Implement `createAccount()` in `src/lib/db.ts`
- [x] Task: Build the Deposit form
  - [x] Write failing tests: valid deposit updates balance; negative amount rejected
  - [x] Implement `src/components/DepositForm.tsx`
  - [x] Implement `deposit(amount)` in `src/lib/db.ts`; appends transaction to history
- [x] Task: Build the Withdrawal form
  - [x] Write failing tests: valid withdrawal updates balance; insufficient funds rejected with error
  - [x] Implement `src/components/WithdrawForm.tsx`
  - [x] Implement `withdraw(amount)` in `src/lib/db.ts`; validates against balance
- [x] Task: Build the Transaction History ledger
  - [x] Write failing tests: ledger renders transactions newest-first with type, amount, date, running balance
  - [x] Implement `src/components/TransactionHistory.tsx`
- [x] Task: Assemble the Dashboard Page
  - [x] Compose all dashboard components into `DashboardPage.tsx`
  - [x] Wire up all data from AuthContext and db layer
- [x] Task: Phase 5 Verification & Checkpoint (Refer to workflow.md)

---

## Phase 6: Integration & Final Polish

> End-to-end verification, accessibility pass, and cross-browser check.

- [x] Task: Full user journey smoke test
  - [x] Write end-to-end test (or manual verification script): sign up → log in → create account → deposit → withdraw → view history → log out
- [x] Task: localStorage persistence verification
  - [x] Verify all data (users, account, transactions) survives page refresh
- [x] Task: Accessibility & polish pass
  - [x] Audit all form fields for labels and ARIA attributes
  - [x] Ensure keyboard navigation works end-to-end
  - [x] Final visual pass: spacing, typography, color consistency
- [x] Task: Phase 6 Verification & Checkpoint (Refer to workflow.md)
