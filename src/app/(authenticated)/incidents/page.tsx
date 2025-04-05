import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Circle, MoreVertical } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow, differenceInHours } from 'date-fns'

export default async function Incidents() {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: "Unauthorised" }
    }
    const incidentList = await db.incident.findMany({
        where: {
            monitor: {
                userId: session.user.id
            }
        },
        include: {
            monitor: true
        }
    })


    const formatUrl = (url?: string): string => {
        if (!url) return '';
        return url.replace(/^(https?:\/\/)/, '');
    };

    const getRelativeTime = (dateString: Date) => {
        const date = new Date(dateString)
        const hoursAgo = differenceInHours(new Date(), date)

        return hoursAgo < 24 ? `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago` : formatDistanceToNow(date, { addSuffix: true })
    }
    return (
        <div className="h-screen w-full flex items-center justify-center">
            {incidentList.length === 0 ? (
                <div >
                    <div className="font-bold">
                        We create incident everytime your monitor fails
                    </div>
                    <Link href="/incidents/new">
                        <Button size="sm" className="font-bold" >
                            Create Monitor
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="w-full max-w-lg space-y-4">
                    <h2 className="font-bold text-xl">Incidents</h2>
                    <ul className="space-y-2">
                        {incidentList.map((incident) => (
                            <li key={incident.id} className="flex justify-between items-center p-4 bg-[#2A2A3A] rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Circle className="h-4 w-4 text-red-500"/>
                                    <Link href={`/incidents/${incident.id}`} className="text-white font-semibold hover:underline">
                                    {formatUrl(incident.monitor.url)}
                                    </Link>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span>{getRelativeTime(incident.createdAt)}</span>
                                    <MoreVertical className="text-gray-400 cursor-pointer" />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Link href="/incidents/new">
                        <Button size="sm" className="font-bold my-4">Report new incident</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}