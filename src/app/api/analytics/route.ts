import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: Request) {
  const { projectId,
    url,
    referrer,
    userAgent,
    language,
    timeZone,
    screen,
    pageLoadTime,
    timeStamp, } = await req.json();

  if (!projectId || !url) {
    return NextResponse.json({ error: "Missing data" }, { status: 400, headers: { "Access-Control-Allow-Origin": "*", } });
  }

  await db.pageView.create({
    data: {
      url,
      referrer,
      userAgent,
      language,
      timeZone,
      screenWidth: screen?.width,
      screenHeight: screen?.height,
      pageLoadTime,
      timeStamp: timeStamp ? new Date(timeStamp) : undefined,
      project: { connect: { id: projectId } },
    },
  });

  return NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
