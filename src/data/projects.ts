export type ArchitectureIconType =
  | 'cpu'
  | 'search'
  | 'network'
  | 'database'
  | 'sparkles'
  | 'radio'
  | 'arrow-right'
  | 'bot'
  | 'layers';

export interface ArchitectureNode {
  label: string;
  highlight?: boolean;
  icon?: ArchitectureIconType;
  iconColor?: string;
}

export interface ArchitectureLayer {
  step: string;
  name: string;
  badge: string;
  borderColor?: string;
  nameColor?: string;
  badgeBg?: string;
  badgeColor?: string;
  nodes: ArchitectureNode[];
}

export interface ArchitectureTelemetry {
  stateLabel: string;
  metricsLabel: string;
}

export interface ArchitectureBlueprint {
  title: string;
  badge: string;
  icon?: ArchitectureIconType;
  layers: ArchitectureLayer[];
  telemetry: ArchitectureTelemetry;
}

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
  architecture?: ArchitectureBlueprint;
}

export const projects: Project[] = [
  {
    slug: "yoho-ai-agent",
    name: "Yoho AI-Agent",
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
    architecture: {
      title: "YOHO // MULTI-AGENT STATE MACHINE & RAG PIPELINE",
      badge: "LANGGRAPH.JS + SSE",
      icon: "bot",
      layers: [
        {
          step: "01",
          name: "01. INTENT CLASSIFICATION AGENT",
          badge: "SUPERVISOR ROUTER",
          nodes: [
            { label: "OpenRouter API", icon: "cpu", iconColor: "var(--color-orange)" },
            { label: "Intent Classification Prompt" },
            { label: "Consultation vs Q&A Branch" },
            { label: "Conditional Edge", icon: "arrow-right", iconColor: "var(--color-teal)" },
          ],
        },
        {
          step: "02",
          name: "02. SEMANTIC VECTOR RETRIEVAL AGENT",
          badge: "PINECONE VECTOR STORE",
          borderColor: "rgba(47, 105, 100, 0.45)",
          nameColor: "var(--color-teal-light)",
          badgeBg: "rgba(47, 105, 100, 0.25)",
          badgeColor: "var(--color-teal-light)",
          nodes: [
            { label: "1536-dim Embeddings", highlight: true, icon: "search" },
            { label: "Cosine Similarity Top-K", highlight: true, icon: "network" },
            { label: "Profile & Project Knowledge Base", highlight: true, icon: "database" },
          ],
        },
        {
          step: "03",
          name: "03. RELEVANCE VALIDATION & SYNTHESIS",
          badge: "STATE MACHINE GUARD",
          borderColor: "rgba(215, 114, 12, 0.4)",
          nameColor: "var(--color-orange-warm)",
          badgeBg: "rgba(215, 114, 12, 0.25)",
          badgeColor: "var(--color-orange-warm)",
          nodes: [
            { label: "Context Precision Gate", highlight: true, icon: "sparkles" },
            { label: "SSE Real-Time Token Streaming", highlight: true, icon: "radio" },
            { label: "Hallucination Defense", highlight: true },
          ],
        },
        {
          step: "04",
          name: "04. ASYNC BOOKING PIPELINE (BULLMQ + REDIS)",
          badge: "DECOUPLED QUEUE",
          nodes: [
            { label: "BullMQ Background Job" },
            { label: "OTP Email Dispatch via Redis" },
            { label: "Non-Blocking State Handshake" },
          ],
        },
      ],
      telemetry: {
        stateLabel: "STATE MACHINE: 3 AGENTS CONNECTED",
        metricsLabel: "STREAMING: SSE · LATENCY < 280ms",
      },
    },
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
      "Architected a modular clean-architecture Q&A backend using NestJS and PostgreSQL with raw SQL queries for optimized throughput.",
      "Implemented secure multi-provider authentication (OAuth + JWT), role-based access control (RBAC), and transactional question/answer workflows.",
      "Engineered semantic search and a RAG-powered /ask endpoint using vector embeddings and Gemini AI to contextualize developer responses.",
      "Designed real-time notification streams and reputation tracking while strictly following OWASP security practices.",
    ],
    visualTreatment:
      "Clean architecture/product map: questions, tags, search, /ask, vector retrieval, notifications and reputation.",
  },
];
