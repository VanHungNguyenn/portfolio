import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(db.projects.get());
}

export async function POST(req: Request) {
  const project = await req.json();
  const projects = db.projects.get();
  project.id = `PRJ-${String(projects.length + 1).padStart(3, "0")}`;
  project.slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
  projects.push(project);
  db.projects.set(projects);
  return NextResponse.json(project, { status: 201 });
}

export async function PUT(req: Request) {
  const updated = await req.json();
  const projects = db.projects.get();
  const idx = projects.findIndex((p) => p.slug === updated.slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  projects[idx] = updated;
  db.projects.set(projects);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { slug } = await req.json();
  const projects = db.projects.get().filter((p) => p.slug !== slug);
  db.projects.set(projects);
  return NextResponse.json({ ok: true });
}
