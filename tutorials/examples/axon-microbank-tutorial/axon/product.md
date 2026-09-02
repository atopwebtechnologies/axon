# Axon MicroBank Tutorial

## Overview

A microbanking tutorial application designed to demonstrate the core features of a modern digital banking platform — including account management, fund transfers, and transaction history — built with a microservices architecture. The project serves as a hands-on, educational reference for individual developers learning how to design, implement, and scale banking-grade software systems using industry best practices.

## Problem Statement

Learning microservices architecture can be daunting without a realistic, domain-driven example. Most tutorials use toy problems (e.g., to-do lists) that don't convey the complexity of real-world systems. This project fills that gap by providing a focused, end-to-end banking reference that is digestible yet true-to-life.

## Target Audience

Individual developers learning microservices architecture in a real-world domain context. The project assumes basic programming familiarity but prioritizes clarity: code is thoroughly commented, each service is documented, and patterns are explained step-by-step.

## Core Features (MVP)

1. **Account Management** — Open, view, and close bank accounts.
2. **User Authentication & Authorization** — Secure user registration, login, and access control across services.
3. **Fund Transfers** — Move funds between accounts (internal and/or external), with basic idempotency.
4. **Transaction History & Statements** — View a ledger of all account activity with filtering and pagination.

## Success Criteria

- All 4 core features are implemented end-to-end and fully functional.
- Each microservice is independently deployable and has clear documentation.
- A developer can clone the repository and run the entire system with a single command.
- Code is clean, well-commented, and structured to serve as a learning reference.

## Out of Scope (MVP)

- Notifications (email/SMS/push)
- Loan management
- Multi-currency support
- Admin dashboard / back-office
