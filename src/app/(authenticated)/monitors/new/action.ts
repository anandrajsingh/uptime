"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"


interface MonitorSchema {
    url : string
}


export const createMonitor = async (monitor: MonitorSchema) => {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }

    const monitorCreated =await db.monitor.create({
        data: {
            userId: session.user?.id,
            url: monitor.url
        },
    })

    return { id: monitorCreated.id }
}
