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
