import { auth } from "@/auth";
import { MonitorOption } from "@/app/(authenticated)/monitors/MonitorOptions";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { formatUrl } from "@/lib/format";
import { formatDistanceToNow } from "date-fns";
import { Circle } from "lucide-react";
import Link from "next/link";

export default async function Monitors() {

    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }

    const monitorList = await db.monitor.findMany({
        where: {
            userId: session.user.id
        },
        include: { checks: true }
    })

    return (
        <div className="h-screen w-full flex items-center justify-center px-2">
            {monitorList.length === 0 ? (
                <div className="text-center">
                    <div className="font-bold text-xl mb-2">
                        Create your first monitor
                    </div>

                    <Link href="/monitors/new">
                        <Button size="sm" className="font-bold" >
                            Create Monitor
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="w-full max-w-lg space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-2xl">Your monitors</h2>
                        <Link href="/monitors/new">
                            <Button size="sm" className="font-semibold">
                                + New Monitor
                            </Button>
                        </Link>
                    </div>

                    <ul className="space-y-2">
                        {monitorList.map((monitor) => {
                            const lastCheck = monitor.checks.at(-1);
                            const isUp = lastCheck?.status === "UP";
                            return (
                                <li key={monitor.id} className="flex justify-between items-center p-4 bg-[#1f1f2e] border border-[#2e2e40] rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Circle className={`h-4 w-4 ${isUp ? "text-green-500" : "text-red-500"}`} fill={isUp ? "#22c55e" : "#ef4444"} />
                                        <Link href={`/monitors/${monitor.id}`} className="text-white font-semibold hover:underline">
                                            {formatUrl(monitor.url)}
                                        </Link>

                                        {monitor.checks.length > 0 && (
                                            <span className={`text-sm font-bold ${isUp ? "text-green-500" : "text-red-500"}`}>
                                                {lastCheck?.status}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4">
                                            <span className="text-gray-400 text-sm">
                                                {lastCheck?.createdAt
                                                    ? `${formatDistanceToNow(
                                                        new Date(lastCheck.createdAt),
                                                        { addSuffix: true }
                                                    )}`
                                                    : "No checks yet"}
                                            </span>
                                        <MonitorOption monitorId={monitor.id} paused={monitor.paused}/>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}