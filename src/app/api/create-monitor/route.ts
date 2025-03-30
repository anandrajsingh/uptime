import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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
        return NextResponse.json({ message: "Data received", data: monitor });
      } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
      }
}