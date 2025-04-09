"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const deleteMonitor = async (id: string) => {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }

    await db.monitor.delete({
        where: {
            id
        },
    })

    return { success: "Monitor deleted" }
}

export const pauseMonitor = async (id: string) => {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }

    const monitor = await db.monitor.findUnique({
        where: { id },
        select: { paused: true },
    });

    if (!monitor) {
        return { error: "Monitor not found" };
    }

    const updatedMonitor = await db.monitor.update({
        where: { id },
        data: {
            paused: !monitor.paused,
        },
    });

    return {
        success: `Monitor ${updatedMonitor.paused ? "paused" : "resumed"}`,
        paused: updatedMonitor.paused,
    };
}
