# CR-016: High-Intent SEO Keywords, Structured Data Expansion & Social Meta Optimization

## Title
High-Intent SEO Keywords, Structured Data Expansion & Social Meta Optimization

## Description
This change request enriches the portfolio's search engine optimization, recruiter discoverability, and AI crawler indexing per modern web HTML and metadata standards:

1. **Recruiter Search Keyword Expansion**:
   - Expanded `<meta name="keywords">` from 14 terms to 33 high-intent recruiter queries covering core enterprise backend frameworks (`NestJS`, `Express.js`, `PostgreSQL`, `RabbitMQ`), architectural patterns (`REST APIs`, `Microservices`, `SSO`, `RBAC`, `Server-Sent Events`, `SSE`), AI integration competencies (`Agentic AI`, `Vector Search`, `Multi-Agent Systems`), industry domain (`InsurTech`), and availability status (`Immediate Joiner`, `0-Day Notice`).
2. **Schema.org Structured Data (`JSON-LD`) Expansion**:
   - Added `"hasOccupation"` with Standard Occupational Classification (`"occupationalCategory": "15-1252.00"` for Software Developers).
   - Expanded `"knowsAbout"` to 25 verified competencies matching Vyshnav's resume, including `"High-Throughput Decision Engines"`, `"Microservices Architecture"`, `"Single Sign-On (SSO)"`, `"Role-Based Access Control (RBAC)"`, and `"Server-Sent Events (SSE)"`.
3. **Immediate Availability Social Previews**:
   - Prepend `Immediate Joiner (0-Day Notice)` into `description`, `og:description`, and `twitter:description` so preview snippets on LinkedIn, Slack, and Twitter/X immediately communicate 0-day notice availability.
4. **Twitter Card Syntax Bug Fix**:
   - Fixed line 41 under the Twitter Card block to properly use `<meta name="twitter:image" content="..." />` instead of a duplicate `og:image`.

## Date
2026-11-24

## Affected Files
- [index.html](../../index.html) - Expanded `<meta name="keywords">`, updated descriptions with Immediate Joiner notice, fixed `twitter:image`, and added `hasOccupation` + 25 `knowsAbout` tokens in JSON-LD.

## Verification
- Verified JSON-LD Schema.org validity using automated Node.js JSON schema parser.
- Verified TypeScript compilation and production Vite build (`tsc -b && vite build`).
- Verified zero linter warnings or errors (`oxlint`).
