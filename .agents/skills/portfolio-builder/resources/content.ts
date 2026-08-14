// Source of truth for portfolio content, extracted from the resume-populated
// design specification. In Phase 0, split this file verbatim into the five
// files it's already organized into — do not edit the values.

// ============================================================
// FILE: src/data/profile.ts
// ============================================================
export interface Link {
  label: string;
  url: string; // TODO placeholders stay TODO until the real URL is confirmed
}

export interface EducationEntry {
  program: string;
  institution: string;
  period: string;
}

export interface LanguageEntry {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  headline: string;
  eyebrow: string;
  heroHeading: string;
  heroSupport: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
  links: Link[];
  education: EducationEntry[];
  languages: LanguageEntry[];
}

export const profile: Profile = {
  name: "Vyshnav P C",
  headline: "Backend Developer | Node.js · NestJS · TypeScript · PostgreSQL",
  eyebrow: "BACKEND DEVELOPER / SOFTWARE ENGINEER",
  heroHeading: "BUILDING SYSTEMS THAT SCALE.",
  heroSupport: "Node.js · NestJS · TypeScript · PostgreSQL · Redis",
  location: "Kannur, Kerala, India",
  phone: "+91 8086064478",
  email: "vyshnavpcnaravoor@gmail.com",
  summary:
    "Backend-focused developer with 2 years of production experience building Node.js/NestJS services for insurtech platforms. Designed a decision engine handling 1,000-2,000 requests/minute for automated policy workflows and led backend delivery through production deployment. Experienced in REST APIs, asynchronous workflows with RabbitMQ, Redis caching, PostgreSQL/MongoDB, Docker, Kubernetes, and end-to-end service ownership.",
  links: [
    { label: "LinkedIn", url: "TODO_LINKEDIN_URL" },
    { label: "GitHub", url: "TODO_GITHUB_URL" },
    { label: "Portfolio", url: "https://vyshnavpc.com" },
  ],
  education: [
    {
      program: "Full Stack Development Bootcamp (MERN Stack)",
      institution: "Brototype",
      period: "Dec 2022 - Nov 2023",
    },
    {
      program: "Diploma in Graphic Design",
      institution: "Sree Sankaracharya Institute",
      period: "Dec 2018 - Nov 2020",
    },
  ],
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Malayalam", level: "Native" },
  ],
};

// ============================================================
// FILE: src/data/experience.ts
// ============================================================
export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  awards: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Software Development Engineer - I",
    company: "Neutrinos",
    period: "Mar 2024 - Mar 2026",
    bullets: [
      "Owned the Sunlife Philippines project end-to-end, from presales proof-of-concept through production deployment, including direct architecture alignment with the client engineering team.",
      "Designed and built a decision engine processing 1,000-2,000 requests/minute for automated insurance scheduling and policy workflows using jBPM-based business process orchestration and REST APIs.",
      "Built backend services for policy generation, underwriting, and automated client communications, integrated with a low-code frontend platform through reusable Lit components.",
      "Engineered dynamically rendered insurance claims forms in React using conditional field generation, reducing manual configuration for new claim types.",
      "Led Kubernetes-based production migrations with DevOps, coordinating deployment windows to minimize downtime.",
      "Mentored 2+ new joiners on backend architecture and reviewed pull requests for business-logic correctness.",
      "Worked directly with Product Managers, Regional Product Evangelists, and cross-functional teams to translate business requirements into technical delivery and resolve production issues.",
    ],
    awards: ["Team Player Award (Apr 2025)", "Beyond the Call of Duty Award (Nov 2025)"],
  },
];

// ============================================================
// FILE: src/data/projects.ts
// ============================================================
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

// ============================================================
// FILE: src/data/skills.ts
// ============================================================
export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "TypeScript",
      "REST API Design",
      "Microservices Architecture",
      "JWT Authentication",
    ],
  },
  { category: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma ORM"] },
  {
    category: "Messaging & Integrations",
    items: ["RabbitMQ", "Socket.IO", "Razorpay", "Twilio", "Cloudinary", "Nodemailer"],
  },
  {
    category: "DevOps & Cloud",
    items: [
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "AWS EC2",
      "Azure DevOps",
      "GitHub Actions",
      "Nginx",
      "PM2",
      "CI/CD",
    ],
  },
  { category: "Frontend", items: ["React.js", "Redux Toolkit", "JavaScript", "Lit (Web Components)"] },
  { category: "Tools", items: ["Git", "Postman", "Linux", "Agile/Scrum", "Metabase"] },
];

// ============================================================
// FILE: src/data/certifications.ts
// ============================================================
export interface Certification {
  name: string;
  issuer: string;
  url?: string; // TODO: add credential link if available
}

export const certifications: Certification[] = [
  { name: "Namaste Node.js", issuer: "Akshay Saini" },
  { name: "Namaste JavaScript", issuer: "Akshay Saini" },
  { name: "Learn DevOps: Docker, Kubernetes, Terraform & Azure DevOps", issuer: "Udemy" },
  { name: "Claude Code in Action", issuer: "" },
];
