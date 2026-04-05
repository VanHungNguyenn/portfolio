import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(db.profile.get());
}

export async function PUT(req: Request) {
  const data = await req.json();
  db.profile.set(data);
  return NextResponse.json({ ok: true });
}
