export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "AI Engineering & Agents",
    items: [
      "Generative AI",
      "LangGraph.js",
      "Multi-Agent Systems",
      "Retrieval-Augmented Generation (RAG)",
      "Vector Search (Pinecone)",
      "LLM Integration (OpenRouter)",
      "Prompt Engineering",
    ],
  },
  {
    category: "Backend & Auth",
    items: [
      "Node.js",
      "TypeScript",
      "Express.js",
      "NestJS",
      "REST API Design",
      "Microservices",
      "SSO & RBAC",
      "JWT Authentication",
      "Server-Sent Events (SSE)",
    ],
  },
  {
    category: "Databases & Storage",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Pinecone",
      "Prisma ORM",
    ],
  },
  {
    category: "Messaging & Integrations",
    items: [
      "RabbitMQ",
      "BullMQ",
      "Socket.IO",
      "Razorpay",
      "Twilio",
      "Cloudinary",
      "Nodemailer",
    ],
  },
  {
    category: "Cloud & DevOps",
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
  {
    category: "Frontend",
    items: [
      "React.js",
      "Redux Toolkit",
      "JavaScript",
      "Lit (Web Components)",
    ],
  },
  {
    category: "Tools & Practices",
    items: [
      "Git",
      "Linux",
      "Postman",
      "Metabase",
      "Copilot",
      "OpenAI Codex",
      "Antigravity",
    ],
  },
];
