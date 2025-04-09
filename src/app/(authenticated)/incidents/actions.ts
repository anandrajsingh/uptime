"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const deleteIncident = async (id: string) => {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }

    await db.incident.delete({
        where: {
            id
        },
    })

    return { success: "Incident deleted" }
}