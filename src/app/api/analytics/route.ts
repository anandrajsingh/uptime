import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { projectId, url, referrer, userAgent } = await req.json();

  if (!projectId || !url) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  await db.pageView.create({
    data: { projectId, url, referrer, userAgent },
  });

  return NextResponse.json({ success: true });
}
