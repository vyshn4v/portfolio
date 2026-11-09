export interface Link {
  label: string;
  url: string;
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
  headline: "Full-Stack & Generative AI Developer | Freelancer in Kannur",
  eyebrow: "FULL-STACK & GENERATIVE AI DEVELOPER — KANNUR, KERALA",
  heroHeading: "BUILDING SYSTEMS THAT SCALE.",
  heroSupport: "Generative AI · Agentic Workflows · Node.js · React · TypeScript · PostgreSQL",
  location: "Kannur, Kerala, India",
  phone: "+91 8086064478",
  email: "vyshnavpcnaravoor@gmail.com",
  summary:
    "Full-stack and Generative AI developer based in Kannur, Kerala with production experience engineering intelligent AI agents, modern web applications, and high-throughput backend services. Designed a decision engine handling 1,000–2,000 requests/minute for automated policy workflows and delivered resilient architectures with Node.js/NestJS, React, TypeScript, PostgreSQL, Redis, and Docker. Available for freelance projects, technical consulting, and digital agency collaborations via LixerLab.",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/vyshnav-p-c-5567ba242/" },
    { label: "GitHub", url: "https://github.com/vyshn4v" },
    { label: "LeetCode", url: "https://leetcode.com/u/vyshnavpcnaravoor" },
    { label: "LixerLab", url: "https://lixerlab.vyshnavpc.com/" },
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
