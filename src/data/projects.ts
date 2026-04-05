import fs from "fs";
import path from "path";

const JSON_DIR = path.join(process.cwd(), "src/data/json");

function read<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(JSON_DIR, file), "utf-8"));
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  year: string;
  tech: string[];
  overview: string;
  problem: string;
  solution: string;
  highlights: string[];
  images: string[];
  demo?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  tech: string[];
  points: string[];
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  about: string[];
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  school: string;
  degree: string;
  schoolYears: string;
  cvUrl: string;
}

export function getProfile(): Profile {
  return read<Profile>("profile.json");
}

export function getProjects(): Project[] {
  return read<Project[]>("projects.json");
}

export function getExperiences(): Experience[] {
  return read<Experience[]>("experiences.json");
}

export function getSkills() {
  return read<{ languages: string[]; styling: string[]; tools: string[]; state: string[] }>("skills.json");
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return getProjects().map((p) => p.slug);
}
