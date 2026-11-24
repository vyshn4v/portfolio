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

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  greeting: string;
  nameHighlight: string;
  srTitle: string;
  quote: string;
  stampCaption: string;
  stat: HeroStat;
}

export interface AboutCapability {
  id: string;
  title: string;
  subtitle: string;
  icon: 'server' | 'layers' | 'git-branch';
}

export interface AboutMetric {
  value: string;
  label: string;
}

export interface AboutContent {
  heading: string;
  paragraphs: string[];
  capabilities: AboutCapability[];
  metrics: AboutMetric[];
}

export interface Profile {
  name: string;
  headline: string;
  eyebrow: string;
  availability: string;
  availabilityBadge: string;
  relocation: string;
  heroHeading: string;
  heroSupport: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
  links: Link[];
  education: EducationEntry[];
  languages: LanguageEntry[];
  hero: HeroContent;
  about: AboutContent;
}

export const profile: Profile = {
  name: "Vyshnav P C",
  headline: "Backend & AI Integration Engineer | Full-Stack Systems",
  eyebrow: "BACKEND & AI INTEGRATION ENGINEER — KANNUR, KERALA",
  availability: "Immediate Joiner (0-Day Notice) | Open to Relocation / Remote",
  availabilityBadge: "Immediate Joiner · 0-Day Notice",
  relocation: "Open to Relocation / Remote",
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
  hero: {
    greeting: "Hey There,",
    nameHighlight: "I'm Vyshnav",
    srTitle: " — Backend & AI Integration Engineer",
    quote: "I engineer high-throughput backend services, multi-agent AI systems, and resilient production workflows.",
    stampCaption: "SDE-I · BACKEND & AI SYSTEMS",
    stat: {
      value: "2+",
      label: "YEARS PRODUCTION\nEXPERIENCE",
    },
  },
  about: {
    heading: "ARCHITECTING RELIABLE BACKEND SYSTEMS.",
    paragraphs: [
      "Backend & Applied AI Engineer with 2 years of enterprise InsurTech delivery at Neutrinos, taking client solutions from presales proof-of-concept to production for Sun Life Philippines and Manulife. Experienced in architecting high-throughput decision APIs (1,000–2,000 req/min) and cutting deployment cycles through modular dynamic architectures.",
      "Specialized in bridging robust Node.js/TypeScript backends with autonomous agentic AI workflows using LangGraph.js, Pinecone vector search, BullMQ background queues, and Kubernetes. Immediate joiner (0-day notice) available for remote roles or relocation opportunities.",
    ],
    capabilities: [
      {
        id: "decision-apis",
        title: "High-Throughput Decision APIs",
        subtitle: "Node.js · REST · jBPM · 1,000–2,000 req/min",
        icon: "server",
      },
      {
        id: "multi-agent-rag",
        title: "Multi-Agent AI & RAG Systems",
        subtitle: "LangGraph.js · Pinecone · BullMQ · OpenRouter",
        icon: "layers",
      },
      {
        id: "cloud-devops",
        title: "Cloud Delivery & DevOps",
        subtitle: "Kubernetes · Docker · CI/CD · Microservices",
        icon: "git-branch",
      },
    ],
    metrics: [
      {
        value: "1,000–2,000",
        label: "REQUESTS / MINUTE\nDECISION ENGINE ORCHESTRATION",
      },
      {
        value: "20%",
        label: "DEPLOYMENT EFFORT CUT\nDYNAMIC REACT FORMS",
      },
      {
        value: "0-Day",
        label: "NOTICE PERIOD\nIMMEDIATE JOINER",
      },
    ],
  },
};
