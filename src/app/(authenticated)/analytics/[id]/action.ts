"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getProject = async (id: string) => {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }

    const project = await db.project.findUnique({
        where: {
            id
        },
        include: { views: true}
    })

    return { project }
}
