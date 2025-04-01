"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getMonitor = async (id: string) => {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }

    const monitor = await db.monitor.findUnique({
        where: {
            id
        },
        include: {checks: true}
    })

    return { monitor }
}
