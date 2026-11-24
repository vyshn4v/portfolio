export interface Project {
  slug: string;
  name: string;
  period?: string;
  status: "live" | "in-development";
  badgeText?: string;
  stack: string[];
  bullets: string[];
  visualTreatment: string;
  url?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "yoho-ai-agent",
    name: "Yoho Ai-Agent",
    period: "Mar 2026 – Present",
    status: "live",
    badgeText: "MULTI-AGENT RAG & CONSULTATION PIPELINE",
    stack: [
      "TypeScript",
      "LangGraph.js",
      "OpenRouter",
      "Pinecone",
      "BullMQ",
      "Redis",
      "Server-Sent Events",
    ],
    bullets: [
      "Architected a multi-agent backend using TypeScript, LangGraph.js, and Pinecone, designing a 3-agent state-machine workflow for intent classification, semantic vector search, and relevance validation to deliver accurate, context-aware RAG responses.",
      "Engineered an asynchronous consultation booking pipeline using BullMQ and Redis, decoupling OTP email dispatch through background queues while supporting real-time LLM response streaming via Server-Sent Events (SSE).",
    ],
    visualTreatment:
      "Interactive multi-agent state-machine pipeline: Intent Classifier, Vector Search, Relevance Validation, and BullMQ booking queue telemetry.",
    url: "https://portfolio.vyshnavpc.com",
    githubUrl: "https://github.com/vyshn4v/YohoAiAgent",
  },
  {
    slug: "domain-scanner",
    name: "Domain Scanner",
    status: "live",
    badgeText: "LIVE PRODUCTION SAAS",
    stack: [
      "Node.js",
      "Express.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Docker",
      "Razorpay",
      "Oracle Cloud",
    ],
    bullets: [
      "Ownership: Independently built and deployed a SaaS platform for domain security assessment, covering SSO, RBAC, subscription plans, usage quotas, and Razorpay billing.",
      "Scalability: Built non-blocking security scan pipelines using RabbitMQ, Redis, and PostgreSQL, with retry handling and production deployment using Docker, GitHub Actions, PM2, and Nginx.",
    ],
    visualTreatment:
      "Mini product surface: risk score, scan status, domain input, checks and infra badges.",
    url: "https://domainscanner.vyshnavpc.com",
    githubUrl: "https://github.com/vyshn4v/domainScannerModule",
  },
  {
    slug: "qstack",
    name: "QStack",
    status: "in-development",
    badgeText: "IN-DEVELOPMENT // SYSTEM ARCHITECTURE",
    stack: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "React",
      "Docker",
      "Kubernetes",
    ],
    bullets: [
      "Building a Stack Overflow-style Q&A platform with a modular, clean-architecture backend using NestJS and PostgreSQL with raw SQL.",
      "Implementing email/password authentication, Google/GitHub OAuth, role-based authorization, question/answer CRUD, comments, voting, and tagging.",
      "Architecting semantic search and a RAG-based /ask endpoint using a vector store and Gemini AI to retrieve relevant Q&A context before generating answers.",
      "Adding real-time notifications, recommendation services, and reputation/badge modules while following OWASP security practices.",
    ],
    visualTreatment:
      "Clean architecture/product map: questions, tags, search, /ask, vector retrieval, notifications and reputation.",
  },
];
