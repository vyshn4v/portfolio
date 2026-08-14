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
