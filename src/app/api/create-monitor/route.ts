import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const session = await auth()
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' });
  }

  try {
    const body = await req.json();
    const { url } = body;

    const monitor = await db.monitor.create({
      data: {
        userId: session.user.id,
        url
      }
    })
    return NextResponse.json({ message: "Data received", data: monitor});
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Monitor with this URL already exists" },
          { status: 400 }
        );
      }
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}