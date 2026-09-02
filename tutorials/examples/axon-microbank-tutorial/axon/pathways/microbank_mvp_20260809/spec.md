# Spec: Build the Initial Microbank Application (MVP)

## Overview

This pathway delivers the complete initial implementation of the Axon MicroBank Tutorial — a React + Vite single-page application. It covers a premium marketing landing page for unauthenticated users, a username/password authentication flow, and a focused banking dashboard for logged-in users. All application state (users, accounts, transactions) is persisted in `localStorage`, making the tutorial fully functional without a backend.

## Functional Requirements

### FR-1: Landing Page
- A full-page marketing landing page is shown to logged-out users.
- **Navbar:** Logo on the left; "Log In" and "Sign Up" CTA buttons on the right.
- **Hero Section:** Bold headline, supporting tagline, and a primary CTA button ("Get Started").
- **Feature Cards:** Text-based cards describing the core banking features (Accounts, Transfers, History, Security).
- **Footer:** Dark-to-green gradient (`#1BA94C`) with branding and links.
- **Color Palette:** White background (`#FFFFFF`) with green accent (`#1BA94C`).

### FR-2: Authentication
- **Sign Up:** A user can register with a unique username and a password. Duplicate usernames are rejected with an error.
- **Log In:** A registered user can log in with their username and password. Invalid credentials show an error message.
- **Log Out:** A logged-in user can log out from the dashboard, returning to the landing page.
- Auth state (current user session) is persisted in `localStorage`.

### FR-3: Banking Dashboard
- Only accessible to logged-in users. Unauthenticated access redirects to the landing page.
- **Account Overview:** Displays the user's current balance prominently.
- **Create Account:** On first login, the user can create a bank account. The account starts with a balance of $0.00.
- **Deposit:** A form to deposit a positive monetary amount into the account. Balance updates immediately.
- **Withdraw:** A form to withdraw a positive monetary amount. Insufficient funds are rejected with an error message.
- **Transaction History:** A ledger showing all past deposits and withdrawals, each with: type (Deposit/Withdrawal), amount, date/time, and running balance. Newest transactions appear first.

### FR-4: Data Persistence
- All data (registered users, account state, transaction history) is stored in `localStorage`.
- Data survives page refreshes and browser tab restores.

## Non-Functional Requirements

- The UI must match the green-and-white color palette (`#1BA94C` accent, white background).
- The landing page must feel "premium" — no generic UI; purposeful spacing, typography, and hierarchy.
- The app must be navigable via React Router (distinct routes for `/`, `/login`, `/signup`, `/dashboard`).
- The codebase must be structured to be readable and educational for developers learning React.

## Acceptance Criteria

- [ ] A user can visit the root URL and see a fully styled landing page.
- [ ] A user can sign up with a username and password and be redirected to the dashboard.
- [ ] A user can log in with valid credentials and be redirected to the dashboard.
- [ ] A logged-in user can create a bank account.
- [ ] A logged-in user can deposit money and see the updated balance.
- [ ] A logged-in user can withdraw money (fails gracefully on insufficient funds).
- [ ] A logged-in user can see all their transactions in the history ledger.
- [ ] All data persists after a page refresh.
- [ ] A logged-in user can log out and be returned to the landing page.

## Out of Scope

- Real backend or API integration
- Multi-account support (one account per user)
- Password hashing / real security (this is a tutorial app)
- Notifications, loans, multi-currency, admin dashboard
- Deployment / CI-CD
