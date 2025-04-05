"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { ProjectSchema } from "./page"

export const createProject = async (projectData: ProjectSchema) => {
    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }
    const url = projectData.url

    try {
        const newProject = await db.project.create({
            data: {
                url,
                userId: session.user?.id
            },
        });

        return { id: newProject.id };
    } catch (error) {
        return { error: "Failed to create project" }
    }
}
