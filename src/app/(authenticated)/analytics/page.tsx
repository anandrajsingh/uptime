import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Circle } from "lucide-react";
import Link from "next/link";
import { AnalyticsOption } from "./AnalyticsOption";

export default async function Analytics() {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }
    const projectList = await db.project.findMany({
        where: {
            userId: session.user.id
        },
    })

    const formatUrl = (url?: string): string => {
        if (!url) return '';
        return url.replace(/^(https?:\/\/)/, '');
    };

    return (
        <div className="h-screen w-full flex items-center justify-center">
            {projectList.length === 0 ? (
                <div>
                    <div className="font-bold py-2">Create your first analytics project</div>
                    <Link href="/analytics/new">
                        <Button size="sm" className="font-bold">Create Project</Button>
                    </Link>
                </div>
            ) : (
                <div className="w-full max-w-lg space-y-4">
                    <h2 className="font-bold text-xl">Your Analytics Project</h2>
                    <ul className="space-y-2">
                        {projectList.map((project) => (
                            <li key={project.id} className="flex justify-between items-center p-4 bg-[#2A2A3A] rouded-lg">
                                <div className="flex items-center gap-3">
                                    <Circle className="h-2 w-2" />
                                    <Link href={`/analytics/${project.id}`} className="text-white font-semibold hover:underline">
                                        {formatUrl(project.url)}
                                    </Link>
                                </div>

                                <div className="flex items-center gap-4">
                                    <AnalyticsOption projectId={project.id} />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Link href="/analytics/new">
                        <Button size="sm" className="font-bold my-4">Add new Project</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}