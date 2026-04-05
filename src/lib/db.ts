import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src/data/json");

function readJson<T>(file: string): T {
  const raw = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
  return JSON.parse(raw);
}

function writeJson(file: string, data: unknown) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), "utf-8");
}

export const db = {
  profile: {
    get: () => readJson<Record<string, unknown>>("profile.json"),
    set: (data: Record<string, unknown>) => writeJson("profile.json", data),
  },
  projects: {
    get: () => readJson<Record<string, unknown>[]>("projects.json"),
    set: (data: Record<string, unknown>[]) => writeJson("projects.json", data),
  },
  experiences: {
    get: () => readJson<Record<string, unknown>[]>("experiences.json"),
    set: (data: Record<string, unknown>[]) => writeJson("experiences.json", data),
  },
  skills: {
    get: () => readJson<Record<string, string[]>>("skills.json"),
    set: (data: Record<string, string[]>) => writeJson("skills.json", data),
  },
};
