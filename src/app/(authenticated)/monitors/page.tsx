import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Circle, MoreVertical } from "lucide-react";
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

    const formatUrl = (url?: string): string => {
        if (!url) return '';
        return url.replace(/^(https?:\/\/)/, '');
    };

    return (
        <div className="h-screen w-full flex items-center justify-center">
            {monitorList.length === 0 ? (
                <div >
                    <div className="font-bold py-2">
                        Create your first monitor
                    </div>

                    <Link href="/monitors/new">
                        <Button size="sm" className="font-bold" >
                            Create Monitor
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="w-full max-w-lg space-y-4">
                    <h2 className="font-bold text-xl">Your monitors</h2>
                    <ul className="space-y-2">
                        {monitorList.map((monitor) => (
                            <li key={monitor.id} className="flex justify-between items-center p-4 bg-[#2A2A3A] rounded-lg">


                                <div className="flex items-center gap-3">
                                    <Circle className={`h-4 w-4 text-green-400`} />
                                    <Link href={`/monitors/${monitor.id}`} className="text-white font-semibold hover:underline">
                                        {formatUrl(monitor.url)}
                                    </Link>

                                    {monitor.checks.length > 0 && (
                                        <span className={`text-sm font-bold ${monitor.checks.at(-1)?.status === "UP" ? "text-green-500" : "text-red-500"}`}>
                                            {monitor.checks.at(-1)?.status}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    {monitor.checks.length > 0 && monitor.checks.at(-1)?.createdAt ? (
                                        <span className="text-gray-400 text-sm">
                                            {new Date(monitor.checks.at(-1)!.createdAt).toLocaleTimeString()}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 text-sm">No checks available</span>
                                    )}
                                    <MoreVertical className="text-gray-400 cursor-pointer" />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Link href="/monitors/new">
                        <Button size="sm" className="font-bold my-4">Add More Monitors</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}