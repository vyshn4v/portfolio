export interface Certification {
  name: string;
  issuer: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    name: "Namaste Node.js",
    issuer: "Akshay Saini (NamasteDev)",
    url: "https://namastedev.com/vyshnavpcnaravoor/certificates/namaste-node",
  },
  {
    name: "Namaste JavaScript",
    issuer: "Akshay Saini (NamasteDev)",
    url: "https://namastedev.com/vyshnavpcnaravoor/certificates/namaste-javascript",
  },
  {
    name: "Learn DevOps: Docker, Kubernetes, Terraform & Azure DevOps",
    issuer: "Udemy",
    url: "https://www.udemy.com/certificate/UC-933697a4-c053-41f7-8f42-93b9907ce4e3/",
  },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    url: "https://verify.skilljar.com/c/9a6yubtowdsk",
  },
];
