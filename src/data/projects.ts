import profileJson from "./json/profile.json";
import projectsJson from "./json/projects.json";
import experiencesJson from "./json/experiences.json";
import skillsJson from "./json/skills.json";

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

export const profile: Profile = profileJson;
export const projects: Project[] = projectsJson;
export const experiences: Experience[] = experiencesJson;
export const skills = skillsJson;

export function getProfile(): Profile { return profile; }
export function getProjects(): Project[] { return projects; }
export function getExperiences(): Experience[] { return experiences; }
export function getSkills() { return skills; }

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
