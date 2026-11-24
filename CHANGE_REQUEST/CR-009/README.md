# Change Request: CR-009

## Title
Comprehensive Resume Synchronization Across Website Data, Descriptions, Projects, and Metrics

## Date
2026-11-24

## Author
Senior Software Engineer (Antigravity)

## Status
Completed

---

## Description
This Change Request synchronizes the entire portfolio website's content, data tokens, skills, project storytelling, professional experience bullets, metrics, and academic/certification credentials with the updated resume file ([public/Resume_vyshnavPC.pdf](../../public/Resume_vyshnavPC.pdf)).

### Key Changes:
1. **Profile & Positioning (`src/data/profile.ts`)**:
   - Updated headline to `"Backend & AI Integration Engineer | Full-Stack Systems"`.
   - Updated eyebrow to `"BACKEND & AI INTEGRATION ENGINEER — KANNUR, KERALA"`.
   - Added availability status token: `"Immediate Joiner (0-Day Notice) | Open to Relocation / Remote"`.
   - Refreshed professional summary highlighting 2 years of enterprise InsurTech delivery (Sun Life Philippines & Manulife), 1,000–2,000 req/min decision engine orchestration, 20% form deployment reduction, and multi-agent RAG systems.
   - Synchronized education credentials:
     - `BCA (Online) — Manipal University Jaipur (Enrolled, Starting Jan 2027)`
     - `Full Stack Development (MERN) — Brototype (Dec 2022 – Nov 2023)`
     - Removed obsolete graphic design entry to match modern engineering focus.

2. **Professional Experience (`src/data/experience.ts`)**:
   - Updated Neutrinos entry bullets verbatim from resume:
     - **Ownership**: Delivered Sun Life Philippines project from presales POC to production with direct client technical scoping.
     - **Scalability**: Engineered decision engine processing 1,000–2,000 requests/minute using Node.js, REST APIs, and jBPM.
     - **Problem Solving**: Built dynamic decision APIs for Sun Life Philippines and configurable React forms for Manulife, cutting deployment effort by 20%.
     - **Production & Leadership**: Kubernetes deployments, production fixes, code reviews, and junior engineer mentorship.
     - Maintained honors: `Team Player Award (Apr 2025)` and `Beyond the Call of Duty Award (Nov 2025)`.

3. **Technical Skills Taxonomy (`src/data/skills.ts`)**:
   - Expanded categories to include latest competencies:
     - **AI Engineering & Agents**: Generative AI, LangGraph.js, Multi-Agent Systems, RAG, Vector Search (Pinecone), OpenRouter LLM Integration, Prompt Engineering.
     - **Backend & Auth**: Node.js, TypeScript, Express.js, NestJS, REST API Design, Microservices, SSO & RBAC, JWT, Server-Sent Events (SSE).
     - **Databases & Storage**: PostgreSQL, MongoDB, Redis, Pinecone, Prisma ORM.
     - **Messaging & Integrations**: RabbitMQ, BullMQ, Socket.IO, Razorpay, Twilio, Cloudinary, Nodemailer.
     - **Cloud & DevOps**: Docker, Docker Compose, Kubernetes, AWS EC2, Azure DevOps, GitHub Actions, Nginx, PM2, CI/CD.
     - **Tools & Practices**: Git, Linux, Postman, Metabase, Copilot, OpenAI Codex, Antigravity.

4. **Certifications with Verified Credential Links (`src/data/certifications.ts`)**:
   - Extracted live credential URLs from resume annotations:
     - `Namaste Node.js` (Akshay Saini / NamasteDev)
     - `Namaste JavaScript` (Akshay Saini / NamasteDev)
     - `Learn DevOps: Docker, Kubernetes, Terraform & Azure DevOps` (Udemy)
     - `Claude Code in Action` (Anthropic / Skilljar)

5. **Project Storytelling & Architecture Surfaces (`src/data/projects.ts` & `src/components/Projects/`)**:
   - Added **Yoho Ai-Agent** (`Mar 2026 – Present`) as flagship project:
     - Stack: `TypeScript, LangGraph.js, OpenRouter, Pinecone, BullMQ, Redis, Server-Sent Events`
     - Storytelling bullets covering the 3-agent state-machine (intent classification, vector search, relevance validation) and the asynchronous consultation booking pipeline via BullMQ + Redis.
     - Attached live link (`https://portfolio.vyshnavpc.com`) and GitHub repo (`https://github.com/vyshn4v/YohoAiAgent`).
   - Created [src/components/Projects/YohoAgentSurface.tsx](../../src/components/Projects/YohoAgentSurface.tsx) displaying the interactive blueprint of the 3-agent state-machine and SSE telemetry.
   - Updated **Domain Scanner** with its verified GitHub repository (`https://github.com/vyshn4v/domainScannerModule`).
   - Added dual action button support in `Projects.tsx` and `Projects.css` allowing visitors to explore both live demos and GitHub source repositories.

6. **Hero, About, Footer & SEO Sections**:
   - `Hero.tsx` & `Hero.css`: Added "Immediate Joiner (0-Day Notice)" availability pill harmonized with `var(--color-ink)` typography, neutral translucent border/background, and a live emerald green pulsing beacon (`#16A34A`), eliminating the prior color clash. Updated SR title and quotes to Backend & AI Integration Engineer.
   - `About.tsx`: Updated feature cards (Decision APIs, Multi-Agent RAG, Cloud DevOps) and metrics (1,000–2,000 req/min, 20% form deployment reduction, 0-day notice).
   - `Footer.tsx` & `Contact.tsx`: Synchronized availability badge with the same neutral ink and green beacon styling, bio, and target roles.
   - `index.html`: Updated page title, meta description, OpenGraph, Twitter cards, JSON-LD Schema.org Person metadata, and `<noscript>` static crawler fallback.

---

## File Locations
- [src/data/profile.ts](../../src/data/profile.ts)
- [src/data/experience.ts](../../src/data/experience.ts)
- [src/data/skills.ts](../../src/data/skills.ts)
- [src/data/certifications.ts](../../src/data/certifications.ts)
- [src/data/projects.ts](../../src/data/projects.ts)
- [src/components/Projects/YohoAgentSurface.tsx](../../src/components/Projects/YohoAgentSurface.tsx)
- [src/components/Projects/index.ts](../../src/components/Projects/index.ts)
- [src/components/Projects/Projects.tsx](../../src/components/Projects/Projects.tsx)
- [src/components/Projects/Projects.css](../../src/components/Projects/Projects.css)
- [src/components/Hero/Hero.tsx](../../src/components/Hero/Hero.tsx)
- [src/components/Hero/Hero.css](../../src/components/Hero/Hero.css)
- [src/components/About/About.tsx](../../src/components/About/About.tsx)
- [src/components/Footer/Footer.tsx](../../src/components/Footer/Footer.tsx)
- [src/components/Contact/Contact.tsx](../../src/components/Contact/Contact.tsx)
- [index.html](../../index.html)
- [CHANGE_REQUEST/CR-009/README.md](./README.md)
