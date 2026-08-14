export interface Project {
  slug: string;
  name: string;
  status: "live" | "in-development";
  stack: string[];
  bullets: string[];
  visualTreatment: string;
  url?: string; // TODO: confirm before linking out
}

export const projects: Project[] = [
  {
    slug: "domain-scanner",
    name: "Domain Scanner",
    status: "live",
    stack: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "React",
      "Razorpay",
      "Docker",
    ],
    bullets: [
      "Built and shipped a SaaS platform that scans domains and scores website security risk through SSL/TLS, exposed-port, DNS, and HTTP-header checks.",
      "Implemented SSO authentication and role-based access control (RBAC) for separate admin and user access.",
      "Designed asynchronous scanning workflows with RabbitMQ, automated retries, Redis caching, and PostgreSQL persistence.",
      "Implemented subscription management with daily usage limits, premium plans, and request tracking for plan-based access.",
      "Integrated Razorpay for subscription payments and deployed the production environment using Oracle Cloud VM, Docker, GitHub Actions, PM2, and Nginx.",
    ],
    visualTreatment:
      "Mini product surface: risk score, scan status, domain input, checks and infra badges. Illustrative, not a literal screenshot.",
    url: "https://domainscanner.vyshnavpc.com",
  },
  {
    slug: "qstack",
    name: "QStack",
    status: "in-development",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "RabbitMQ", "React", "Docker", "Kubernetes"],
    bullets: [
      "Building a Stack Overflow-style Q&A platform with a modular, clean-architecture backend using NestJS and PostgreSQL with raw SQL.",
      "Implementing email/password authentication, Google/GitHub OAuth, role-based authorization, question/answer CRUD, comments, voting, and tagging.",
      "Architecting semantic search and a RAG-based /ask endpoint using a vector store and Gemini AI to retrieve relevant Q&A context before generating answers.",
      "Adding real-time notifications, recommendation services, and reputation/badge modules while following OWASP security practices.",
    ],
    visualTreatment:
      "Clean architecture/product map: questions, tags, search, /ask, vector retrieval, notifications and reputation, using a restrained technical diagram aesthetic.",
  },
];
