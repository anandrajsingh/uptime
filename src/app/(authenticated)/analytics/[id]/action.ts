"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { subHours } from "date-fns"

export const getProject = async (id: string) => {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }

    const project = await db.project.findUnique({
        where: {
            id
        },
        include: { views: {
            where: {
                timeStamp: {
                    gte: subHours(new Date, 24)
                }
            }
        }}
    })

    return { project }
}
