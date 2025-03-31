import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth()
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' });
    }
    
    try {
        const monitors = await db.monitor.findMany({
          where: {
            userId: session.user.id
          }
        })
        return NextResponse.json(monitors);
      } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
      }
}