"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const deleteProject = async (id: string) => {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }

    await db.project.delete({
        where: {
            id
        },
    })

    return { success: "Incident deleted" }
}