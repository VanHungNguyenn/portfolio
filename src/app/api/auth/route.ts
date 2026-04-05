import { NextResponse } from "next/server";

const PASSWORD = "12345678";

export async function POST(req: Request) {
  const { password } = await req.json();
  if (password === PASSWORD) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
}
