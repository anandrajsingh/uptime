"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getIncident = async (id: string) => {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }

    const incident = await db.incident.findUnique({
        where: {
            id
        },
        include: { monitor: true }
    })
    if (!incident) return { error: "Incident not found" }

    return incident
}