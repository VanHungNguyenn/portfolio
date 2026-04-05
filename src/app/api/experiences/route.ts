import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(db.experiences.get());
}

export async function PUT(req: Request) {
  const data = await req.json();
  db.experiences.set(data);
  return NextResponse.json({ ok: true });
}
