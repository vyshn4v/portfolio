# CR-017: Technical Content Quality, Voice Harmonization & Editorial Polish

## Title
Technical Content Quality, Voice Harmonization & Editorial Polish

## Description
This change request addresses editorial quality, voice consistency, and storytelling depth across the portfolio and AI assistant:

1. **AI Chat Assistant Greeting & Prompt Quality (`AIChat.tsx`)**:
   - Replaced informal/awkward greeting text (`"👋 Hi, I am Yoho! I will help you to know Vyshnav's details..."`) with an authoritative, natural-language introduction:
     `"👋 Hi! I'm Yoho, Vyshnav's autonomous AI assistant. I can answer questions about his backend architecture, enterprise InsurTech delivery at Neutrinos, and tech stack—or help you schedule a technical consultation."`
   - Upgraded `QUICK_PROMPTS` to high-intent queries that specifically highlight enterprise delivery at Neutrinos, Yoho's LangGraph.js architecture, and Domain Scanner SaaS ownership.
2. **Project Storytelling & Active-Voice Harmonization (`projects.ts`)**:
   - Standardized project title capitalization to **`Yoho AI-Agent`**.
   - Converted QStack bullets from present participles ("Building...", "Implementing...") to decisive, active past-tense engineering verbs (`Architected`, `Implemented`, `Engineered`, `Designed`) consistent with the rest of the portfolio.
3. **About Section Narrative Depth (`profile.ts` & `About.tsx`)**:
   - Structured the About section into two complementary narrative paragraphs (one detailing enterprise InsurTech delivery and 1,000–2,000 req/min API scale at Neutrinos, and the second detailing autonomous agentic AI workflows and immediate availability) to eliminate verbatim duplication with the Hero summary.
4. **Static Fallback Synchronization (`index.html`)**:
   - Synchronized `<noscript>` project titles and descriptions with the active-voice copy.

## Date
2026-11-24

## Affected Files
- [AIChat.tsx](../../src/components/AIChat/AIChat.tsx) - Polished welcome message and upgraded quick prompt queries.
- [projects.ts](../../src/data/projects.ts) - Standardized `Yoho AI-Agent` naming and converted QStack bullets to active-voice engineering verbs.
- [profile.ts](../../src/data/profile.ts) - Added structured narrative paragraphs to `AboutContent`.
- [About.tsx](../../src/components/About/About.tsx) - Rendered structured narrative paragraphs.
- [index.html](../../index.html) - Synchronized `<noscript>` project titles and bullets.

## Verification
- Verified TypeScript compilation and production Vite build (`tsc -b && vite build`).
- Verified zero linter warnings or errors (`oxlint`).
- Verified reading rhythm and scannability per `modern-web-guidance/content-first-noise-reduction`.
