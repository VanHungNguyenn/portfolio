import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const dest = path.join(process.cwd(), "public", filename);
  await writeFile(dest, buffer);

  const profile = db.profile.get();
  profile.cvUrl = `/${filename}`;
  db.profile.set(profile);

  return NextResponse.json({ url: `/${filename}` });
}
