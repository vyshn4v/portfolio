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
