"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { subDays, subHours } from "date-fns"

export const getMonitor = async (id: string) => {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }

    const monitor = await db.monitor.findUnique({
        where: {
            id
        },
        include: {
            checks: {
                where: {
                    createdAt: {
                        gte: subHours(new Date(), 24)
                    }
                }
            },
            checkDaily: {
                where: {
                    createdAt: {
                        gte: subDays(new Date(), 30)
                    }
                }
            }
        }
    })

    return { monitor }
}
