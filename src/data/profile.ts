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
  availability: string;
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
  headline: "Backend & AI Integration Engineer | Full-Stack Systems",
  eyebrow: "BACKEND & AI INTEGRATION ENGINEER — KANNUR, KERALA",
  availability: "Immediate Joiner (0-Day Notice) | Open to Relocation / Remote",
  heroHeading: "BUILDING SYSTEMS THAT SCALE.",
  heroSupport: "Backend & Applied AI · Node.js · TypeScript · LangGraph.js · Multi-Agent RAG · PostgreSQL · Kubernetes",
  location: "Kannur, Kerala, India",
  phone: "+91 8086064478",
  email: "vyshnavpcnaravoor@gmail.com",
  summary:
    "Backend & Applied AI Engineer (2 years, enterprise InsurTech) with presales POC-to-production delivery for Sun Life Philippines and Manulife. Scaled Node.js/TypeScript decision APIs to 1,000–2,000 req/min, cut form deployment effort by 20%, and built multi-agent RAG systems with LangGraph.js, Pinecone, Redis, and Kubernetes. Immediate joiner open to remote or relocation opportunities.",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/vyshnav-p-c-5567ba242/" },
    { label: "GitHub", url: "https://github.com/vyshn4v" },
    { label: "LeetCode", url: "https://leetcode.com/u/vyshnavpcnaravoor" },
    { label: "Resume", url: "/Resume_vyshnavPC.pdf" },
    { label: "LixerLab", url: "https://lixerlab.vyshnavpc.com/" },
    { label: "Portfolio", url: "https://portfolio.vyshnavpc.com" },
  ],
  education: [
    {
      program: "BCA (Online)",
      institution: "Manipal University Jaipur",
      period: "Enrolled, Starting Jan 2027",
    },
    {
      program: "Full Stack Development (MERN)",
      institution: "Brototype",
      period: "Dec 2022 – Nov 2023",
    },
  ],
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Malayalam", level: "Native" },
  ],
};
