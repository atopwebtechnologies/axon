# Specification: Scandinavian Developer Portfolio Landing Page MVP

## 1. Overview
Build a high-impact, Scandinavian-styled personal portfolio landing page for a senior frontend web developer. The application utilizes modern Vite tooling, native Vanilla JavaScript (ES6+), custom CSS variables (`#FFFAF3`, `#FFF2DB`, `#FFE5BF`, `#F62440`), generous negative space, crisp typography, responsive layout grid, interactive project filter/modal previews, and client-side contact form validation.

## 2. Functional Requirements

### 2.1 Navigation & Header
- Sticky responsive header with brand mark / logo.
- Smooth anchor scrolling navigation links: Home, Projects, Skills & Experience, Contact.
- Dynamic mobile menu toggle with keyboard trap and background blur overlay.

### 2.2 Hero Section
- Clean Scandinavian layout featuring warm cream background (`#FFFAF3`), headline typography, subtitle description, active availability status indicator badge, and CTA buttons ("View Projects", "Get in Touch").

### 2.3 Interactive Project Showcase
- Grid of featured projects with category badges, tech stack tags, thumbnail imagery, and live preview / code repository buttons.
- Filter buttons to filter projects by category (e.g., All, Web Apps, UI/UX, Components).
- Interactive Modal View: Clicking a project card opens an accessible detail modal displaying extended description, key challenges, screenshot preview, and architecture tags.

### 2.4 Skills & Experience Timeline
- Visual layout categorizing core competencies (Frontend Architecture, UI Systems, Performance, Accessibility).
- Interactive career timeline detailing experience, key responsibilities, and achievements.

### 2.5 Contact Form & Feedback
- Form inputs: Name, Email Address, Subject, and Message.
- Real-time client-side validation for email format and required fields.
- Custom inline error feedback styling (`#F62440` accents).
- Animated toast notification upon successful form submission.

## 3. Non-Functional & Design Requirements
- **Performance**: High Lighthouse score, optimized CSS/JS bundle built via Vite.
- **Accessibility**: ARIA labels, semantic tags, keyboard focus rings, WCAG AAA contrast ratio for text.
- **Responsiveness**: Mobile-first fluid grid supporting breakpoints at mobile (320px+), tablet (768px+), desktop (1024px+).

## 4. Out of Scope for MVP
- Backend database integration or server-side API endpoints.
- CMS integration or blog publishing engine.
