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
