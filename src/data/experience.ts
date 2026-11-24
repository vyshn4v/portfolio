export interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  tech?: string[];
  bullets: string[];
  awards: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Software Development Engineer – I",
    company: "Neutrinos",
    companyUrl: "https://www.neutrinos.com/",
    period: "Mar 2024 - Mar 2026",
    tech: ["Node.js", "TypeScript", "React.js", "REST APIs", "jBPM", "Kubernetes", "Docker"],
    bullets: [
      "Ownership: Delivered the Sun Life Philippines project from presales POC to production, participating directly in client technical discussions and workflow scoping.",
      "Scalability: Built a decision engine handling 1,000–2,000 requests/minute using Node.js, REST APIs, and jBPM for insurance workflows.",
      "Problem Solving: Built dynamic decision APIs for Sun Life Philippines and configurable React forms for Manulife, reducing deployment effort for new form changes by 20%.",
      "Production & Leadership: Worked with the DevOps team on Kubernetes deployments, fixed production issues, reviewed code, and mentored junior developers.",
    ],
    awards: ["Team Player Award (Apr 2025)", "Beyond the Call of Duty Award (Nov 2025)"],
  },
];
