import { formatUrl } from "@/lib/format";
import { getMonitor } from "./action"
import { History, CircleCheck, Clock4, TimerReset } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";

type Params = Promise<{ id: string }>

export default async function Monitor(props: { params: Params }) {
    const params = await props.params;
    const monitorId = params.id;
    const res = await getMonitor(monitorId)

    const monitor = res.monitor;
    const checks = monitor?.checks || [];
    const dailyCheck = monitor?.checkDaily || []
    const lastCheck = checks.at(-1);

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e] text-white px-4 py-20 flex justify-center">
            <div className="w-full max-w-5xl space-y-10">

                <div className="text-center space-y-3">
                    <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        {formatUrl(monitor?.url)}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Monitoring for uptime and response from different locations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="bg-[#1f1f2e] border border-gray-700 rounded-xl p-6 shadow-lg space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <CircleCheck className="text-green-400" /> Current Status
                        </h2>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Status</span>
                            <span className={`text-lg font-semibold ${lastCheck?.status === "UP" ? "text-green-500" : "text-red-500"}`} >
                                {lastCheck?.status || "Unknown"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Response Time</span>
                            <span className="text-lg font-semibold">
                                {lastCheck?.responseTime}ms
                            </span>
                        </div>
                    </div>

                    <div className="bg-[#1f1f2e] border border-gray-700 rounded-xl p-6 shadow-lg space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <TimerReset className="text-yellow-400" /> Last Checked
                        </h2>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Checked At</span>
                            <span className="text-lg font-semibold">
                                {lastCheck?.createdAt ? new Date(lastCheck.createdAt).toLocaleString() : "-"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Time Ago</span>
                            <span className="text-lg font-semibold">
                                {lastCheck?.createdAt ? formatDistanceToNow(new Date(lastCheck.createdAt), { addSuffix: true }) : "-"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1f1f2e] border border-gray-700 rounded-xl p-6 shadow-lg mt-6">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                        <History className="text-cyan-400" /> Uptime in Last 24 Hours
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {checks?.slice(-30).reverse().map((check) => (
                            <div
                                key={check.id}
                                className={`w-4 h-4 rounded ${check.status === "UP" ? "bg-green-500" : "bg-red-500"}`}
                                title={`${check.status} - ${new Date(check.createdAt).toLocaleString()}`}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#1f1f2e] border border-gray-700 rounded-xl p-6 shadow-lg mt-6">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                        <History className="text-cyan-400" /> Uptime in Last 30 Days
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {dailyCheck?.slice(-30).reverse().map((check) => (
                            <div
                                key={check.id}
                                className={`w-4 h-4 rounded ${check.status === "UP" ? "bg-green-500" : "bg-red-500"}`}
                                title={`${check.status} - ${new Date(check.createdAt).toLocaleString()}`}
                            ></div>
                        ))}
                    </div>
                </div>

                <Separator className="my-6 bg-gray-700" />

                <div className="bg-[#1f1f2e] border border-gray-700 rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                        <Clock4 className="text-blue-400" /> Monitor Summary
                    </h2>
                    <div className="text-gray-300 space-y-2">
                        <p>In the last 24 hours, this monitor was checked <span className="font-bold">{checks?.length}</span> times.</p>
                        <p>
                            Uptime in last 24h:{" "}
                            <span className="font-bold text-green-400">
                                {checks && checks.length > 0 ? `${Math.round((checks.filter((s) => s.status === "UP").length / checks.length) * 100)}%` : "N/A"}
                            </span>
                        </p>
                        <p>
                            Uptime in last 30d:{" "}
                            <span className="font-bold text-green-400">
                                {dailyCheck && dailyCheck.length > 0 ? `${Math.round((dailyCheck.filter((s) => s.status === "UP").length / dailyCheck.length) * 100)}%` : "N/A"}
                            </span>
                        </p>
                        <p>
                            Latest status is{" "}
                            <span className={`font-bold ${lastCheck?.status === "UP" ? "text-green-500" : "text-red-500"}`}>
                                {lastCheck?.status || "Unknown"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}